# CONSIGNE – GÉNÉRATION ARBRES DE DÉCISION JSON (AFFAIRE CYPHERA)
# Version 1.0 – 12/03/2026
# Pour chacun des 14 acteurs de la simulation CYPHERA

---

## PARTIE 1 – CONTEXTE SCÉNARIO (rappel)

L'État français a noué un partenariat secret avec **CYPHERA SECURITY**, spécialisée
en cybersurveillance prédictive (croisement métadonnées, géolocalisation, réseaux sociaux).
Officiellement anti-terroriste, le dispositif dérive vers la surveillance de journalistes,
chercheurs, ONG, parlementaires d'opposition et personnels de la CNIL.

Un lanceur d'alerte (ingénieur CYPHERA) contacte le **Canard Enchaîné** → publication
explosive → création d'une **commission d'enquête parlementaire** (art. 140 Règlement AN,
30 membres, 6 mois, présidence opposition, rapporteur majorité).

**Trois scénarios de sortie :**
- **Sc1 Minimaliste** : rapport technique, gouvernement blanchi (majorité + droite)
- **Sc2 Contrôle démocratique** : réforme lois renseignement, sanctions (gauche + CNIL)
- **Sc3 Patriot Act singapourien** : élargissement légal surveillance (extrême droite)

**Quatre actes de la simulation :**
| Acte | Moment | Enjeu |
|------|--------|-------|
| Acte 1 | Constitution commission | Framing initial, positionnement public |
| Acte 2 | Auditions des témoins | Gestion des révélations, alliances tactiques |
| Acte 3 | Négociation du rapport | Ce qu'on concède / ce qu'on bloque |
| Acte 4 | Vote final + suite judiciaire | Issue politique et juridique |

---

## PARTIE 2 – STRUCTURE JSON ARBRE DE DÉCISION

Chaque acteur doit avoir un fichier `arbre_decisions_[ID].json` respectant exactement
cette structure :

```json
{
  "_meta": {
    "acteur_id": "ID_EXACT",
    "acteur_label": "NOM COMPLET",
    "version": "1.0",
    "date": "AAAA-MM-JJ",
    "description": "Arbre de décision – 4 actes × 4 branches = 256 chemins",
    "total_chemins": 256,
    "champs_imports_fiche": [
      "positions_acte1",
      "objectifs.obtenir",
      "objectifs.eviter",
      "contraintes",
      "scenarios_sortie",
      "rapport_forces.coalition_possible",
      "citation"
    ]
  },
  "acte1": {
    "P1": { "label": "...", "description": "...", "tonalite": "...", "risque": "..." },
    "P2": { "label": "...", "description": "...", "tonalite": "...", "risque": "..." },
    "P3": { "label": "...", "description": "...", "tonalite": "...", "risque": "..." },
    "P4": { "label": "...", "description": "...", "tonalite": "...", "risque": "..." }
  },
  "acte2": {
    "P1.1": { "parent": "P1", "label": "...", "description": "...", "tonalite": "...", "risque": "..." },
    "P1.2": { "parent": "P1", "label": "...", "description": "...", "tonalite": "...", "risque": "..." },
    "P1.3": { "parent": "P1", "label": "...", "description": "...", "tonalite": "...", "risque": "..." },
    "P1.4": { "parent": "P1", "label": "...", "description": "...", "tonalite": "...", "risque": "..." },
    "P2.1": { "parent": "P2", "...": "..." },
    "P2.2": { "parent": "P2", "...": "..." },
    "P2.3": { "parent": "P2", "...": "..." },
    "P2.4": { "parent": "P2", "...": "..." },
    "P3.1": { "parent": "P3", "...": "..." },
    "P3.2": { "parent": "P3", "...": "..." },
    "P3.3": { "parent": "P3", "...": "..." },
    "P3.4": { "parent": "P3", "...": "..." },
    "P4.1": { "parent": "P4", "...": "..." },
    "P4.2": { "parent": "P4", "...": "..." },
    "P4.3": { "parent": "P4", "...": "..." },
    "P4.4": { "parent": "P4", "...": "..." }
  },
  "acte3": {
    "a": { "label": "...", "description": "...", "tonalite": "...", "effet": "...", "risque": "..." },
    "b": { "label": "...", "description": "...", "tonalite": "...", "effet": "...", "risque": "..." },
    "c": { "label": "...", "description": "...", "tonalite": "...", "effet": "...", "risque": "..." },
    "d": { "label": "...", "description": "...", "tonalite": "...", "effet": "...", "risque": "..." }
  },
  "acte4": {
    "α": { "label": "...", "description": "...", "scenario": "Sc1|Sc2|Sc3", "score": 3, "issue": "victoire|partielle|défaite partielle|défaite" },
    "β": { "label": "...", "description": "...", "scenario": "...", "score": 1, "issue": "..." },
    "γ": { "label": "...", "description": "...", "scenario": "...", "score": -1, "issue": "..." },
    "δ": { "label": "...", "description": "...", "scenario": "...", "score": -2, "issue": "..." }
  },
  "chemins": [
    {
      "id": "P1-P1.1-A3a-A4α",
      "acte1": "P1",
      "acte2": "P1.1",
      "acte3": "a",
      "acte4": "α",
      "score": 3,
      "scenario_final": "✅ Sc1 Victoire",
      "issue": "victoire"
    }
  ]
}
```

