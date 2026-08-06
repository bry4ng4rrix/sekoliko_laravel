<?php

namespace App\Http\Controllers;

use App\Models\AnneeScolaire;
use App\Models\Classe;
use App\Models\Eleve;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $anneeActive = AnneeScolaire::where('active', true)->first();

        $repartitionParClasse = [];

        if ($user->can('eleves.view') && $anneeActive) {
            $repartitionParClasse = Classe::where('annee_scolaire_id', $anneeActive->id)
                ->withCount('inscriptions')
                ->orderBy('nom')
                ->get(['id', 'nom'])
                ->map(fn (Classe $classe) => [
                    'nom' => $classe->nom,
                    'effectif' => $classe->inscriptions_count,
                ]);
        }

        $monDossier = null;

        if ($user->hasRole('etudiant') && $user->eleve_id) {
            $eleve = Eleve::with(['inscriptions' => function ($query) use ($anneeActive) {
                $query->where('annee_scolaire_id', $anneeActive?->id)->with('classe.niveau');
            }])->find($user->eleve_id);

            $monDossier = $eleve ? [
                'id' => $eleve->id,
                'matricule' => $eleve->matricule,
                'nom' => $eleve->nom,
                'prenom' => $eleve->prenom,
                'classe' => $eleve->inscriptions->first()?->classe?->nom,
            ] : null;
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'eleves' => Eleve::count(),
                'classes' => $anneeActive
                    ? Classe::where('annee_scolaire_id', $anneeActive->id)->count()
                    : 0,
                'anneeActive' => $anneeActive?->libelle,
            ],
            'repartitionParClasse' => $repartitionParClasse,
            'monDossier' => $monDossier,
        ]);
    }
}
