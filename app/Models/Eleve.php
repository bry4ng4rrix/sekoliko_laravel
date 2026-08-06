<?php

namespace App\Models;

use Database\Factories\EleveFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['matricule', 'nom', 'prenom', 'date_naissance', 'sexe', 'lieu_naissance', 'photo'])]
class Eleve extends Model
{
    /** @use HasFactory<EleveFactory> */
    use HasFactory;

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date_naissance' => 'date:Y-m-d',
        ];
    }

    /**
     * @return BelongsToMany<Responsable, $this>
     */
    public function responsables(): BelongsToMany
    {
        return $this->belongsToMany(Responsable::class, 'eleve_responsable')
            ->withPivot('lien')
            ->withTimestamps();
    }

    /**
     * @return HasMany<Inscription, $this>
     */
    public function inscriptions(): HasMany
    {
        return $this->hasMany(Inscription::class);
    }

    /**
     * @return HasMany<Document, $this>
     */
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
