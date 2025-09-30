<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Models\Opportunity;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $results = [];
        
        $type  = $request->query('type'); // job|scholarship|trainee|nss
        $limit = min((int)$request->query('limit', 20), 50);

        $rows = Opportunity::query()->published()
            ->when($type, fn($qq) => $qq->where('type', $type))
            ->when($q, fn($qq) =>
                $qq->where(function($w) use ($q) {
                    $w->where('title', 'like', "%{$q}%")
                      ->orWhere('description', 'like', "%{$q}%")
                      ->orWhere('city', 'like', "%{$q}%")
                      ->orWhere('region', 'like', "%{$q}%");
                })
            )
            ->orderByRaw('deadline_at IS NULL, deadline_at ASC')
            ->limit($limit)
            ->get(['id','type','title','slug','city','region','deadline_at']);

        // Try to search the opportunities table if it exists
        if (Schema::hasTable('opportunities')) {
            $builder = DB::table('opportunities');
            if ($q !== '') {
                $builder->where(function ($w) use ($q) {
                    $w->where('title', 'like', "%{$q}%")
                      ->orWhere('type', 'like', "%{$q}%")
                      ->orWhere('location', 'like', "%{$q}%");
                });
            }
            $results = $builder->orderByDesc('created_at')->limit(20)->get();
        }

        return response()->json([
            'q' => $q,
            'results' => $results,
        ]);
    }
}
