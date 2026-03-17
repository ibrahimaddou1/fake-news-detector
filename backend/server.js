import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeContent } from './controllers/analyze.controller.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route principale pour l'analyse
app.post('/api/analyze', analyzeContent);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
