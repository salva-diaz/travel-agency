<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Lightit\Cities\Domain\Models\City::class, 'origin_city_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Lightit\Cities\Domain\Models\City::class, 'destination_city_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Lightit\Airlines\Domain\Models\Airline::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
