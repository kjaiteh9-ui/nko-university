-- ============================================================
-- NKO UNIVERSITY — QUIZ QUESTIONS FOR ALL 18 LESSONS
-- Run this AFTER 002_seed.sql
-- Adds 3 quiz questions per lesson across all 6 levels
-- ============================================================

-- ── LEVEL 1: ALPHABET ──────────────────────────────────────

-- Lesson 1: The N'Ko Script & Its History (already has 3 from seed, skip)

-- Lesson 2: The N'Ko Alphabet: Vowels & Consonants
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which N''Ko letter represents the vowel ''A'' (as in father)?"}',
  '["ߊ", "ߋ", "ߌ", "ߍ"]',
  '"ߊ"',
  '{"en": "ߊ is the N''Ko letter for ''A'', representing the sound as in ''father''."}',
  1
from lessons l where l.level = 1 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "How many vowel letters are in the N''Ko alphabet?"}',
  '["5", "6", "7", "8"]',
  '"7"',
  '{"en": "The N''Ko alphabet has 7 vowel letters: ߊ ߋ ߌ ߍ ߎ ߏ ߐ."}',
  2
from lessons l where l.level = 1 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "The N''Ko letter ߓ represents the sound ''B'' as in boy."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! ߓ is the N''Ko consonant for the ''B'' sound, just like ''b'' in boy."}',
  3
from lessons l where l.level = 1 and l.order_index = 2 limit 1;

-- Lesson 3: Writing Your First N'Ko Words
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ߒߞߏ mean in English?"}',
  '["I write", "I say", "I know", "I read"]',
  '"I say"',
  '{"en": "ߒߞߏ (N''Ko) literally means ''I say'' in the Manding language family."}',
  1
from lessons l where l.level = 1 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "N''Ko is written from left to right, like English."}',
  '["True", "False"]',
  '"False"',
  '{"en": "N''Ko is written from RIGHT to LEFT, like Arabic and Hebrew."}',
  2
from lessons l where l.level = 1 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which N''Ko word means ''We / Us''?"}',
  '["ߒ", "ߌ", "ߊ߲", "ߊ"]',
  '"ߊ߲"',
  '{"en": "ߊ߲ means ''We'' or ''Us'' in N''Ko."}',
  3
from lessons l where l.level = 1 and l.order_index = 3 limit 1;

-- ── LEVEL 2: WORDS ─────────────────────────────────────────

-- Lesson 4: Greetings & Introductions
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "How do you say ''Good morning'' in N''Ko?"}',
  '["ߌ ߣߌ߫ ߕߊ߬", "ߌ ߣߌ߫ ߛߎ", "ߌ ߞߊ߬ ߞߍ ߟߋ߬", "ߒ ߡߊ߬ ߢߌߣߌ߲"]',
  '"ߌ ߣߌ߫ ߛߎ"',
  '{"en": "ߌ ߣߌ߫ ߛߎ is the N''Ko greeting for Good morning. ߛߎ means morning."}',
  1
from lessons l where l.level = 2 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ߌ ߞߊ߬ ߞߍ ߟߋ߬ mean?"}',
  '["Good morning", "Goodbye", "How are you?", "Thank you"]',
  '"How are you?"',
  '{"en": "ߌ ߞߊ߬ ߞߍ ߟߋ߬ is the N''Ko phrase for ''How are you?'' — a common greeting."}',
  2
from lessons l where l.level = 2 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "ߌ ߣߌ߫ ߕߊ߬ means ''Good afternoon'' in N''Ko."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! ߌ ߣߌ߫ ߕߊ߬ is the N''Ko greeting for Good afternoon. ߕߊ means afternoon."}',
  3
from lessons l where l.level = 2 and l.order_index = 1 limit 1;

-- Lesson 5: Numbers 1–20
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What is the N''Ko number for 3?"}',
  '["߁", "߂", "߃", "߄"]',
  '"߃"',
  '{"en": "߃ is the N''Ko numeral for 3, called ''Saba'' in Manding."}',
  1
from lessons l where l.level = 2 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ''Kelen'' mean in Manding/N''Ko?"}',
  '["2", "1", "10", "5"]',
  '"1"',
  '{"en": "Kelen means 1 (one) in the Manding language, written as ߁ in N''Ko numerals."}',
  2
from lessons l where l.level = 2 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "The N''Ko numeral ߁߀ represents the number 10."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! ߁߀ is 10 in N''Ko numerals (1 + 0 = 10), called ''Tan'' in Manding."}',
  3
from lessons l where l.level = 2 and l.order_index = 2 limit 1;

