<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Lightit\Cities\Domain\Models\City;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ListCityAction
{
    /**
     * @return LengthAwarePaginator<Model>
     */
    public function execute(): LengthAwarePaginator
    {
        return QueryBuilder::for(City::class)
            ->allowedFilters([
                'name',
                // Filter cities by airline id. Cities must have at least one flight that belongs to the airline departing or arriving to the city
                AllowedFilter::callback('airline_id', function ($query, $airline_id) {
                    $query->whereHas('departureFlights', function ($query) use ($airline_id) {
                        $query->where('airline_id', $airline_id);
                    })->orWhereHas('arrivalFlights', function ($query) use ($airline_id) {
                        $query->where('airline_id', $airline_id);
                    });
                }),
            ])
            ->allowedSorts('id', 'name')
            ->withCount('departureFlights')
            ->withCount('arrivalFlights')
            ->paginate();
    }
}
