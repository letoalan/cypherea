# PROMPT – GÉNÉRATION ARBRES DE DÉCISION CYPHERA (13 acteurs restants)
# À utiliser dans Antigravity / LM Studio avec consigne_arbres_decisions.md en contexte

---

## INSTRUCTIONS GÉNÉRALES

Tu vas générer 13 fichiers JSON d'arbres de décision pour la simulation CYPHERA.
Chaque fichier suit EXACTEMENT la structure de `arbre_decisions_AN_majorite.json`
et les règles de `consigne_arbres_decisions.md`.

Pour chaque acteur :
1. Lis sa fiche `[N]-[ID].json`
2. Importe les 8 champs obligatoires (tableau Partie 3 de la consigne)
3. Génère le JSON complet avec 256 chemins
4. Adapte les scores acte4 selon le scénario cible (R-A4)

---

## RÉFÉRENCE – SCORES ACTE 4 PAR SCÉNARIO CIBLE

| Scénario | α (Rapport adopté) | β (Compromis) | γ (Rapport minoritaire) | δ (QPC/Parquet) |
|---|---|---|---|---|
| Sc1 (majorité/sécurité) | +3 ✅ | +1 ⚠️ | -1 ❌ | -2 🔴 |
| Sc2 (contrôle/liberté) | -2 🔴 | -1 ❌ | +1 ⚠️ | +3 ✅ |
| Sc3 (Singapour) | -1 ❌ | +1 ⚠️ | +2 ✅ | -2 🔴 |
| Sc1/Sc2 neutre | +2 ✅ | +2 ✅ | -1 ❌ | -2 🔴 |
| Sc1/Sc3 hybride | +2 ✅ | +1 ⚠️ | -1 ❌ | -2 🔴 |

---

## LES 13 ACTEURS À TRAITER (dans l'ordre)

---

