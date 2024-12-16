<?php

declare(strict_types=1);

namespace Tests\Feature\Airlines;

use Database\Factories\AirlineFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Lightit\Airlines\App\Transformers\AirlineTransformer;
use Tests\TestCase;

class GetAirlineTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_get_a_airline(): void
    {
        $airline = AirlineFactory::new()->createOne();

        $response = $this->get("/api/airlines/{$airline->id}");

        $transformer = new AirlineTransformer();

        $response->assertExactJson([
            'status' => 200,
            'success' => true,
            'data' => $transformer->transform($airline),
        ]);
    }
}
