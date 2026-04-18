<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\IOFactory as WordIOFactory;
use Smalot\PdfParser\Parser as PdfParser;

class CvParserService
{
    /**
     * Extract text from an uploaded CV file (PDF, DOC, DOCX, TXT).
     */
    public function extractText(UploadedFile $file): string
    {
        $extension = strtolower($file->getClientOriginalExtension());

        return match ($extension) {
            'pdf'  => $this->extractFromPdf($file),
            'docx' => $this->extractFromDocx($file),
            'doc'  => $this->extractFromDocx($file), // Try docx parser for .doc too
            'txt'  => $this->extractFromTxt($file),
            default => throw new \Exception("Format file .{$extension} tidak didukung. Gunakan PDF, DOCX, atau TXT."),
        };
    }

    private function extractFromPdf(UploadedFile $file): string
    {
        try {
            $parser = new PdfParser();
            $pdf = $parser->parseFile($file->getRealPath());
            $text = $pdf->getText();

            if (empty(trim($text))) {
                throw new \Exception('PDF ini tidak mengandung teks yang bisa diekstrak. Mungkin PDF berupa gambar/scan. Silakan gunakan PDF berbasis teks atau copy-paste isi CV secara manual.');
            }

            return $this->cleanText($text);
        } catch (\Exception $e) {
            Log::error('PDF Parse Error: ' . $e->getMessage());
            throw new \Exception('Gagal membaca PDF: ' . $e->getMessage());
        }
    }

    private function extractFromDocx(UploadedFile $file): string
    {
        try {
            $phpWord = WordIOFactory::load($file->getRealPath());
            $text = '';

            foreach ($phpWord->getSections() as $section) {
                foreach ($section->getElements() as $element) {
                    $text .= $this->extractElementText($element) . "\n";
                }
            }

            if (empty(trim($text))) {
                throw new \Exception('Dokumen Word kosong atau tidak mengandung teks yang bisa dibaca.');
            }

            return $this->cleanText($text);
        } catch (\Exception $e) {
            Log::error('DOCX Parse Error: ' . $e->getMessage());
            throw new \Exception('Gagal membaca dokumen Word: ' . $e->getMessage());
        }
    }

    private function extractElementText($element): string
    {
        $text = '';

        if (method_exists($element, 'getText')) {
            $text .= $element->getText() . ' ';
        }

        if (method_exists($element, 'getElements')) {
            foreach ($element->getElements() as $childElement) {
                $text .= $this->extractElementText($childElement);
            }
        }

        return $text;
    }

    private function extractFromTxt(UploadedFile $file): string
    {
        $text = file_get_contents($file->getRealPath());
        return $this->cleanText($text);
    }

    private function cleanText(string $text): string
    {
        // Normalize whitespace
        $text = preg_replace('/\r\n|\r/', "\n", $text);
        // Remove excessive blank lines
        $text = preg_replace('/\n{3,}/', "\n\n", $text);
        // Remove non-printable characters (except newlines and tabs)
        $text = preg_replace('/[^\P{C}\n\t]/u', '', $text);
        // Trim
        $text = trim($text);

        return $text;
    }
}
