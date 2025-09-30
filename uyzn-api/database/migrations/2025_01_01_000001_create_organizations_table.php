<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    // 2025_01_01_000001_create_organizations_table.php
    Schema::create('organizations', function (Blueprint $t) {
    $t->char('id', 26)->primary();   // BIGINT UNSIGNED PK
    $t->string('name');
    $t->string('slug')->unique();
    $t->boolean('is_partner')->default(false);
    $t->string('logo_url')->nullable();
    $t->timestamp('verified_at')->nullable();
    $t->timestamps();
    });
  }
  public function down(): void {
    Schema::dropIfExists('organizations');
  }
};
