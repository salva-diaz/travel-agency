<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Airlines\Domain\Models\Airline;

class AirlineTransformer extends Transformer
{
    /**
     * @return array{id: int, name: string, description: string, created_at: string|null, updated_at: string|null}
     */
    public function transform(Airline $airline): array
    {
        return [
            'id' => $airline->id,
            'name' => $airline->name,
            'description' => $airline->description,
            'created_at' => $airline->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $airline->updated_at?->format('Y-m-d H:i:s'),
            'active_flights_count' => (int) $airline->active_flights_count,
        ];
    }
}
