<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Just make it nullable; keep the existing unique index from the base migration
            $table->string('email', 255)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert to NOT NULL (unique index remains)
            $table->string('email', 255)->nullable(false)->change();
        });
    }
};
