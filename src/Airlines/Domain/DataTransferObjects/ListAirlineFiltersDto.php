<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\DataTransferObjects;

readonly class ListAirlineFiltersDto
{
    public function __construct(
        public int $pageSize,
    ) {
    }
}
