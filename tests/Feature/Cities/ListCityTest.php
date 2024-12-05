<?php

declare(strict_types=1);

namespace Tests\Feature\Cities;

use Database\Factories\CityFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Lightit\Cities\App\Transformers\CityTransformer;
use Lightit\Cities\Domain\Models\City;
use Tests\TestCase;

class ListCityTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_city_returns_correct_data_response(): void
    {
        $cities = CityFactory::new()
            ->createMany(5);

        $response = $this->get('/api/cities');

        $transformer = new CityTransformer();

        $response
            ->assertStatus(200)
            ->assertExactJson([
                'status' => 200,
                'success' => true,
                'data' => $cities->map(fn (City $city) => $transformer->transform($city))->toArray(),
            ]);
    }
}
