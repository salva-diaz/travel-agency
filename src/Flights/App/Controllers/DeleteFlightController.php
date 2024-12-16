<?php

declare(strict_types=1);

namespace Lightit\Flights\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Flights\Domain\Models\Flight;

class DeleteFlightController
{
    public function __invoke(Flight $flight): JsonResponse
    {
        $flight->delete();

        return responder()
            ->success()
            ->respond(JsonResponse::HTTP_NO_CONTENT);
    }
}
