<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\DataTransferObjects;

readonly class AirlineDto
{
    public function __construct(
        public string $name,
        public string $description,
    ) {
    }
}
