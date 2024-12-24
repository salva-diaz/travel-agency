<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Request;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lightit\Airlines\Domain\DataTransferObjects\AirlineDto;

class StoreAirlineFormRequest extends FormRequest
{
    public const NAME = 'name';

    public const DESCRIPTION = 'description';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::NAME => ['required', Rule::unique('airlines', 'name')],
            self::DESCRIPTION => [],
        ];
    }

    public function toDto(): AirlineDto
    {
        return new AirlineDto(
            name: $this->string(self::NAME)->toString(),
            description: $this->string(self::DESCRIPTION)->toString(),
        );
    }
}
