<?php

declare(strict_types=1);

namespace Lightit\Cities\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Cities\Domain\Models\City;

class DeleteCityController
{
    public function __invoke(City $city): JsonResponse
    {
        $city->delete();

        return responder()
            ->success()
            ->respond();
    }
}
