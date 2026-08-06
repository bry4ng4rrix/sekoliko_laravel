# Cahier des charges — Système Informatisé de Gestion (SIG) scolaire

> Document de référence complet pour la vision cible du projet. Le développement reste **par phases** (voir `map.md` pour l'état d'avancement et la feuille de route) — ce fichier décrit l'ambition finale, pas ce qui est construit aujourd'hui.

## 1. Vision et périmètre

Développer un Système Informatisé de Gestion (SIG) pour établissements scolaires (Lycée) permettant la gestion complète de l'administration académique, pédagogique et financière.

**Vision.** Centraliser la gestion des données académiques, administratives et financières dans une plateforme unique, sécurisée et accessible selon les rôles des utilisateurs.

**Périmètre.**

- Gestion des élèves (inscription, suivi, historique)
- Gestion académique (classes, matières, emplois du temps, programmes)
- Suivi pédagogique (notes, évaluations, bulletins)
- Gestion de la présence et des absences
- Gestion des paiements d'écolages
- Communication et notifications
- Rapports et statistiques
- Gestion administrative et financière

---

## 2. Rôles utilisateurs et accès

### 2.1 Administrateur

**Accès** : complet à tous les modules. **Responsabilité** : gestion globale du système.

Modules :

- **Tableau de bord administratif** : vue d'ensemble globale, statistiques par classe/filière/niveau, utilisateurs connectés, alertes système.
- **Gestion des utilisateurs** : CRUD complet (admin, enseignants, responsables pédagogiques), attribution des rôles et permissions, gestion des accès et sécurité.
- **Gestion académique globale** : création/modification des classes, gestion des filières, configuration des matières et programmes, gestion des emplois du temps globaux.
- **Gestion des étudiants** : inscription/désinscription, modification des données, suivi des statuts, gestion des historiques.
- **Notes et évaluations** : consultation globale, validation des bulletins, statistiques académiques, analyses de performance.
- **Présence et absences** : rapports globaux, analyse des tendances, gestion des justifications.
- **Gestion administrative** : gestion des utilisateurs du système, configuration des paramètres, sauvegarde et sécurité.
- **Gestion financière** : gestion complète des paiements, suivi des dettes, rapports financiers détaillés, configuration des frais de scolarité.
- **Communication** : notifications globales, messagerie système, rapports administratifs.
- **Rapports et statistiques** : tous les rapports disponibles, export de données, analyses complètes.

### 2.2 Responsable pédagogique

**Accès** : superviseur pédagogique inter-classes/filière. **Responsabilité** : supervision académique et pédagogique.

Modules :

- **Tableau de bord pédagogique** : statistiques par filière/niveau, alertes pédagogiques, vue d'ensemble académique.
- **Gestion académique** : consultation des classes et filières, supervision des matières et programmes, suivi des enseignants assignés, consultation/optimisation des emplois du temps.
- **Notes et évaluations** : consultation des moyennes globales par classe/filière, validation des bulletins, statistiques par semestre/année, suivi des performances par filière.
- **Présence et absences** : rapports globaux par classe/filière, analyse des tendances d'absentéisme, identification des cas critiques.
- **Gestion des étudiants** : consultation des historiques académiques, suivi des parcours (redoublements, orientations), analyse des progressions.
- **Paiements d'écolages** : enregistrement des paiements, suivi par filière et classe, filtrage par statut (Payé/Partiel/Impayé), rapports de recouvrement, historique des transactions, export de rapports.
- **Communication** : envoi de notifications pédagogiques, messagerie interne, rapports pédagogiques.
- **Rapports** : rapports de performances par filière, rapports d'assiduité, analyses comparatives.

### 2.3 Enseignant

**Accès** : limité à ses classes, matières et étudiants assignés. **Responsabilité** : gestion pédagogique quotidienne de ses classes.

Modules :

- **Tableau de bord pédagogique** : vue de ses classes, tâches à accomplir, activités récentes, statistiques personnelles.
- **Gestion académique** : consultation de l'emploi du temps personnel, des matières et programmes assignés.
- **Notes et évaluations** : saisie des notes/évaluations pour ses classes/matières, calcul automatique des moyennes, génération de bulletins/relevés partiels, validation avant envoi aux étudiants.
- **Présence et absences** : enregistrement des présences/absences/retards, suivi des absences de ses étudiants, génération de rapports de présence.
- **Communication** : envoi de notifications aux étudiants, messagerie interne, envoi d'emails ciblés.
- **Historique étudiants** : consultation de l'historique académique, suivi des parcours.
- **Rapports** : rapports sur ses classes, moyennes et assiduité.
- **Paramètres** : gestion du profil, préférences de notification.

