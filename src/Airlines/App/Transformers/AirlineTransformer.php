<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Airlines\Domain\Models\Airline;

class AirlineTransformer extends Transformer
{
    /**
     * @return array{id: int, name: string, description: string, created_at: string, updated_at: string}
     */
    public function transform(Airline $airline): array
    {
        return [
            'id' => (int) $airline->id,
            'name' => (string) $airline->name,
            'description' => (string) $airline->description,
            'created_at' => (string) $airline->created_at,
            'updated_at' => (string) $airline->updated_at,
            'active_flights_count' => (int) $airline->active_flights_count,
        ];
    }
}
