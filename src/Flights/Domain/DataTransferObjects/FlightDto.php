<?php

declare(strict_types=1);

namespace Lightit\Flights\Domain\DataTransferObjects;

class FlightDto
{
    public function __construct(
        public readonly string $departure_time,
        public readonly string $arrival_time,
        public readonly int $departure_city_id,
        public readonly int $arrival_city_id,
        public readonly int $airline_id,
    ) {
    }
}
