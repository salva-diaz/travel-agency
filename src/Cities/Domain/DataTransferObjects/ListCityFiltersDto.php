<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\DataTransferObjects;

readonly class ListCityFiltersDto
{
    public function __construct(
        public int $pageSize,
    ) {
    }
}
