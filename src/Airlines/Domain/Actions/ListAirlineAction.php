<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Lightit\Airlines\Domain\Models\Airline;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ListAirlineAction
{
    /**
     * @return LengthAwarePaginator<Airline>
     */
    public function execute(): LengthAwarePaginator
    {
        /**
         * @var LengthAwarePaginator<Airline>
         */
        $paginate = QueryBuilder::for(Airline::class)
            ->allowedFilters([
                'name',
                'description',
                // Filter airlines by city. City must have at least one active flight
                AllowedFilter::callback('cityId', function ($query, $city_id) {
                    $query->whereHas('activeFlights', function ($query) use ($city_id) {
                        $query->where('departure_city_id', $city_id)
                                ->orWhere('arrival_city_id', $city_id);
                    });
                }),
            ])
            ->allowedSorts('id', 'name', 'description', 'active_flights_count')
            ->withCount('activeFlights')
            ->paginate();

        return $paginate;
    }
}
