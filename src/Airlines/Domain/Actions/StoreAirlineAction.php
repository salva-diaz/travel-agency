<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Actions;

use Lightit\Airlines\Domain\DataTransferObjects\AirlineDto;
use Lightit\Airlines\Domain\Models\Airline;

class StoreAirlineAction
{
    public function execute(AirlineDto $airlineDto): Airline
    {
        /** @var Airline $airline */
        $airline = Airline::create([
            'name' => $airlineDto->name,
            'description' => $airlineDto->description,
        ]);

        return $airline;
    }
}
