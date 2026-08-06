<?php

namespace App\Policies;

use App\Models\Eleve;
use App\Models\User;

class ElevePolicy
{
    /**
     * Determine whether the user can view the list of eleves.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('eleves.view');
    }

    /**
     * Determine whether the user can view the eleve.
     */
    public function view(User $user, Eleve $eleve): bool
    {
        if ($user->hasRole('etudiant')) {
            return $user->eleve_id === $eleve->id;
        }

        return $user->can('eleves.view');
    }

    /**
     * Determine whether the user can create eleves.
     */
    public function create(User $user): bool
    {
        return $user->can('eleves.manage');
    }

    /**
     * Determine whether the user can update the eleve.
     */
    public function update(User $user, Eleve $eleve): bool
    {
        return $user->can('eleves.manage');
    }

    /**
     * Determine whether the user can delete the eleve.
     */
    public function delete(User $user, Eleve $eleve): bool
    {
        return $user->can('eleves.manage');
    }
}
