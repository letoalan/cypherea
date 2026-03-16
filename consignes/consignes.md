# CONSIGNE – GÉNÉRATION FICHES JSON CYPHERA
# Version 1.0 – 12/03/2026

---

## CONTEXTE SCÉNARIO

L'affaire CYPHERA oppose sécurité nationale (surveillance cybernétique État/privé)
et libertés publiques (journalistes, chercheurs, ONG surveillés).
Révélée par le Canard Enchaîné → création commission d'enquête Assemblée nationale.
Trois scénarios : 1.Minimaliste (majorité), 2.Contrôle (gauche), 3.Singapour (droite/RN).

---

## 14 ACTEURS EXACTS (immuables)

### MEMBRES COMMISSION (30 sièges)
| ID                  | Acteur                              | Type    | Rôle                              | Sièges |
|---------------------|-------------------------------------|---------|-----------------------------------|--------|
| AN_majorite         | AN – majorité présidentielle        | Membre  | Défend exécutif                   | 10     |
| AN_droite           | AN – opposition droite              | Membre  | Accent sécurité                   | 5      |
| AN_gauche           | AN – opposition gauche              | Membre  | Accent libertés                   | 4      |
| Senat_majorite      | Sénat – majorité                    | Membre  | Équilibre institutionnel          | 4      |
| Senat_opposition    | Sénat – opposition                  | Membre  | Contrôle renforcé                 | 2      |
| Extreme_droite      | Groupe extrême droite               | Membre  | Patriot Act singapourien          | 5      |

### TÉMOINS (hors sièges)
| ID                  | Acteur                              | Type    | Rôle                              |
|---------------------|-------------------------------------|---------|-----------------------------------|
| Min_Armees          | Ministère des Armées / COMCYBER     | Témoin  | Défense opérationnelle            |
| Min_Interieur       | Ministère de l'Intérieur            | Témoin  | Sécurité intérieure               |
| Min_Justice         | Ministère de la Justice             | Témoin  | État de droit                     |
| CNIL                | CNIL                                | Témoin  | RGPD / données personnelles       |
| ANSSI               | ANSSI                               | Témoin  | Cybersécurité technique           |
| DGSI                | DGSI                                | Témoin  | Renseignement intérieur           |
| CYPHERA             | CYPHERA SECURITY                    | Témoin  | Partenaire privé État             |
| Journalistes        | Journalistes et médias / Syndicats  | Témoin  | Liberté presse / agents           |

---

## STRUCTURE JSON OBLIGATOIRE

Toute fiche doit respecter EXACTEMENT cette structure :

