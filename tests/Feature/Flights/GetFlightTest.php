<?php

declare(strict_types=1);

namespace Tests\Feature\Flights;

use Database\Factories\FlightFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Lightit\Flights\App\Transformers\FlightTransformer;

uses(RefreshDatabase::class);

test('can get a flight', function () {
    $flight = FlightFactory::new()->createOne();

    $response = $this->get("/api/flights/{$flight->id}");

    $transformer = new FlightTransformer();

    $response->assertExactJson([
        'status' => 200,
        'success' => true,
        'data' => $transformer->transform($flight),
    ]);
});
