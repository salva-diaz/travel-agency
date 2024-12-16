<?php

declare(strict_types=1);

namespace Lightit\Flights\Domain\DataTransferObjects;

readonly class FlightDto
{
    public function __construct(
        public string $departure_time,
        public string $arrival_time,
        public int $departure_city_id,
        public int $arrival_city_id,
        public int $airline_id,
    ) {
    }
}
