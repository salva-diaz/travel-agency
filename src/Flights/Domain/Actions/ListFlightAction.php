<?php

declare(strict_types=1);

namespace Lightit\Flights\Domain\Actions;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Lightit\Flights\Domain\Models\Flight;
use Spatie\QueryBuilder\QueryBuilder;

class ListFlightAction
{
    /**
     * @return LengthAwarePaginator<Model>
     */
    public function execute(): LengthAwarePaginator
    {
        return QueryBuilder::for(Flight::class)
            ->allowedFilters([])
            ->allowedSorts('id', 'departure_time', 'arrival_time')
            ->paginate();
    }
}
