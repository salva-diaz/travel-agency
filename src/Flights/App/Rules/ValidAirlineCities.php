<?php

declare(strict_types=1);

namespace Lightit\Flights\App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Lightit\Airlines\Domain\Models\Airline;

class ValidAirlineCities implements Rule
{
    public function __construct(
        protected int $airlineId,
    ) {
    }

    public function passes($attribute, $value)
    {
        $airline = Airline::with('cities')->find($this->airlineId);

        return $airline && $airline->cities->pluck('id')->contains($value);
    }

    public function message()
    {
        return 'The selected city is not enabled for the airline.';
    }
}
