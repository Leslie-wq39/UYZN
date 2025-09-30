<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
       // 2025_09_13_122718_create_opportunities_table.php
        Schema::create('opportunities', function (Blueprint $t) {
        $t->id();  // BIGINT UNSIGNED PK (matches organizations.id)
        $t->enum('type', ['job','scholarship','trainee','nss']);
        $t->string('slug')->unique();
        $t->string('title');
        $t->text('description')->nullable();
        $t->string('region')->nullable();
        $t->string('city')->nullable();
        $t->timestamp('deadline_at')->nullable();
        $t->string('status')->default('PUBLISHED');

        // 👇 Match organizations.id exactly
        $t->foreignId('org_id')->nullable()
            ->constrained('organizations')
            ->cascadeOnDelete();

        $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};
