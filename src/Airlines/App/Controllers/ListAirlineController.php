<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Lightit\Airlines\App\Transformers\AirlineTransformer;
use Lightit\Airlines\Domain\Actions\ListAirlineAction;

class ListAirlineController
{
    public function __invoke(
        Request $request,
        ListAirlineAction $action,
    ): JsonResponse {
        $airlines = $action->execute();

        return responder()
            ->success($airlines, AirlineTransformer::class)
            ->respond();
    }
}
