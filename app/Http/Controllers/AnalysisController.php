<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\User;
use App\Models\UserProfile;
use App\Services\CvParserService;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalysisController extends Controller
{
    public function __construct(
        protected GeminiService $gemini,
        protected CvParserService $cvParser
    ) {}

    public function index()
    {
        $profile = UserProfile::where('user_id', Auth::id())->first();
        $processingKey = 'analysis_processing_user_' . Auth::id();
        $errorKey = 'analysis_processing_error_user_' . Auth::id();
        
        $marketSkills = [];
        if ($profile && $profile->career_target) {
            $target = is_array($profile->career_target) ? ($profile->career_target[0] ?? '') : $profile->career_target;
            $marketSkills = JobMarketData::getSkillsForRole($target);
        }

        return Inertia::render('Analysis', [
            'profile' => $profile,
            'marketSkills' => $marketSkills,
            'trendingSkills' => array_slice(JobMarketData::getTrendingSkills(), 0, 3),
            'marketStats' => JobMarketData::getMarketStats(),
            'analysisProcessing' => (bool) Cache::get($processingKey, false),
            'analysisProcessingError' => Cache::pull($errorKey),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'cv_text' => 'nullable|string',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx,txt|max:5120', // max 5MB
            'career_target' => 'required|array'
        ]);

        try {
            $cvText = '';

            // Priority: file upload > text input
            if ($request->hasFile('cv_file')) {
                $cvText = $this->cvParser->extractText($request->file('cv_file'));
            } elseif ($request->filled('cv_text')) {
                $cvText = $request->cv_text;
            } else {
                return back()->with('error', 'Silakan upload file CV atau masukkan teks CV.');
            }

            if (strlen(trim($cvText)) < 50) {
                return back()->with('error', 'Teks CV terlalu pendek. Minimal 50 karakter agar AI bisa menganalisis dengan akurat.');
            }

            $userId = Auth::id();
            $careerTargets = (array) $request->career_target;
            $processingKey = 'analysis_processing_user_' . $userId;
            $errorKey = 'analysis_processing_error_user_' . $userId;

            UserProfile::updateOrCreate(
                ['user_id' => Auth::id()],
                [
                    'career_target' => $careerTargets,
                    'cv_raw_text' => $cvText,
                    'onboarding_completed' => true,
                    // Reset insights if CV changed so it regenerates.
                    'ai_insights' => null, 
                    'insights_generated_at' => null,
                ]
            );

            Cache::forget($errorKey);
            Cache::put($processingKey, true, now()->addMinutes(15));

            app()->terminating(function () use ($userId, $cvText, $careerTargets, $processingKey, $errorKey) {
                try {
                    $this->runAnalysisForUser($userId, $cvText, $careerTargets);
                } catch (\Throwable $e) {
                    $debugId = (string) Str::uuid();
                    Log::error('Background CV analysis failed', [
                        'debug_id' => $debugId,
                        'user_id' => $userId,
                        'career_targets' => $careerTargets,
                        'cv_length' => strlen($cvText),
                        'error' => $e->getMessage(),
                    ]);
                    $message = 'Analisis AI gagal diproses. Coba submit ulang CV Anda.';
                    if (config('app.debug')) {
                        $message .= ' Debug ID: ' . $debugId . '. Error: ' . $e->getMessage();
                    } else {
                        $message .= ' Debug ID: ' . $debugId . '.';
                    }
                    Cache::put($errorKey, $message, now()->addMinutes(5));
                } finally {
                    Cache::forget($processingKey);
                }
            });

            return redirect()->route('analysis')->with('success', 'CV diterima. AI sedang memproses analisis di background.');
        } catch (\Exception $e) {
            Log::error("CV Analysis Failed: " . $e->getMessage());
            return back()->with('error', 'Gagal menganalisis CV. Error: ' . $e->getMessage())
                         ->with('debug_error', $e->getMessage());
        }
    }

    private function runAnalysisForUser(int $userId, string $cvText, array $careerTargets): void
    {
        set_time_limit(120);

        $analysis = $this->gemini->parseCV($cvText, $careerTargets);
        if (empty($analysis)) {
            throw new \RuntimeException('AI tidak memberikan data analisis yang valid.');
        }

        // Merge skills with existing ones to avoid losing manually entered skills.
        $currentProfile = UserProfile::where('user_id', $userId)->first();
        $existingSkills = $currentProfile->skills ?? [];
        $newSkills = $analysis['skills'] ?? [];

        $mergedSkills = $existingSkills;
        $existingNames = array_map(fn($s) => strtolower($s['name'] ?? 'unknown'), $existingSkills);

        foreach ($newSkills as $skill) {
            if (isset($skill['name']) && !in_array(strtolower($skill['name']), $existingNames, true)) {
                $mergedSkills[] = $skill;
            }
        }

        // Hitung dan simpan skill gap.
        $marketSkillsTarget = is_array($careerTargets) ? ($careerTargets[0] ?? '') : $careerTargets;
        $marketSkills = JobMarketData::getSkillsForRole($marketSkillsTarget);
        $userSkillNames = array_column($mergedSkills, 'name');

        $normalizeSkill = function (string $value): string {
            $value = strtolower($value);
            $value = preg_replace('/[^a-z0-9\s]/', ' ', $value);
            $value = preg_replace('/\s+/', ' ', $value);
            return trim($value);
        };

        $skillsMatch = function (string $userSkill, string $marketSkill) use ($normalizeSkill): bool {
            $normalizedUser = $normalizeSkill($userSkill);
            $normalizedMarket = $normalizeSkill($marketSkill);

            if ($normalizedUser === '' || $normalizedMarket === '') {
                return false;
            }

            if (str_contains($normalizedUser, $normalizedMarket) || str_contains($normalizedMarket, $normalizedUser)) {
                return true;
            }

            $userTokens = array_filter(explode(' ', $normalizedUser));
            $marketTokens = array_filter(explode(' ', $normalizedMarket));

            foreach ($userTokens as $token) {
                if (strlen($token) < 3) {
                    continue;
                }
                if (in_array($token, $marketTokens, true)) {
                    return true;
                }
            }

            return false;
        };

        $levelToScore = function (?string $level): int {
            $normalized = strtolower(trim((string) $level));

            return match ($normalized) {
                'expert', 'advanced', 'proficient', 'senior' => 90,
                'intermediate', 'menengah', 'medium' => 60,
                'beginner', 'junior', 'pemula', 'basic' => 30,
                default => 0,
            };
        };

        $skillGaps = [];
        foreach ($marketSkills as $ms) {
            $userLevel = 'missing';
            $userScore = 0;

            foreach ($userSkillNames as $userSkill) {
                if ($skillsMatch((string) $userSkill, (string) $ms['skill'])) {
                    foreach ($mergedSkills as $s) {
                        if (isset($s['name']) && $skillsMatch((string) $s['name'], (string) $ms['skill'])) {
                            $userLevel = $s['level'] ?? 'beginner';
                            $userScore = $levelToScore($userLevel);
                            break;
                        }
                    }
                    if ($userScore > 0) {
                        break;
                    }
                }
            }

            $gap = max(0, $ms['demand'] - $userScore);

            $status = match (true) {
                $gap <= 0 => 'strong',
                $gap <= 25 => 'developing',
                default => 'missing',
            };

            $statusLabel = match (true) {
                $gap <= 0 => 'SIAP INDUSTRI',
                $gap <= 10 => 'HAMPIR STANDAR',
                $gap <= 25 => 'PERLU PENINGKATAN',
                default => 'PRIORITAS BELAJAR',
            };

            $skillGaps[] = [
                'skill' => $ms['skill'],
                'market_demand' => $ms['demand'],
                'trend' => $ms['trend'] ?? 'stable',
                'user_score' => $userScore,
                'user_level' => $userLevel,
                'status' => $status,
                'status_label' => $statusLabel,
                'gap' => $gap,
            ];
        }

        UserProfile::updateOrCreate(
            ['user_id' => $userId],
            [
                'career_target' => $careerTargets,
                'skills' => $mergedSkills,
                'skill_gaps' => $skillGaps,
                'experiences' => $analysis['experiences'] ?? [],
                'education' => $analysis['education'] ?? [],
                'cv_raw_text' => $cvText,
                'onboarding_completed' => true,
                'ai_insights' => null,
                'career_paths' => $this->gemini->generateCareerPaths($mergedSkills),
                'smart_tips' => $this->gemini->generateCvOptimization($cvText, $skillGaps),
                'insights_generated_at' => now(),
            ]
        );

        $user = User::find($userId);
        if ($user) {
            app(\App\Services\BadgeService::class)->checkAndAwardBadges($user->fresh());
        }
    }
}
