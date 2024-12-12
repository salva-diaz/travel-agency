<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Lightit\Flights\Domain\Models\Flight;
use Carbon\Carbon;



/**
 * @extends Factory<Flight>
 */
class FlightFactory extends Factory
{
    protected $model = Flight::class;

    public function definition(): array
    {
        return [
            'departure_city_id' => CityFactory::new()->createOne(),
            'arrival_city_id' => CityFactory::new()->createOne(),
            'airline_id' => AirlineFactory::new()->createOne(),
            'departure_time' => Carbon::instance($this->faker->dateTimeBetween('now', '+2 days')),
            'arrival_time' => Carbon::instance($this->faker->dateTimeBetween('+2 days', '+4 days')),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