### 2.4 Étudiant

**Accès** : lecture seule — données personnelles et académiques. **Responsabilité** : consultation de sa situation académique.

Modules :

- **Tableau de bord étudiant** : vue d'ensemble personnelle, annonces importantes, informations clés.
- **Mon profil** : consultation des données personnelles, historique académique personnel.
- **Gestion académique** : consultation de l'emploi du temps, des matières et programmes.
- **Notes et résultats** : consultation des notes par période, téléchargement de bulletins, moyennes personnelles.
- **Présence** : suivi des absences personnelles, justifications.
- **Gestion administrative** : consultation du statut de paiement, historique des transactions.
- **Communications** : réception des notifications, messagerie interne (lecture).
- **Mes documents** : téléchargement des attestations, certificats, bulletins.

---

## 3. Modules globaux du système

### 3.1 Gestion académique

**Fonctionnalités** : création/gestion des classes, gestion des filières (Scientifique, Littéraire, Technique, etc.), gestion des matières, gestion des programmes pédagogiques, création/optimisation des emplois du temps, affectation des enseignants aux classes/matières, gestion des niveaux (6ème → Terminale).

**Données** :

- `Classe` (ID, nom, niveau, filière, capacité, prof principal)
- `Matière` (ID, nom, code, description, heures/semaine)
- `Emploi du temps` (jour, heure début, heure fin, classe, matière, enseignant, salle)
- `Programme` (ID, matière, contenu, trimestre/semestre, volume horaire)

### 3.2 Gestion des étudiants

**Fonctionnalités** : inscription, modification des données personnelles, suivi des parcours académiques, historique complet, gestion des statuts (Actif, Suspendu, Diplômé, Renvoyé), suivi des redoublements et orientations.

**Données** :

- `Étudiant` (ID, matricule, prénom, nom, date naissance, sexe, adresse, téléphone)
- `Parent/Responsable` (nom, relation, contact)
- `Historique académique` (année, classe, filière, moyenne, statut)
- `Parcours` (orientations, redoublements)

### 3.3 Notes et évaluations

**Fonctionnalités** : saisie des notes (contrôles, examens, travaux), calcul automatique des moyennes (par devoir, trimestre/semestre, générale), génération de bulletins, validation des résultats, statistiques et analyses, rapports de performance.

**Calculs** :

- Moyenne par matière = (Σ notes × coefficients) / Σ coefficients
- Moyenne trimestre = (Σ moyennes matières) / nombre de matières
- Moyenne générale = (Σ moyennes trimestres) / 3 ou 2

**Données** :

- `Note` (ID, étudiant, matière, type, valeur, date, enseignant)
- `Bulletin` (ID, étudiant, trimestre, classe, moyennes, observations)
- `Statistiques` (moyennes par classe, filière, niveau)

### 3.4 Présence et absences

**Fonctionnalités** : enregistrement quotidien des présences, enregistrement des absences/retards, justification des absences, suivi statistique, rapports d'assiduité, alertes absentéisme.

**Données** :

- `Présence` (ID, étudiant, cours, date, statut : Présent/Absent/Retard)
- `Justification` (ID, absence, motif, document, date justification, statut)
- `Rapport` (classe, taux présence, nombre absences, tendances)

**Statistiques** : taux de présence par étudiant/classe/filière, nombre d'absences par période, analyse des tendances.

### 3.5 Gestion financière — paiements d'écolages

**Fonctionnalités** : configuration des tarifs par filière/niveau, enregistrement des paiements, suivi des dettes, génération de reçus/quittances, rappels de paiement automatiques, rapports de recouvrement, historique des transactions, filtrage par statut (Payé/Partiel/Impayé), export de données financières.

**Données** :

- `Frais de scolarité` (ID, filière, montant, période, année)
- `Paiement` (ID, étudiant, montant, date, mode, référence, enregistré par)
- `Dossier financier` (étudiant, total frais, total payé, reste dû, statut)
- **Mode de paiement** : Espèces, Chèque, Virement bancaire, Mobile Money

**Statuts** :

- Payé : montant payé = montant dû (100 %)
- Partiel : 0 % < montant payé < 100 %
- Impayé : montant payé = 0 %

**Calculs** :

- Reste à payer = Frais totaux − Montant payé
- Taux recouvrement = (Total payé / Total frais) × 100 %
- Montant dû par filière/classe

### 3.6 Communication

**Fonctionnalités** : notifications/annonces globales, messagerie interne, envoi d'emails ciblés (si autorisé), envoi de SMS (si autorisé), distribution par destinataire (classe, filière, niveau, rôle), historique des communications, statut de lecture.

**Destinataires** : tous les étudiants d'une classe, d'une filière, tous les enseignants, parents/responsables, administrateurs.

