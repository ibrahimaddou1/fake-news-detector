import axios from 'axios';
import * as cheerio from 'cheerio';

export const extractTextFromUrl = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        // Priorité aux balises <article>, sinon <body>
        let text = $('article').text();
        if (!text) {
            text = $('body').text();
        }
        // Nettoyage basique
        return text.replace(/\s\s+/g, ' ').trim();
    } catch (error) {
        console.error("Erreur d'extraction du texte:", error);
        throw new Error("Impossible d'extraire le contenu de l'URL.");
    }
};
