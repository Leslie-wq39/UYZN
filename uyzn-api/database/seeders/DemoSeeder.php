<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Opportunity;
use Illuminate\Support\Str;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            ['type' => 'job',         'title' => 'Graduate Mining Engineer (Tarkwa)'],
            ['type' => 'scholarship', 'title' => 'STEM Scholarship — Western Region'],
            ['type' => 'trainee',     'title' => 'Data Analyst Trainee (UYZN)'],
            ['type' => 'nss',         'title' => 'National Service — Community Projects'],
        ];

        foreach ($items as $i => $it) {
            Opportunity::create([
                'type'     => $it['type'],
                'title'    => $it['title'],
                'slug'     => Str::slug($it['title']).'-'.($i + 1),
                'location' => 'Tarkwa',
                'deadline' => now()->addDays(21),
                'status'   => 'open',
            ]);
        }
    }
}
