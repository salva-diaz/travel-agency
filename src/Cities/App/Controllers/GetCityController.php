<?php

declare(strict_types=1);

namespace Lightit\Cities\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Cities\App\Transformers\CityTransformer;
use Lightit\Cities\Domain\Models\City;

class GetCityController
{
    public function __invoke(City $city): JsonResponse
    {
        return responder()
            ->success($city, CityTransformer::class)
            ->respond();
    }
}
