<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 2025_09_15_002323_create_applications_table.php
        Schema::create('applications', function (Blueprint $t) {
        $t->id();

        // Must match users.id (users base migration uses $table->id())
        $t->foreignId('user_id')->constrained()->cascadeOnDelete();

        // Must match opportunities.id from above
        $t->foreignId('opportunity_id')->constrained('opportunities')->cascadeOnDelete();

        $t->enum('status', ['submitted','under_review','shortlisted','interview','awarded','declined'])
            ->default('submitted');
        $t->json('meta')->nullable();
        $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
