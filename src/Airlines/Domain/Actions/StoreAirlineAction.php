<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Actions;

use Lightit\Airlines\Domain\DataTransferObjects\AirlineDto;
use Lightit\Airlines\Domain\Models\Airline;

class StoreAirlineAction
{
    public function execute(AirlineDto $airlineDto): Airline
    {
        $airline = new Airline([
            'name' => $airlineDto->name,
            'description' => $airlineDto->description,
        ]);

        $airline->save();

        return $airline;
    }
}
