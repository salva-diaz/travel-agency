<?php

declare(strict_types=1);

namespace Lightit\Cities\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Cities\Domain\Models\City;

class CityTransformer extends Transformer
{
    /**
     * @return array{id: int, name: string, name: string, created_at: string, updated_at: string}
     */
    public function transform(City $city): array
    {
        return [
            'id' => (int) $city->id,
            'name' => (string) $city->name,
            'created_at' => (string) $city->created_at,
            'updated_at' => (string) $city->updated_at,
        ];
    }
}
