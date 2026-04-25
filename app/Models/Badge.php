<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Badge extends Model {
    protected $fillable = ['slug','name','description','emoji','category','rarity','criteria','points'];
    protected $casts = ['criteria' => 'array'];
    public function users() { 
        return $this->belongsToMany(User::class, 'user_badges')->withPivot('earned_at','context'); 
    }
}
