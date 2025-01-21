<?php

declare(strict_types=1);

namespace Lightit\Airlines\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Lightit\Cities\Domain\Models\City;
use Lightit\Flights\Domain\Models\Flight;

/**
 * @property int                             $id
 * @property string                          $name
 * @property string                          $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Flight> $activeFlights
 * @property-read int|null $active_flights_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, City> $cities
 * @property-read int|null $cities_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Flight> $flights
 * @property-read int|null $flights_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Airline whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
class Airline extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    /**
     * @return BelongsToMany<City, $this>
     */
    public function cities(): BelongsToMany
    {
        return $this->belongsToMany(City::class);
    }

    /**
     * @return HasMany<Flight, $this>
     */
    public function flights(): HasMany
    {
        return $this->hasMany(Flight::class);
    }

    /**
     * @return HasMany<Flight, $this>
     */
    public function activeFlights(): HasMany
    {
        return $this->hasMany(Flight::class)
                    ->where('arrival_time', '>', now());
    }
}
