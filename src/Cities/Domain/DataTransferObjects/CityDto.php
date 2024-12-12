<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\DataTransferObjects;

class CityDto
{
    public function __construct(
        public readonly string $name,
    ) {
    }
}
