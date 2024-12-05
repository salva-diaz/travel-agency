<?php

declare(strict_types=1);

namespace Lightit\Cities\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Cities\App\Request\StoreCityFormRequest;
use Lightit\Cities\App\Transformers\CityTransformer;
use Lightit\Cities\Domain\Actions\StoreCityAction;

class StoreCityController
{
    public function __invoke(StoreCityFormRequest $request, StoreCityAction $storeCityAction): JsonResponse
    {
        $city = $storeCityAction->execute($request->toDto());

        return responder()
            ->success($city, CityTransformer::class)
            ->respond(JsonResponse::HTTP_CREATED);
    }
}
