<?php

declare(strict_types=1);

namespace Tests\Feature\Cities;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreCityTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_user_successfully(): void
    {
        $city = [
            'name' => 'Montevideo',
        ];

        $response = $this->post('/api/cities', $city);

        $response->assertStatus(201);

        $this->assertDatabaseHas('cities', [
            'name' => $city['name'],
        ]);
    }
}
