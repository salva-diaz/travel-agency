<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Lightit\Airlines\Domain\Models\Airline;

/**
 * @extends Factory<Airline>
 */
class AirlineFactory extends Factory
{
    protected $model = Airline::class;

    public function definition(): array
    {
        return [
            'name' => fake()->company.' '.rand(1, 9999),
            'description' => fake()->text,
        ];
    }
}
