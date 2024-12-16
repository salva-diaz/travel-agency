<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\DataTransferObjects;

readonly class CityDto
{
    public function __construct(
        public string $name,
    ) {
    }
}
