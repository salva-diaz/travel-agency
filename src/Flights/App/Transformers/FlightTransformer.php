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
            'departureCity' => [
                'id' => $flight->departureCity->id,
                'name' => $flight->departureCity->name,
            ],
            'arrivalCity' => [
                'id' => $flight->arrivalCity->id,
                'name' => $flight->arrivalCity->name,
            ],
            'airline' => [
                'id' => $flight->airline->id,
                'name' => $flight->airline->name,
            ],
            'departureTime' => $flight->departure_time->format('Y-m-d\TH:i'),
            'arrivalTime' => $flight->arrival_time->format('Y-m-d\TH:i'),
            'createdAt' => (string) $flight->created_at,
            'updatedAt' => (string) $flight->updated_at,
        ];
    }
}
