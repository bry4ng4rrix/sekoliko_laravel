import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle, Pencil } from 'lucide-react';
import type {FormEventHandler} from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/eleves';
import { store as storeInscription } from '@/routes/eleves/inscriptions';
import type { AnneeScolaire, Classe, Eleve } from '@/types';

type Props = {
    eleve: Eleve;
    anneeActive: AnneeScolaire | null;
    classesDisponibles: Classe[];
    dejaInscrit: boolean;
    can: {
        viewAny: boolean;
        manage: boolean;
        inscrire: boolean;
    };
};

export default function Show({ eleve, anneeActive, classesDisponibles, dejaInscrit, can }: Props) {
    return (
        <AppLayout>
            <Head title={`${eleve.prenom} ${eleve.nom}`} />

            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="size-16">
                        <AvatarImage src={eleve.photo ? `/storage/${eleve.photo}` : undefined} alt={eleve.nom} />
                        <AvatarFallback>
                            {eleve.prenom[0]}
                            {eleve.nom[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {eleve.prenom} {eleve.nom}
                        </h1>
                        <p className="text-sm text-muted-foreground">Matricule {eleve.matricule}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {can.viewAny && (
                        <Button variant="outline" asChild>
                            <Link href={index.url()}>Retour</Link>
                        </Button>
                    )}
                    {can.manage && (
                        <Button variant="outline" asChild>
                            <Link href={edit.url(eleve.id)}>
                                <Pencil className="size-4" />
                                Modifier
                            </Link>
                        </Button>
                    )}
                </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Informations</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Date de naissance</p>
                            <p>{eleve.date_naissance}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Sexe</p>
                            <p>{eleve.sexe === 'M' ? 'Masculin' : 'Féminin'}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Lieu de naissance</p>
                            <p>{eleve.lieu_naissance}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Responsables</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        {eleve.responsables?.length ? (
                            eleve.responsables.map((responsable) => (
                                <div key={responsable.id}>
                                    <p className="font-medium">
                                        {responsable.prenom} {responsable.nom}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {responsable.pivot?.lien} · {responsable.telephone}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">Aucun responsable enregistré.</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Inscriptions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {eleve.inscriptions?.length ? (
                            eleve.inscriptions.map((inscription) => (
                                <div key={inscription.id} className="flex items-center justify-between text-sm">
                                    <div>
                                        <p className="font-medium">{inscription.classe?.nom}</p>
                                        <p className="text-muted-foreground">{inscription.annee_scolaire?.libelle}</p>
                                    </div>
                                    <Badge variant="secondary">{inscription.type}</Badge>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">Aucune inscription enregistrée.</p>
                        )}

                        {anneeActive && !dejaInscrit && can.inscrire && (
                            <>
                                <Separator />
                                <FormulaireInscription eleveId={eleve.id} classes={classesDisponibles} />
                            </>
                        )}

                        {anneeActive && dejaInscrit && (
                            <p className="text-sm text-muted-foreground">Déjà inscrit pour l'année {anneeActive.libelle}.</p>
                        )}

                        {!anneeActive && <p className="text-sm text-muted-foreground">Aucune année scolaire active configurée.</p>}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {eleve.documents?.length ? (
                            eleve.documents.map((document) => (
                                <div key={document.id} className="flex items-center justify-between text-sm">
                                    <span>{document.type}</span>
                                    <span className="text-muted-foreground">{document.date_ajout}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">Aucun document enregistré.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function FormulaireInscription({ eleveId, classes }: { eleveId: number; classes: Classe[] }) {
    const { data, setData, post, processing, errors } = useForm({
        classe_id: '',
        type: 'nouvelle',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(storeInscription.url({ eleve: eleveId }));
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            <p className="text-sm font-medium">Inscrire pour l'année active</p>
            <div className="space-y-2">
                <Select value={data.classe_id} onValueChange={(value) => setData('classe_id', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir une classe" />
                    </SelectTrigger>
                    <SelectContent>
                        {classes.map((classe) => (
                            <SelectItem key={classe.id} value={String(classe.id)}>
                                {classe.nom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.classe_id && <p className="text-sm text-destructive">{errors.classe_id}</p>}
            </div>
            <div className="space-y-2">
                <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nouvelle">Nouvelle inscription</SelectItem>
                        <SelectItem value="reinscription">Réinscription</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-destructive">{errors.type}</p>}
            </div>
            <Button type="submit" size="sm" disabled={processing}>
                {processing && <LoaderCircle className="size-4 animate-spin" />}
                Inscrire
            </Button>
        </form>
    );
}
