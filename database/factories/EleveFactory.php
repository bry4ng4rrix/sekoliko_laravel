<?php

namespace Database\Factories;

use App\Models\Eleve;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Eleve>
 */
class EleveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'matricule' => 'MAT-'.fake()->unique()->numerify('######'),
            'nom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'date_naissance' => fake()->dateTimeBetween('-18 years', '-4 years')->format('Y-m-d'),
            'sexe' => fake()->randomElement(['M', 'F']),
            'lieu_naissance' => fake()->city(),
            'photo' => null,
        ];
    }
}
