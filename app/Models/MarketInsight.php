<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketInsight extends Model
{
    protected $fillable = [
        'user_id',
        'career_target',
        'trending_skills',
        'market_stats'
    ];

    protected $casts = [
        'trending_skills' => 'array',
        'market_stats' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
