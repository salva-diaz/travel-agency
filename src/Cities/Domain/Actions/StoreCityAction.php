<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\Actions;

use Lightit\Cities\Domain\DataTransferObjects\CityDto;
use Lightit\Cities\Domain\Models\City;

class StoreCityAction
{
    public function execute(CityDto $cityDto): City
    {
        /** @var City $city */
        $city = City::create([
            'name' => $cityDto->name,
        ]);

        return $city;
    }
}
