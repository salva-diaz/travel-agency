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
            'departure_city_id' => (int) $flight->departure_city_id,
            'arrival_city_id' => (int) $flight->arrival_city_id,
            'airline_id' => (int) $flight->airline_id,
            'departure_time' => (string) $flight->departure_time,
            'arrival_time' => (string) $flight->arrival_time,
            'created_at' => (string) $flight->created_at,
            'updated_at' => (string) $flight->updated_at,
        ];
    }
}
