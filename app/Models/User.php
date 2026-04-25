<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'rank', 'total_points', 'leaderboard_opt_in'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function roadmaps()
    {
        return $this->hasMany(UserRoadmap::class);
    }

    public function workReadinessScores()
    {
        return $this->hasMany(WorkReadinessScore::class);
    }

    public function workReadinessScore()
    {
        return $this->hasOne(WorkReadinessScore::class)->latest();
    }

    public function badges() 
    { 
        return $this->belongsToMany(Badge::class, 'user_badges')->withPivot('earned_at', 'context'); 
    }
    
    public function userBadges() 
    { 
        return $this->hasMany(UserBadge::class); 
    }
    
    public function portfolioProjects() 
    { 
        return $this->hasMany(PortfolioProject::class); 
    }

    public function capstoneSubmissions()
    {
        return $this->hasMany(CapstoneSubmission::class);
    }
}
