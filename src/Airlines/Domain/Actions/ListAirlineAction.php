<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Lightit\Airlines\Domain\Models\Airline;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ListAirlineAction
{
    /**
     * @return LengthAwarePaginator<Model>
     */
    public function execute(): LengthAwarePaginator
    {
        return QueryBuilder::for(Airline::class)
            ->allowedFilters([
                'name',
                'description',
                // Filter airlines by city. City must have at least one active flight
                AllowedFilter::callback('city_id', function ($query, $city_id) {
                    $query->whereHas('activeFlights', function ($query) use ($city_id) {
                        $query->where('departure_city_id', $city_id)
                                ->orWhere('arrival_city_id', $city_id);
                    });
                }),
            ])
            ->allowedSorts('name', 'active_flights_count')
            ->withCount('activeFlights')
            ->paginate();
    }
}
