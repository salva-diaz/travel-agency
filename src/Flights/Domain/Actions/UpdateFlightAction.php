<?php

declare(strict_types=1);

namespace Lightit\Flights\Domain\Actions;

use Lightit\Flights\Domain\DataTransferObjects\FlightDto;
use Lightit\Flights\Domain\Models\Flight;

class UpdateFlightAction
{
    public function execute(Flight $flight, FlightDto $flightDto): Flight
    {
        $flight->updateOrFail([
            'departure_time' => $flightDto->departure_time,
            'arrival_time' => $flightDto->arrival_time,
            'departure_city_id' => $flightDto->departure_city_id,
            'arrival_city_id' => $flightDto->arrival_city_id,
            'airline_id' => $flightDto->airline_id,
        ]);

        return $flight;
    }
}
