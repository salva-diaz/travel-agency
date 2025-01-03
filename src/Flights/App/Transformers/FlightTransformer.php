<?php

declare(strict_types=1);

namespace Lightit\Flights\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Flights\Domain\Models\Flight;

class FlightTransformer extends Transformer
{
    public function transform(Flight $flight): array
    {
        return [
            'id' => (int) $flight->id,
            'departureCity' => (object) [
                'id' => $flight->departureCity->id,
                'name' => $flight->departureCity->name,
            ],
            'arrivalCity' => (object) [
                'id' => $flight->arrivalCity->id,
                'name' => $flight->arrivalCity->name,
            ],
            'airline' => (object) [
                'id' => $flight->airline->id,
                'name' => $flight->airline->name,
            ],
            'departureTime' => (string) $flight->departure_time,
            'arrivalTime' => (string) $flight->arrival_time,
            'createdAt' => (string) $flight->created_at,
            'updatedAt' => (string) $flight->updated_at,
        ];
    }
}
