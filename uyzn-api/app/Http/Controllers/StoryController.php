<?php

namespace App\Http\Controllers;

class StoryController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'name' => 'Ama',
                'role' => 'Scholarship Awardee',
                'quote' => 'UYZN’s eligibility checker saved me weeks.',
                'photo_url' => '/assets/IMG_0092-1.jpg',
            ],
        ]);
    }
}
