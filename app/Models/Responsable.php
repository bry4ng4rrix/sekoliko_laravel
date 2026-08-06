<?php

namespace App\Models;

use Database\Factories\ResponsableFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['nom', 'prenom', 'telephone', 'email', 'profession'])]
class Responsable extends Model
{
    /** @use HasFactory<ResponsableFactory> */
    use HasFactory;

    /**
     * @return BelongsToMany<Eleve, $this>
     */
    public function eleves(): BelongsToMany
    {
        return $this->belongsToMany(Eleve::class, 'eleve_responsable')
            ->withPivot('lien')
            ->withTimestamps();
    }
}
