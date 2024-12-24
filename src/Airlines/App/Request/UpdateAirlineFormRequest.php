<?php

declare(strict_types=1);

namespace Lightit\Airlines\App\Request;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Lightit\Airlines\Domain\DataTransferObjects\AirlineDto;
use Lightit\Airlines\Domain\Models\Airline;

class UpdateAirlineFormRequest extends FormRequest
{
    public const NAME = 'name';

    public const DESCRIPTION = 'description';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /**
         * @var Airline $airline
         */
        $airline = $this->route('airline');

        return [
            self::NAME => [
                Rule::unique('airlines', 'name')->ignore($airline),
            ],
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
