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
        'skills',
        'experiences',
        'education',
        'cv_raw_text',
        'onboarding_completed'
    ];

    protected $casts = [
        'career_target' => 'array',
        'skills' => 'array',
        'experiences' => 'array',
        'education' => 'array',
        'onboarding_completed' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
