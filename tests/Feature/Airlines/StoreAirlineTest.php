<?php

declare(strict_types=1);

namespace Tests\Feature\Airlines;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class StoreAirlineTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_airline_successfully(): void
    {
        $airline = [
            'name' => fake()->company,
            'description' => fake()->text,
        ];

        $response = $this->post('/api/airlines', $airline);

        $response->assertStatus(Response::HTTP_CREATED);

        $this->assertDatabaseHas('airlines', [
            'name' => $airline['name'],
            'description' => $airline['description'],
        ]);
    }
}