-- Lesson 6: Colors & Basic Nouns
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which N''Ko word means ''Red''?"}',
  '["ߓߟߊ", "ߓߟߊ߲", "ߗߌ", "ߝߌ"]',
  '"ߗߌ"',
  '{"en": "ߗߌ is the N''Ko word for Red. ߓߟߊ means Black, ߓߟߊ߲ means White."}',
  1
from lessons l where l.level = 2 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What color does ߓߟߊ represent?"}',
  '["White", "Red", "Black", "Green"]',
  '"Black"',
  '{"en": "ߓߟߊ means Black in N''Ko. ߓߟߊ߲ (with the nasal ending) means White."}',
  2
from lessons l where l.level = 2 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "ߝߌ is the N''Ko word for Green."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! ߝߌ means Green in N''Ko."}',
  3
from lessons l where l.level = 2 and l.order_index = 3 limit 1;

-- ── LEVEL 3: GRAMMAR ───────────────────────────────────────

-- Lesson 7: Sentence Structure
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What word order does N''Ko use?"}',
  '["Subject-Verb-Object (SVO)", "Subject-Object-Verb (SOV)", "Verb-Subject-Object (VSO)", "Object-Verb-Subject (OVS)"]',
  '"Subject-Object-Verb (SOV)"',
  '{"en": "N''Ko uses SOV order — Subject first, then Object, then Verb. This differs from English SVO."}',
  1
from lessons l where l.level = 3 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "In N''Ko, the verb always comes at the end of a basic sentence."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Correct! N''Ko follows SOV order, so the verb is placed at the end: ''I water drink'' instead of ''I drink water''."}',
  2
from lessons l where l.level = 3 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "In N''Ko, how would you say ''He ate food''?"}',
  '["He food ate", "Food he ate", "Ate he food", "He ate food"]',
  '"He food ate"',
  '{"en": "N''Ko SOV order: Subject (He) + Object (food) + Verb (ate). So ''He food ate'' in N''Ko structure."}',
  3
from lessons l where l.level = 3 and l.order_index = 1 limit 1;

-- Lesson 8: Verbs & Tenses
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What is the N''Ko past tense marker?"}',
  '["ߒ", "ߞߊ߬", "ߓߊ", "ߡߊ߬"]',
  '"ߞߊ߬"',
  '{"en": "ߞߊ߬ (ka) is the past tense marker in N''Ko, placed before the verb."}',
  1
from lessons l where l.level = 3 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ߒ ߞߊ߬ ߘߊ mean?"}',
  '["I will go", "I am going", "I went", "I go"]',
  '"I went"',
  '{"en": "ߒ ߞߊ߬ ߘߊ = I (ߒ) + past marker (ߞߊ߬) + go (ߘߊ) = ''I went''."}',
  2
from lessons l where l.level = 3 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "The past tense marker ߞߊ߬ is placed AFTER the verb in N''Ko."}',
  '["True", "False"]',
  '"False"',
  '{"en": "False! ߞߊ߬ is placed BEFORE the verb, not after. Example: ߒ ߞߊ߬ ߘߊ (I went)."}',
  3
from lessons l where l.level = 3 and l.order_index = 2 limit 1;

-- Lesson 9: Questions & Negation
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which particle is commonly used to form yes/no questions in N''Ko?"}',
  '["ߡߊ߬", "ߓߊ", "ߒ", "ߞߊ߬"]',
  '"ߓߊ"',
  '{"en": "The particle ߓߊ (ba) is added at the end of a sentence to form yes/no questions in N''Ko."}',
  1
from lessons l where l.level = 3 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "ߌ ߞߊ ߞߍ ߟߋ߬ ߓߊ? means ''How are you?'' in N''Ko."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! This is a common question in N''Ko, literally ''You doing well? (question particle)''."}',
  2
from lessons l where l.level = 3 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "The question word ߡߊ߬ (maa) in N''Ko is used for which type of question?"}',
  '["Yes/No questions", "Where/What questions", "Counting questions", "Greeting questions"]',
  '"Where/What questions"',
  '{"en": "ߡߊ߬ (maa) is used for open-ended questions like Where and What in N''Ko."}',
  3
from lessons l where l.level = 3 and l.order_index = 3 limit 1;

-- ── LEVEL 4: CONVERSATION ──────────────────────────────────

-- Lesson 10: At the Market
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ߖߙߊ mean in N''Ko?"}',
  '["Food", "Money", "Market", "Water"]',
  '"Market"',
  '{"en": "ߖߙߊ means Market in N''Ko. It is where you go to buy and sell goods."}',
  1
