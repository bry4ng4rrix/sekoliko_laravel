export const ROLE_LABELS: Record<string, string> = {
    admin: 'Administrateur',
    responsable_pedagogique: 'Responsable pédagogique',
    enseignant: 'Enseignant',
    etudiant: 'Étudiant',
};

const DASHBOARD_TITLES: Record<string, string> = {
    admin: 'Tableau de bord',
    responsable_pedagogique: 'Tableau de bord pédagogique',
    enseignant: 'Tableau de bord enseignant',
    etudiant: 'Mon espace',
};

export function dashboardTitle(role: string | undefined): string {
    return (role && DASHBOARD_TITLES[role]) ?? 'Tableau de bord';
}
