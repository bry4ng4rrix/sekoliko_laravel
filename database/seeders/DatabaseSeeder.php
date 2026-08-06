<?php

namespace Database\Seeders;

use App\Models\AnneeScolaire;
use App\Models\Classe;
use App\Models\Cycle;
use App\Models\Eleve;
use App\Models\Niveau;
use App\Models\Responsable;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        [$eleves, $anneeActive] = $this->seedAcademics();
        $this->seedRolesAndUsers($eleves->first());
    }

    /**
     * @return array{0: Collection<int, Eleve>, 1: AnneeScolaire}
     */
    private function seedAcademics(): array
    {
        $anneeActive = AnneeScolaire::create([
            'libelle' => '2025/2026',
            'date_debut' => '2025-09-01',
            'date_fin' => '2026-06-30',
            'active' => true,
        ]);

        $niveauxParCycle = [
            'Primaire' => ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
            'Collège' => ['6ème', '5ème', '4ème', '3ème'],
            'Lycée' => ['Seconde', 'Première', 'Terminale'],
        ];

        $classes = collect();

        foreach ($niveauxParCycle as $nomCycle => $noms) {
            $cycle = Cycle::create(['nom' => $nomCycle]);

            foreach ($noms as $index => $nomNiveau) {
                $niveau = Niveau::create([
                    'cycle_id' => $cycle->id,
                    'nom' => $nomNiveau,
                    'ordre' => $index + 1,
                ]);

                $classes->push(Classe::create([
                    'niveau_id' => $niveau->id,
                    'annee_scolaire_id' => $anneeActive->id,
                    'nom' => "{$nomNiveau} A",
                    'capacite' => 30,
                ]));
            }
        }

        $liens = ['Père', 'Mère', 'Tuteur'];

        $eleves = Eleve::factory(8)->create()->each(function (Eleve $eleve) use ($classes, $anneeActive, $liens) {
            $responsables = Responsable::factory(fake()->numberBetween(1, 2))->create();

            foreach ($responsables as $responsable) {
                $eleve->responsables()->attach($responsable, ['lien' => fake()->randomElement($liens)]);
            }

            $eleve->inscriptions()->create([
                'classe_id' => $classes->random()->id,
                'annee_scolaire_id' => $anneeActive->id,
                'date_inscription' => $anneeActive->date_debut,
                'statut' => 'active',
                'type' => 'nouvelle',
            ]);
        });

        return [$eleves, $anneeActive];
    }

    private function seedRolesAndUsers(Eleve $eleveDemo): void
    {
        Permission::firstOrCreate(['name' => 'eleves.view']);
        Permission::firstOrCreate(['name' => 'eleves.manage']);
        Permission::firstOrCreate(['name' => 'inscriptions.manage']);

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(['eleves.view', 'eleves.manage', 'inscriptions.manage']);

        $responsablePedagogique = Role::firstOrCreate(['name' => 'responsable_pedagogique']);
        $responsablePedagogique->syncPermissions(['eleves.view']);

        $enseignant = Role::firstOrCreate(['name' => 'enseignant']);
        $enseignant->syncPermissions(['eleves.view']);

        Role::firstOrCreate(['name' => 'etudiant']);

        User::factory()->create([
            'name' => 'Admin Sekoliko',
            'email' => 'admin@sekoliko.test',
        ])->assignRole($admin);

        User::factory()->create([
            'name' => 'Responsable Pédagogique',
            'email' => 'responsable@sekoliko.test',
        ])->assignRole($responsablePedagogique);

        User::factory()->create([
            'name' => 'Enseignant Démo',
            'email' => 'enseignant@sekoliko.test',
        ])->assignRole($enseignant);

        $etudiant = User::factory()->create([
            'name' => "{$eleveDemo->prenom} {$eleveDemo->nom}",
            'email' => 'etudiant@sekoliko.test',
        ]);
        $etudiant->eleve_id = $eleveDemo->id;
        $etudiant->save();
        $etudiant->assignRole('etudiant');
    }
}
