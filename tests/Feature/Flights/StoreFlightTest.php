<?php

declare(strict_types=1);

namespace Tests\Feature\Flights;

use Database\Factories\StoreFlightRequestFactory;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

test('can create a flight successfully', function () {
    $flight = StoreFlightRequestFactory::new()->create();
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

test("can't create a flight with arrival time before departure time", function() {
    $request = StoreFlightRequestFactory::new()->create();
    $arrivalTime = Carbon::make($request['departure_time'])->subDay();
    $request['arrival_time'] = $arrivalTime->format('Y-m-d H:i:s');
    
    $response = $this->post('/api/flights', $request);
        
    $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);

    $this->assertDatabaseEmpty('flights');
});
