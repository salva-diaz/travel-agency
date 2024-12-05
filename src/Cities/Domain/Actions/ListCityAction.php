<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\Actions;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Lightit\Cities\Domain\Models\City;
use Spatie\QueryBuilder\QueryBuilder;

class ListCityAction
{
    /**
     * @return Collection<int, Model>
     */
    public function execute(): Collection
    {
        return QueryBuilder::for(City::class)
            ->allowedFilters(['name'])
            ->allowedSorts('name')
            ->get();
    }
}
