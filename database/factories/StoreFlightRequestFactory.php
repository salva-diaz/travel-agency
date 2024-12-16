<?php

declare(strict_types=1);

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;
use Worksome\RequestFactories\RequestFactory;

class StoreFlightRequestFactory extends RequestFactory
{
    public function definition(): array
    {
        $departureCity = CityFactory::new()->createOne();
        $arrivalCity = CityFactory::new()->createOne();
        $airline = AirlineFactory::new()->createOne();
        $airline->cities()->attach([$departureCity->id, $arrivalCity->id]);
    
        return [
            'departure_city_id' => $departureCity->id,
            'arrival_city_id' => $arrivalCity->id,
            'airline_id' => $airline->id,
            'departure_time' => Carbon::instance(fake()->dateTimeBetween('now', '+2 days'))->format('Y-m-d H:i:s'),
            'arrival_time' => Carbon::instance(fake()->dateTimeBetween('+3 days', '+4 days'))->format('Y-m-d H:i:s'),
        ];
    }
}
