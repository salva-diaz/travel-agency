<?php

declare(strict_types=1);

namespace Tests\Feature\Cities;

use Database\Factories\CityFactory;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;

class DeleteCityTest extends TestCase
{
    public function test_can_delete_a_city(): void
    {
        $city = CityFactory::new()->createOne();

        $this->assertDatabaseHas('cities', [
            'id' => $city->id,
        ]);

        $response = $this->delete("/api/cities/{$city->id}");
        $response->assertStatus(JsonResponse::HTTP_NO_CONTENT);

        $this->assertDatabaseMissing('cities', [
            'id' => $city->id,
        ]);
    }
}
