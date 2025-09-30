<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Organization;
use App\Models\Opportunity;
use App\Models\Faq;
use App\Models\Story;

class HomeDemoSeeder extends Seeder
{
    public function run(): void
    {
        // Partners
        $orgs = collect([
            ['name'=>'ABSA Bank','slug'=>'absa','is_partner'=>true,'logo_url'=>'https://.../absa.svg'],
            ['name'=>'World Bank','slug'=>'world-bank','is_partner'=>true,'logo_url'=>'https://.../world-bank.svg'],
            ['name'=>'UNICEF','slug'=>'unicef','is_partner'=>true,'logo_url'=>'https://.../unicef.svg'],
            ['name'=>'MTN Foundation','slug'=>'mtn','is_partner'=>true,'logo_url'=>'https://.../mtn.svg'],
            ['name'=>'KNUST','slug'=>'knust','is_partner'=>true,'logo_url'=>'https://.../knust.png'],
            ['name'=>'Cedi Bank','slug'=>'cedi-bank','is_partner'=>true,'logo_url'=>'https://.../cedi.png'],
        ])->map(function ($p) {
            return Organization::firstOrCreate(['slug' => $p['slug']], $p);
        });

        // Featured opportunities
        $types = ['job','scholarship','trainee','nss'];
        foreach ($types as $t) {
            foreach (range(1,4) as $n) {
                $title = Str::title($t)." Sample ".$n;
                Opportunity::firstOrCreate(
                    ['slug'=>Str::slug($title)."-{$t}"],
                    [
                        'type' => $t,
                        'title'=> $title,
                        'description'=> 'Demo listing for homepage.',
                        'region'=>'Western',
                        'city'=> $t==='nss'?'Tarkwa':'Accra',
                        'deadline_at'=> now()->addDays(7 + $n),
                        'status'=>'PUBLISHED',
                        'org_id'=> $orgs->random()->id,
                    ]
                );
            }
        }

        // FAQs
        Faq::firstOrCreate(['question'=>'How do I apply for National Service placements?'],['answer'=>'Browse placements and follow requirements.','sort'=>1]);
        Faq::firstOrCreate(['question'=>'How does the eligibility checker work?'],['answer'=>'It estimates fit using simple criteria.','sort'=>2]);
        Faq::firstOrCreate(['question'=>'Can partners post jobs or scholarships?'],['answer'=>'Yes, via the partners portal.','sort'=>3]);
        Faq::firstOrCreate(['question'=>'How soon do I get updates?'],['answer'=>'Usually 2–6 weeks after deadlines.','sort'=>4]);

        // Stories
        Story::firstOrCreate(['quote'=>"UYZN’s eligibility checker saved me weeks."],[
            'person_name'=>'Ama','role'=>'Scholarship Awardee','avatar_url'=>null,'sort'=>1
        ]);
        Story::firstOrCreate(['quote'=>"I got my NSS placement in Tarkwa through UYZN."],[
            'person_name'=>'Kojo','role'=>'NSS','avatar_url'=>null,'sort'=>2
        ]);
    }
}
