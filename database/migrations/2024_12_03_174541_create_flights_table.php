<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Lightit\Cities\Domain\Models\City;
use Lightit\Airlines\Domain\Models\Airline;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(City::class, 'departure_city_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(City::class, 'arrival_city_id')->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Airline::class, 'airline_id')->constrained()->cascadeOnDelete();
            $table->timestamp('departure_time');
            $table->timestamp('arrival_time');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};
