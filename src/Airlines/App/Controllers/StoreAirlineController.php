<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Airlines\App\Request\StoreAirlineFormRequest;
use Lightit\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Airlines\Domain\Actions\StoreAirlineAction;

class StoreAirlineController
{
    public function __invoke(StoreAirlineFormRequest $request, StoreAirlineAction $storeAirlineAction): JsonResponse
    {
        $airline = $storeAirlineAction->execute($request->toDto());

        return responder()
            ->success($airline, AirlineTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
