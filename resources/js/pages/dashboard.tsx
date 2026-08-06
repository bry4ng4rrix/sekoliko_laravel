import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { getNavModules } from '@/lib/navigation';
import { dashboardTitle } from '@/lib/roles';
import { create as createEleve, show as showEleve } from '@/routes/eleves';

type Props = {
    stats: {
        eleves: number;
        classes: number;
        anneeActive: string | null;
    };
    repartitionParClasse: { nom: string; effectif: number }[];
    monDossier: {
        id: number;
        matricule: string;
        nom: string;
        prenom: string;
        classe: string | null;
    } | null;
};

export default function Dashboard({ stats, repartitionParClasse, monDossier }: Props) {
    const { auth } = usePage().props;
    const navModules = getNavModules(auth.permissions);
    const peutVoirEleves = auth.permissions.includes('eleves.view');
    const peutGererEleves = auth.permissions.includes('eleves.manage');

    return (
        <AppLayout>
            <Head title={dashboardTitle(auth.roles[0])} />

            <div>
                <h1 className="text-2xl font-semibold">{dashboardTitle(auth.roles[0])}</h1>
                <p className="text-sm text-muted-foreground">
                    {stats.anneeActive ? `Année scolaire active : ${stats.anneeActive}` : 'Aucune année scolaire active'}
                </p>
            </div>

            {monDossier && (
                <Card className="mt-6">
                    <CardContent className="flex items-center justify-between pt-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="size-14">
                                <AvatarFallback>
                                    {monDossier.prenom[0]}
                                    {monDossier.nom[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-lg font-semibold">
                                    {monDossier.prenom} {monDossier.nom}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Matricule {monDossier.matricule}
                                    {monDossier.classe && ` · ${monDossier.classe}`}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href={showEleve.url(monDossier.id)}>Voir mon dossier</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}

            {peutVoirEleves && (
                <>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardDescription>Élèves inscrits</CardDescription>
                                <CardTitle className="text-3xl">{stats.eleves}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardDescription>Classes (année active)</CardDescription>
                                <CardTitle className="text-3xl">{stats.classes}</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-3">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Répartition par classe</CardTitle>
                                <CardDescription>Effectifs de l'année active</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {repartitionParClasse.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {repartitionParClasse.map((classe) => (
                                            <div key={classe.nom} className="rounded-lg bg-muted p-3 text-center">
                                                <p className="text-sm font-medium text-primary">{classe.nom}</p>
                                                <p className="mt-1 text-2xl font-bold">{classe.effectif}</p>
                                                <p className="text-xs text-muted-foreground">élève(s)</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Aucune classe pour l'année active.</p>
                                )}
                            </CardContent>
                        </Card>

                        {peutGererEleves && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Actions rapides</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild className="w-full">
                                        <Link href={createEleve.url()}>
                                            <Plus className="size-4" />
                                            Nouvel élève
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </>
            )}

            <h2 className="mt-10 text-lg font-semibold">Modules</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {navModules.map((module) => {
                    const card = (
                        <Card className={module.href ? 'h-full transition-colors hover:border-primary' : 'h-full opacity-60'}>
                            <CardHeader>
                                <module.icon className="size-6 text-muted-foreground" />
                                <CardTitle className="mt-2 flex items-center gap-2">
                                    {module.title}
                                    {module.disabledReason && (
                                        <Badge variant="secondary" className="text-xs">
                                            {module.disabledReason}
                                        </Badge>
                                    )}
                                </CardTitle>
                                <CardDescription>{module.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    );

                    return module.href ? (
                        <Link key={module.title} href={module.href}>
                            {card}
                        </Link>
                    ) : (
                        <div key={module.title}>{card}</div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
