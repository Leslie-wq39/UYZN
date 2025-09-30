<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Opportunity;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller
{
        // POST /api/opportunities/{id}/apply
    public function apply(Request $r, $id)
    {
        $user = $r->user();
        $opp  = Opportunity::findOrFail($id);

        $data = $r->validate([
            'cover_letter' => ['nullable','string','max:5000'],
            'cv_url'       => ['nullable','url','max:2048'],
        ]);

        // prevent duplicate app by same user
        $exists = Application::where('user_id', $user->id)
            ->where('opportunity_id', $opp->id)->exists();
        if ($exists) {
            return response()->json(['message' => 'Already applied'], 409);
        }

        $app = Application::create([
            'user_id'        => $user->id,
            'opportunity_id' => $opp->id,
            'cover_letter'   => $data['cover_letter'] ?? null,
            'cv_url'         => $data['cv_url'] ?? null,
            'status'         => 'submitted',
        ]);

        return response()->json($app->load('opportunity'), 201);
    }

    // GET /api/my/applications
    public function mine(Request $r)
    {
        return Application::with('opportunity')
            ->where('user_id', $r->user()->id)
            ->orderByDesc('id')
            ->paginate(20);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Application $application)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Application $application)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        //
    }
}
