<?php

declare(strict_types=1);

namespace Lightit\Flights\App\Request;

use Illuminate\Foundation\Http\FormRequest;
use Lightit\Flights\Domain\DataTransferObjects\FlightDto;

class UpdateFlightFormRequest extends FormRequest
{
    public const DEPARTURE_TIME = 'departure_time';

    public const ARRIVAL_TIME = 'arrival_time';

    public const DEPARTURE_CITY_ID = 'departure_city_id';

    public const ARRIVAL_CITY_ID = 'arrival_city_id';

    public const AIRLINE_ID = 'airline_id';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::DEPARTURE_TIME => ['date', 'date_format:Y-m-d H:i:s'],
            self::ARRIVAL_TIME => ['date', 'after:departure_time', 'date_format:Y-m-d H:i:s'],
            self::DEPARTURE_CITY_ID => ['integer', 'exists:cities,id'],
            self::ARRIVAL_CITY_ID => ['integer', 'exists:cities,id'],
            self::AIRLINE_ID => ['integer', 'exists:airlines,id'],
        ];
    }

    public function toDto(): FlightDto
    {
        return new FlightDto(
            departure_time: $this->string(self::DEPARTURE_TIME)->toString(),
            arrival_time: $this->string(self::ARRIVAL_TIME)->toString(),
            departure_city_id: $this->integer(self::DEPARTURE_CITY_ID),
            arrival_city_id: $this->integer(self::ARRIVAL_CITY_ID),
            airline_id: $this->integer(self::AIRLINE_ID),
        );
    }
}
