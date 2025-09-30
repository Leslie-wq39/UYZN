<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NewsletterController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
        ]);

        // Minimal stub: just log it for now (no DB required)
        Log::info('Newsletter subscribe', ['email' => $data['email']]);

        return response()->json([
            'ok' => true,
            'message' => 'Subscribed',
            'email' => $data['email'],
        ], 201);
    }
}
