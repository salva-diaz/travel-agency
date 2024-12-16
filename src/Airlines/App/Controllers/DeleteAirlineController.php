<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Airlines\Domain\Models\Airline;

class DeleteAirlineController
{
    public function __invoke(Airline $airline): JsonResponse
    {
        $airline->delete();

        return responder()
            ->success()
            ->respond(JsonResponse::HTTP_NO_CONTENT);
    }
}
