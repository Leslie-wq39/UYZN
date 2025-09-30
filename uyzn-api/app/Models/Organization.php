<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Organization extends Model
{
    use HasFactory, HasUlids;

    // These two lines are not strictly required with HasUlids,
    // but are harmless and make intent explicit.
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name', 'slug', 'is_partner', 'logo_url', 'verified_at',
    ];

    protected $casts = [
        'is_partner' => 'boolean',
        'verified_at' => 'datetime',
    ];

    public function users() {
    return $this->hasMany(User::class);
  }
  
    public function opportunities()
    {
        return $this->hasMany(Opportunity::class, 'org_id');
    }
}
