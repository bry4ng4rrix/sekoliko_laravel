<?php

use App\Models\Eleve;
use App\Models\User;

test('guests cannot view the eleves list', function () {
    $this->get(route('eleves.index'))->assertRedirect(route('login'));
});

test('a user with no role cannot view the eleves list', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('eleves.index'))
        ->assertForbidden();
});

test('admin, responsable_pedagogique and enseignant can view the eleves list', function (string $role) {
    $user = userWithRole($role);

    $this->actingAs($user)
        ->get(route('eleves.index'))
        ->assertOk();
})->with(['admin', 'responsable_pedagogique', 'enseignant']);

test('admin can create an eleve', function () {
    $user = userWithRole('admin');

    $response = $this->actingAs($user)->post(route('eleves.store'), [
        'matricule' => 'MAT-000123',
        'nom' => 'Rakoto',
        'prenom' => 'Jean',
        'date_naissance' => '2012-05-10',
        'sexe' => 'M',
        'lieu_naissance' => 'Antananarivo',
    ]);

    $eleve = Eleve::where('matricule', 'MAT-000123')->firstOrFail();

    $response->assertRedirect(route('eleves.show', $eleve));
    $this->assertDatabaseHas('eleves', ['matricule' => 'MAT-000123']);
});

test('responsable_pedagogique and enseignant cannot create an eleve', function (string $role) {
    $user = userWithRole($role);

    $response = $this->actingAs($user)->post(route('eleves.store'), [
        'matricule' => 'MAT-000123',
        'nom' => 'Rakoto',
        'prenom' => 'Jean',
        'date_naissance' => '2012-05-10',
        'sexe' => 'M',
        'lieu_naissance' => 'Antananarivo',
    ]);

    $response->assertForbidden();
    $this->assertDatabaseMissing('eleves', ['matricule' => 'MAT-000123']);
})->with(['responsable_pedagogique', 'enseignant']);

test('matricule must be unique', function () {
    $user = userWithRole('admin');
    Eleve::factory()->create(['matricule' => 'MAT-000123']);

    $response = $this->actingAs($user)->post(route('eleves.store'), [
        'matricule' => 'MAT-000123',
        'nom' => 'Rakoto',
        'prenom' => 'Jean',
        'date_naissance' => '2012-05-10',
        'sexe' => 'M',
        'lieu_naissance' => 'Antananarivo',
    ]);

    $response->assertSessionHasErrors('matricule');
});

test('etudiant can view their own eleve record but not another one', function () {
    $eleve = Eleve::factory()->create();
    $autreEleve = Eleve::factory()->create();

    $user = userWithRole('etudiant');
    $user->eleve_id = $eleve->id;
    $user->save();

    $this->actingAs($user)
        ->get(route('eleves.show', $eleve))
        ->assertOk();

    $this->actingAs($user)
        ->get(route('eleves.show', $autreEleve))
        ->assertForbidden();
});

test('etudiant cannot view the eleves list', function () {
    $user = userWithRole('etudiant');

    $this->actingAs($user)
        ->get(route('eleves.index'))
        ->assertForbidden();
});
