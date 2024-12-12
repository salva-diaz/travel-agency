<?php

declare(strict_types=1);

namespace Tests\Feature\Flights;

use Database\Factories\FlightFactory;

test('can delete a flight', function () {
    $flight = FlightFactory::new()->createOne();

    $this->assertDatabaseHas('flights', [
        'id' => $flight->id,
    ]);

    $this->delete("/api/flights/{$flight->id}");

    $this->assertDatabaseMissing('flights', [
        'id' => $flight->id,
    ]);
});
