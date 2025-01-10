<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Airlines\App\Request\ListAirlineFormRequest;
use Lightit\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Airlines\Domain\Actions\ListAirlineAction;

class ListAirlineController
{
    public function __invoke(
        ListAirlineFormRequest $request,
        ListAirlineAction $action,
    ): JsonResponse {
        $airlines = $action->execute($request->toDto());

        return responder()
            ->success($airlines, AirlineTransformer::class)
            ->respond();
    }
}
