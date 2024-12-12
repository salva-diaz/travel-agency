<?php

declare(strict_types=1);

namespace Tests\Feature\Airlines;

use Database\Factories\AirlineFactory;
use Tests\TestCase;

class DeleteAirlineTest extends TestCase
{
    public function test_can_delete_a_airline(): void
    {
        $airline = AirlineFactory::new()->createOne();

        $this->assertDatabaseHas('airlines', [
            'id' => $airline->id,
        ]);

        $this->delete("/api/airlines/{$airline->id}");


        $this->assertDatabaseMissing('airlines', [
            'id' => $airline->id,
        ]);
    }
}
