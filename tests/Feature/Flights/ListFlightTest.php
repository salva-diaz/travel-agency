<?php

declare(strict_types=1);

namespace Tests\Feature\Flights;

use Database\Factories\FlightFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Lightit\Flights\App\Transformers\FlightTransformer;
use Lightit\Flights\Domain\Models\Flight;

uses(RefreshDatabase::class);

test('can list flights correctly', function () {
    $flights = FlightFactory::new()
        ->createMany(5);

    $response = $this->get('/api/flights');

    $transformer = new FlightTransformer();

    $response
        ->assertStatus(200)
        ->assertJson([
            'status' => 200,
            'success' => true,
            'data' => $flights->map(fn (Flight $flight) => $transformer->transform($flight))->toArray(),
            'pagination' => [
                'total' => $flights->count(),
            ],
        ]);
});
