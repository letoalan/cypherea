# État des Lieux Exhaustif – Projet CYPHERA

Date de mise à jour : 10/03/2026
Le projet a franchi une étape majeure de maturité, avec une interface plus structurée, une interactivité enrichie et une meilleure clarté pédagogique.

## 🏗️ Architecture et Fonctionnalités Clés

### 1. Accueil & Immersion (`index.html`)
- **Carrousel Premium** : 4 slides avec transitions fluides, présentant l'univers et les enjeux.
- **Hero Vidéo** : Intégration d'un arrière-plan vidéo dynamique pour une immersion immédiate.
- **Design System** : "Institutional Navy Glassmorphism" avec accents Or (#fdbb2d).

### 2. Répartition des Rôles (`repartition.html`)
- **Double Vue Interactive** :
    - **Vue Tableau** : Liste classique pour une lecture rapide.
    - **Vue Dynamique** : Affichage par cartes groupées par institution (Assemblée, Sénat, État, Société Civile).
- **Import/Export Excel** : Gestion complète de la liste des élèves via SheetJS (xlsx/csv).
- **Logique de Groupement** : Catégorisation automatique des 14 rôles selon les blocs institutionnels de la Vᵉ République.

### 3. Simulation Restructurée (`simulation.html`)
- **Navigation Multi-Niveaux** :
    1. **Présentation** : Contexte global et objectifs.
    2. **L'Affaire** : Narration détaillée du scandale et du scénario.
    3. **Acteurs & Objectifs** : Fiches d'identité et cibles des 14 groupes d'intérêt.
    4. **Enquête (4 Actes)** : Déroulé chronologique de la commission (Chargement asynchrone).
- **Interactivité** : Survol des acteurs pour détails immédiats (Modal) et guards JS pour la stabilité.

### 4. Objectifs & Évaluation (`objectifs.html`)
- **Navigation par Étapes** : 3 sections distinctes (Pédagogique, Élèves, Évaluation).
- **Grille d'Évaluation (20 pts)** : Critères précis par phase, intégrée directement pour consultation.
- **Accessibilité** : Structure sémantique claire et design responsive.

### 5. Internationalisation (i18n)
- **Triple Support** : Français (FR), Anglais (EN), Allemand (DE).
- **Moteur Dynamique** : Injection sécurisée du contenu (HTML supporté) sans rechargement de page.

## 📁 Inventaire de l'Écosystème

| Fichier | Rôle Central |
| :--- | :--- |
| `js/simulation.js` | Logique des 4 actes et navigation principale par onglets. |
| `js/roles.js` | Algorithme de répartition et gestion des vues dynamique/tableau. |
| `js/pdf-generator.js` | Moteur d'exportation (6 rubriques PDF distinctes). |
| `i18n/translations.js` | Dictionnaire centralisé (plus de 400 clés). |
| `css/common.css` | Design system, tokens de couleur et effets Glass. |

## 🎨 Spécifications Design
- **Style** : Institutionnel Moderne / Cyber-Défense.
- **Animations** : Micro-transitions sur les boutons, effets de survol (`scale`, `glow`).
- **Responsive** : Full-responsive (Mobile/Tablet/Desktop).

---
*Dernière mise à jour exhaustive par Antigravity le 10 Mars 2026.*
