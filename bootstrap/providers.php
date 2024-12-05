<?php

use Lightit\Shared\App\Providers\AppServiceProvider;
use Lightit\Shared\App\Providers\EventServiceProvider;
use Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider;

return [
    AppServiceProvider::class,
    EventServiceProvider::class,
    IdeHelperServiceProvider::class,
];
