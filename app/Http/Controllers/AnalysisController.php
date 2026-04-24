<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Services\CvParserService;
use App\Services\GeminiService;
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
        $profile = UserProfile::where('user_id', auth()->id())->first();
        
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

            $analysis = $this->gemini->parseCV($cvText, $request->career_target);

            if (empty($analysis)) {
                return back()->with('error', 'Gagal menganalisis CV. AI tidak memberikan data yang valid.');
            }

            // Merge skills with existing ones to avoid losing manually entered skills
            $currentProfile = UserProfile::where('user_id', auth()->id())->first();
            $existingSkills = $currentProfile->skills ?? [];
            $newSkills = $analysis['skills'] ?? [];
            
            // Deduplicate skills by name
            $mergedSkills = $existingSkills;
            $existingNames = array_map(fn($s) => strtolower($s['name']), $existingSkills);
            $newSkillsAdded = 0;
            
            foreach ($newSkills as $skill) {
                if (!in_array(strtolower($skill['name']), $existingNames)) {
                    $mergedSkills[] = $skill;
                    $newSkillsAdded++;
                }
            }

            $profile = UserProfile::updateOrCreate(
                ['user_id' => auth()->id()],
                [
                    'career_target' => $request->career_target,
                    'skills' => $mergedSkills,
                    'experiences' => $analysis['experiences'] ?? [],
                    'education' => $analysis['education'] ?? [],
                    'cv_raw_text' => $cvText,
                    'onboarding_completed' => true
                ]
            );

            return redirect()->route('analysis')->with([
                'success' => 'CV berhasil dianalisis!',
                'new_skill_count' => $newSkillsAdded
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Error: ' . $e->getMessage());
        }
    }
}
