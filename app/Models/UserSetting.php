<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email_notifications',
        'product_updates',
        'weekly_summary',
        'language',
        'timezone',
    ];

    protected $casts = [
        'email_notifications' => 'boolean',
        'product_updates' => 'boolean',
        'weekly_summary' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
