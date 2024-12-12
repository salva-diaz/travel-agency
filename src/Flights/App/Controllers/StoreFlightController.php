<?php

declare(strict_types=1);

namespace Lightit\Flights\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Flights\App\Request\StoreFlightFormRequest;
use Lightit\Flights\App\Transformers\FlightTransformer;
use Lightit\Flights\Domain\Actions\StoreFlightAction;

class StoreFlightController
{
    public function __invoke(StoreFlightFormRequest $request, StoreFlightAction $storeFlightAction): JsonResponse
    {
        $flight = $storeFlightAction->execute($request->toDto());

        return responder()
            ->success($flight, FlightTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