### ACTEUR 2 – AN_opposition_droite
**Fichier source :** `2-AN_opposition_droite.json`
**Fichier cible :** `arbre_decisions_AN_opposition_droite.json`
**Scénario cible :** Sc1/Sc3 hybride → scores : α=+2, β=+1, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : critique la gestion (pas l'outil), défend la souveraineté
- Acte 2 : pression sur ANSSI + CYPHERA sur la souveraineté technique
- Acte 3 : arbitre entre majorité et opposition, cherche compromis opérationnel
- Acte 4 : loi souveraineté numérique = victoire ; victoire gauche = défaite

---

### ACTEUR 3 – AN_opposition_gauche
**Fichier source :** `3-AN_opposition_gauche.json`
**Fichier cible :** `arbre_decisions_AN_opposition_gauche.json`
**Scénario cible :** Sc2 → scores : α=-2, β=-1, γ=+1, δ=+3
**Logique narrative :**
- Acte 1 : indignation, parle de « scandale d'État », demande suspension CYPHERA
- Acte 2 : alliance journalistes + CNIL, questions sur opposants surveillés
- Acte 3 : refuse tout compromis cosmétique, exige liste des personnes surveillées
- Acte 4 : QPC + parquet = victoire absolue ; rapport minimaliste = défaite

---

### ACTEUR 4 – Senat_majorite
**Fichier source :** `4-Senat_majorite.json`
**Fichier cible :** `arbre_decisions_Senat_majorite.json`
**Scénario cible :** Sc1/Sc2 neutre → scores : α=+2, β=+2, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : sagesse institutionnelle, expertise juridique, pas de spectacle
- Acte 2 : questionne conformité CEDH + légalité contrats
- Acte 3 : cherche compromis réformateur sans crise de régime
- Acte 4 : réforme législative pérenne = victoire ; chambre d'enregistrement = défaite

---

### ACTEUR 5 – Senat_opposition
**Fichier source :** `5-Senat_opposition.json`
**Fichier cible :** `arbre_decisions_Senat_opposition.json`
**Scénario cible :** Sc2 → scores : α=-2, β=-1, γ=+1, δ=+3
**Logique narrative :**
- Acte 1 : scepticisme, privatisation du renseignement, dimension européenne
- Acte 2 : interroge conformité Règlement IA UE, propose logiciel libre
- Acte 3 : pousse éthique algorithmique dans le rapport
- Acte 4 : éthique inscrite dans la loi = victoire ; note de bas de page = défaite

---

### ACTEUR 6 – ED
**Fichier source :** `6-ED.json`
**Fichier cible :** `arbre_decisions_ED.json`
**Scénario cible :** Sc3 → scores : α=-1, β=+1, γ=+2, δ=-2
**Logique narrative :**
- Acte 1 : dénonce la « police politique » mais valide l'outil
- Acte 2 : réclame contrôle étatique exclusif, cible immigrants + délinquance
- Acte 3 : pousse Patriot Act dans le rapport, bloque si refusé
- Acte 4 : surveillance nationalisée = victoire ; statu quo libéral = défaite

---

### ACTEUR 7 – Armees
**Fichier source :** `7-Armees.json`
**Fichier cible :** `arbre_decisions_Armees.json`
**Scénario cible :** Sc1 → scores : α=+3, β=+1, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : secret-défense absolu, outil indispensable contre Russie/Chine
- Acte 2 : refuse audition publique des officiers, oppose L2312-8
- Acte 3 : maintien secret sur algorithmes opérationnels
- Acte 4 : confirmation utilité + secret maintenu = victoire ; déclassification = défaite

---

### ACTEUR 8 – Interieur
**Fichier source :** `8-Interieur.json`
**Fichier cible :** `arbre_decisions_Interieur.json`
**Scénario cible :** Sc1 → scores : α=+3, β=+1, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : défense de l'utilité opérationnelle (attentats déjoués)
- Acte 2 : responsabilité rejetée sur CYPHERA (prestataire)
- Acte 3 : refuse refonte lois renseignement, accepte comité cosmétique
- Acte 4 : légitimation police prédictive = victoire ; tutelle judiciaire = défaite

---

### ACTEUR 9 – Justice
**Fichier source :** `9-Justice.json`
**Fichier cible :** `arbre_decisions_Justice.json`
**Scénario cible :** Sc1/Sc2 neutre → scores : α=+2, β=+2, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : contrôle judiciaire obligatoire, surveillance = exception
- Acte 2 : vérifie conformité art. 66 Constitution + droits avocats
- Acte 3 : renforcement rôle du juge dans le rapport
- Acte 4 : réforme judiciaire adoptée = victoire ; État purement sécuritaire = défaite

---

### ACTEUR 10 – CNIL
**Fichier source :** `10-CNIL.json`
**Fichier cible :** `arbre_decisions_CNIL.json`
**Scénario cible :** Sc2 → scores : α=-2, β=-1, γ=+1, δ=+3
**Logique narrative :**
- Acte 1 : alerte maximale, opacité inacceptable, RGPD violé
- Acte 2 : démontre illégalité croisement fichiers, soutient plaintes ONG
- Acte 3 : exige soumission préalable des algorithmes à la CNIL
- Acte 4 : pouvoirs CNIL renforcés par loi = victoire ; frein bureaucratique = défaite

---

### ACTEUR 11 – ANSSI
**Fichier source :** `11-ANSSI.json`
**Fichier cible :** `arbre_decisions_ANSSI.json`
**Scénario cible :** Sc1/Sc2 neutre → scores : α=+2, β=+2, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : expertise neutre, reconnaît puissance outil + risque souveraineté
- Acte 2 : recommande audit code source + normes sous-traitants
- Acte 3 : autorité d'audit confirmée dans le rapport
- Acte 4 : ANSSI confirmée arbitre technique = victoire ; couverture outil douteux = défaite

---

### ACTEUR 12 – DGSI
**Fichier source :** `12-DGSI.json`
**Fichier cible :** `arbre_decisions_DGSI.json`
**Scénario cible :** Sc1 → scores : α=+3, β=+1, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : hostile à la commission, secret-défense systématique, menaces russes
- Acte 2 : protège sources et infiltrations, mur de silence total
- Acte 3 : étouffement volet « surveillance opposants »
- Acte 4 : immunité renforcée = victoire ; scandale + démissions = défaite

---

### ACTEUR 13 – CYPHERA
**Fichier source :** `13-CYPHERA.json`
**Fichier cible :** `arbre_decisions_CYPHERA.json`
**Scénario cible :** Sc1 (survie) → scores : α=+3, β=+1, γ=-1, δ=-2
**Logique narrative :**
- Acte 1 : déni total, offensive juridique vs presse, outil neutre
- Acte 2 : secret des affaires systématique, détourne vers menaces externes
- Acte 3 : protection brevets + code source contre tout audit
- Acte 4 : contrats maintenus + code protégé = victoire ; dépôt de bilan = défaite

---

### ACTEUR 14 – Medias
**Fichier source :** `14-Medias.json`
**Fichier cible :** `arbre_decisions_Medias.json`
**Scénario cible :** Sc2 → scores : α=-2, β=-1, γ=+1, δ=+3
**Logique narrative :**
- Acte 1 : déballe les preuves, démontre usage politique
- Acte 2 : protège lanceur d'alerte, nouvelles révélations, mobilise opinion
- Acte 3 : exige déclassification dans le rapport, refuse compromis
- Acte 4 : grande loi protection sources = victoire ; lanceur condamné = défaite

---

## FORMAT DE SORTIE ATTENDU

Pour chaque acteur, retourne un JSON valide contenant :
- `_meta` avec `acteur_id`, `acteur_label`, `total_chemins: 256`
- `acte1` : 4 nœuds P1–P4 (issus de `positions_acte1` de la fiche)
- `acte2` : 16 nœuds P1.1–P4.4 avec `parent`
- `acte3` : 4 postures a/b/c/d adaptées au point de vue de l'acteur
- `acte4` : 4 issues α/β/γ/δ avec scores conformes au tableau R-A4
- `chemins` : tableau auto-généré de 256 entrées

## CONTRAINTES ABSOLUES

- NE PAS rédiger les 256 chemins à la main → les itérer programmatiquement
- Les 4 positions P1–P4 de `acte1` DOIVENT correspondre aux `positions_acte1`
  de la fiche acteur source (R-A1)
- Les scores α/β/γ/δ DOIVENT suivre le tableau R-A4 selon le scénario cible
- Chaque nœud `acte2` DOIT avoir un champ `"parent"` avec l'ID Acte1 correspondant
- Format `id` chemin : `P{1-4}-P{1-4}.{1-4}-A3{a-d}-A4{α-δ}`

## TRAITEMENT PAR BATCH RECOMMANDÉ

Traiter par groupes de 3-4 acteurs pour éviter les coupures de contexte :
- **Batch 1** : AN_opposition_droite, AN_opposition_gauche, Senat_majorite, Senat_opposition
- **Batch 2** : ED, Armees, Interieur, Justice
- **Batch 3** : CNIL, ANSSI, DGSI, CYPHERA, Medias
