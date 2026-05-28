import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Încarcă variabilele din .env
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// ---- MIDDLEWARES ----
// Helmet adaugă header-uri de securitate
app.use(helmet());

// CORS permite frontend-ului să vorbească cu backend-ul
app.use(cors());

// Permite primirea de JSON în body-ul cererilor
app.use(express.json());

// ---- RUTE ----
// Ruta de bază — testezi că serverul merge
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API merge! 🚀',
    timestamp: new Date().toISOString(),
  });
});

// Ruta de health check — folosită de Docker și CI/CD
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// ---- PORNEȘTE SERVERUL ----
app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe portul ${PORT}`);
});

export default app;