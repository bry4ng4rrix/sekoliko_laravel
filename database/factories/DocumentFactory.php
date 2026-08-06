<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\Eleve;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Document>
 */
class DocumentFactory extends Factory
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
            'type' => fake()->randomElement(['acte_de_naissance', 'bulletin', 'certificat_medical']),
            'fichier' => 'documents/'.fake()->uuid().'.pdf',
            'date_ajout' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
        ];
    }
}
