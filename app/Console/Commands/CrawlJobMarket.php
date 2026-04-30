<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use App\Services\JobCrawlerService;
use App\Services\SkillAggregatorService;
use Illuminate\Console\Command;

#[Signature('jobs:crawl')]
#[Description('Menjalankan crawling lowongan kerja dan agregasi trending skills secara periodik')]
class CrawlJobMarket extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(JobCrawlerService $crawler, SkillAggregatorService $aggregator)
    {
        $this->info("                                                            ");
        $this->info(" 🚀 KEMBANGIN MULTI-SOURCE ANALYTICS PIPELINE            ");
        $this->info(" ======================================================== ");
        
        $sources = [
            JobCrawlerService::SOURCE_ARBEITNOW,
            JobCrawlerService::SOURCE_JSEARCH,
            JobCrawlerService::SOURCE_JOBS_API,
            JobCrawlerService::SOURCE_LINKEDIN,
        ];

        $allStats = [];

        foreach ($sources as $source) {
            $this->comment(" [+] Mengambil data dari: {$source}... ");
            $stats = $crawler->crawl($source);
            
            if (isset($stats['error_msg'])) {
                $this->error("     ❌ Error: " . substr($stats['error_msg'], 0, 100));
                $allStats[] = [$source, 0, 0, $stats['http_status']];
            } else {
                $allStats[] = [$source, $stats['found'], $stats['saved'], $stats['http_status']];
            }
        }

        $this->info(" 📊 HASIL PERBANDINGAN SUMBER DATA: ");
        $this->table(['Platform', 'Ditemukan', 'Disimpan (Baru)', 'HTTP Status'], $allStats);
        
        $this->info(" ");

        // Aggregation
        $this->comment(" [Aggregasi] Menganalisis trending skills dari semua data baru... ");
        $aggStats = $aggregator->aggregate();
        
        $this->table(['Pekerjaan Diolah', 'Skill Diekstrak (AI)', 'Total Skill Baru'], [
            [$aggStats['jobs_processed'], $aggStats['skills_extracted'], $aggStats['total_new_skills']]
        ]);
        
        $this->info(" ");
        $this->info(" ✅ Semua pipeline selesai! Pilih platform terbaik untuk jadwal rutin.");
        $this->info(" ======================================================== ");
    }
}