```json
{
  "id": "ID_UNIQUE",
  "acteur": "NOM EXACT (tableau ci-dessus)",
  "identite": {
    "groupe": "Composition détaillée",
    "type": "Membre commission | Témoin",
    "sieges_commission": 0,
    "fonction": "Rôle précis dans commission",
    "place_republique": "Position institutionnelle Ve République"
  },
  "interets": {
    "materiels": "Budgets, contrats, pouvoirs concrets",
    "symboliques": "Image, idéologie, doctrine",
    "electorat": "Base sociale (groupes parlementaires) | N/A (témoins)"
  },
  "position_cyphera": {
    "reaction_initiale": "Réaction publique au scandale (col. tableau)",
    "discours": "Discours officiel tenu",
    "narratif": "Histoire racontée pour justifier position",
    "mots_cles": ["MC1", "MC2", "MC3"]
  },
  "contraintes": {
    "politiques": "Alliances, électorat, pression groupe",
    "juridiques": "Secret-défense, RGPD, immunités, devoir réserve",
    "strategiques": "Ne pas perdre la face, préserver budgets"
  },
  "objectifs": {
    "obtenir": ["OBJ1", "OBJ2", "OBJ3"],
    "eviter": ["ÉVIT1", "ÉVIT2"]
  },
  "positions_acte1": {
    "position1": "Position 1 (col. tableau)",
    "position2": "Position 2 (col. tableau)",
    "position3": "Position 3 (col. tableau)",
    "position4": "Position 4 (col. tableau)"
  },
  "rapport_forces": {
    "membres_commission": [
      {"groupe": "AN_majorite",      "sieges": 10, "statut": "✅|⚠️|❌"},
      {"groupe": "AN_droite",        "sieges": 5,  "statut": "✅|⚠️|❌"},
      {"groupe": "AN_gauche",        "sieges": 4,  "statut": "✅|⚠️|❌"},
      {"groupe": "Senat_majorite",   "sieges": 4,  "statut": "✅|⚠️|❌"},
      {"groupe": "Senat_opposition", "sieges": 2,  "statut": "✅|⚠️|❌"},
      {"groupe": "Extreme_droite",   "sieges": 5,  "statut": "✅|⚠️|❌"}
    ],
    "total_sieges": 30,
    "coalition_possible": "X/30 (explication)",
    "temoins": {
      "soutiens": [],
      "menaces":  [],
      "ambigu":   []
    }
  },
  "axes_intervention": {
    "questions_types": ["Q1", "Q2", "Q3"],
    "cibles_privilegiees": "Acteurs ciblés en priorité"
  },
  "points_tension": [
    "TENSION1",
    "TENSION2",
    "TENSION3"
  ],
  "scenarios_sortie": {
    "succes": "Ce que l'acteur considère comme victoire",
    "echec": "Ce que l'acteur redoute"
  },
  "citation": "« Citation typique du groupe »",
  "encadre_pedagogique": "Mise en perspective Ve République + sources"
}
RÈGLES DE COHÉRENCE OBLIGATOIRES
R1 – IDs immuables
Utiliser UNIQUEMENT les IDs du tableau ci-dessus.
Ne jamais inventer de nouveaux acteurs.

R2 – Sièges fixes (total = 30)
AN_majorite=10 | AN_droite=5 | AN_gauche=4 |
Senat_majorite=4 | Senat_opposition=2 | Extreme_droite=5

R3 – Témoins = 0 siège
Les 8 témoins n'ont PAS de sièges (sieges_commission=0).
Ils apparaissent UNIQUEMENT dans rapport_forces.temoins.

R4 – Positions Acte 1
Les 4 positions DOIVENT correspondre exactement aux colonnes du tableau de référence.

R5 – Rapport forces
Chaque fiche DOIT contenir les 6 groupes parlementaires + les 8 témoins.
Le statut reflète la perspective DE l'acteur concerné :
✅ Allié | ⚠️ Tactique/Neutre | ❌ Adversaire

R6 – Scénarios cohérents
Position scénario :

AN_majorite / Min_* → Scénario 1 (minimaliste)

AN_gauche / CNIL / Journalistes → Scénario 2 (contrôle)

Extreme_droite / AN_droite → Scénario 3 (Singapour)

Senat_* → Équilibre Sc1/Sc2

AVANCEMENT FICHES
#	ID	Acteur	Statut
1	AN_majorite	AN – majorité présidentielle	✅ OK
2	AN_droite	AN – opposition droite	⭕
3	AN_gauche	AN – opposition gauche	⭕
4	Senat_majorite	Sénat – majorité	⭕
5	Senat_opposition	Sénat – opposition	⭕
6	Extreme_droite	Groupe extrême droite	⭕
7	Min_Armees	Ministère des Armées	⭕
8	Min_Interieur	Ministère de l'Intérieur	⭕
9	Min_Justice	Ministère de la Justice	⭕
10	CNIL	CNIL	⭕
11	ANSSI	ANSSI	⭕
12	DGSI	DGSI	⭕
13	CYPHERA	CYPHERA SECURITY	⭕
14	Journalistes	Journalistes / Syndicats	⭕
PROMPT MODÈLE (à adapter pour chaque fiche)
text
Génère la fiche JSON pour l'acteur [ID] en respectant :
1. Structure exacte consigne.md
2. Scénario CYPHERA (sécurité vs libertés, Canard Enchaîné, Russie, Singapour)
3. Sièges fixes R2 : AN_majorite=10, AN_droite=5, AN_gauche=4,
   Senat_majorite=4, Senat_opposition=2, Extreme_droite=5
4. Positions Acte 1 du tableau de référence
5. Rapport forces du point de vue de [ID]
6. Scénario de sortie cohérent avec R6

contenu de 1-AN-majo.json
{
  "id": "AN_majorite",
  "acteur": "Assemblée nationale – majorité présidentielle",
  "identite": {
    "groupe": "Renaissance + Horizons + MoDem",
    "type": "Membre commission",
    "sieges_commission": 10,
    "fonction": "Défense exécutif, rapporteur probable",
    "place_republique": "Majorité relative AN → dépendance LR tactique"
  },
  "interets": {
    "materiels": "Préservation budgets ANSSI/DGSI, contrats CYPHERA",
    "symboliques": "Loyauté exécutif, image gouvernement responsable",
    "electorat": "Classes moyennes, urbains modérés"
  },
  "position_cyphera": {
    "reaction_initiale": "Surpris, inquiet de l'impact politique, mais défend la nécessité de la cybersurveillance",
    "discours": "Maladresses techniques, encadrement suffisant, pas dérive systémique",
    "narratif": "Commission = preuve de transparence démocratique",
    "mots_cles": ["transparence", "menace russe", "proportionnalité", "encadrement"]
  },
  "contraintes": {
    "politiques": "Fidélité au président (art. 67), élections imminentes",
    "juridiques": "Secret-défense (L2312-8), immunité présidentielle",
    "strategiques": "Éviter crise gouvernementale, ne pas fragiliser Conseil défense"
  },
  "objectifs": {
    "obtenir": [
      "Commission perçue comme preuve de transparence",
      "Rapport minimaliste : recos techniques sans remise en cause",
      "Protection ministres (auditions cadrées)"
    ],
    "eviter": [
      "Transmission au Procureur de la République",
      "QPC lois renseignement",
      "Mise en cause directe Élysée/Conseil défense"
    ]
  },
  "positions_acte1": {
    "position1": "Prise de conscience prudente : reconnaît un problème, défend commission comme transparence",
    "position2": "Minimisation : relativise portée, insiste sur menace russe",
    "position3": "Responsabilité partagée : reconnaît erreurs communication, pas de stratégie",
    "position4": "Offensive politique : accuse opposition/société civile de dénoncer sans nuance"
  },
  "rapport_forces": {
    "membres_commission": [
      {"groupe": "AN majorité prés.",     "sieges": 10, "statut": "✅ Ferme"},
      {"groupe": "AN opposition droite",  "sieges": 5,  "statut": "✅ Allié clé"},
      {"groupe": "Extrême droite",        "sieges": 5,  "statut": "⚠️ Tactique"},
      {"groupe": "AN opposition gauche",  "sieges": 4,  "statut": "❌ Adversaire"},
      {"groupe": "Sénat majorité",        "sieges": 4,  "statut": "✅ Soutien"},
      {"groupe": "Sénat opposition",      "sieges": 2,  "statut": "❌ Adversaire"}
    ],
    "total_sieges": 30,
    "coalition_possible": "19/30 (majorité + droite + Sénat maj.)",
    "temoins": {
      "soutiens":  ["Armées/COMCYBER", "Intérieur", "DGSI", "ANSSI"],
      "menaces":   ["CNIL", "Journalistes", "Syndicats"],
      "ambigu":    ["CYPHERA SECURITY", "Justice"]
    }
  },
  "axes_intervention": {
    "questions_types": [
      "À CNIL : « Votre rigueur RGPD n'affaiblit-elle pas la lutte contre la Russie ? »",
      "Aux Journalistes : « Vos sources sont-elles fiables et vérifiées ? »",
      "À CYPHERA : « Confirmez-vous la conformité technique de vos outils ? »"
    ],
    "cibles_privilegiees": "Délégitimer CNIL, ONG, journalistes ; protéger ministères"
  },
  "points_tension": [
    "Surveillance de journalistes innocents documentée",
    "Contrats CYPHERA classés secret-défense de façon illégale",
    "Contradiction entre rôle de contrôleur et loyauté à l'exécutif"
  ],
  "scenarios_sortie": {
    "succes": "Rapport minimaliste adopté, gouvernement blanchi, CYPHERA encadré",
    "echec": "QPC + crise ministérielle + transmission pénale"
  },
  "citation": "« La commission prouve notre transparence. Encadrons CYPHERA sans affaiblir notre sécurité. »",
  "encadre_pedagogique": "Majorité relative AN 2026 : Ensemble+LR contrôlent commission. RN souverainiste = allié tactique. Rapport = avis non contraignant (art. 140 Règlement AN)."
}

Eléments sur l'affaire fictive cyphera :

1. L’affaire CYPHERA et sa révélation
Depuis plusieurs années, l’État français a discrètement noué un partenariat stratégique avec l’entreprise privée CYPHERA SECURITY, spécialisée dans l’analyse massive de données numériques et la cybersurveillance « prédictive ». Le dispositif, officiellement présenté comme un simple renforcement des capacités de cybersécurité face à des menaces étrangères, est couvert par le secret‑défense et intégré à un programme interministériel piloté par le ministère des Armées et le ministère de l’Intérieur.
En réalité, CYPHERA SECURITY a mis en place, à la demande de l’exécutif, une série d’algorithmes capables de croiser des métadonnées de connexion, des données de géolocalisation, des contenus de réseaux sociaux et des bases de données administratives pour établir des profils de « risque » supposés utiles à la lutte contre le terrorisme, l’ingérence étrangère et la « radicalisation » sous toutes ses formes.

Le problème survient lorsque les objectifs initiaux débordent très largement. Sous la pression de certains conseillers de l’Élysée et de responsables de la Direction du renseignement, les outils de CYPHERA sont progressivement utilisés pour surveiller non seulement des cibles étrangères ou terroristes, mais aussi des journalistes d’investigation, des chercheurs en sciences politiques travaillant sur l’influence russe, et plusieurs ONG engagées sur les questions de libertés publiques, de transparence et de corruption.
Des rapports internes montrent que la frontière entre surveillance extérieure et surveillance intérieure s’est effacée : des listes de « profils sensibles » incluent des parlementaires d’opposition, des syndicalistes, des avocats engagés dans des contentieux contre l’État, ainsi que des personnels d’organes de contrôle (CNIL, Défenseur des droits).

C’est un lanceur d’alerte, ingénieur sous‑traitant de CYPHERA SECURITY, qui amorce la crise. Choqué de voir ses outils détournés, il contacte discrètement une journaliste du Canard Enchaîné. Pendant plusieurs semaines, il lui fournit des extraits de documents techniques : schémas d’architecture, notes de réunion entre l’entreprise et les cabinets ministériels, présentations PowerPoint vantant la « cartographie des opposants » ou la capacité à « neutraliser l’influence hostile sur le territoire national ».
Le Canard recoupe ces informations avec d’autres sources – notamment une fuite partielle de contrats publics et des traces de marchés passés en procédure accélérée au profit de CYPHERA SECURITY – puis décide de publier une première une explosive : « CYPHERA : quand l’État surveille ses journalistes au nom de la sécurité nationale ».

La publication déclenche immédiatement un tumulte médiatique. Les ministères concernés parlent d’« extrapolations absurdes » et de « confusions regrettables ». Le porte‑parole du gouvernement invoque la nécessité de protéger le pays contre « des campagnes massives de désinformation orchestrées depuis l’étranger », sans jamais nier formellement l’existence du programme.
Dans les rédactions, la colère monte : plusieurs journalistes réalisent que leurs déplacements, leurs rendez‑vous et certaines communications chiffrées ont pu être tracés. Des syndicats de journalistes déposent plainte, des ONG saisissent la CNIL, et des parlementaires d’opposition demandent la déclassification intégrale des contrats signés avec CYPHERA SECURITY. Très vite, la question ne porte plus seulement sur un programme technique, mais sur une possible dérive systémique de l’appareil d’État.

Au Parlement, l’affaire est récupérée par plusieurs groupes. La majorité parlementaire tente d’étouffer le scandale en parlant de « polémique politicienne avant les élections européennes », tandis que l’extrême droite réclame paradoxalement « plus de surveillance assumée » mais « sous contrôle du peuple ». Les groupes de gauche, eux, dénoncent un « Patriot Act à la française » et exigent des explications publiques de la part du gouvernement.
Face à l’ampleur de la polémique et à la multiplication des recours devant les juridictions nationales et européennes, le président de l’Assemblée nationale ne peut plus ignorer la situation : les présidents de plusieurs groupes déposent alors une proposition de résolution visant à créer une commission d’enquête parlementaire sur le dispositif CYPHERA.

2. La commission parlementaire dans le cadre institutionnel de la Ve République
Dans la Ve République, la commission d’enquête CYPHERA s’inscrit dans un ordre institutionnel où le Parlement, bien que théoriquement souverain, est structurellement subordonné à la prééminence de l’exécutif. Créée selon l’article 140 et suivants du Règlement de l’Assemblée nationale, elle relève d’une procédure précise : dépôt d’une proposition de résolution en Conférence des présidents, examen en séance publique, puis constitution officielle avec une durée limitée (6 mois maximum).

Composition et fonctionnement : La commission compte 30 membres proportionnellement aux groupes parlementaires (majorité : ~55%, opposition : ~45%), présidée par un député d’opposition (usage pour garantir l’impartialité) et dotée d’un rapporteur issu de la majorité. Elle siège au Palais Bourbon, dans une salle dédiée, avec secrétariat permanent et pouvoir d’audition sous serment. Ses pouvoirs spécifiques incluent :

Demande de tous documents (contrats, rapports techniques, notes internes)

Auditions publiques ou à huis clos (ministres, PDG CYPHERA, CNIL, ANSSI, journalistes)

Visites sur place (locaux CYPHERA, COMCYBER)

Transmission au Procureur de faits délictueux

Rapport avec l’exécutif : Le gouvernement peut opposer le secret-défense (art. L2312-8 Code de la défense), bloquant l’accès à certains documents. Les ministres auditionnés bénéficient de l’immunité de fonction et ne peuvent être poursuivis sur leurs déclarations. Le président de la République reste intouchable constitutionnellement (art. 67), mais le Conseil de défense peut être indirectement mis en cause via ses membres auditionnés.

Interactions institutionnelles :

Institution	Rôle face à la commission	Pouvoirs/Limites
CNIL	Contrôle données personnelles	Avis consultatif, saisine possible
ANSSI	Expertise technique cybersécurité	Secret-défense fréquent
Conseil constitutionnel	Contrôle lois renseignement	QPC post-rapport
Cour des comptes	Contrats publics CYPHERA	Rapports complémentaires
Limites structurelles : Contrairement au modèle américain (Watergate), la commission française ne dispose d’aucune force exécutoire. Son rapport peut être rejeté par l’exécutif (« rang d’avis » constitutionnel) ou noyé dans le flot législatif. L’article 49-3 permet au gouvernement de passer outre le Parlement. Seule une saisine du juge pénal ou une QPC (Question prioritaire de constitutionnalité) peut donner suite juridique.

3. Conséquences et enjeux possibles
La commission CYPHERA produit un rapport dont les conclusions varient selon l’équilibre politique interne. Trois scénarios émergent :

Scénario 1 – Minimaliste (majorité) : « Encadrement renforcé » des partenariats public-privé. Recommandations techniques : contrôle CNIL accru, information semestrielle du Parlement, comité d’éthique interministériel. Responsabilité gouvernementale diluée (« maladresses administratives »).

Scénario 2 – Ambitieux (gauche) : Dérives structurelles. Refonte loi renseignement 2015, partage compétences avec le juge judiciaire, contrôle parlementaire temps réel. Responsabilité claire : démissions DGSE/DGSI, sanctions pénales contrats illégaux.

Scénario 3 – Modèle singapourien (droite + extrême droite + médias d'opinion) : « Patriot Act à la française » assumé, inspiré du modèle Singapour. L'extrême droite (RN) et la droite (LR) réclament une sécurité intérieure/extérieure totale, justifiée par « l'agressivité informationnelle russe et les attaques non conventionnelles terroristes ».

Responsibilities:
Président : arbitrage Conseil défense (intouchable pénalement, mais mise en cause politique)
Premier ministre : validation opérationnelle (démission possible)
Ministres concernés (Intérieur, Armées) : instruction donnée (poursuites pénalement possibles)
Cabinets : pression sur agences (risque déontologique)

Conséquences judiciaires possibles :
Pénal : transmission Procureur (abus pouvoir, atteinte secret professionnel journalistes)
Administratif : recours CNIL, sanctions RGPD (amendes 4% CA CYPHERA)
Constitutionnel : QPC lois renseignement par ONG
Européen : CEDH saisie (art. 8, 10) par journalistes

Enjeux législatifs : Le rapport peut déboucher sur une proposition de loi portée par le rapporteur. La majorité peut l’amender ou la bloquer en commission. Une loi organique modifierait les pouvoirs des commissions d’enquête (force contraignante).

Effets politiques : Le temps parlementaire (6 mois) coïncide avec le cycle électoral. La commission devient enjeu électoral : la majorité minimise, l’opposition amplifie, l’extrême droite récupère le narratif « État faible ». Le président, bien que constitutionnellement protégé, subit l’usure médiatique si des éléments accablants filtrent.

4. La création de la commission parlementaire
La procédure se met en marche dans le cadre prévu par le règlement de l’Assemblée. Une proposition de résolution est déposée conjointement par plusieurs groupes d’opposition, avec un intitulé soigneusement calibré : « Commission d’enquête relative aux conditions de conception, de déploiement et de contrôle démocratique du partenariat entre l’État et CYPHERA SECURITY ».
Le texte précise l’objet de la commission, sa durée (six mois), le nombre de membres, ainsi que la volonté explicite d’auditionner les principaux responsables politiques, les dirigeants de l’entreprise, les autorités de contrôle (CNIL, ANSSI), des journalistes, des chercheurs et des représentants d’ONG.

En Conférence des présidents, les tensions sont fortes. La majorité cherche à restreindre le périmètre de la commission au seul volet « cybersécurité » et à éviter toute mise en cause directe de l’Élysée ou du Conseil de défense. L’opposition exige au contraire un champ large, incluant les aspects financiers, les responsabilités ministérielles et les éventuelles pressions sur la presse.
Après plusieurs jours de tractations, un compromis est trouvé : la commission sera instituée, mais son intitulé sera légèrement resserré sur « le respect des libertés publiques et des principes démocratiques ». Dans les faits, cela laisse une marge d’investigation importante, tout en donnant à la majorité l’impression de garder le contrôle du cadre.

Vient ensuite la question cruciale de la composition politique de la commission. Conformément aux usages, les sièges sont répartis à la proportionnelle des groupes. La majorité obtient un nombre de sièges important, mais accepte, sous la pression médiatique, de laisser la présidence de la commission à un député d’opposition, issu d’un groupe charnière, tandis que le rapporteur sera choisi dans les rangs de la majorité pour garantir un certain équilibre.
Ce choix est stratégique : la présidence d’opposition donne des gages de neutralité, mais la majorité espère garder la main sur la rédaction finale du rapport grâce à son rapporteur.

Une fois la résolution adoptée en séance publique, la commission d’enquête CYPHERA est officiellement créée. Elle dispose alors des pouvoirs classiques : audition sous serment, droit de demander la communication de documents, visites sur place, possibilité de transmettre les faits susceptibles de constituer des infractions au Procureur de la République.
Dès sa première réunion constitutive, les enjeux apparaissent : certains membres veulent aller très vite, d’autres cherchent déjà à limiter les dégâts politiques ou à instrumentaliser la commission pour défendre une vision très sécuritaire de l’État et du numérique.

