<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Request;

use Illuminate\Foundation\Http\FormRequest;
use Lightit\Airlines\Domain\DataTransferObjects\ListAirlineFiltersDto;

class ListAirlineFormRequest extends FormRequest
{
    public const PAGE_SIZE = 'pageSize';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::PAGE_SIZE => ['sometimes', 'numeric'],
        ];
    }

    public function toDto(): ListAirlineFiltersDto
    {
        return new ListAirlineFiltersDto(
            pageSize: $this->integer(self::PAGE_SIZE, 15),
        );
    }
}