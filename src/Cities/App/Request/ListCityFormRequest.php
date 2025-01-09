<?php

declare(strict_types=1);

namespace Lightit\Cities\App\Request;

use Illuminate\Foundation\Http\FormRequest;
use Lightit\Cities\Domain\DataTransferObjects\ListCityFiltersDto;

final class ListCityFormRequest extends FormRequest
{
    public const PAGE_SIZE = 'pageSize';

    public function rules(): array
    {
        return [
            self::PAGE_SIZE => ['sometimes', 'numeric'],
        ];
    }

    public function toDto(): ListCityFiltersDto
    {
        return new ListCityFiltersDto(
            $this->integer(self::PAGE_SIZE, 15),
        );
    }
}
