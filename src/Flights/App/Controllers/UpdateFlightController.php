<?php

declare(strict_types=1);

namespace Lightit\Flights\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Flights\App\Request\UpdateFlightFormRequest;
use Lightit\Flights\App\Transformers\FlightTransformer;
use Lightit\Flights\Domain\Actions\UpdateFlightAction;
use Lightit\Flights\Domain\Models\Flight;

class UpdateFlightController
{
    public function __invoke(
        Flight $flight,
        UpdateFlightFormRequest $request,
        UpdateFlightAction $updateFlightAction,
    ): JsonResponse {
        $flight = $updateFlightAction->execute($flight, $request->toDto());

        return responder()
            ->success($flight, FlightTransformer::class)
            ->respond();
    }
}
