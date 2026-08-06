<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInscriptionRequest;
use App\Models\AnneeScolaire;
use App\Models\Eleve;
use Illuminate\Http\RedirectResponse;

class InscriptionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInscriptionRequest $request, Eleve $eleve): RedirectResponse
    {
        $anneeActive = AnneeScolaire::where('active', true)->firstOrFail();

        $eleve->inscriptions()->create([
            'classe_id' => $request->validated('classe_id'),
            'annee_scolaire_id' => $anneeActive->id,
            'date_inscription' => now()->toDateString(),
            'statut' => 'active',
            'type' => $request->validated('type'),
        ]);

        return redirect()->route('eleves.show', $eleve)->with('success', 'Élève inscrit avec succès.');
    }
}
