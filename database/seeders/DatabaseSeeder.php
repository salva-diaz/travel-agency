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
                $cities->random(rand(1, 5))->pluck('id')->toArray()
            );
        });

        // Create 20 flights using existing cities and airlines
        FlightFactory::new()
            ->count(150)
            ->state(function () use ($cities, $airlines) {
                return [
                    'departure_city_id' => $cities->random()->id,
                    'arrival_city_id' => $cities->random()->id,
                    'airline_id' => $airlines->random()->id,
                ];
            })
            ->create();
    }
}
