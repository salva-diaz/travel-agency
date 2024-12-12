<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Airlines\App\Request\UpdateAirlineFormRequest;
use Lightit\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Airlines\Domain\Actions\UpdateAirlineAction;
use Lightit\Airlines\Domain\Models\Airline;

class UpdateAirlineController
{
    public function __invoke(
        Airline $airline,
        UpdateAirlineFormRequest $request,
        UpdateAirlineAction $updateAirlineAction,
    ): JsonResponse {
        $airline = $updateAirlineAction->execute($airline, $request->toDto());

        return responder()
            ->success($airline, AirlineTransformer::class)
            ->respond();
    }
}
