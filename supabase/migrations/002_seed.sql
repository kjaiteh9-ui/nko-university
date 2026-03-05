-- ============================================================
-- NKO UNIVERSITY — SEED DATA
-- Run this AFTER 001_schema.sql
-- ============================================================

-- Insert main course
insert into courses (id, title, description, language_focus, is_published) values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '{"en": "Learn N''Ko from Zero", "fr": "Apprendre le N''Ko de Zéro", "ar": "تعلم N''Ko من الصفر"}',
  '{"en": "A complete beginner-to-advanced journey through the N''Ko language and script, the writing system created by Solomana Kante in 1949 for the Manding languages of West Africa.", "fr": "Un parcours complet du débutant à l''avancé à travers la langue et l''écriture N''Ko, le système d''écriture créé par Solomana Kanté en 1949 pour les langues Mandingues d''Afrique de l''Ouest."}',
  'nko',
  true
) on conflict (id) do nothing;

-- ── LEVEL 1: ALPHABET ──────────────────────────────────────
insert into lessons (course_id, level, order_index, title, description, estimated_minutes, is_published, content_json) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 1,
  '{"en": "The N''Ko Script & Its History", "fr": "L''Écriture N''Ko et Son Histoire"}',
  '{"en": "Discover the beautiful N''Ko script created by scholar Solomana Kante in Guinea, 1949.", "fr": "Découvrez la magnifique écriture N''Ko créée par l''érudit Solomana Kanté en Guinée, 1949."}',
  20, true,
  '{
    "sections": [
      {
        "type": "intro",
        "title": "What is N''Ko?",
        "body": "N''Ko (ߒߞߏ) means ''I say'' in the Manding language family. It is an alphabet created in 1949 by Solomana Kante, a Guinean scholar, to give the Manding peoples of West Africa their own writing system. N''Ko is written from right to left."
      },
      {
        "type": "culture",
        "title": "Why N''Ko Matters",
        "body": "Before N''Ko, Manding languages (Bambara, Dyula, Mandinka) had no indigenous script. Solomana Kante spent years developing a phonetically perfect alphabet. Today, millions use N''Ko for literature, education, and preserving African cultural heritage."
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "N''Ko was created in the year ____.", "answer": "1949"},
      {"type": "fill_blank", "prompt": "N''Ko means ''____'' in Manding.", "answer": "I say"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 2,
  '{"en": "The N''Ko Alphabet: Vowels & Consonants", "fr": "L''Alphabet N''Ko : Voyelles et Consonnes"}',
  '{"en": "Learn the 19 consonants and 7 vowels of the N''Ko alphabet with their sounds.", "fr": "Apprenez les 19 consonnes et 7 voyelles de l''alphabet N''Ko avec leurs sons."}',
  25, true,
  '{
    "sections": [
      {
        "type": "alphabet",
        "title": "The N''Ko Vowels",
        "body": "N''Ko has 7 vowel letters. Each vowel represents a pure sound.",
        "characters": [
          {"char": "ߊ", "name": "A", "sound": "like ''a'' in father"},
          {"char": "ߋ", "name": "E", "sound": "like ''e'' in they"},
          {"char": "ߌ", "name": "I", "sound": "like ''ee'' in see"},
          {"char": "ߍ", "name": "ɛ", "sound": "like ''e'' in bed"},
          {"char": "ߎ", "name": "U", "sound": "like ''oo'' in food"},
          {"char": "ߏ", "name": "O", "sound": "like ''o'' in go"},
          {"char": "ߐ", "name": "ɔ", "sound": "like ''o'' in off"}
        ]
      },
      {
        "type": "alphabet",
        "title": "Key Consonants",
        "body": "N''Ko has 19 consonants. Here are the most common ones:",
        "characters": [
          {"char": "ߓ", "name": "B", "sound": "like ''b'' in boy"},
          {"char": "ߘ", "name": "D", "sound": "like ''d'' in dog"},
          {"char": "ߝ", "name": "F", "sound": "like ''f'' in fun"},
          {"char": "ߜ", "name": "G", "sound": "like ''g'' in go"},
          {"char": "ߞ", "name": "K", "sound": "like ''k'' in key"},
          {"char": "ߟ", "name": "L", "sound": "like ''l'' in love"},
          {"char": "ߡ", "name": "M", "sound": "like ''m'' in man"},
          {"char": "ߣ", "name": "N", "sound": "like ''n'' in name"}
        ]
      }
    ],
    "exercises": [
      {"type": "matching", "prompt": "Match the N''Ko letter to its sound", "answer": ["A","E","I","U"], "pairs": [["ߊ","A"],["ߋ","E"],["ߌ","I"],["ߎ","U"]]}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1, 3,
  '{"en": "Writing Your First N''Ko Words", "fr": "Écrire Vos Premiers Mots en N''Ko"}',
  '{"en": "Practice writing simple N''Ko words using the alphabet you just learned.", "fr": "Pratiquez l''écriture de mots simples en N''Ko avec l''alphabet que vous venez d''apprendre."}',
  20, true,
  '{
    "sections": [
      {
        "type": "vocabulary",
        "title": "Your First Words",
        "body": "Let us write some basic words in N''Ko. Remember: N''Ko reads right to left!",
        "words": [
          {"nko": "ߒߞߏ", "en": "N''Ko (I say)", "fr": "N''Ko (je dis)"},
          {"nko": "ߊ߲ ", "en": "We / Us", "fr": "Nous"},
          {"nko": "ߌ", "en": "You (singular)", "fr": "Tu / Vous"},
          {"nko": "ߊ", "en": "He / She / It", "fr": "Il / Elle"}
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The N''Ko word for ''we'' is ____.", "answer": "ߊ߲"}
    ]
  }'
);

-- ── LEVEL 2: WORDS ─────────────────────────────────────────
insert into lessons (course_id, level, order_index, title, description, estimated_minutes, is_published, content_json) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 1,
  '{"en": "Greetings & Introductions", "fr": "Salutations et Présentations"}',
  '{"en": "Learn essential greetings and how to introduce yourself in N''Ko.", "fr": "Apprenez les salutations essentielles et comment vous présenter en N''Ko."}',
  20, true,
  '{
    "sections": [
      {
        "type": "vocabulary",
        "title": "Common Greetings",
        "words": [
          {"nko": "ߌ ߣߌ߫ ߛߎ", "en": "Good morning", "fr": "Bonjour (matin)"},
          {"nko": "ߌ ߣߌ߫ ߕߊ߬", "en": "Good afternoon", "fr": "Bon après-midi"},
          {"nko": "ߌ ߞߊ߬ ߞߍ ߟߋ߬", "en": "How are you?", "fr": "Comment vas-tu ?"},
          {"nko": "ߒ ߡߊ߬ ߢߌߣߌ߲", "en": "My name is...", "fr": "Je m''appelle..."}
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "Good morning in N''Ko: ____", "answer": "ߌ ߣߌ߫ ߛߎ"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 2,
  '{"en": "Numbers 1–20 in N''Ko", "fr": "Les Chiffres 1–20 en N''Ko"}',
  '{"en": "Count from 1 to 20 in N''Ko and learn number vocabulary.", "fr": "Comptez de 1 à 20 en N''Ko et apprenez le vocabulaire des nombres."}',
  20, true,
  '{
    "sections": [
      {
        "type": "vocabulary",
        "title": "Numbers 1–10",
        "words": [
          {"nko": "߁", "en": "1 — Kelen", "fr": "1 — Kelen"},
          {"nko": "߂", "en": "2 — Fila", "fr": "2 — Fila"},
          {"nko": "߃", "en": "3 — Saba", "fr": "3 — Saba"},
          {"nko": "߄", "en": "4 — Naani", "fr": "4 — Naani"},
          {"nko": "߅", "en": "5 — Duuru", "fr": "5 — Duuru"},
          {"nko": "߆", "en": "6 — Wɔɔrɔ", "fr": "6 — Wɔɔrɔ"},
          {"nko": "߇", "en": "7 — Wolonwula", "fr": "7 — Wolonwula"},
          {"nko": "߈", "en": "8 — Seegi", "fr": "8 — Seegi"},
          {"nko": "߉", "en": "9 — Kononton", "fr": "9 — Kononton"},
          {"nko": "߁߀", "en": "10 — Tan", "fr": "10 — Tan"}
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The N''Ko number for 5 is ____.", "answer": "߅"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2, 3,
  '{"en": "Colors & Basic Nouns", "fr": "Les Couleurs et Noms de Base"}',
  '{"en": "Learn colors and essential nouns in N''Ko for everyday conversation.", "fr": "Apprenez les couleurs et les noms essentiels en N''Ko pour la conversation quotidienne."}',
  20, true,
  '{
    "sections": [
      {
        "type": "vocabulary",
        "title": "Colors in N''Ko",
        "words": [
          {"nko": "ߓߟߊ߲ ", "en": "White", "fr": "Blanc"},
          {"nko": "ߓߟߊ", "en": "Black", "fr": "Noir"},
          {"nko": "ߗߌ", "en": "Red", "fr": "Rouge"},
          {"nko": "ߝߌ", "en": "Green", "fr": "Vert"}
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The N''Ko word for white is ____.", "answer": "ߓߟߊ߲"}
    ]
  }'
);

-- ── LEVEL 3: GRAMMAR ───────────────────────────────────────
insert into lessons (course_id, level, order_index, title, description, estimated_minutes, is_published, content_json) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 1,
  '{"en": "Sentence Structure in N''Ko", "fr": "Structure de Phrase en N''Ko"}',
  '{"en": "Master the basic Subject-Object-Verb sentence structure unique to N''Ko.", "fr": "Maîtrisez la structure de base Sujet-Objet-Verbe unique au N''Ko."}',
  25, true,
  '{
    "sections": [
      {
        "type": "grammar",
        "title": "N''Ko Word Order: SOV",
        "rule": "Unlike English (SVO), N''Ko follows Subject-Object-Verb order. Example: I water drink (ߒ ߞߊ߬ ߙߎ ߡߌ߲߬) instead of I drink water.",
        "examples": [
          "ߒ ߞߊ߬ ߞߎ߬ ߡߌ߲߬ (I drank water)",
          "ߊ ߞߊ߬ ߛߏ ߘߌ (He ate food)"
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "N''Ko sentence order is Subject-____-Verb.", "answer": "Object"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 2,
  '{"en": "Verbs & Tenses in N''Ko", "fr": "Verbes et Temps en N''Ko"}',
  '{"en": "Understand how N''Ko expresses time through tense markers.", "fr": "Comprenez comment le N''Ko exprime le temps à travers des marqueurs de temps."}',
  25, true,
  '{
    "sections": [
      {
        "type": "grammar",
        "title": "Past Tense Marker",
        "rule": "The word ߞߊ߬ (ka) is used as a past tense marker, placed before the verb.",
        "examples": [
          "ߒ ߞߊ߬ ߘߊ (I went)",
          "ߊ ߞߊ߬ ߦߊ (He came)"
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The past tense marker in N''Ko is ____.", "answer": "ߞߊ߬"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3, 3,
  '{"en": "Questions & Negation", "fr": "Questions et Négation"}',
  '{"en": "Form questions and negative sentences in N''Ko.", "fr": "Former des questions et des phrases négatives en N''Ko."}',
  20, true,
  '{
    "sections": [
      {
        "type": "grammar",
        "title": "Asking Questions",
        "rule": "Questions in N''Ko often use the question word ߡߊ߬ (maa) or end with the particle ߓߊ (ba).",
        "examples": [
          "ߌ ߦߊ ߡߊ߬? (Where are you going?)",
          "ߌ ߞߊ ߞߍ ߟߋ߬ ߓߊ? (How are you?)"
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The N''Ko question particle is ____.", "answer": "ߓߊ"}
    ]
  }'
);

-- ── LEVEL 4: CONVERSATION ──────────────────────────────────
insert into lessons (course_id, level, order_index, title, description, estimated_minutes, is_published, content_json) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 1,
  '{"en": "At the Market", "fr": "Au Marché"}',
  '{"en": "Practice real market conversations in N''Ko with prices, bargaining, and common items.", "fr": "Pratiquez de vraies conversations de marché en N''Ko avec les prix et le marchandage."}',
  25, true,
  '{
    "sections": [
      {
        "type": "vocabulary",
        "title": "Market Vocabulary",
        "words": [
          {"nko": "ߖߙߊ", "en": "Market", "fr": "Marché"},
          {"nko": "ߞߊ", "en": "Money / Price", "fr": "Argent / Prix"},
          {"nko": "ߛߏ", "en": "Food", "fr": "Nourriture"}
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The N''Ko word for market is ____.", "answer": "ߖߙߊ"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 2,
  '{"en": "Family & Relationships", "fr": "Famille et Relations"}',
  '{"en": "Learn vocabulary for family members and social relationships in Manding culture.", "fr": "Apprenez le vocabulaire des membres de la famille et des relations sociales dans la culture mandingue."}',
  20, true,
  '{
    "sections": [
      {
        "type": "vocabulary",
        "title": "Family Members",
        "words": [
          {"nko": "ߝߊ߬", "en": "Father", "fr": "Père"},
          {"nko": "ߣߊ߬", "en": "Mother", "fr": "Mère"},
          {"nko": "ߘߋ߲", "en": "Child", "fr": "Enfant"},
          {"nko": "ߗߍ", "en": "Man / Husband", "fr": "Homme / Mari"},
          {"nko": "ߡߛߏ", "en": "Woman / Wife", "fr": "Femme / Épouse"}
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "Father in N''Ko is ____.", "answer": "ߝߊ߬"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4, 3,
  '{"en": "Daily Routines", "fr": "Routines Quotidiennes"}',
  '{"en": "Describe your daily activities and schedule in N''Ko.", "fr": "Décrivez vos activités quotidiennes et votre emploi du temps en N''Ko."}',
  25, true,
  '{
    "sections": [
      {
        "type": "vocabulary",
        "title": "Daily Activities",
        "words": [
          {"nko": "ߛߎ", "en": "Morning", "fr": "Matin"},
          {"nko": "ߕߊ", "en": "Afternoon / Evening", "fr": "Après-midi / Soir"},
          {"nko": "ߓߎ", "en": "Night", "fr": "Nuit"},
          {"nko": "ߟߊ ߟߊ", "en": "Work", "fr": "Travail"}
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "Morning in N''Ko is ____.", "answer": "ߛߎ"}
    ]
  }'
);

-- ── LEVEL 5: READING ───────────────────────────────────────
insert into lessons (course_id, level, order_index, title, description, estimated_minutes, is_published, content_json) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 1,
  '{"en": "Reading Simple N''Ko Texts", "fr": "Lire des Textes Simples en N''Ko"}',
  '{"en": "Practice reading simple sentences and short paragraphs in the N''Ko script.", "fr": "Pratiquez la lecture de phrases simples et de courts paragraphes en écriture N''Ko."}',
  30, true,
  '{
    "sections": [
      {
        "type": "reading",
        "title": "Your First N''Ko Reading",
        "body": "ߒߞߏ ߛߓߍߛߎ߲ ߦߋ߫ ߛߓߍߛߎ߲ ߓߘߊ ߟߋ߬ ߘߌ߫. ߒߞߏ ߞߊ߲ ߡߍ߲ ߛߓߍ ߘߊ߫ ߓߊ߬ ߛߏߡߊ߬ ߞߊ߲ߕߊ߫ ߟߊ ߞߎ߲߬ ߠߊ߫.\n\n(N''Ko script is an original writing. The N''Ko language was written by Solomana Kante.)"
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "Who created N''Ko? ____", "answer": "Solomana Kante"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 2,
  '{"en": "N''Ko Short Stories", "fr": "Courtes Histoires en N''Ko"}',
  '{"en": "Read and understand short traditional stories adapted in N''Ko.", "fr": "Lisez et comprenez de courtes histoires traditionnelles adaptées en N''Ko."}',
  30, true,
  '{
    "sections": [
      {
        "type": "reading",
        "title": "The Lion and the Rabbit (Simplified)",
        "body": "ߖߊ߯ ߓߊ ߣߴߊ ߝߊ߬ ߦߋ ߞߊ .\nA lion and a rabbit lived near a river. The rabbit was clever. The lion was strong. Together, they solved the water problem.\n\n(Traditional West African folktale adapted for N''Ko learners)"
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "In the story, who was clever? ____", "answer": "The rabbit"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5, 3,
  '{"en": "Traditional N''Ko Proverbs", "fr": "Proverbes Traditionnels en N''Ko"}',
  '{"en": "Explore the wisdom of West African proverbs written in N''Ko.", "fr": "Explorez la sagesse des proverbes d''Afrique de l''Ouest écrits en N''Ko."}',
  25, true,
  '{
    "sections": [
      {
        "type": "culture",
        "title": "N''Ko Proverbs",
        "body": "Proverbs are central to Manding culture. Here are traditional proverbs:\n\n1. ߓߊ ߘߌ ߛ߭ — ''The river knows its own path'' (Trust your origin)\n\n2. ߞߊ ߓߊ ߛ߭ — ''The tree that bends survives the storm'' (Flexibility is strength)\n\n3. ߒ ߘߌ ߊ߲ ߞߊ — ''One hand cannot clap alone'' (Teamwork matters)"
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "Manding proverbs reflect what cultural value? ____", "answer": "Wisdom"}
    ]
  }'
);

-- ── LEVEL 6: ADVANCED ──────────────────────────────────────
insert into lessons (course_id, level, order_index, title, description, estimated_minutes, is_published, content_json) values
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, 1,
  '{"en": "Complex Grammar Structures", "fr": "Structures Grammaticales Complexes"}',
  '{"en": "Master advanced grammatical constructs including relative clauses and complex tenses.", "fr": "Maîtrisez les constructions grammaticales avancées incluant les propositions relatives."}',
  35, true,
  '{
    "sections": [
      {
        "type": "grammar",
        "title": "Relative Clauses",
        "rule": "N''Ko relative clauses use the particle ߡߍ߲ (mɛn) to introduce the relative clause.",
        "examples": [
          "ߗߍ ߡߍ߲ ߦߴߊ ߦߋ (The man who is here)",
          "ߛߏ ߡߍ߲ ߒ ߞߊ߬ ߘߌ (The food that I ate)"
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The N''Ko relative clause particle is ____.", "answer": "ߡߍ߲"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, 2,
  '{"en": "Writing Essays in N''Ko", "fr": "Écrire des Essais en N''Ko"}',
  '{"en": "Learn to structure and write formal essays and compositions in N''Ko.", "fr": "Apprenez à structurer et écrire des essais et compositions formels en N''Ko."}',
  40, true,
  '{
    "sections": [
      {
        "type": "grammar",
        "title": "Essay Structure",
        "rule": "A formal N''Ko essay follows Introduction-Body-Conclusion like any language, but with specific transition words.",
        "examples": [
          "ߓߊ߯ ߞߏ (First of all / Introduction)",
          "ߊ ߣߌ߫ ߓߊ (And also / Furthermore)",
          "ߓߊ ߘߏ߫ (In conclusion)"
        ]
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "The N''Ko phrase for ''In conclusion'' is ____.", "answer": "ߓߊ ߘߏ߫"}
    ]
  }'
),
(
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6, 3,
  '{"en": "N''Ko Culture Deep-Dive", "fr": "Immersion Culturelle N''Ko"}',
  '{"en": "Explore the rich Manding culture, oral traditions, and the modern N''Ko literacy movement.", "fr": "Explorez la riche culture mandingue, les traditions orales et le mouvement moderne d''alphabétisation N''Ko."}',
  35, true,
  '{
    "sections": [
      {
        "type": "culture",
        "title": "The N''Ko Literacy Movement",
        "body": "Since 1949, the N''Ko movement has grown from Guinea across West Africa and the global African diaspora. Today:\n- Millions read and write N''Ko\n- N''Ko newspapers and books are published\n- N''Ko is taught in schools in Guinea, Mali, and Côte d''Ivoire\n- Unicode supports N''Ko (U+07C0–U+07FF)\n- N''Ko has its own keyboard layouts"
      },
      {
        "type": "culture",
        "title": "Manding Oral Tradition",
        "body": "The Griot (Djeli) tradition is central to Manding culture. Griots are oral historians, musicians, and storytellers who preserve history through song and N''Ko writing. Learning N''Ko connects you to this 700-year-old tradition."
      }
    ],
    "exercises": [
      {"type": "fill_blank", "prompt": "Oral historians in Manding culture are called ____.", "answer": "Griot"}
    ]
  }'
);

-- ── Sample Quiz Questions for Lesson 1 ─────────────────────
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select
  l.id,
  'multiple_choice',
  '{"en": "In what year was the N''Ko script created?"}',
  '["1937", "1949", "1955", "1960"]',
  '"1949"',
  '{"en": "Solomana Kante created the N''Ko script in 1949 in Guinea, West Africa."}',
  1
from lessons l
where l.order_index = 1 and l.level = 1
limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select
  l.id,
  'multiple_choice',
  '{"en": "What does N''Ko (ߒߞߏ) mean?"}',
  '["''I write''", "''I say''", "''I know''", "''I read''"]',
  '"''I say''"',
  '{"en": "N''Ko literally means ''I say'' in the Manding language family."}',
  2
from lessons l
where l.order_index = 1 and l.level = 1
limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select
  l.id,
  'true_false',
  '{"en": "N''Ko script is written from right to left."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! Like Arabic and Hebrew, N''Ko is written and read from right to left."}',
  3
from lessons l
where l.order_index = 1 and l.level = 1
limit 1;
