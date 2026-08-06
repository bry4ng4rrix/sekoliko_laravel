import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import type {FormEventHandler} from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { index, store } from '@/routes/eleves';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        matricule: '',
        nom: '',
        prenom: '',
        date_naissance: '',
        sexe: '',
        lieu_naissance: '',
        photo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(store.url(), { forceFormData: true });
    };

    return (
        <AppLayout>
            <Head title="Nouvel élève" />

            <div className="mx-auto max-w-2xl">
                <h1 className="text-2xl font-semibold">Nouvel élève</h1>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Informations de l'élève</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="matricule">Matricule</Label>
                                    <Input id="matricule" value={data.matricule} onChange={(e) => setData('matricule', e.target.value)} />
                                    {errors.matricule && <p className="text-sm text-destructive">{errors.matricule}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sexe">Sexe</Label>
                                    <Select value={data.sexe} onValueChange={(value) => setData('sexe', value)}>
                                        <SelectTrigger id="sexe" className="w-full">
                                            <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="M">Masculin</SelectItem>
                                            <SelectItem value="F">Féminin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.sexe && <p className="text-sm text-destructive">{errors.sexe}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom</Label>
                                    <Input id="nom" value={data.nom} onChange={(e) => setData('nom', e.target.value)} />
                                    {errors.nom && <p className="text-sm text-destructive">{errors.nom}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="prenom">Prénom</Label>
                                    <Input id="prenom" value={data.prenom} onChange={(e) => setData('prenom', e.target.value)} />
                                    {errors.prenom && <p className="text-sm text-destructive">{errors.prenom}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date_naissance">Date de naissance</Label>
                                    <Input
                                        id="date_naissance"
                                        type="date"
                                        value={data.date_naissance}
                                        onChange={(e) => setData('date_naissance', e.target.value)}
                                    />
                                    {errors.date_naissance && <p className="text-sm text-destructive">{errors.date_naissance}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lieu_naissance">Lieu de naissance</Label>
                                    <Input
                                        id="lieu_naissance"
                                        value={data.lieu_naissance}
                                        onChange={(e) => setData('lieu_naissance', e.target.value)}
                                    />
                                    {errors.lieu_naissance && <p className="text-sm text-destructive">{errors.lieu_naissance}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photo">Photo (optionnel)</Label>
                                <Input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('photo', e.target.files?.[0] ?? null)}
                                />
                                {errors.photo && <p className="text-sm text-destructive">{errors.photo}</p>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={index.url()}>Annuler</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing && <LoaderCircle className="size-4 animate-spin" />}
                                    Créer l'élève
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
