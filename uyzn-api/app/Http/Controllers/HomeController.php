<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function featured(Request $request)
    {
        // Proxy to /opportunities in real use; for now a tiny sample
        return response()->json([
            'jobs' => [['title' => 'Sample Job', 'location' => 'Accra', 'due' => '2025-10-01']],
            'scholarships' => [['title' => 'Sample Scholarship', 'location' => 'Ghana', 'due' => '2025-10-15']],
            'trainee' => [['title' => 'Sample Trainee', 'location' => 'Tarkwa', 'due' => '2025-11-30']],
            'nss' => [['title' => 'Sample NSS', 'location' => 'Nationwide', 'due' => null]],
        ]);
    }
}
