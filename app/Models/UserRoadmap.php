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
}
