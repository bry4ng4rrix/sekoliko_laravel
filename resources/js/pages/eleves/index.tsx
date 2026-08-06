import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create, index, show } from '@/routes/eleves';
import type { Classe, Eleve, Paginated } from '@/types';

type Props = {
    eleves: Paginated<Eleve>;
    classes: Classe[];
    filters: {
        recherche?: string;
        classe_id?: string;
    };
    can: {
        manage: boolean;
    };
};

export default function Index({ eleves, classes, filters, can }: Props) {
    const [recherche, setRecherche] = useState(filters.recherche ?? '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (recherche !== (filters.recherche ?? '')) {
                router.get(
                    index.url(),
                    { ...filters, recherche: recherche || undefined },
                    { preserveState: true, replace: true },
                );
            }
        }, 300);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recherche]);

    const filtrerParClasse = (classeId: string) => {
        router.get(
            index.url(),
            { ...filters, classe_id: classeId === 'toutes' ? undefined : classeId },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AppLayout>
            <Head title="Élèves" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Élèves</h1>
                    <p className="text-sm text-muted-foreground">{eleves.total} élève(s) au total</p>
                </div>
                {can.manage && (
                    <Button asChild>
                        <Link href={create.url()}>
                            <Plus className="size-4" />
                            Nouvel élève
                        </Link>
                    </Button>
                )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher par nom, prénom ou matricule..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select value={filters.classe_id ?? 'toutes'} onValueChange={filtrerParClasse}>
                    <SelectTrigger className="w-full sm:w-56">
                        <SelectValue placeholder="Toutes les classes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="toutes">Toutes les classes</SelectItem>
                        {classes.map((classe) => (
                            <SelectItem key={classe.id} value={String(classe.id)}>
                                {classe.nom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="mt-6 rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Matricule</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Prénom</TableHead>
                            <TableHead>Classe (année active)</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {eleves.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    Aucun élève trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                        {eleves.data.map((eleve) => (
                            <TableRow key={eleve.id}>
                                <TableCell className="font-mono text-sm">{eleve.matricule}</TableCell>
                                <TableCell>{eleve.nom}</TableCell>
                                <TableCell>{eleve.prenom}</TableCell>
                                <TableCell>
                                    {eleve.inscriptions?.[0]?.classe ? (
                                        <Badge variant="secondary">{eleve.inscriptions[0].classe.nom}</Badge>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Non inscrit</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={show.url(eleve.id)}>Voir</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {eleves.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {eleves.links.map((link, i) =>
                        link.url ? (
                            <Button key={i} variant={link.active ? 'default' : 'outline'} size="sm" asChild>
                                <Link href={link.url} preserveScroll dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        ) : (
                            <Button key={i} variant="outline" size="sm" disabled>
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Button>
                        ),
                    )}
                </div>
            )}
        </AppLayout>
    );
}