from lessons l where l.level = 4 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which N''Ko word means both ''Money'' and ''Price''?"}',
  '["ߛߏ", "ߖߙߊ", "ߞߊ", "ߓߟߊ"]',
  '"ߞߊ"',
  '{"en": "ߞߊ can mean both Money and Price in N''Ko, depending on context."}',
  2
from lessons l where l.level = 4 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "ߛߏ means Food in N''Ko."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! ߛߏ is the N''Ko word for Food, commonly used in market and daily conversation contexts."}',
  3
from lessons l where l.level = 4 and l.order_index = 1 limit 1;

-- Lesson 11: Family & Relationships
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "How do you say ''Father'' in N''Ko?"}',
  '["ߣߊ߬", "ߘߋ߲", "ߝߊ߬", "ߗߍ"]',
  '"ߝߊ߬"',
  '{"en": "ߝߊ߬ means Father in N''Ko. It is one of the most important family terms in Manding culture."}',
  1
from lessons l where l.level = 4 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ߡߛߏ mean in N''Ko?"}',
  '["Father", "Child", "Man/Husband", "Woman/Wife"]',
  '"Woman/Wife"',
  '{"en": "ߡߛߏ means Woman or Wife in N''Ko. The Manding language often uses the same word for both."}',
  2
from lessons l where l.level = 4 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "ߘߋ߲ means Child in N''Ko."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! ߘߋ߲ means Child in N''Ko and Manding languages generally."}',
  3
from lessons l where l.level = 4 and l.order_index = 2 limit 1;

-- Lesson 12: Daily Routines
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ߛߎ mean in N''Ko?"}',
  '["Afternoon", "Night", "Morning", "Work"]',
  '"Morning"',
  '{"en": "ߛߎ means Morning in N''Ko. You might recognize it from the greeting ߌ ߣߌ߫ ߛߎ (Good morning)."}',
  1
from lessons l where l.level = 4 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which N''Ko word means Night?"}',
  '["ߛߎ", "ߕߊ", "ߓߎ", "ߟߊ ߟߊ"]',
  '"ߓߎ"',
  '{"en": "ߓߎ means Night in N''Ko. ߛߎ = Morning, ߕߊ = Afternoon/Evening."}',
  2
from lessons l where l.level = 4 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "ߕߊ in N''Ko can mean both Afternoon and Evening."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! ߕߊ covers the period from afternoon into evening in Manding time expressions."}',
  3
from lessons l where l.level = 4 and l.order_index = 3 limit 1;

-- ── LEVEL 5: READING ───────────────────────────────────────

-- Lesson 13: Reading Simple Texts
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "ߒߞߏ ߛߓߍߛߎ߲ translates to what in English?"}',
  '["N''Ko Language", "N''Ko Script", "N''Ko Reading", "N''Ko Culture"]',
  '"N''Ko Script"',
  '{"en": "ߛߓߍߛߎ߲ means writing system or script. So ߒߞߏ ߛߓߍߛߎ߲ = N''Ko Script."}',
  1
from lessons l where l.level = 5 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Who is credited with creating the N''Ko script?"}',
  '["Sundiata Keita", "Solomana Kante", "Askia Mohammed", "Cheikh Anta Diop"]',
  '"Solomana Kante"',
  '{"en": "Solomana Kante (1922–1987) from Guinea created the N''Ko script in 1949."}',
  2
from lessons l where l.level = 5 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "N''Ko script has a dedicated block in the Unicode standard."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! N''Ko is encoded in Unicode at U+07C0–U+07FF, allowing digital use across all modern systems."}',
  3
from lessons l where l.level = 5 and l.order_index = 1 limit 1;

-- Lesson 14: Short Stories
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "In the lion and rabbit story, which animal was described as clever?"}',
  '["The lion", "The rabbit", "Both equally", "Neither"]',
  '"The rabbit"',
  '{"en": "In the traditional West African folktale, the rabbit was clever while the lion was strong."}',
  1
from lessons l where l.level = 5 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Traditional West African folktales adapted in N''Ko are used to teach what?"}',
  '["Only history", "Reading skills and cultural values", "Mathematics", "Only grammar"]',
  '"Reading skills and cultural values"',
  '{"en": "N''Ko folktales teach both literacy skills AND preserve important cultural values and wisdom."}',
  2
from lessons l where l.level = 5 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "Traditional West African folktales often feature animals to represent human qualities."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! Using animals (like the clever rabbit and strong lion) to represent human traits is a long-standing West African storytelling tradition."}',
  3
from lessons l where l.level = 5 and l.order_index = 2 limit 1;

