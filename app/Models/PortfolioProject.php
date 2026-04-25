<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model {
    protected $fillable = [
        'user_id','title','description','github_url','demo_url',
        'thumbnail_url','tech_stack','milestone_id',
        'github_verified','github_stars','visibility','verified_at'
    ];
    protected $casts = ['tech_stack' => 'array', 'verified_at' => 'datetime'];
    public function user() { return $this->belongsTo(User::class); }
}
