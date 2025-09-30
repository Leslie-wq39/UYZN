<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
    'name',
    'first_name',
    'last_name',
    'email',
    'phone',
    'role',
    'organization_id',
    'password',
    ];

    protected $hidden = ['password','remember_token'];
    protected $casts = ['email_verified_at' => 'datetime'];

    public function organization() {
        return $this->belongsTo(Organization::class);
    }

    public function getNameAttribute(): string {
        $n = trim(($this->first_name ?? '').' '.($this->last_name ?? ''));
        return $n !== '' ? $n : ($this->attributes['name'] ?? '');
    }
}
