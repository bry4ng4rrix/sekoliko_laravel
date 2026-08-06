<?php

namespace Database\Factories;

use App\Models\AnneeScolaire;
use App\Models\Classe;
use App\Models\Eleve;
use App\Models\Inscription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Inscription>
 */
class InscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'eleve_id' => Eleve::factory(),
            'classe_id' => Classe::factory(),
            'annee_scolaire_id' => AnneeScolaire::factory(),
            'date_inscription' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'statut' => 'active',
            'type' => fake()->randomElement(['nouvelle', 'reinscription']),
        ];
    }
}
