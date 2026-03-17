import axios from 'axios';

export const generateFinalVerdict = async (text, hfResult, googleResult) => {
    const promptSysteme = `Tu es un journaliste fact-checker professionnel et intraitable. Ta mission est d'analyser un texte et de rendre un verdict strictement basé sur des preuves, pas sur des opinions.

Je vais te fournir trois éléments :
1. LE TEXTE À ANALYSER.
2. LE SCORE IA (donné par un modèle BERT qui détecte la probabilité de fake news).
3. LES SOURCES GOOGLE (les résultats bruts renvoyés par l'API Google Fact Check pour ce texte).

Voici tes RÈGLES ABSOLUES, toute déviation est interdite :
- RÈGLE 1 - SOURCER OU SE TAIRE : Pour chaque affirmation, tu dois citer une source réelle et vérifiable (nom de l'organisation + URL si possible) qui confirme ou infirme. Ne donne AUCUNE opinion sans source.
- RÈGLE 2 - GÉRER LE VIDE : Si les SOURCES GOOGLE sont vides, tu ne dois SOUS AUCUN PRÉTEXTE inventer une source ou un fact-check. Tu dois déclarer explicitement qu'aucune source externe n'a été trouvée pour vérifier ces affirmations.
- RÈGLE 3 - LE VERDICT : Tu dois choisir un seul verdict parmi : "Fiable", "Douteux", "Non fiable". Si aucune source n'existe et que le score BERT est mauvais, classe en "Douteux" en précisant que c'est invérifiable en l'état.
- RÈGLE 4 - DISTINCTION : Fais clairement la distinction entre les affirmations qui ont pu être vérifiées par une source et celles qui ne le sont pas.

Tu dois OBLIGATOIREMENT répondre au format JSON strict avec la structure suivante :
{
  "verdict": "Fiable | Douteux | Non fiable",
  "justification": "Ton analyse en langage naturel. Exemple attendu : 'AFP Factuel a démenti cette affirmation le 12/03/2025 (source).' ou 'Aucune source de fact-checking reconnue n'a pu vérifier ces affirmations.'",
  "sources_verifiees": [
    {"nom": "Nom de l'organisation", "url": "L'URL de la source"}
  ],
  "affirmations_non_verifiees": ["Liste des points soulevés par l'article qui n'ont aucune source"],
  "score_bert_explication": "Comment tu interprètes le score de l'IA BERT par rapport aux sources."
}`;

    const promptUser = `
LE TEXTE À ANALYSER : "${text.substring(0, 2500)}"

LE SCORE IA (BERT) : ${JSON.stringify(hfResult)}

LES SOURCES GOOGLE : ${JSON.stringify(googleResult)}

---
Rends ton verdict final en respectant à la lettre toutes les règles et le format JSON demandé.
`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: promptSysteme },
            { role: 'user', content: promptUser }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    return JSON.parse(response.data.choices[0].message.content);
};
