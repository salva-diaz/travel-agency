<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\Actions;

use Lightit\Cities\Domain\DataTransferObjects\CityDto;
use Lightit\Cities\Domain\Models\City;

class UpdateCityAction
{
    public function execute(City $city, CityDto $cityDto): City
    {
        $city->update([
            'name' => $cityDto->getName(),
        ]);

        return $city->refresh();
    }
}
