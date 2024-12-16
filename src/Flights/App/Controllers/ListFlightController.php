<?php

declare(strict_types=1);

namespace Lightit\Flights\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Lightit\Flights\App\Transformers\FlightTransformer;
use Lightit\Flights\Domain\Actions\ListFlightAction;

class ListFlightController
{
    public function __invoke(
        Request $request,
        ListFlightAction $action,
    ): JsonResponse {
        $flights = $action->execute();

        return responder()
            ->success($flights, FlightTransformer::class)
            ->respond();
    }
}
