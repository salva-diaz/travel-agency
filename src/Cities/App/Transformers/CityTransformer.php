<?php

declare(strict_types=1);

namespace Lightit\Cities\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Cities\Domain\Models\City;

class CityTransformer extends Transformer
{
    /**
     * @return array{id: int, name: string, name: string, created_at: string|null, updated_at: string|null}
     */
    public function transform(City $city): array
    {
        return [
            'id' => (int) $city->id,
            'name' => (string) $city->name,
            'departure_flights_count' => (int) $city->departure_flights_count,
            'arrival_flights_count' => (int) $city->arrival_flights_count,
            'created_at' => $city->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $city->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
