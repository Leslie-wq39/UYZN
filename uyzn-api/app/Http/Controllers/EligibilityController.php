<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EligibilityController extends Controller
{
    public function quickCheck(Request $request)
    {
        $age = (int) $request->input('age');
        $gpa = (float) $request->input('gpa');
        $region = (string) $request->input('region');

        $score = 0;
        if ($age >= 16 && $age <= 35) $score += 1;
        if ($gpa >= 2.5) $score += 1;
        if ($region) $score += 1;

        return response()->json([
            'eligible' => $score >= 2,
            'score'    => $score,
            'message'  => $score >= 2 ? 'Likely eligible (estimate)' : 'May not be eligible (estimate)',
        ]);
    }
}
