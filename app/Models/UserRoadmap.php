<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserRoadmap extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'career_target',
        'roadmap_data',
        'milestones_completed',
        'total_milestones'
    ];

    protected $casts = [
        'roadmap_data' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function completeMilestone($milestoneId)
    {
        $data = $this->roadmap_data;
        $milestones = $data['milestones'] ?? [];
        
        $found = false;
        foreach ($milestones as &$ms) {
            if ($ms['id'] == $milestoneId) {
                $ms['status'] = 'completed';
                $found = true;
                break;
            }
        }

        if (!$found) return false;

        // Reset current/completed counts and unlock next
        $completedCount = 0;
        $nextUnlocked = false;
        
        foreach ($milestones as &$ms) {
            $status = strtolower($ms['status'] ?? 'locked');
            if ($status === 'completed') {
                $completedCount++;
            } elseif (!$nextUnlocked && $status === 'locked') {
                $ms['status'] = 'current';
                $nextUnlocked = true;
            }
        }

        $data['milestones'] = $milestones;
        $this->roadmap_data = $data;
        $this->milestones_completed = $completedCount;
        $this->save();

        return true;
    }
}
