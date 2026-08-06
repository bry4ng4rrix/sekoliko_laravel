export type AnneeScolaire = {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin: string;
    active: boolean;
};

export type Niveau = {
    id: number;
    nom: string;
};

export type Classe = {
    id: number;
    nom: string;
    capacite: number;
    niveau?: Niveau;
};

export type Responsable = {
    id: number;
    nom: string;
    prenom: string;
    telephone: string;
    email: string | null;
    profession: string | null;
    pivot?: {
        lien: string;
    };
};

export type Document = {
    id: number;
    type: string;
    fichier: string;
    date_ajout: string;
};

export type Inscription = {
    id: number;
    date_inscription: string;
    statut: string;
    type: string;
    classe?: Classe;
    annee_scolaire?: AnneeScolaire;
};

export type Eleve = {
    id: number;
    matricule: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    sexe: 'M' | 'F';
    lieu_naissance: string;
    photo: string | null;
    responsables?: Responsable[];
    documents?: Document[];
    inscriptions?: Inscription[];
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
};
