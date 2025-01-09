<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Lightit\Airlines\Domain\DataTransferObjects\ListAirlineFiltersDto;
use Lightit\Airlines\Domain\Filters\AirlineEnabledInTwoCitiesFilter;
use Lightit\Airlines\Domain\Models\Airline;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ListAirlineAction
{
    /**
     * @return LengthAwarePaginator<Airline>
     */
    public function execute(ListAirlineFiltersDto $dto): LengthAwarePaginator
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
                // Filter airlines by two cities. Airline must be active on both cities
                AllowedFilter::custom('inCities', new AirlineEnabledInTwoCitiesFilter()),
            ])
            ->allowedSorts('id', 'name', 'description', 'active_flights_count')
            ->withCount('activeFlights')
            ->paginate($dto->pageSize);

        return $paginate;
    }
}
