<?php

declare(strict_types=1);

namespace Tests\Feature\Flights;

use Carbon\Carbon;
use Database\Factories\AirlineFactory;
use Database\Factories\CityFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;

uses(RefreshDatabase::class);

test('can create a flight successfully', function () {
    $departureCity = CityFactory::new()->createOne();
    $arrivalCity = CityFactory::new()->createOne();
    $airline = AirlineFactory::new()->createOne();
    $airline->cities()->attach([$departureCity->id, $arrivalCity->id]);

    $flight = [
        'departure_city_id' => $departureCity->id,
        'arrival_city_id' => $arrivalCity->id,
        'airline_id' => $airline->id,
        'departure_time' => Carbon::instance(fake()->dateTimeBetween('now', '+2 days'))->format('Y-m-d H:i:s'),
        'arrival_time' => Carbon::instance(fake()->dateTimeBetween('+2 days', '+4 days'))->format('Y-m-d H:i:s'),
    ];

    $response = $this->post('/api/flights', $flight);
        
    $response->assertStatus(Response::HTTP_CREATED);

    $this->assertDatabaseHas('flights', [
        'departure_city_id' => $flight['departure_city_id'],
        'arrival_city_id' => $flight['arrival_city_id'],
        'airline_id' => $flight['airline_id'],
        'departure_time' => $flight['departure_time'],
        'arrival_time' => $flight['arrival_time'],
    ]);
});
