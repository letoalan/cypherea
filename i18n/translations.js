/**
 * Centralized translations for the CYPHERA simulation.
 */
let translations = {
    fr: {
        title: "Simulation Parlementaire – Affaire CYPHERA",
        tab_objectives: "Objectifs – Affaire CYPHERA",
        tab_repartition: "Répartition – Affaire CYPHERA",
        tab_simulation: "Simulation – Affaire CYPHERA",
        nav_home: "Accueil",
        nav_objectives: "Objectifs",
        nav_distribution: "Répartition",
        nav_simulation: "Simulation",
        nav_scenario: "Scénario",
        nav_actors: "Acteurs",
        nav_negotiation: "Négociation",
        footer_text: "2026 Simulation Parlementaire CYPHERA - Outil Pédagogique - Alan Duval",

        // Home Carousel
        slide1_title: "Bienvenue dans l'Affaire CYPHERA",
        slide1_text: "Plongez au cœur d'un scandale d'État mêlant cyber-défense et ingérence étrangère.",
        slide2_title: "Sécurité vs Liberté",
        slide2_text: "Analysez les dilemmes entre protection nationale et respect des libertés individuelles.",
        slide3_title: "Votre Rôle",
        slide3_text: "Incarnez un acteur clé et participez à une commission d'enquête sur 4 actes intenses.",
        slide4_title: "Présentation Vidéo",
        slide4_text: "Découvrez l'enjeu de la simulation en images.",

        // Roles
        role_1: "Assemblée nationale – majorité présidentielle",
        role_2: "Assemblée nationale – opposition de droite",
        role_3: "Assemblée nationale – opposition de gauche",
        role_4: "Sénat – majorité",
        role_5: "Sénat – opposition",
        role_6: "Ministère des Armées / COMCYBER",
        role_7: "Ministère de l’Intérieur",
        role_8: "Ministère de la Justice",
        role_9: "CNIL",
        role_10: "ANSSI",
        role_11: "DGSI",
        role_12: "CYPHERA SECURITY",
        role_13: "Journalistes et médias",
        role_14: "Groupe parlementaire d’extrême droite",

        // Repartition UI
        rep_title: "Répartition des Rôles",
        rep_upload: "Charger la liste (Excel .xlsx)",
        rep_template_btn: "Télécharger le Modèle (Excel .xlsx)",
        rep_btn: "Répartir les Rôles",
        rep_download: "Télécharger la Répartition",
        rep_name: "Nom",
        rep_role: "Rôle",
        rep_group: "Groupe",
        rep_pos_acte1: "Position Acte 1",
        rep_view_table: "Vue Tableau",
        rep_view_dynamic: "Vue Dynamique",
        cat_an: "Assemblée Nationale",
        cat_senat: "Sénat",
        cat_etat: "Acteurs Étatiques",
        cat_societe: "Société Civile",

        // Simulation Page
        sim_hero_title: "Simulation Commission CYPHERA",
        sim_hero_subtitle: "Acte 1 : Création de la commission",
        sim_tab1: "Acte 1",
        sim_tab2: "Acte 2",
        sim_tab3: "Acte 3",
        sim_tab4: "Acte 4",

        // Main Simulation Tabs
        sim_main_tab1: "L'Affaire",
        sim_main_tab2: "Présentation",
        sim_main_tab3: "Acteurs & Objectifs",
        sim_main_tab4: "L'Enquête",

        // Sub-tabs labels
        sim_sub_reve: "Révélations",
        sim_sub_cons: "Conséquences",
        sim_sub_crea: "Création",
        sim_sub_cadre: "Cadre",

        // L'Affaire (mainTab1)
        sim_affaire_title1: "1. L’affaire CYPHERA et sa révélation",
        sim_affaire_desc1: `
            <p>Depuis plusieurs années, l’État français a discrètement noué un partenariat stratégique avec l’entreprise privée CYPHERA SECURITY, spécialisée dans l’analyse massive de données numériques et la cybersurveillance « prédictive ». Le dispositif est couvert par le secret‑défense et piloté par les ministères des Armées et de l’Intérieur.</p>
            <p>CYPHERA a mis en place des algorithmes capables de croiser métadonnées, géolocalisation et données administratives pour établir des profils de « risque ». Le problème survient lorsque ces outils sont utilisés pour surveiller des journalistes d’investigation, des chercheurs travaillant sur l’influence russe, et plusieurs ONG.</p>
            <p>Un lanceur d’alerte, ingénieur chez CYPHERA, a contacté une journaliste du <i>Canard Enchaîné</i> pour dénoncer le détournement de ces outils. La publication d'une une explosive : « CYPHERA : quand l’État surveille ses journalistes » a déclenché un séisme médiatique et politique, menant à la création de cette commission d'enquête.</p>
        `,
        sim_affaire_title2: "2. La réaction du Parlement",
        sim_affaire_desc2: `
            <p>La procédure se met en marche dans le cadre prévu par le règlement de l’Assemblée. Une proposition de résolution est déposée conjointement par plusieurs groupes d’opposition, avec un intitulé soigneusement calibré : « Commission d’enquête relative aux conditions de conception, de déploiement et de contrôle démocratique du partenariat entre l’État et CYPHERA SECURITY ».</p>
            <p>Le texte précise l’objet de la commission, sa durée (six mois), le nombre de membres, ainsi que la volonté explicite d’auditionner les principaux responsables politiques, les dirigeants de l’entreprise, les autorités de contrôle (CNIL, ANSSI), des journalistes, des chercheurs et des représentants d’ONG.</p>
            <p>Conformément aux usages, les sièges sont répartis à la proportionnelle des groupes. La majorité obtient un nombre de sièges important, mais accepte de laisser la présidence à l’opposition tandis que le rapporteur sera choisi dans les rangs de la majorité pour garantir un équilibre.</p>
        `,

        // Présentation (mainTab2)
        sim_pres_title1: "1. Origines et Objectifs",
        sim_pres_desc1: `
            <p>La commission est née de la nécessité de faire toute la lumière sur le partenariat CYPHERA. Elle doit auditionner les responsables politiques et dirigeants d'entreprise pour comprendre comment des outils de surveillance ont été détournés.</p>
            <p>Les auditions se déroulent sous serment et les membres disposent de pouvoirs d'enquête étendus (visites sur place, communication de documents confidentiels).</p>
        `,
        sim_pres_title2: "2. Cadre institutionnel de la Ve République",
        sim_pres_desc2: `
            <p>La commission d’enquête CYPHERA s’inscrit dans un ordre institutionnel où le Parlement est structurellement subordonné à l’exécutif. Créée selon l’article 140 du Règlement de l’Assemblée nationale, elle dispose de pouvoirs spécifiques :</p>
            <ul>
                <li>Audition sous serment (ministres, experts, témoins).</li>
                <li>Communication de documents (contrats, rapports internes).</li>
                <li>Droit de visite sur place (locaux CYPHERA).</li>
            </ul>
            <p><strong>Limites :</strong> Le gouvernement peut opposer le secret‑défense. Le Président de la République reste constitutionnellement irresponsable (Art. 67).</p>
        `,
        sim_pres_title3: "3. Conséquences et enjeux possibles",
        sim_pres_desc3: `
            <p>La commission CYPHERA doit produire un rapport dont les conclusions varient selon l’équilibre politique interne. Trois scénarios émergent :</p>
            <ul>
                <li><strong>Scénario 1 – Minimaliste :</strong> Recommandations techniques et contrôle CNIL accru, sans remise en cause politique majeure.</li>
                <li><strong>Scénario 2 – Ambitieux :</strong> Refonte de la loi renseignement 2015, sanctions pénales et démissions des chefs du renseignement.</li>
                <li><strong>Scénario 3 – Modèle singapourien :</strong> Création d'un « Patriot Act à la française » justifié par l'agressivité informationnelle étrangère.</li>
            </ul>
        `,

        acte1_title: "Acte 1 : Création de la Commission",
        acte1_step1_title: "1. Résolution",
        acte1_step1_desc: "Vote résolution Assemblée Nationale : objet, durée (6 mois), composition (14 membres).",
        acte1_step2_title: "2. Élection Président",
        acte1_step2_desc: "L'Opposition est souvent élue pour l'équilibre politique. Convoque les auditions et anime les débats.",
        acte1_step3_title: "3. Rapporteur",
        acte1_step3_desc: "Rédige le rapport final, enquête sur les pièces et sur le terrain. Rôle technique ou politique.",
        acte1_btn: "📥 Télécharger Procédure",

        acte2_title: "Acte 2 : Auditions & Confrontations",
        acte2_subtitle: "14 Groupes à Auditionner",
        acte2_questions_title: "Exemples de Questions",
        acte2_q1: "Ministère des Armées : 'Pourquoi avoir choisi CYPHERA SECURITY ? Quel contrôle parlementaire ?'",
        acte2_q2: "Journalistes : 'Vos sources sont-elles compromises ? Quel impact sur la liberté d'information ?'",

        acte3_title: "Acte 3 : Rédaction du Rapport",
        acte3_subtitle: "4 Positions Possibles par Groupe",
        pos_ed_title: "Extrême Droite",
        pos_ed_1: "Position 1 : Patriot Act français",
        pos_ed_2: "Position 2 : Modèle singapourien",
        pos_ed_3: "Position 3 : Contrôle strict médias/ONG",
        pos_ed_4: "Position 4 : Sécurité nationale > Libertés",

        acte4_title: "Acte 4 : Débat Final & Conséquences",
        acte4_eval_title: "Grille Évaluation (20pts)",
        eval_role: "Rôle Cohérent",
        eval_facts: "Faits CYPHERA",
        eval_questions: "Questions Pertinentes",
        eval_argumentation: "Argumentation",
        eval_total: "TOTAL",
        eval_score: "/20 pts",
        acte4_btn: "📥 PDF Grille Évaluation",

        // Objectifs Sections (3 Buttons)
        "objectifs.title": "Objectifs de la Simulation",
        "objectifs.subtitle": "Commission d'Enquête CYPHERA",
        "objectifs.pedagogiques": "A. Objectifs Pédagogiques",
        "objectifs.eleves": "B. Objectifs Élèves",
        "objectifs.evaluation": "C. Grille d'Évaluation",
        "pedagogiques.title": "A. Objectifs Pédagogiques",
        "pedagogiques.subtitle": "Compétences institutionnelles et analytiques",
        "pedagogiques.1.title": "⚖️ Institutions",
        "pedagogiques.1.desc": "Maîtriser le fonctionnement des commissions sous la Vᵉ République",
        "pedagogiques.2.title": "🗣️ Argumentation",
        "pedagogiques.2.desc": "Développer une argumentation politique nuancée sur les enjeux de sécurité",
        "pedagogiques.3.title": "🤝 Négociation",
        "pedagogiques.3.desc": "Pratiquer la négociation et le compromis institutionnel",
        "pedagogiques.4.title": "💻 Éthique & Droit",
        "pedagogiques.4.desc": "Analyser le dilemme entre cybersurveillance et État de droit",
        "eleves.title": "B. Objectifs pour les Élèves",
        "eleves.subtitle": "Préparation et évaluation concrètes",
        "eleves.1.title": "🎭 Incarner un rôle",
        "eleves.1.desc": "Incarner de manière réaliste l'un des 14 rôles attribués",
        "eleves.2.title": "📝 Préparer arguments",
        "eleves.2.desc": "Préparer des arguments adaptés à la position politique du rôle",
        "eleves.3.title": "⚖️ Comprendre les institutions",
        "eleves.3.desc": "Comprendre sa place et ses pouvoirs dans le cadre des institutions de la Ve République",
        "eleves.4.title": "🗳️ Participer débat",
        "eleves.4.desc": "Participer activement au débat démocratique structuré",

        // EVALUATION GRID KEYS (Detailed)
        "eval.title": "Grille d'Évaluation (20 points)",
        "eval.description": "Évaluation par groupe (2 élèves) sur 4 phases (5 pts/phase × 4 = 20 pts)",
        "eval.criteria": "Critère",
        "eval.description_col": "Description",
        "eval.0to1": "0-1 pt",
        "eval.2to3": "2-3 pts",
        "eval.4to5": "4-5 pts",
        "eval.criterion1": "1. Rôle",
        "eval.criterion2": "2. Faits CYPHERA",
        "eval.criterion3": "3. Questions/Réponses",
        "eval.criterion4": "4. Argumentation",
        "eval.desc1": "Cohérence/jeu du rôle attribué (position, intérêts, limites institutionnelles)",
        "eval.desc2": "Maîtrise scénario (ingérence russe, surveillance collatérale, 14 acteurs)",
        "eval.desc3": "Commission: questions incisives. Témoins: réponses cohérentes",
        "eval.desc4": "Dilemme sécurité/libertés, cohérence avec pouvoir du rôle",
        "eval.phase1": "Phase 1 : Création Commission (Acte 1)",
        "eval.phase2": "Phase 2 : Auditions (Acte 2)",
        "eval.phase3": "Phase 3 : Rapport (Acte 3)",
        "eval.phase4": "Phase 4 : Débat Final (Acte 4)",
        "eval.focus": "Focus",
        "eval.expected": "Attendus",
        "eval.scale": "Barème Détaillé",
        "eval.points": "Points",
        "eval.level": "Niveau",
        "eval.expectations": "Attentes",
        "eval.excellent": "Excellent",
        "eval.veryGood": "Très Bon",
        "eval.satisfying": "Satisfaisant",
        "eval.insufficient": "Insuffisant",
        "eval.instructions": "Instructions Professeur",
        "eval.inst1": "Évaluer par phase (5 colonnes horizontales)",
        "eval.inst2": "Cocher 4-5 pts : Excellent | 2-3 pts : Satisfaisant | 0-1 pt : À travailler",
        "eval.inst3": "Bonus transversaux (+4 pts max) : Sources, i18n, binôme équilibré",
        "eval.inst4": "Total final : ___/24 pts (grille + bonus)",
        "eval.download": "Télécharger PDF",
        "eval.print": "Imprimer"
    },
    en: {
        title: "Parliamentary Committee Simulator – CYPHERA Affair",
        tab_objectives: "Objectives – CYPHERA Affair",
        tab_repartition: "Distribution – CYPHERA Affair",
        tab_simulation: "Simulation – CYPHERA Affair",
        nav_home: "Home",
        nav_objectives: "Objectives",
        nav_distribution: "Distribution",
        nav_simulation: "Simulation",
        nav_scenario: "Scenario",
        nav_actors: "Actors",
        nav_negotiation: "Negotiation",
        footer_text: "2026 CYPHERA Parliamentary Simulation - Educational Tool - Alan Duval",

        // Carousel
        slide1_title: "Welcome to the CYPHERA Affair",
        slide1_text: "Dive into a state scandal involving cyber-defense and foreign interference.",
        slide2_title: "Security vs Liberty",
        slide2_text: "Analyze the dilemmas between national protection and individual freedoms.",
        slide3_title: "Your Role",
        slide3_text: "Take on a key role and participate in a parliamentary inquiry across 4 acts.",
        slide4_title: "Video Presentation",
        slide4_text: "Discover the stakes of the simulation in pictures.",

        // Simulation
        sim_hero_title: "CYPHERA Committee Simulation",
        sim_hero_subtitle: "Act 1: Creating the commission",
        sim_tab1: "Act 1",
        sim_tab2: "Act 2",
        sim_tab3: "Act 3",
        sim_tab4: "Act 4",

        // Main Simulation Tabs EN
        sim_main_tab1: "The Case",
        sim_main_tab2: "Overview",
        sim_main_tab3: "Actors & Objectives",
        sim_main_tab4: "The Inquiry",

        // Sub-tabs labels EN
        sim_sub_reve: "Revelations",
        sim_sub_cons: "Consequences",
        sim_sub_crea: "Creation",
        sim_sub_cadre: "Framework",

        // The Case (mainTab1)
        sim_affaire_title1: "1. The CYPHERA Affair and its Revelation",
        sim_affaire_desc1: `
            <p>For several years, the French State has discreetly established a strategic partnership with CYPHERA SECURITY, specializing in massive digital data analysis and "predictive" cyber-surveillance. The system is covered by national defense secrecy and led by the Ministries of the Armed Forces and the Interior.</p>
            <p>CYPHERA implemented algorithms capable of cross-referencing metadata, geolocation, and administrative databases to establish "risk" profiles. The crisis erupted when these tools were used to monitor investigative journalists, researchers, and NGOs.</p>
            <p>A whistleblower, an engineer at CYPHERA, leaked architectural diagrams and meeting notes to <i>Le Canard Enchaîné</i>. The front page "CYPHERA: when the State monitors its journalists" triggered a political storm, leading to this commission of inquiry.</p>
        `,
        sim_affaire_title2: "2. The Reaction of Parliament",
        sim_affaire_desc2: `
            <p>The procedure was initiated following a resolution proposal tabled by several opposition groups. The chosen title is: "Commission of inquiry into the conditions of design, deployment, and democratic control of the partnership between the State and CYPHERA SECURITY".</p>
            <p>The commission has six months to interview political leaders, company executives, and oversight authorities (CNIL, ANSSI). After tough negotiations, the presidency was granted to the opposition while the rapporteur is from the parliamentary majority.</p>
            <p>In accordance with custom, seats are allocated proportionally to the groups. The majority obtains a large number of seats but agrees to leave the presidency to the opposition while the rapporteur will be chosen from the ranks of the majority to ensure balance.</p>
        `,

        // Overview (mainTab2)
        sim_pres_title1: "1. Origins and Objectives",
        sim_pres_desc1: `
            <p>The commission was born from the need to shed full light on the CYPHERA partnership. It must interview political leaders and company executives to understand how surveillance tools were misused.</p>
            <p>Hearings are conducted under oath, and members have extensive investigative powers (on-site visits, communication of confidential documents).</p>
        `,
        sim_pres_title2: "2. Institutional Framework of the Fifth Republic",
        sim_pres_desc2: `
            <p>The CYPHERA inquiry commission is part of an institutional order where Parliament is structurally subordinated to the executive. Created according to Article 140 of the Rules of the National Assembly, it has specific powers:</p>
            <ul>
                <li>Audition under oath (ministers, experts, witnesses).</li>
                <li>Communication of documents (contracts, internal reports).</li>
                <li>Right to on-site visits (CYPHERA premises).</li>
            </ul>
            <p><strong>Limits:</strong> The government can invoke national defense secrecy. The President of the Republic remains constitutionally unaccountable (Art. 67).</p>
        `,
        sim_pres_title3: "3. Consequences and Possible Stakes",
        sim_pres_desc3: `
            <p>The CYPHERA commission produces a report whose conclusions vary according to the internal political balance. Three scenarios emerge:</p>
            <ul>
                <li><strong>Scenario 1 – Minimalist:</strong> Technical recommendations and increased CNIL control, without major political accountability.</li>
                <li><strong>Scenario 2 – Ambitious:</strong> Overhaul of the 2015 intelligence law, criminal sanctions, and resignations of intelligence heads.</li>
                <li><strong>Scenario 3 – Singaporean Model:</strong> Creation of a "French Patriot Act" justified by foreign informational aggression.</li>
            </ul>
        `,

        acte1_title: "Act 1: Creation of the Commission",
        acte1_step1_title: "1. Resolution",
        acte1_step1_desc: "National Assembly resolution vote: object, duration (6 months), composition (14 members).",
        acte1_step2_title: "2. Election of Chair",
        acte1_step2_desc: "The Opposition is often elected for political balance. Convenes hearings and leads debates.",
        acte1_step3_title: "3. Rapporteur",
        acte1_step3_desc: "Drafts the final report, investigates documents and on the ground. Technical or political role.",
        acte1_btn: "📥 Download Procedure",

        acte2_title: "Act 2: Hearings & Confrontations",
        acte2_subtitle: "14 Groups to Interview",
        acte2_questions_title: "Sample Questions",
        acte2_q1: "Ministry of Armed Forces: 'Why CYPHERA SECURITY? What parliamentary oversight?'",
        acte2_q2: "Journalists: 'Are your sources compromised? What impact on freedom of information?'",

        acte3_title: "Act 3: Drafting the Report",
        acte3_subtitle: "4 Possible Positions per Group",
        pos_ed_title: "Far Right",
        pos_ed_1: "Position 1: French Patriot Act",
        pos_ed_2: "Position 2: Singapore model",
        pos_ed_3: "Position 3: Strict control of media/NGOs",
        pos_ed_4: "Position 4: National security > Liberties",

        acte4_title: "Act 4: Final Debate & Consequences",
        acte4_eval_title: "Evaluation Grid (20pts)",
        eval_role: "Consistent Role",
        eval_facts: "CYPHERA Facts",
        eval_questions: "Relevant Questions",
        eval_argumentation: "Argumentation",
        eval_total: "TOTAL",
        eval_score: "/20 pts",
        acte4_btn: "📥 PDF Evaluation Grid",
        rep_view_table: "Table View",
        rep_view_dynamic: "Dynamic View",
        cat_an: "National Assembly",
        cat_senat: "Senate",
        cat_etat: "State Actors",
        cat_societe: "Civil Society",

        // Objectifs
        "objectifs.title": "Simulation Objectives",
        "objectifs.subtitle": "CYPHERA Inquiry Commission",
        "objectifs.pedagogiques": "A. Pedagogical Objectives",
        "objectifs.eleves": "B. Student Objectives",
        "objectifs.evaluation": "C. Evaluation Grid",
        "pedagogiques.title": "A. Pedagogical Objectives",
        "pedagogiques.subtitle": "Institutional and analytical skills",
        "pedagogiques.1.title": "⚖️ Institutions",
        "pedagogiques.1.desc": "Master the functioning of parliamentary commissions under the 5th Republic",
        "pedagogiques.2.title": "🗣️ Argumentation",
        "pedagogiques.2.desc": "Develop nuanced political argumentation on security issues",
        "pedagogiques.3.title": "🤝 Negotiation",
        "pedagogiques.3.desc": "Practice institutional negotiation and compromise",
        "pedagogiques.4.title": "💻 Ethics & Law",
        "pedagogiques.4.desc": "Analyze the dilemma between cyber-surveillance and the Rule of Law",
        "eleves.title": "B. Student Objectives",
        "eleves.subtitle": "Concrete preparation and evaluation",
        "eleves.1.title": "🎭 Realistic role portrayal",
        "eleves.1.desc": "Incarner de manière réaliste l'un des 14 rôles attribués",
        "eleves.2.title": "📝 Political argument preparation",
        "eleves.2.desc": "Prepare arguments adapted to the political position of the role",
        "eleves.3.title": "⚖️ Understand institutions",
        "eleves.3.desc": "Understand your place and powers within the framework of the institutions of the 5th Republic",
        "eleves.4.title": "🗳️ Structured democratic debate",
        "eleves.4.desc": "Participate actively in structural democratic debate",

        // EVALUATION GRID KEYS (Detailed EN)
        "eval.title": "Evaluation Grid (20 points)",
        "eval.description": "Group evaluation (2 students) over 4 phases (5 pts/phase × 4 = 20 pts)",
        "eval.criteria": "Criterion",
        "eval.description_col": "Description",
        "eval.0to1": "0-1 pt",
        "eval.2to3": "2-3 pts",
        "eval.4to5": "4-5 pts",
        "eval.criterion1": "1. Role",
        "eval.criterion2": "2. CYPHERA Facts",
        "eval.criterion3": "3. Q&A",
        "eval.criterion4": "4. Argumentation",
        "eval.desc1": "Consistency/role play (position, interests, limits)",
        "eval.desc2": "Scenario mastery (interference, surveillance, 14 actors)",
        "eval.desc3": "Commission: incisive questions. Witnesses: consistent answers",
        "eval.desc4": "Security/liberty dilemma, consistency with role power",
        "eval.phase1": "Phase 1: Commission Creation (Act 1)",
        "eval.phase2": "Phase 2: Hearings (Act 2)",
        "eval.phase3": "Phase 3: Report (Act 3)",
        "eval.phase4": "Phase 4: Final Debate (Act 4)",
        "eval.focus": "Focus",
        "eval.expected": "Expected",
        "eval.scale": "Detailed Scale",
        "eval.points": "Points",
        "eval.level": "Level",
        "eval.expectations": "Expectations",
        "eval.excellent": "Excellent",
        "eval.veryGood": "Very Good",
        "eval.satisfying": "Satisfactory",
        "eval.insufficient": "Insufficient",
        "eval.instructions": "Teacher Instructions",
        "eval.inst1": "Evaluate by phase (5 horizontal columns)",
        "eval.inst2": "Mark 4-5 pts: Excellent | 2-3 pts: Satisfactory | 0-1 pt: Work needed",
        "eval.inst3": "Transversal bonuses (+4 pts max): Sources, i18n, balanced pair",
        "eval.inst4": "Final total: ___/24 pts (grid + bonus)",
        "eval.download": "Download PDF",
        "eval.print": "Print"
    },
    de: {
        title: "Simulation Parlamentarischer Ausschuss – CYPHERA Affäre",
        tab_objectives: "Ziele – CYPHERA Affäre",
        tab_repartition: "Verteilung – CYPHERA Affäre",
        tab_simulation: "Simulation – CYPHERA Affäre",
        nav_home: "Startseite",
        nav_objectives: "Ziele",
        nav_distribution: "Verteilung",
        nav_simulation: "Simulation",
        nav_scenario: "Szenario",
        nav_actors: "Akteure",
        nav_negotiation: "Verhandlung",
        footer_text: "2026 CYPHERA Parlamentarische Simulation - Pädagogisches Tool - Alan Duval",

        // Objectives Page
        "objectifs.title": "Ziele der Simulation",
        "objectifs.subtitle": "CYPHERA-Untersuchungsausschuss",
        "objectifs.pedagogiques": "A. Pädagogische Ziele",
        "objectifs.eleves": "B. Schülerziele",
        "objectifs.evaluation": "C. Bewertungsraster",
        "pedagogiques.title": "A. Pädagogische Ziele",
        "pedagogiques.subtitle": "Institutionelle und analytische Kompetenzen",
        "pedagogiques.1.title": "⚖️ Institutionen",
        "pedagogiques.1.desc": "Beherrschen der Arbeitsweise parlamentarischer Ausschüsse in der V. Republik",
        "pedagogiques.2.title": "🗣️ Argumentation",
        "pedagogiques.2.desc": "Entwicklung einer nuancierten politischen Argumentation zu Sicherheitsfragen",
        "pedagogiques.3.title": "🤝 Verhandlung",
        "pedagogiques.3.desc": "Praxis der institutionellen Verhandlung und des Kompromisses",
        "pedagogiques.4.title": "💻 Ethik & Recht",
        "pedagogiques.4.desc": "Analyse des Dilemmas zwischen Cyber-Überwachung und Rechtsstaatlichkeit",
        "eleves.title": "B. Schülerziele",
        "eleves.subtitle": "Konkrete Vorbereitung und Bewertung",
        "eleves.1.title": "🎭 Realistische Rollendarstellung",
        "eleves.1.desc": "Incarner de manière réaliste l'un des 14 rôles attribués",
        "eleves.2.title": "📝 Vorbereitung pol. Argumente",
        "eleves.2.desc": "Arguments adaptés à la position politique du rôle",
        "eleves.3.title": "⚖️ Institutionen verstehen",
        "eleves.3.desc": "Verstehen Sie Ihren Platz und Ihre Befugnisse im Rahmen der Institutionen der V. Republik",
        "eleves.4.title": "🗳️ Strukturierte Demokr. Debatte",
        "eleves.4.desc": "Participer activement au débat démocratique structuré",

        // EVALUATION GRID KEYS (Detailed DE)
        "eval.title": "Bewertungsraster (20 Punkte)",
        "eval.description": "Gruppenbewertung (2 Schüler) über 4 Phasen (5 Pkt/Phase × 4 = 20 Pkt)",
        "eval.criteria": "Kriterium",
        "eval.description_col": "Beschreibung",
        "eval.0to1": "0-1 Pkt",
        "eval.2to3": "2-3 Pkt",
        "eval.4to5": "4-5 Pkt",
        "eval.criterion1": "1. Rolle",
        "eval.criterion2": "2. CYPHERA Fakten",
        "eval.criterion3": "3. Fragen/Antworten",
        "eval.criterion4": "4. Argumentation",
        "eval.desc1": "Konsistenz/Rollenplay (Position, Interessen, Grenzen)",
        "eval.desc2": "Szenariobeherrschung (Einmischung, Überwachung, 14 Akteure)",
        "eval.desc3": "Ausschuss: prägnante Fragen. Zeugen: konsistente Antworten",
        "eval.desc4": "Sicherheits/Freiheitsdilemma, Konsistenz mit Rollenmacht",
        "eval.phase1": "Phase 1: Ausschusserstellung (Akt 1)",
        "eval.phase2": "Phase 2: Anhörungen (Akt 2)",
        "eval.phase3": "Phase 3: Bericht (Akt 3)",
        "eval.phase4": "Phase 4: Abschlussdebatte (Akt 4)",

        // Main Simulation Tabs DE
        sim_main_tab1: "Der Fall",
        sim_main_tab2: "Überblick",
        sim_main_tab3: "Akteure & Ziele",
        sim_main_tab4: "Die Untersuchung",

        // Sub-tabs labels DE
        sim_sub_reve: "Enthüllungen",
        sim_sub_cons: "Konsequenzen",
        sim_sub_crea: "Einsetzung",
        sim_sub_cadre: "Rahmen",

        // Der Fall (mainTab1)
        sim_affaire_title1: "1. Die Affäre CYPHERA und ihre Enthüllung",
        sim_affaire_desc1: `
            <p>Seit mehreren Jahren unterhält der französische Staat diskret eine strategische Partnerschaft mit dem Privatunternehmen CYPHERA SECURITY. Das System unterliegt der Geheimhaltung und wird vom Verteidigungs- und Innenministerium geleitet.</p>
            <p>CYPHERA implementierte Algorithmen, um Metadaten, Geolokalisierung und Verwaltungsdatenbanken zu verknüpfen. Die Krise entstand, als diese Werkzeuge zur Überwachung von Journalisten, Forschern und NGOs eingesetzt wurden.</p>
            <p>Ein Whistleblower bei CYPHERA lieferte technische Dokumente über die „Kartierung von Gegnern“. Die Schlagzeile „CYPHERA: Wenn der Staat seine Journalisten überwacht“ löste einen politischen Sturm aus.</p>
        `,
        sim_affaire_title2: "2. Die Reaktion des Parlaments",
        sim_affaire_desc2: `
            <p>Das Verfahren wurde durch einen Resolutionsentwurf mehrerer Oppositionsgruppen eingeleitet. Der Titel lautet: „Untersuchungskommission zu Bedingungen für Design, Einsatz und demokratische Kontrolle der Partnerschaft zwischen Staat und CYPHERA SECURITY“.</p>
            <p>Die Kommission hat sechs Monate Zeit, um politische Verantwortliche, Unternehmensleiter und Kontrollbehörden (CNIL, ANSSI) anzuhören. Der Vorsitz liegt bei der Opposition, während der Berichterstatter aus der Regierungsmehrheit kommt.</p>
            <p>Die Sitze werden proportional zu den Gruppen verteilt. Die Mehrheit erhält eine große Anzahl von Sitzen, stimmt jedoch zu, den Vorsitz der Opposition zu überlassen, während der Berichterstatter aus den Reihen der Mehrheit gewählt wird.</p>
        `,

        // Überblick (mainTab2)
        sim_pres_title1: "1. Ursprung und Ziele",
        sim_pres_desc1: `
            <p>Die Kommission entstand aus der Notwendigkeit, Licht in die CYPHERA-Partnerschaft zu bringen. Sie muss politische Verantwortliche und Unternehmensleiter anhören, um zu verstehen, wie Überwachungswerkzeuge missbraucht wurden.</p>
            <p>Die Anhörungen finden unter Eid statt, und die Mitglieder verfügen über weitreichende Untersuchungsbefugnisse (Besichtigungen vor Ort, Einsicht in vertrauliche Dokumente).</p>
        `,
        sim_pres_title2: "2. Institutioneller Rahmen in der Fünften Republik",
        sim_pres_desc2: `
            <p>Die Untersuchungskommission est Teil einer institutionellen Ordnung, in der das Parlament der Exekutive untergeordnet ist. Sie wurde gemäß Artikel 140 eingesetzt und hat besondere Befugnisse:</p>
            <ul>
                <li>Anhörungen unter Eid (Minister, Experten, Zeugen).</li>
                <li>Einsicht in Dokumente (Verträge, interne Berichte).</li>
                <li>Recht auf Besichtigungen vor Ort (CYPHERA-Standorte).</li>
            </ul>
            <p><strong>Grenzen:</strong> Die Regierung kann sich auf das Verteidigungsgeheimnis berufen. Der Staatspräsident bleibt verfassungsrechtlich unantastbar (Art. 67).</p>
        `,
        sim_pres_title3: "3. Mögliche Szenarien und Konsequenzen",
        sim_pres_desc3: `
            <p>Die Kommission produziert einen Bericht, dessen Schlussfolgerungen variieren. Drei Szenarien zeichnen sich ab:</p>
            <ul>
                <li><strong>Szenario 1 – Minimalistisch:</strong> Technische Empfehlungen und verstärkte Kontrolle durch die CNIL.</li>
                <li><strong>Szenario 2 – Ambitioniert:</strong> Reform der Geheimdienstgesetze, strafrechtliche Sanktionen und Rücktrittsforderungen.</li>
                <li><strong>Szenario 3 – Souveränistisches Modell:</strong> Forderung nach einem „französischen Patriot Act“ aufgrund ausländischer Informationsaggression.</li>
            </ul>
        `,
        "eval.focus": "Fokus",
        "eval.expected": "Erwartet",
        "eval.scale": "Detaillierte Skala",
        "eval.points": "Punkte",
        "eval.level": "Niveau",
        "eval.expectations": "Erwartungen",
        "eval.excellent": "Exzellent",
        "eval.veryGood": "Sehr Gut",
        "eval.satisfying": "Zufriedenstellend",
        "eval.insufficient": "Ungenügend",
        "eval.instructions": "Lehreranweisungen",
        "eval.inst1": "Bewertung nach Phase (5 horizontale Spalten)",
        "eval.inst2": "Markiere 4-5 Pkt: Exzellent | 2-3 Pkt: Zufriedenstellend | 0-1 Pkt: Bearbeitungsbedarf",
        "eval.inst3": "Transversale Boni (+4 Pkt max): Quellen, i18n, ausgewogenes Duo",
        "eval.inst4": "Gesamt: ___/24 Pkt (Raster + Bonus)",
        "eval.download": "PDF Herunterladen",
        "eval.print": "Drucken"
    }
};

window.translations = translations;
