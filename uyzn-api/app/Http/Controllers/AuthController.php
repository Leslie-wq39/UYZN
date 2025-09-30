<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class AuthController extends Controller
{
  public function register(Request $r)
  {
    $data = $r->validate([
      'role'        => ['required', Rule::in(['applicant','employer'])],
      'first_name'  => ['required','string','max:100'],
      'last_name'   => ['required','string','max:100'],
      'email'       => ['required','email','max:255','unique:users,email'],
      'phone'       => ['nullable','string','max:30','unique:users,phone'],
      'password'    => ['required','string','min:8','confirmed'],

      // employer-only organization fields
      'org_name'    => ['nullable','string','max:255'],
      'org_slug'    => ['nullable','string','max:255'],
    ]);

    $orgId = null;
    if ($data['role'] === 'employer') {
      $name = $data['org_name'] ?? null;
      if ($name) {
        $slug = $data['org_slug'] ?? Str::slug($name);
        $org = Organization::firstOrCreate(['slug' => $slug], ['name' => $name]);
        $orgId = $org->id;
      }
    }

    $user = User::create([
            'name'            => trim(($data['first_name'] ?? '').' '.($data['last_name'] ?? '')) ?: $data['email'],
            'first_name'      => $data['first_name'],
            'last_name'       => $data['last_name'],
            'email'           => $data['email'],
            'phone'           => $data['phone'] ?? null,
            'role'            => $data['role'],
            'organization_id' => $orgId,
            'password'        => Hash::make($data['password']),
        ]);

        // issue token via Sanctum (or your method)
        $token = $user->createToken('web')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
  }

  public function login(Request $r)
  {
    $data = $r->validate([
      'identifier' => ['required','string'],
      'password'   => ['required','string'],
    ]);

    $identifier = $data['identifier'];
    $user = User::where('email', $identifier)
      ->orWhere('phone', $identifier)
      ->first();

    if (!$user || !Hash::check($data['password'], $user->password)) {
      return response()->json(['message' => 'Invalid credentials'], 422);
    }

    $token = $user->createToken('web')->plainTextToken;

    return response()->json([
      'user'  => $user->load('organization'),
      'token' => $token,
    ]);
  }

  public function me(Request $r)
  {
    return $r->user()->load('organization');
  }

  public function logout(Request $r)
  {
    $r->user()->currentAccessToken()?->delete();
    return response()->json(['ok' => true]);
  }
}
