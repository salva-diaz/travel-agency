<?php

declare(strict_types=1);

namespace Tests\Feature\Flights;

use Illuminate\Http\JsonResponse;
use Database\Factories\FlightFactory;

test('can delete a flight', function () {
    $flight = FlightFactory::new()->createOne();

    $this->assertDatabaseHas('flights', [
        'id' => $flight->id,
    ]);

    $response = $this->delete("/api/flights/{$flight->id}");
    $response->assertStatus(JsonResponse::HTTP_NO_CONTENT);

    $this->assertDatabaseMissing('flights', [
        'id' => $flight->id,
    ]);
});
