<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\FlightFactory;
use Database\Factories\UserFactory;
use Database\Factories\CityFactory;
use Database\Factories\AirlineFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        UserFactory::new()->count(10)->create();

        $cities = CityFactory::new()->createMany(50);
        $airlines = AirlineFactory::new()->createMany(50);
        
        // Associate 1 to 5 cities to each airline at random
        $airlines->each(function ($airline) use ($cities) {
            $airline->cities()->attach(
                $cities->random(rand(2, 5))->pluck('id')->toArray()
            );
        });

        // Create flights using existing cities and airlines (respecting enabled cities for airlines)
        FlightFactory::new()
            ->count(150)
            ->state(function () use ($airlines) {
                $randomAirline = $airlines->random();
                $randomCityPairForAirline = $randomAirline->cities->random(2)->pluck('id')->toArray();
                return [
                    'airline_id' => $randomAirline->id,
                    'departure_city_id' => $randomCityPairForAirline[0],
                    'arrival_city_id' => $randomCityPairForAirline[1],
                ];
            })
            ->create();
    }
}
