<?php

declare(strict_types=1);

namespace Tests\Feature\Airlines;

use Illuminate\Http\JsonResponse;
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

        $response = $this->delete("/api/airlines/{$airline->id}");
        $response->assertStatus(JsonResponse::HTTP_NO_CONTENT);

        $this->assertDatabaseMissing('airlines', [
            'id' => $airline->id,
        ]);
    }
}
