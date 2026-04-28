<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScrapedJob extends Model
{
    protected $fillable = [
        'title',
        'company',
        'location',
        'description',
        'source_url',
        'source_platform',
        'posted_at',
    ];

    protected $casts = [
        'posted_at' => 'datetime',
    ];
}
