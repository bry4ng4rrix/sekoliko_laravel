<?php

use App\Models\AnneeScolaire;
use App\Models\Classe;
use App\Models\Eleve;
use App\Models\Niveau;

function creerClasseAnneeActive(): array
{
    $annee = AnneeScolaire::factory()->create(['active' => true]);
    $niveau = Niveau::factory()->create();
    $classe = Classe::factory()->create([
        'niveau_id' => $niveau->id,
        'annee_scolaire_id' => $annee->id,
    ]);

    return [$annee, $classe];
}

test('an eleve can be enrolled in a classe for the active year', function () {
    [$annee, $classe] = creerClasseAnneeActive();
    $eleve = Eleve::factory()->create();
    $user = userWithRole('admin');

    $response = $this->actingAs($user)->post(route('eleves.inscriptions.store', $eleve), [
        'classe_id' => $classe->id,
        'type' => 'nouvelle',
    ]);

    $response->assertRedirect(route('eleves.show', $eleve));
    $this->assertDatabaseHas('inscriptions', [
        'eleve_id' => $eleve->id,
        'classe_id' => $classe->id,
        'annee_scolaire_id' => $annee->id,
    ]);
});

test('an eleve cannot be enrolled twice in the same active year', function () {
    [$annee, $classe] = creerClasseAnneeActive();
    $eleve = Eleve::factory()->create();
    $user = userWithRole('admin');

    $eleve->inscriptions()->create([
        'classe_id' => $classe->id,
        'annee_scolaire_id' => $annee->id,
        'date_inscription' => now(),
        'statut' => 'active',
        'type' => 'nouvelle',
    ]);

    $response = $this->actingAs($user)->post(route('eleves.inscriptions.store', $eleve), [
        'classe_id' => $classe->id,
        'type' => 'reinscription',
    ]);

    $response->assertSessionHasErrors('classe_id');
    $this->assertDatabaseCount('inscriptions', 1);
});

test('responsable_pedagogique cannot enroll an eleve', function () {
    [, $classe] = creerClasseAnneeActive();
    $eleve = Eleve::factory()->create();
    $user = userWithRole('responsable_pedagogique');

    $response = $this->actingAs($user)->post(route('eleves.inscriptions.store', $eleve), [
        'classe_id' => $classe->id,
        'type' => 'nouvelle',
    ]);

    $response->assertForbidden();
    $this->assertDatabaseCount('inscriptions', 0);
});
