<?php

// app/Http/Controllers/OpportunityController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Opportunity;
use Carbon\Carbon;

class OpportunityController extends Controller
{
    public function index(Request $req)
    {
      $req->validate([
        'type' => 'required|in:job,scholarship,trainee,nss',
        'location' => 'nullable|string',
        'discipline' => 'nullable|string',
        'deadline' => 'nullable|in:this-week,this-month,next-3-months',
        'page' => 'nullable|integer|min:1',
        'per_page' => 'nullable|integer|min:1|max:50',
      ]);

      $q = Opportunity::query()->where('type', $req->type);

      if ($loc = $req->location) {
        if ($loc !== 'All Ghana') $q->where('location', $loc);
      }
      if ($disc = $req->discipline) {
        if ($disc !== 'All') $q->where('discipline', $disc);
      }
      if ($dead = $req->deadline) {
        $now = Carbon::now();
        if ($dead === 'this-week')    $q->whereBetween('due', [$now->copy()->startOfWeek(), $now->copy()->endOfWeek()]);
        if ($dead === 'this-month')   $q->whereBetween('due', [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()]);
        if ($dead === 'next-3-months')$q->whereBetween('due', [$now, $now->copy()->addMonths(3)]);
      }

      $per = $req->integer('per_page', 12);
      $page = $req->integer('page', 1);
      $paginator = $q->orderBy('due', 'asc')->paginate($per, ['*'], 'page', $page);

      $data = $paginator->items();

      // Map fields to the FE shape
      $mapped = array_map(function($it) {
        return [
          'id'        => $it->id,
          'type'      => $it->type,
          'title'     => $it->title,
          'org'       => $it->org,
          'location'  => $it->location,
          'discipline'=> $it->discipline,
          'due'       => optional($it->due)->toDateString(),
          'meta'      => $it->meta, // compute in accessor if you like
        ];
      }, $data);

      return response()->json([
        'data' => $mapped,
        'meta' => [
          'page' => $paginator->currentPage(),
          'per_page' => $paginator->perPage(),
          'total' => $paginator->total(),
          'last_page' => $paginator->lastPage(),
        ],
      ]);
    }
}
