<?php

namespace App\Http\Controllers;

class PartnerController extends Controller
{
    public function index()
    {
        // Return a simple list for the homepage grid
        return response()->json([
            ['name' => 'ABSA Bank', 'logo_url' => '/assets/partners/absa.svg', 'website_url' => 'https://absa.com'],
            ['name' => 'World Bank', 'logo_url' => '/assets/partners/world-bank.svg', 'website_url' => 'https://worldbank.org'],
            // add more or move to DB later
        ]);
    }
}
