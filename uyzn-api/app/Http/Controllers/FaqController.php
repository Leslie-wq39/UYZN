<?php

namespace App\Http\Controllers;

class FaqController extends Controller
{
    public function index()
    {
        return response()->json([
            ['q' => 'How do I apply for NSS?', 'a' => 'Browse placements and follow requirements.'],
            ['q' => 'How does the eligibility checker work?', 'a' => 'It estimates fit; final decisions are by awarding bodies.'],
        ]);
    }
}
