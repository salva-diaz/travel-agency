<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Airlines\Domain\Models\Airline;

class AirlineTransformer extends Transformer
{
    /**
     * @return array{id: int, name: string, description: string, createdAt: string|null, updatedAt: string|null}
     */
    public function transform(Airline $airline): array
    {
        return [
            'id' => $airline->id,
            'name' => $airline->name,
            'description' => $airline->description,
            'createdAt' => $airline->created_at?->toDateTimeString(),
            'updatedAt' => $airline->updated_at?->toDateTimeString(),
            'activeFlightsCount' => $airline->active_flights_count,
        ];
    }
}
