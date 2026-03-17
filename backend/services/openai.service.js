import axios from 'axios';

export const generateFinalVerdict = async (text, hfResult, googleResult) => {
    const promptSysteme = `
Tu es un Juge Journalistique expert en fact-checking et détection de désinformation.
Ton rôle est d'analyser un texte, ainsi que les résultats bruts de deux outils automatisés, pour fournir un verdict définitif.

RÈGLES STRICTES :
1. Le verdict DOIT ÊTRE EXACTEMENT l'une de ces 3 valeurs : "Fiable", "Douteux", ou "Non fiable".
2. Tu dois identifier les affirmations invérifiables et le ton sensationnaliste.
3. Tu dois expliquer les contradictions potentielles si l'outil BERT et Google Fact Check ne sont pas d'accord.
4. Tu dois calculer un score de confiance de ton analyse (en %).
5. Tu dois citer tes sources si tu en utilises ou as lu celles de Google.

Format de sortie exigé (JSON STRICT uniquement, sans markdown autour) :
{
  "verdict": "Fiable | Douteux | Non fiable",
  "confidence_score": 85,
  "justification": "Explication claire du verdict en langage naturel",
  "sources": ["Liste des sources trouvées via Google ou autre"],
  "sensationnalisme": "Analyse du ton et détection d'exagérations",
  "limites_analyse": "Ce qui manque ou reste invérifiable dans ce texte"
}
`;

    const promptUser = `
Texte à analyser : "${text.substring(0, 1500)}" // Tronqué pour éviter les dépassements de tokens

--- RÉSULTATS DES OUTILS ---
Analyse Modèle BERT (Hugging Face) : ${JSON.stringify(hfResult)}
Recherche Google Fact Check : ${JSON.stringify(googleResult)}
----------------------------
Agis et rends ton jugement final au format JSON strict.`;

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
