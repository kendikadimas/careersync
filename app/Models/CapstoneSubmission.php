<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CapstoneSubmission extends Model
{
    protected $fillable = [
        'user_id', 'roadmap_id', 'milestone_id',
        'github_url', 'demo_url', 'description',
        'checklist_completed', 'completion_score', 'status', 'submitted_at'
    ];

    protected $casts = [
        'checklist_completed' => 'array',
        'submitted_at' => 'datetime',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function roadmap() { return $this->belongsTo(UserRoadmap::class); }

    /**
     * Hitung score berdasarkan checklist yang dicentang
     * Setiap checklist item punya bobot yang berbeda
     */
    public function calculateScore(): int
    {
        $weights = [
            'has_github_url'     => 25,  // Submit link GitHub: 25 poin
            'has_readme'         => 20,  // README ada: 20 poin
            'has_screenshot'     => 20,  // Ada screenshot/demo: 20 poin
            'has_demo_url'       => 15,  // Deploy/demo link: 15 poin
            'uses_milestone_tech'=> 15,  // Menggunakan tech dari milestone: 15 poin
            'has_description'    => 5,   // Deskripsi project diisi: 5 poin
        ];

        $completed = $this->checklist_completed ?? [];
        $score = 0;

        // Bobot otomatis dari data yang ada
        if (!empty($this->github_url) && str_starts_with($this->github_url, 'https://github.com')) $score += $weights['has_github_url'];
        if (!empty($this->demo_url)) $score += $weights['has_demo_url'];
        if (!empty($this->description)) $score += $weights['has_description'];

        // Bobot dari checklist yang dicentang user
        foreach ($completed as $item) {
            if (isset($weights[$item])) {
                $score += $weights[$item];
            }
        }

        return min(100, $score);
    }
}
