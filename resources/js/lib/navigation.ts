import {  BookOpen, CalendarDays, FolderOpen, GraduationCap, NotebookText, Users } from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import { index as elevesIndex } from '@/routes/eleves';

export type NavModule = {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string | null;
    disabledReason: string | null;
};

const BIENTOT_DISPONIBLE = 'Bientôt disponible';
const NON_AUTORISE = 'Non autorisé pour votre rôle';

export function getNavModules(permissions: string[]): NavModule[] {
    const peutVoirEleves = permissions.includes('eleves.view');

    return [
        {
            title: 'Élèves',
            description: 'Dossiers élèves et inscriptions',
            icon: Users,
            href: peutVoirEleves ? elevesIndex.url() : null,
            disabledReason: peutVoirEleves ? null : NON_AUTORISE,
        },
        {
            title: 'Enseignants',
            description: 'Fiches, contrats et salaires',
            icon: GraduationCap,
            href: null,
            disabledReason: BIENTOT_DISPONIBLE,
        },
        {
            title: 'Matières',
            description: 'Matières enseignées par cycle',
            icon: BookOpen,
            href: null,
            disabledReason: BIENTOT_DISPONIBLE,
        },
        {
            title: "Emploi du temps",
            description: 'Planning des cours par classe',
            icon: CalendarDays,
            href: null,
            disabledReason: BIENTOT_DISPONIBLE,
        },
        {
            title: 'Dossiers',
            description: 'Documents administratifs',
            icon: FolderOpen,
            href: null,
            disabledReason: BIENTOT_DISPONIBLE,
        },
        {
            title: 'Bulletins',
            description: 'Notes et bulletins scolaires',
            icon: NotebookText,
            href: null,
            disabledReason: BIENTOT_DISPONIBLE,
        },
    ];
}
