<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\BadgeService;
use Illuminate\Console\Command;

class RecalculateUserBadges extends Command
{
    protected $signature = 'badges:recalculate {--user_id= : Recalculate for a specific user ID only}';
    protected $description = 'Recalculate and re-award all badges and points for users based on their existing data.';

    public function __construct(private BadgeService $badgeService)
    {
        parent::__construct();
    }

    public function handle()
    {
        $userId = $this->option('user_id');

        if ($userId) {
            $users = User::where('id', $userId)->get();
            if ($users->isEmpty()) {
                $this->error("User dengan ID {$userId} tidak ditemukan.");
                return 1;
            }
        } else {
            $users = User::all();
        }

        $this->info("Memulai recalculate untuk {$users->count()} user...");
        $bar = $this->output->createProgressBar($users->count());
        $bar->start();

        foreach ($users as $user) {
            try {
                $fresh = $user->fresh();
                $awarded = $this->badgeService->checkAndAwardBadges($fresh);

                if (count($awarded) > 0) {
                    $names = implode(', ', array_map(fn($b) => "{$b->emoji} {$b->name}", $awarded));
                    $this->newLine();
                    $this->line("  ✅ User [{$user->id}] {$user->name}: Badge baru → {$names}");
                }

                // Re-sync points even if no new badges were awarded
                $this->badgeService->updateRankAndPoints($fresh->fresh());

            } catch (\Exception $e) {
                $this->newLine();
                $this->error("  ❌ Error pada user [{$user->id}] {$user->name}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info('✅ Selesai! Points dan badge semua user sudah disinkronkan.');
        $this->newLine();

        // Show summary
        $this->table(
            ['User ID', 'Nama', 'Rank', 'Total Points', 'Jumlah Badge'],
            User::with('badges')->whereIn('id', $users->pluck('id'))->get()->map(fn($u) => [
                $u->id,
                $u->name,
                $u->rank,
                number_format($u->total_points),
                $u->badges->count(),
            ])->toArray()
        );

        return 0;
    }
}
