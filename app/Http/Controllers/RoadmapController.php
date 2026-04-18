<?php

namespace App\Http\Controllers;

use App\Data\JobMarketData;
use App\Models\UserProfile;
use App\Models\UserRoadmap;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class RoadmapController extends Controller
{
    public function __construct(protected GeminiService $gemini) {}

    public function index()
    {
        $roadmap = UserRoadmap::where('user_id', auth()->id())->latest()->first();
        $profile = UserProfile::where('user_id', auth()->id())->first();

        return Inertia::render('Roadmap', [
            'roadmap' => $roadmap,
            'profile' => $profile
        ]);
    }

    public function generate(Request $request)
    {
        $user = auth()->user();
        $profile = UserProfile::where('user_id', $user->id)->first();

        if (!$profile) {
            return redirect()->route('analysis')->with('error', 'Analisis CV dulu untuk membuat roadmap.');
        }

        $marketSkills = JobMarketData::getSkillsForRole($profile->career_target);
        
        // Find skill gaps (simple logic: market skill not in user skills)
        $userSkillNames = array_map('strtolower', array_column($profile->skills ?? [], 'name'));
        $skillGaps = [];
        foreach ($marketSkills as $ms) {
            $found = false;
            foreach ($userSkillNames as $us) {
                if (str_contains($us, strtolower($ms['skill'])) || str_contains(strtolower($ms['skill']), $us)) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $skillGaps[] = $ms;
            }
        }

        $cacheKey = "roadmap_generation_{$user->id}";
        $roadmapData = Cache::remember($cacheKey, 3600, function() use ($profile, $skillGaps, $marketSkills) {
            return $this->gemini->generateRoadmap([
                'career_target' => $profile->career_target,
                'existing_skills' => $profile->skills,
                'skill_gaps' => $skillGaps,
                'market_skills' => array_slice($marketSkills, 0, 5),
                'hours_per_day' => 4 
            ]);
        });

        if (empty($roadmapData)) {
            return back()->with('error', 'Gagal memicu AI untuk membuat roadmap. Coba lagi.');
        }

        $roadmap = UserRoadmap::create([
            'user_id' => $user->id,
            'career_target' => $profile->career_target,
            'roadmap_data' => $roadmapData,
            'total_milestones' => count($roadmapData['milestones'] ?? []),
            'milestones_completed' => 0
        ]);

        return redirect()->route('roadmap')->with('success', 'Roadmap belajar berhasil dibuat!');
    }

    public function complete(Request $request, $id)
    {
        $roadmap = UserRoadmap::where('user_id', auth()->id())->latest()->first();
        
        if (!$roadmap) return back();

        $data = $roadmap->roadmap_data;
        foreach ($data['milestones'] as &$ms) {
            if ($ms['id'] == $id) {
                $ms['status'] = 'completed';
                $roadmap->milestones_completed += 1;
                break;
            }
        }

        // Set next milestone to 'current' if locked
        foreach ($data['milestones'] as &$ms) {
            if ($ms['status'] == 'locked' || !isset($ms['status'])) {
                $ms['status'] = 'current';
                break;
            }
        }

        $roadmap->roadmap_data = $data;
        $roadmap->save();

        return back()->with('success', 'Milestone diselesaikan!');
    }
}
