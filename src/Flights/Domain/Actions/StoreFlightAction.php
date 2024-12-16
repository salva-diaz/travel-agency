<?php

declare(strict_types=1);

namespace Lightit\Flights\Domain\Actions;

use Lightit\Flights\Domain\DataTransferObjects\FlightDto;
use Lightit\Flights\Domain\Models\Flight;

class StoreFlightAction
{
    public function execute(FlightDto $flightDto): Flight
    {
        /** @var Flight $flight */
        $flight = Flight::create([
            'departure_time' => $flightDto->departure_time,
            'arrival_time' => $flightDto->arrival_time,
            'departure_city_id' => $flightDto->departure_city_id,
            'arrival_city_id' => $flightDto->arrival_city_id,
            'airline_id' => $flightDto->airline_id,
        ]);

        return $flight;
    }
}