**Le tableau `chemins` contient EXACTEMENT 256 entrées (4×4×4×4).**
Le champ `id` suit le format : `P{1|2|3|4}-P{1|2|3|4}.{1|2|3|4}-A3{a|b|c|d}-A4{α|β|γ|δ}`

---

## PARTIE 3 – CHAMPS À IMPORTER DE LA FICHE ACTEUR

Avant de générer l'arbre, lire le fichier `[N]-[ID].json` de l'acteur et importer :

| Champ fiche acteur | Utilisation dans l'arbre |
|---|---|
| `positions_acte1.position1/2/3/4` | → Labels et descriptions des noeuds `acte1.P1/P2/P3/P4` |
| `objectifs.obtenir` | → Guide les `acte4` α et β (issues positives) |
| `objectifs.eviter` | → Guide les `acte4` γ et δ (issues négatives) |
| `contraintes.politiques` | → Influence `tonalite` et `risque` des noeuds |
| `contraintes.juridiques` | → Nourrit les positions impliquant secret-défense |
| `scenarios_sortie.succes` | → Description de `acte4.α` |
| `scenarios_sortie.echec` | → Description de `acte4.δ` |
| `rapport_forces.coalition_possible` | → Calibre les scores des issues α/β/γ/δ |
| `citation` | → Peut alimenter `acte1.P1.description` |

---

## PARTIE 4 – RÈGLES DE COHÉRENCE ARBRE

### R-A1 – Acte 1 = positions_acte1 de la fiche
Les 4 positions P1/P2/P3/P4 de l'arbre DOIVENT correspondre exactement aux
`positions_acte1.position1/2/3/4` de la fiche acteur JSON.

### R-A2 – Acte 2 = dérivé cohérent de l'Acte 1
Chaque groupe P1.x, P2.x, P3.x, P4.x doit être narrativement cohérent avec
sa position parente dans l'Acte 1. La tonalité doit rester dans la même logique
(ex : P1 "conciliant" → P1.x ne peut pas être "agressif").

### R-A3 – Acte 3 = 4 postures de négociation rapport
Les 4 postures (a/b/c/d) sont UNIVERSELLES pour tous les acteurs mais leurs
descriptions doivent être adaptées au point de vue de l'acteur :
- `a` = concession de forme (cosmétique)
- `b` = concession partielle (un volet seulement)
- `c` = clôture rapide (agenda propre)
- `d` = blocage / résistance maximale

### R-A4 – Acte 4 = issues selon scénario R6
Les scores des issues doivent refléter le scénario cible de l'acteur (consignes-v3.md R6) :
- Acteurs Sc1 : α=+3, β=+1, γ=-1, δ=-2
- Acteurs Sc2 : α=-2, β=-1, γ=+1, δ=+3 (inversion)
- Acteurs Sc3 : α=-1, β=+1, γ=+2, δ=-2 (propre grille)
- Acteurs neutres (ANSSI, Justice) : α=+2, β=+2, γ=-1, δ=-2

### R-A5 – 256 chemins complets
Le tableau `chemins` est généré AUTOMATIQUEMENT par itération sur
4×4×4×4 combinaisons. Ne pas le rédiger à la main.
`scenario_final` est déduit de (acte1, acte3, acte4) selon la logique R-A4.

---

## PARTIE 5 – AVANCEMENT ARBRES

| # | ID | Type | Scénario | Statut |
|---|---|---|---|---|
| 1 | AN_majorite | Membre | Sc1 | ✅ OK |
| 2 | AN_opposition_droite | Membre | Sc1/Sc3 | ⭕ |
| 3 | AN_opposition_gauche | Membre | Sc2 | ⭕ |
| 4 | Senat_majorite | Membre | Sc1/Sc2 | ⭕ |
| 5 | Senat_opposition | Membre | Sc2 | ⭕ |
| 6 | ED | Membre | Sc3 | ⭕ |
| 7 | Armees | Témoin | Sc1 | ⭕ |
| 8 | Interieur | Témoin | Sc1 | ⭕ |
| 9 | Justice | Témoin | Sc1/Sc2 | ⭕ |
| 10 | CNIL | Témoin | Sc2 | ⭕ |
| 11 | ANSSI | Témoin | Sc1/Sc2 | ⭕ |
| 12 | DGSI | Témoin | Sc1 | ⭕ |
| 13 | CYPHERA | Témoin | Sc1 | ⭕ |
| 14 | Medias | Témoin | Sc2 | ⭕ |

---

## PARTIE 6 – PROMPT MODÈLE

```
Génère le fichier `arbre_decisions_[ID].json` pour l'acteur [ID]
en respectant STRICTEMENT la consigne arbre v1.0.

DONNÉES SOURCE à lire dans `[N]-[ID].json` :
- positions_acte1 → noeuds acte1.P1/P2/P3/P4
- objectifs → issues acte4 α/δ
- contraintes → tonalite et risque
- scenarios_sortie → descriptions acte4 α et δ
- rapport_forces.coalition_possible → calibration scores

RÈGLES OBLIGATOIRES :
1. R-A1 : acte1.P1-P4 = positions_acte1 de la fiche
2. R-A2 : acte2 narrativement cohérent avec acte1
3. R-A3 : acte3 adapté au point de vue [ID]
4. R-A4 : scores acte4 conformes scénario [Sc1|Sc2|Sc3|neutre]
5. R-A5 : 256 chemins auto-générés, NE PAS rédiger à la main
6. Format id chemin : P{n}-P{n}.{n}-A3{x}-A4{y}

Retourne uniquement le JSON valide, sans commentaire.
```