-- Lesson 15: Traditional Proverbs
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What cultural tradition are proverbs most central to?"}',
  '["Manding culture", "European culture", "Asian culture", "No particular culture"]',
  '"Manding culture"',
  '{"en": "Proverbs are central to Manding culture and are preserved and transmitted by Griots (oral historians)."}',
  1
from lessons l where l.level = 5 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "The proverb ''One hand cannot clap alone'' teaches which value?"}',
  '["Independence", "Teamwork", "Silence", "Speed"]',
  '"Teamwork"',
  '{"en": "''One hand cannot clap alone'' (ߒ ߘߌ ߊ߲ ߞߊ) emphasizes that teamwork and community are essential."}',
  2
from lessons l where l.level = 5 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "''The tree that bends survives the storm'' teaches that flexibility is strength."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! This Manding proverb teaches that adaptability and flexibility are important survival qualities."}',
  3
from lessons l where l.level = 5 and l.order_index = 3 limit 1;

-- ── LEVEL 6: ADVANCED ──────────────────────────────────────

-- Lesson 16: Complex Grammar
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which particle introduces relative clauses in N''Ko?"}',
  '["ߓߊ", "ߞߊ߬", "ߡߍ߲", "ߒ"]',
  '"ߡߍ߲"',
  '{"en": "ߡߍ߲ (mɛn) is the relative clause particle in N''Ko, similar to ''who'' or ''that'' in English."}',
  1
from lessons l where l.level = 6 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "ߗߍ ߡߍ߲ ߦߴߊ ߦߋ translates to what?"}',
  '["The food I ate", "The man who is here", "The woman who went", "The child who came"]',
  '"The man who is here"',
  '{"en": "ߗߍ = man, ߡߍ߲ = who/that (relative particle), ߦߴߊ ߦߋ = is here."}',
  2
from lessons l where l.level = 6 and l.order_index = 1 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "N''Ko relative clauses function similarly to relative clauses in English."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! Both use a relative particle (ߡߍ߲ in N''Ko, who/that in English) to connect a clause to a noun."}',
  3
from lessons l where l.level = 6 and l.order_index = 1 limit 1;

-- Lesson 17: Writing Essays
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What does ߓߊ߯ ߞߏ mean in a formal N''Ko essay?"}',
  '["In conclusion", "Furthermore", "First of all", "However"]',
  '"First of all"',
  '{"en": "ߓߊ߯ ߞߏ means ''First of all'' or serves as an introduction marker in formal N''Ko writing."}',
  1
from lessons l where l.level = 6 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "Which N''Ko phrase means ''In conclusion''?"}',
  '["ߓߊ߯ ߞߏ", "ߊ ߣߌ߫ ߓߊ", "ߓߊ ߘߏ߫", "ߒ ߞߊ߬"]',
  '"ߓߊ ߘߏ߫"',
  '{"en": "ߓߊ ߘߏ߫ means ''In conclusion'' in formal N''Ko writing."}',
  2
from lessons l where l.level = 6 and l.order_index = 2 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "A formal N''Ko essay follows the same Introduction-Body-Conclusion structure as essays in other languages."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! N''Ko formal essays follow the universal Introduction-Body-Conclusion structure, with N''Ko-specific transition words."}',
  3
from lessons l where l.level = 6 and l.order_index = 2 limit 1;

-- Lesson 18: Cultural Deep-Dive
insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "What is the traditional role of a Griot (Djeli) in Manding culture?"}',
  '["Warrior and defender", "Oral historian, musician, and storyteller", "Farmer and trader", "Religious leader only"]',
  '"Oral historian, musician, and storyteller"',
  '{"en": "Griots (Djelis) are the keepers of oral history in Manding culture — historians, musicians, and storytellers."}',
  1
from lessons l where l.level = 6 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'multiple_choice',
  '{"en": "In which Unicode range is the N''Ko script encoded?"}',
  '["U+0600–U+06FF", "U+07C0–U+07FF", "U+0900–U+097F", "U+0400–U+04FF"]',
  '"U+07C0–U+07FF"',
  '{"en": "N''Ko is encoded in Unicode at U+07C0 through U+07FF, its own dedicated block."}',
  2
from lessons l where l.level = 6 and l.order_index = 3 limit 1;

insert into quiz_questions (lesson_id, type, prompt, options_json, answer_json, explanation, order_index)
select l.id, 'true_false',
  '{"en": "The N''Ko literacy movement has spread beyond Guinea to other West African countries."}',
  '["True", "False"]',
  '"True"',
  '{"en": "Yes! N''Ko is now used and taught in Guinea, Mali, Côte d''Ivoire, Senegal, and among the African diaspora worldwide."}',
  3
from lessons l where l.level = 6 and l.order_index = 3 limit 1;
