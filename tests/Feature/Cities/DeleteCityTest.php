<?php

declare(strict_types=1);

namespace Tests\Feature\Cities;

use Database\Factories\CityFactory;
use Tests\TestCase;

class DeleteCityTest extends TestCase
{
    public function test_can_delete_a_city(): void
    {
        $city = CityFactory::new()->createOne();

        $this->assertDatabaseHas('cities', [
            'name' => $city->name,
        ]);

        $city->delete();

        $this->assertDatabaseMissing('cities', [
            'name' => $city->name,
        ]);
    }
}
