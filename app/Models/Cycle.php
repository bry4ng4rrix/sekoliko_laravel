<?php

namespace App\Models;

use Database\Factories\CycleFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['nom'])]
class Cycle extends Model
{
    /** @use HasFactory<CycleFactory> */
    use HasFactory;

    /**
     * @return HasMany<Niveau, $this>
     */
    public function niveaux(): HasMany
    {
        return $this->hasMany(Niveau::class);
    }
}
