<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Actions;

use Lightit\Airlines\Domain\DataTransferObjects\AirlineDto;
use Lightit\Airlines\Domain\Models\Airline;

class UpdateAirlineAction
{
    public function execute(Airline $airline, AirlineDto $airlineDto): Airline
    {
        $airline->update([
            'name' => $airlineDto->name,
            'description' => $airlineDto->description,
        ]);

        return $airline->refresh();
    }
}