**Types de notifications** : annonces générales, résultats d'examen, devoirs à faire, rappels de paiement, avis de présence parentale.

### 3.7 Rapports et statistiques

**Pour Admin** : rapport global de performance par filière, rapport financier complet, rapport d'assiduité global, rapport d'effectifs, rapport de gestion utilisateurs.

**Pour Responsable pédagogique** : rapport de performances par filière/niveau, rapport d'assiduité par classe/filière, rapport des parcours académiques, analyses comparatives inter-filières, rapport de validation des bulletins.

**Pour Enseignant** : rapport de classe (moyennes, assiduité), rapport individuel par étudiant, rapport par matière, rapport mensuel.

**Pour Étudiant** : relevé de notes, bulletin scolaire, certificat de présence.

**Exports** : PDF, Excel, CSV — par période (mois, trimestre, année), par filière, classe, niveau.

---

## 4. Fonctionnalités transversales

### 4.1 Authentification et sécurité

Login/logout, réinitialisation de mot de passe, contrôle d'accès par rôle, historique des connexions, session timeout.

### 4.2 Tableau de bord

Vue d'ensemble personnalisée par rôle, widgets avec statistiques clés, alertes et notifications, tâches à accomplir, activités récentes.

### 4.3 Interface utilisateur

Responsive design (mobile, tablette, desktop), navigation intuitive par menu latéral, palette de couleurs unifiée, icônes cohérentes, accessibilité.

### 4.4 Notifications

Notifications en temps réel, notifications par email, notifications dans le système, centre de notifications avec historique.

### 4.5 Recherche et filtrage

Recherche rapide, filtres avancés, tri par colonne, pagination.

---

## 5. Données clés du système

### 5.1 Utilisateurs

ID, email, mot de passe (hashé), prénom, nom, rôle, statut (Actif/Inactif), date création, dernière connexion.

### 5.2 Étudiants

ID (matricule unique), prénom, nom, date de naissance, sexe, adresse, téléphone, email, classe actuelle, filière, niveau, statut, date inscription, photo.

### 5.3 Enseignants

ID, prénom, nom, spécialité/matière, classes assignées, email, téléphone, statut.

### 5.4 Classes

ID, nom (ex : 2nde C), niveau, filière, capacité, enseignant principal, année académique, effectif.

### 5.5 Notes

ID, étudiant, matière, type (Contrôle, Examen, Devoir), valeur (sur 20), coefficient, date, enseignant, trimestre.

### 5.6 Paiements

ID, étudiant, montant, date, mode (Espèces/Chèque/Virement/Mobile Money), référence, enregistré par, statut.

---

## 6. Règles de gestion

### 6.1 Académiques

- Une classe peut avoir plusieurs enseignants.
- Un étudiant est assigné à UNE classe par période.
- Les notes doivent être entre 0 et 20.
- Les coefficients doivent être > 0.
- Minimum 3 notes par matière et par trimestre.
- Une moyenne = somme(notes × coefficients) / somme(coefficients).

### 6.2 Financières

- Les frais sont configurés par filière/niveau.
- Un paiement peut être partiel.
- Les dettes ne peuvent pas être négatives.
- Chaque paiement génère une quittance.
- Deux ans maximum pour recouvrer une dette.

### 6.3 Absences

- Une absence doit être justifiée dans les 48 h.
- Maximum 25 % d'absences autorisées par an.
- Absences répétées = alerte administrative.

### 6.4 Accès

- Chaque utilisateur accède uniquement à ses données.
- Un enseignant voit ses classes uniquement.
- Un étudiant voit ses données uniquement.
- Les administrateurs voient tout.

---

## 7. Intégrations externes (optionnelles)

- **Email** : SMTP pour envoi d'emails
- **SMS** : API SMS pour notifications
- **Payment Gateway** : pour paiements en ligne
- **Cloud Storage** : sauvegarde documents
- **Analytics** : dashboards analytiques

---

## 8. Normes et standards

- Standard de date : `YYYY-MM-DD`
- Devise : Ariary (Ar)
- Langue : Français
- Timezone : UTC+3 (Madagascar)
- Année académique : Septembre → Juin

---

## 9. Performance et capacité

- Utilisateurs simultanés : 100+
- Étudiants : 1 000+
- Classes : 50+
- Enseignants : 50+
- Temps réponse : < 2 s pour les pages
- Uptime : 99 %

---

## 10. Évolutions futures

- Portail parent avec consultation des données de l'enfant
- Application mobile native (iOS/Android)
- Intégration paiement en ligne
- E-learning intégré
- Système de chatbot IA
- Prédictions académiques (ML)
- Visioconférence intégrée
