<?php
namespace App\Services;

use App\Models\{Badge, User, UserBadge};

class BadgeService
{
    public function checkAndAwardBadges(User $user): array
    {
        $awarded = [];

        $checks = [
            'first-login'       => fn() => true, 
            'cv-uploaded'       => fn() => !empty($user->profile?->cv_raw_text),
            'roadmap-generated' => fn() => $user->roadmaps()->exists(),
            'first-insight'     => fn() => !empty($user->profile?->ai_insights),
            'score-60'          => fn() => ($user->workReadinessScore?->score ?? 0) >= 60,
            'score-80'          => fn() => ($user->workReadinessScore?->score ?? 0) >= 80,
            'score-100'         => fn() => ($user->workReadinessScore?->score ?? 0) >= 100,
            'milestone-1'       => fn() => ($user->roadmaps()->first()?->milestones_completed ?? 0) >= 1,
            'milestone-3'       => fn() => ($user->roadmaps()->first()?->milestones_completed ?? 0) >= 3,
            'milestone-all'     => fn() => $this->allMilestonesCompleted($user),
            'first-capstone'    => fn() => $user->capstoneSubmissions()->where('status','completed')->exists(),
            'perfect-capstone'  => fn() => $user->capstoneSubmissions()->where('completion_score',100)->exists(),
            'skill-5'           => fn() => count($user->profile?->skills ?? []) >= 5,
            'skill-10'          => fn() => count($user->profile?->skills ?? []) >= 10,
            'skill-expert-3'    => fn() => collect($user->profile?->skills ?? [])->where('level','expert')->count() >= 3,
            'portfolio-3'       => fn() => $user->portfolioProjects()->count() >= 3,
            'github-verified'   => fn() => $user->capstoneSubmissions()->where('github_verified',true)->exists() || $user->portfolioProjects()->where('github_verified',true)->exists(),
        ];

        foreach ($checks as $slug => $condition) {
            if ($this->shouldAward($user, $slug, $condition)) {
                $badge = Badge::where('slug', $slug)->first();
                if ($badge) {
                    UserBadge::firstOrCreate(
                        ['user_id' => $user->id, 'badge_id' => $badge->id],
                        ['earned_at' => now(), 'context' => $this->getContext($slug)]
                    );
                    $awarded[] = $badge;
                }
            }
        }

        // Update rank dan total points - use fresh user to get latest badges
        $this->updateRankAndPoints($user->fresh());

        return $awarded;
    }

    private function shouldAward(User $user, string $slug, callable $condition): bool
    {
        if ($user->badges()->where('slug', $slug)->exists()) return false;
        return $condition();
    }

    private function allMilestonesCompleted(User $user): bool
    {
        $roadmap = $user->roadmaps()->latest()->first();
        if (!$roadmap) return false;
        return $roadmap->milestones_completed >= $roadmap->total_milestones;
    }

    private function getContext(string $slug): string
    {
        return match($slug) {
            'first-login'       => 'Selamat datang di Kembangin!',
            'cv-uploaded'       => 'CV berhasil dianalisis oleh AI',
            'roadmap-generated' => 'Learning roadmap pertama berhasil dibuat',
            'first-insight'     => 'Membaca AI insights pertama kali',
            'milestone-1'       => 'Milestone pertama berhasil diselesaikan',
            'milestone-3'       => 'Menyelesaikan 3 milestone',
            'milestone-all'     => 'Semua milestone berhasil diselesaikan!',
            'first-capstone'    => 'Capstone project pertama berhasil disubmit',
            'perfect-capstone'  => 'Capstone project dengan score sempurna!',
            'score-60'          => 'Work Readiness Score menembus 60',
            'score-80'          => 'Work Readiness Score menembus 80 — hampir siap kerja!',
            'score-100'         => 'Work Readiness Score menembus 100 — Market Ready!',
            'skill-5'           => 'Memiliki 5 skill terverifikasi',
            'skill-10'          => 'Memiliki 10 skill terverifikasi',
            'skill-expert-3'    => 'Punya 3 skill dengan level Expert',
            'portfolio-3'       => 'Menambahkan 3 project ke showcase',
            'github-verified'   => 'GitHub repository berhasil diverifikasi',
            default             => 'Pencapaian baru diraih!',
        };
    }

    public function updateRankAndPoints(User $user): void
    {
        // Re-fetch badges directly from DB to avoid relationship caching issues
        $badges = $user->badges()->get();
        $totalPoints = $badges->sum(fn($b) => $b->points ?? 0);
        $badgeCount = $badges->count();

        $rank = match(true) {
            $badgeCount >= 15 => 'Elite',
            $badgeCount >= 10 => 'Expert',
            $badgeCount >= 6  => 'Practitioner',
            $badgeCount >= 3  => 'Developer',
            default           => 'Apprentice',
        };

        $user->update([
            'rank' => $rank, 
            'total_points' => (int) $totalPoints
        ]);
        
        \Illuminate\Support\Facades\Log::info("User {$user->id} updated: Points={$totalPoints}, Rank={$rank}, Badges={$badgeCount}");
    }
}
