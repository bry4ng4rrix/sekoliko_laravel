<?php

namespace Database\Factories;

use App\Models\Cycle;
use App\Models\Niveau;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Niveau>
 */
class NiveauFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cycle_id' => Cycle::factory(),
            'nom' => fake()->word(),
            'ordre' => fake()->numberBetween(1, 10),
        ];
    }
}
