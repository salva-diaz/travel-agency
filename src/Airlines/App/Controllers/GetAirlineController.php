<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Airlines\Domain\Models\Airline;

class GetAirlineController
{
    public function __invoke(Airline $airline): JsonResponse
    {
        return responder()
            ->success($airline, AirlineTransformer::class)
            ->respond();
    }
}
