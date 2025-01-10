<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Filters;

use Illuminate\Database\Eloquent\Builder;
use Lightit\Airlines\Domain\Models\Airline;
use Spatie\QueryBuilder\Filters\Filter;

/**
 * @implements Filter<Airline>
 */
class AirlineEnabledInTwoCitiesFilter implements Filter
{
    /**
     * @param Builder<Airline> $query
     */
    public function __invoke(Builder $query, mixed $value, string $property)
    {
        if (! is_array($value)) {
            throw new \Exception();
        }

        $cities = $value;
        $query->whereHas('cities', function ($q) use ($cities) {
            $q->where('city_id', $cities[0]);
        })->whereHas('cities', function ($q) use ($cities) {
            $q->where('city_id', $cities[1]);
        });
    }
}
