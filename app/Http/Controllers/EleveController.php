<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEleveRequest;
use App\Http\Requests\UpdateEleveRequest;
use App\Models\AnneeScolaire;
use App\Models\Classe;
use App\Models\Eleve;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class EleveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        Gate::authorize('viewAny', Eleve::class);

        $anneeActive = AnneeScolaire::where('active', true)->first();
        $recherche = trim((string) $request->string('recherche'));

        $eleves = Eleve::query()
            ->when($recherche !== '', function ($query) use ($recherche) {
                $query->where(function ($query) use ($recherche) {
                    $query->where('nom', 'like', "%{$recherche}%")
                        ->orWhere('prenom', 'like', "%{$recherche}%")
                        ->orWhere('matricule', 'like', "%{$recherche}%");
                });
            })
            ->when($request->filled('classe_id'), function ($query) use ($request) {
                $query->whereHas('inscriptions', function ($query) use ($request) {
                    $query->where('classe_id', $request->integer('classe_id'));
                });
            })
            ->with(['inscriptions' => function ($query) use ($anneeActive) {
                $query->where('annee_scolaire_id', $anneeActive?->id)->with('classe');
            }])
            ->orderBy('nom')
            ->paginate(15)
            ->withQueryString();

        $classes = Classe::query()
            ->when($anneeActive, fn ($query) => $query->where('annee_scolaire_id', $anneeActive->id))
            ->orderBy('nom')
            ->get(['id', 'nom']);

        return Inertia::render('eleves/index', [
            'eleves' => $eleves,
            'classes' => $classes,
            'filters' => $request->only('recherche', 'classe_id'),
            'can' => [
                'manage' => $request->user()->can('eleves.manage'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Eleve::class);

        return Inertia::render('eleves/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEleveRequest $request): RedirectResponse
    {
        Gate::authorize('create', Eleve::class);

        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('eleves', 'public');
        }

        $eleve = Eleve::create($data);

        return redirect()->route('eleves.show', $eleve)->with('success', 'Élève créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Eleve $eleve): Response
    {
        Gate::authorize('view', $eleve);

        $eleve->load(['responsables', 'documents', 'inscriptions.classe.niveau', 'inscriptions.anneeScolaire']);

        $anneeActive = AnneeScolaire::where('active', true)->first();

        return Inertia::render('eleves/show', [
            'eleve' => $eleve,
            'anneeActive' => $anneeActive,
            'classesDisponibles' => $anneeActive
                ? Classe::where('annee_scolaire_id', $anneeActive->id)->orderBy('nom')->get(['id', 'nom'])
                : [],
            'dejaInscrit' => $anneeActive
                ? $eleve->inscriptions()->where('annee_scolaire_id', $anneeActive->id)->exists()
                : false,
            'can' => [
                'viewAny' => $request->user()->can('eleves.view'),
                'manage' => $request->user()->can('eleves.manage'),
                'inscrire' => $request->user()->can('inscriptions.manage'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Eleve $eleve): Response
    {
        Gate::authorize('update', $eleve);

        return Inertia::render('eleves/edit', [
            'eleve' => $eleve,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEleveRequest $request, Eleve $eleve): RedirectResponse
    {
        Gate::authorize('update', $eleve);

        $data = $request->validated();

        if ($request->hasFile('photo')) {
            if ($eleve->photo) {
                Storage::disk('public')->delete($eleve->photo);
            }

            $data['photo'] = $request->file('photo')->store('eleves', 'public');
        }

        $eleve->update($data);

        return redirect()->route('eleves.show', $eleve)->with('success', 'Élève mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Eleve $eleve): RedirectResponse
    {
        Gate::authorize('delete', $eleve);

        if ($eleve->photo) {
            Storage::disk('public')->delete($eleve->photo);
        }

        $eleve->delete();

        return redirect()->route('eleves.index')->with('success', 'Élève supprimé avec succès.');
    }
}
