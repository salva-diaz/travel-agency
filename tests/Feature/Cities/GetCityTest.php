<?php

declare(strict_types=1);

namespace Tests\Feature\Cities;

use Database\Factories\CityFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Lightit\Cities\App\Transformers\CityTransformer;
use Tests\TestCase;

class GetCityTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_a_city(): void
    {
        $city = CityFactory::new()->createOne();

        $response = $this->get("/api/cities/{$city->id}");

        $transformer = new CityTransformer();

        $response->assertExactJson([
            'status' => 200,
            'success' => true,
            'data' => $transformer->transform($city),
        ]);
    }
}
