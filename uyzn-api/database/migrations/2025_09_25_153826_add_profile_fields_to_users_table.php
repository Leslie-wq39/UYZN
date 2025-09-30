<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::table('users', function (Blueprint $t) {
      // keep existing email unique from Laravel’s base migration
      $t->string('first_name')->nullable()->after('id');
      $t->string('last_name')->nullable()->after('first_name');
      $t->string('phone')->nullable()->unique()->after('email');
      $t->enum('role', ['applicant','employer'])->default('applicant')->after('phone');
      $t->foreignId('organization_id')->nullable()->constrained()->nullOnDelete()->after('role');
    });
  }
  public function down(): void {
    Schema::table('users', function (Blueprint $t) {
      $t->dropConstrainedForeignId('organization_id');
      $t->dropColumn(['first_name','last_name','phone','role']);
    });
  }
};
