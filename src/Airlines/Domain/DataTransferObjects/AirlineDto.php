<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\DataTransferObjects;

class AirlineDto
{
    public function __construct(
        public readonly string $name,
        public readonly string $description,
    ) {
    }
}
