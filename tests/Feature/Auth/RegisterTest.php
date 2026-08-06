<?php

use App\Models\User;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    Role::create(['name' => 'admin']);
});

test('a new user can register and is logged in', function () {
    $response = $this->post('/register', [
        'name' => 'Nouvel Utilisateur',
        'email' => 'nouveau@sekoliko.test',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $user = User::where('email', 'nouveau@sekoliko.test')->firstOrFail();

    $response->assertRedirect(route('dashboard'));
    $this->assertAuthenticatedAs($user);
    expect($user->hasRole('admin'))->toBeTrue();
});

test('registration requires matching password confirmation', function () {
    $response = $this->post('/register', [
        'name' => 'Nouvel Utilisateur',
        'email' => 'nouveau@sekoliko.test',
        'password' => 'password123',
        'password_confirmation' => 'wrong',
    ]);

    $response->assertSessionHasErrors('password');
    $this->assertGuest();
});

test('registration requires a unique email', function () {
    $existing = User::factory()->create();

    $response = $this->post('/register', [
        'name' => 'Nouvel Utilisateur',
        'email' => $existing->email,
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertSessionHasErrors('email');
});
