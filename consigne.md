# 🔍 PHASE ENQUÊTE - Commission CYPHERA SECURITY

## Objectif global
Simuler une commission d'enquête parlementaire réelle : **auditions → rapport → débat final**. Respecter statuts et contraintes des 14 groupes (fiches JSON).

## Règles générales
- **Durée** : 4 actes (1h/actes)
- **Vote majoritaire** : 16 sièges (AN Maj 10, Sénat Maj 4)
- **Aucun PDF export** (phase test)
- **Notes obligatoires** : tous les groupes

---

# 🗳️ VOTES DYNAMIQUES - Commission CYPHERA

## Principe
**Votes main levée** → **Tableau interactif** → **Hémicycle temps réel** (16/30 majorité).

## Acte 1 : Bureau (Président + Rapporteur)
- **Candidats** : AN Gauche, Sénat Opp, AN Droite (Président) / DGSI, ANSSI (Rapporteur).
- **Majorité** : ≥16 voix pour être élu.

## Acte 3 : Vote Rapport final
- **POUR** = Adoption du rapport majoritaire.
- **CONTRE** = Soutien au texte minoritaire.
- **Majorité** : ≥16 voix pour adoption.

## Interface technique
- Saisie des voix par bloc parlementaire (max respecté).
- Visualisation graphique immédiate.
