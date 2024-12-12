<?php

declare(strict_types=1);

namespace Tests\Feature\Airlines;

use Database\Factories\AirlineFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Lightit\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Airlines\Domain\Models\Airline;
use Tests\TestCase;

class ListAirlineTest extends TestCase
{
    use RefreshDatabase;

    public function test_list_airline_returns_correct_data_response(): void
    {
        $airlines = AirlineFactory::new()
            ->createMany(5);

        $response = $this->get('/api/airlines');

        $transformer = new AirlineTransformer();

        $response
            ->assertStatus(200)
            ->assertJson([
                'status' => 200,
                'success' => true,
                'data' => $airlines->map(fn (Airline $airline) => $transformer->transform($airline))->toArray(),
                'pagination' => [
                    'total' => $airlines->count(),
                ],
            ]);
    }
}
