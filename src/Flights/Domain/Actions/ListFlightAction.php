<?php

declare(strict_types=1);

namespace Lightit\Flights\Domain\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Lightit\Flights\Domain\Models\Flight;
use Spatie\QueryBuilder\QueryBuilder;

class ListFlightAction
{
    /**
     * @return LengthAwarePaginator<Flight>
     */
    public function execute(): LengthAwarePaginator
    {
        /**
         * @var LengthAwarePaginator<Flight>
         */
        $paginate = QueryBuilder::for(Flight::class)
            ->allowedFilters([])
            ->allowedSorts('id', 'departure_time', 'arrival_time')
            ->paginate();

        return $paginate;
    }
}
