<?php

declare(strict_types=1);

namespace Lightit\Cities\Domain\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Lightit\Airlines\Domain\Models\Airline;
use Lightit\Flights\Domain\Models\Flight;

/**
 * @property int                             $id
 * @property string                          $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|City whereUpdatedAt($value)
 *
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Airline> $airlines
 * @property-read int|null $airlines_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Flight> $arrivalFlights
 * @property-read int|null $arrival_flights_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Flight> $departureFlights
 * @property-read int|null $departure_flights_count
 *
 * @mixin \Eloquent
 */
class City extends Model
{
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    /**
     * @return BelongsToMany<Airline, $this>
     */
    public function airlines(): BelongsToMany
    {
        return $this->belongsToMany(Airline::class);
    }

    /**
     * @return HasMany<Flight, $this>
     */
    public function departureFlights(): HasMany
    {
        return $this->hasMany(Flight::class, 'departure_city_id');
    }

    /**
     * @return HasMany<Flight, $this>
     */
    public function arrivalFlights()
    {
        return $this->hasMany(Flight::class, 'arrival_city_id');
    }
}
