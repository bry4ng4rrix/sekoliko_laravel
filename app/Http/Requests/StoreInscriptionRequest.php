<?php

namespace App\Http\Requests;

use App\Models\AnneeScolaire;
use App\Models\Eleve;
use App\Models\Inscription;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInscriptionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->can('inscriptions.manage') ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $anneeActive = AnneeScolaire::where('active', true)->first();

        return [
            'classe_id' => [
                'required',
                Rule::exists('classes', 'id')->where('annee_scolaire_id', $anneeActive?->id),
            ],
            'type' => ['required', Rule::in(['nouvelle', 'reinscription'])],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $anneeActive = AnneeScolaire::where('active', true)->first();

            if (! $anneeActive) {
                $validator->errors()->add('classe_id', "Aucune année scolaire active n'est configurée.");

                return;
            }

            $eleve = $this->route('eleve');

            if (! $eleve instanceof Eleve) {
                return;
            }

            $dejaInscrit = Inscription::query()
                ->where('eleve_id', $eleve->id)
                ->where('annee_scolaire_id', $anneeActive->id)
                ->exists();

            if ($dejaInscrit) {
                $validator->errors()->add('classe_id', "Cet élève est déjà inscrit pour l'année scolaire active.");
            }
        });
    }
}
