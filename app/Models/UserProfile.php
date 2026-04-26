<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'career_target',
        'headline',
        'bio',
        'location',
        'phone',
        'linkedin',
        'github',
        'skills',
        'skill_gaps',
        'ai_insights',
        'career_paths',
        'smart_tips',
        'insights_generated_at',
        'experiences',
        'education',
        'cv_raw_text',
        'onboarding_completed'
    ];

    protected $casts = [
        'career_target' => 'array',
        'skills' => 'array',
        'skill_gaps' => 'array',
        'ai_insights' => 'array',
        'career_paths' => 'array',
        'smart_tips' => 'array',
        'experiences' => 'array',
        'education' => 'array',
        'onboarding_completed' => 'boolean',
        'insights_generated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
