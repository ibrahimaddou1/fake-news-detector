import { extractTextFromUrl } from '../services/scraper.service.js';
import { analyzeWithBERT } from '../services/hf.service.js';
import { checkGoogleFactCheck } from '../services/google-factcheck.service.js';
import { generateFinalVerdict } from '../services/openai.service.js';

export const analyzeContent = async (req, res) => {
    try {
        const { input, isUrl } = req.body;
        
        if (!input) {
            return res.status(400).json({ error: "L'URL ou le texte est requis." });
        }

        // 1. Extraction du texte si c'est une URL
        let contentToAnalyze = input;
        if (isUrl) {
            contentToAnalyze = await extractTextFromUrl(input);
        }

        // 2. Appels en parallèle aux services de détection externes
        const [hfResult, googleResult] = await Promise.all([
            analyzeWithBERT(contentToAnalyze).catch(e => ({ error: 'Service indisponible' })),
            checkGoogleFactCheck(contentToAnalyze).catch(e => ({ claims: [] }))
        ]);

        // 3. Orchestration et synthèse par OpenAI
        const finalAnalysis = await generateFinalVerdict(
            contentToAnalyze, 
            hfResult, 
            googleResult
        );

        res.json(finalAnalysis);

    } catch (error) {
        console.error("Erreur d'analyse:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de l'analyse." });
    }
};
