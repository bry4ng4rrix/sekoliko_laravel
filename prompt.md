# Contexte

Je démarre un logiciel de gestion scolaire pour un établissement multi-cycles
(primaire, collège, lycée). Stack imposée : Laravel + Inertia + React.
On construit par phases. Cette session couvre UNIQUEMENT la phase 1 :
gestion des dossiers élèves et des inscriptions. N'implémente rien des autres
phases (notes, paie, emploi du temps, finances).

# Objectif de cette session

Poser les fondations de la phase 1 : projet initialisé, base de données,
authentification avec rôles, et le CRUD Élèves + Inscriptions fonctionnel.

# Modèle de données (phase 1)

- annee_scolaire : libelle, date_debut, date_fin, active (bool)
- cycle : nom
- niveau : cycle_id (FK), nom, ordre (int)
- classe : niveau_id (FK), annee_scolaire_id (FK), nom, capacite
- eleve : matricule (unique), nom, prenom, date_naissance, sexe,
  lieu_naissance, photo (nullable)
- responsable : nom, prenom, telephone, email, profession
- eleve_responsable (pivot N-N) : eleve_id, responsable_id, lien
- inscription : eleve_id (FK), classe_id (FK), annee_scolaire_id (FK),
  date_inscription, statut, type (nouvelle/reinscription)
- document : eleve_id (FK), type, fichier, date_ajout

Règle clé : un ÉLÈVE a une identité permanente (un seul dossier). Chaque année,
il obtient une nouvelle INSCRIPTION vers une classe. Ne fusionne jamais élève
et classe dans une même table.

# Conventions

- Laravel dernière version stable, conventions standard (migrations, resource
  controllers, Form Requests pour la validation, Eloquent relationships).
- Clés primaires auto-incrémentées standard de Laravel. Le `matricule` élève est
  une clé métier unique séparée. (Le schéma de référence note "uuid" à titre
  illustratif ; ici on reste sur les ID classiques, plus idiomatiques.)
- Frontend : pages Inertia dans resources/js/Pages, composants React
  fonctionnels, formulaires via le helper `useForm` d'Inertia.
- Rôles/permissions : spatie/laravel-permission. Deux rôles pour commencer :
  `admin` et `secretariat` (les deux peuvent gérer élèves et inscriptions).
- Documents élèves : prévois spatie/laravel-medialibrary (ou le stockage de
  fichiers Laravel) — les fichiers vont sur le disque, pas en base.

# Tâches, dans l'ordre

1. Initialise le projet Laravel + le starter kit Inertia/React (Breeze ou
   Jetstream), configure la base (SQLite pour le dev, c'est suffisant).
2. Installe et configure spatie/laravel-permission et spatie/laravel-medialibrary.
3. Écris toutes les migrations du modèle ci-dessus (avec les clés étrangères et
   les index utiles : matricule unique, FK indexées).
4. Crée les modèles Eloquent avec TOUTES les relations (hasMany, belongsTo,
   belongsToMany pour eleve_responsable).
5. Crée un seeder : les 2 rôles, un utilisateur admin de démo, une année
   scolaire active, quelques cycles/niveaux/classes, et 5-10 élèves de test
   avec responsables et inscriptions.
6. Construis le CRUD Élèves : controller + Form Requests + pages Inertia/React
   (liste avec recherche par nom/matricule et filtre par classe, création,
   édition, fiche détail avec ses responsables, inscriptions et documents).
7. Construis le formulaire d'Inscription : inscrire un élève existant dans une
   classe pour l'année active (empêche les doublons élève+année).

# Critères d'acceptation

- `php artisan migrate:fresh --seed` s'exécute sans erreur.
- Je peux me connecter en tant qu'admin, voir la liste des élèves, en créer un,
  et l'inscrire dans une classe pour l'année active.
- La validation refuse une double inscription du même élève sur la même année.

# Façon de travailler

Procède étape par étape. Après chaque groupe de migrations/modèles, lance les
migrations pour vérifier que tout passe. Explique brièvement tes choix au fur et
à mesure. Ne fais pas de sur-ingénierie : code simple, lisible, idiomatique.
