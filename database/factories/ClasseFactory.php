<?php

namespace Database\Factories;

use App\Models\AnneeScolaire;
use App\Models\Classe;
use App\Models\Niveau;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Classe>
 */
class ClasseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'niveau_id' => Niveau::factory(),
            'annee_scolaire_id' => AnneeScolaire::factory(),
            'nom' => fake()->randomLetter(),
            'capacite' => fake()->numberBetween(20, 40),
        ];
    }
}
