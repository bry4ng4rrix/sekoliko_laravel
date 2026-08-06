<?php

namespace Database\Factories;

use App\Models\AnneeScolaire;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AnneeScolaire>
 */
class AnneeScolaireFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $debut = fake()->dateTimeBetween('-3 years', 'now');
        $fin = (clone $debut)->modify('+10 months');

        return [
            'libelle' => $debut->format('Y').'/'.$fin->format('Y'),
            'date_debut' => $debut->format('Y-m-d'),
            'date_fin' => $fin->format('Y-m-d'),
            'active' => false,
        ];
    }
}
