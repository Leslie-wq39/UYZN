<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;

class Opportunity extends Model
{
    use HasFactory, HasUlids;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'type', 'title', 'slug', 'description',
        'region', 'city', 'deadline_at', 'status', 'org_id',
    ];

    protected $casts = [
        'deadline_at' => 'datetime',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'org_id');
    }
}
