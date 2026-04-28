<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrendingSkill extends Model
{
    protected $fillable = [
        'skill_name',
        'category',
        'frequency',
        'week_start_date',
    ];

    protected $casts = [
        'week_start_date' => 'date',
    ];
}
