import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK according to skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface GenerateRequest {
  discipline?: string;
  topic?: string;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
  count?: number;
  isWeaknessReinforcement?: boolean;
  weakTopics?: string[];
}

app.post('/api/generate-questions', async (req: Request<{}, {}, GenerateRequest>, res: Response) => {
  const {
    discipline = 'Legislação Educacional e do Maranhão',
    topic,
    difficulty = 'Médio',
    count = 5,
    isWeaknessReinforcement = false,
    weakTopics = [],
  } = req.body;

  const questionCount = Math.min(Math.max(Number(count) || 5, 1), 10);

  const weaknessContext = isWeaknessReinforcement && weakTopics.length > 0
    ? `ATENÇÃO ESPECIAL: Este é um SIMULADO DE REFORÇO DE ERROS. O candidato errou frequentemente os seguintes tópicos em simulados anteriores: ${weakTopics.join(', ')}. Crie questões que explorem as principais pegadinhas, exceções e pontos complexos desses temas específicos para sanar essas deficiências de aprendizado!`
    : '';

  const systemInstruction = `Você é um elaborador sênior da banca Fundação Carlos Chagas (FCC), especialista no concurso da SEDUC-MA (Secretaria de Estado da Educação do Maranhão) focado exclusivamente nos cargos de Professor de HISTÓRIA do Ensino Médio e Professor de BIOLOGIA do Ensino Médio.
Sua missão é formular questões inéditas, no padrão exato da FCC:
1. Para HISTÓRIA (Ensino Médio): Enunciados densos, historiografia crítica (Le Goff, Annales, E. P. Thompson, Boris Fausto), História do Maranhão (França Equinocial, Balaiada, Cosme Bento das Chagas, Beckman, Ciclo do Algodão), Brasil Colônia/Império/República, Ditadura Militar, Leis 10.639/03 e 11.645/08, e metodologias para jovens do Ensino Médio.
2. Para BIOLOGIA (Ensino Médio): Citologia e Biologia Molecular (quimiosmose, replicação, síntese proteica), Genética e Biotecnologia (Mendelismo, linkage, CRISPR, DNA recombinante), Ecologia e Meio Ambiente (magnificação trófica, ciclos biogeoquímicos, biomas do Maranhão: Amazônia, Cerrado, Baixada Maranhense e manguezais), Fisiologia Humana e Evolução Biológica.
3. Para Legislação e Pedagógicos: foco na Lei Estadual nº 9.860/2013 (Estatuto do Educador do MA), Lei 6.107/1994, LDBEN 9.394/96 e BNCC do Ensino Médio.
4. Exatamente 5 alternativas por questão (A, B, C, D, E), com apenas UMA correta e 4 distratores sofisticados típicos da FCC.
5. Gabarito comentado aprofundado com análise das alternativas incorretas e fundamentação teórica/legal.`;

  const prompt = `Gere exatamente ${questionCount} questões inéditas no estilo estrito da banca FCC para o concurso da SEDUC-MA (Foco: Professor de História e Biologia do Ensino Médio).
- Disciplina: ${discipline}
${topic ? `- Tópico específico: ${topic}` : ''}
- Nível de Dificuldade: ${difficulty}
${weaknessContext}

As questões devem ter nível de complexidade compatível com prova de Magistério de Ensino Médio da FCC.`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY não configurada no ambiente.');
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          description: 'Lista de questões de concurso estilo FCC',
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: 'Identificador único, ex: fcc-gen-1' },
              discipline: { type: Type.STRING, description: 'Nome da disciplina' },
              topic: { type: Type.STRING, description: 'Tópico abordado na questão' },
              difficulty: { type: Type.STRING, description: 'Fácil, Médio ou Difícil' },
              statement: { type: Type.STRING, description: 'Enunciado da questão' },
              textSupport: { type: Type.STRING, description: 'Texto motivador/de apoio (se houver, ou vazio)' },
              options: {
                type: Type.ARRAY,
                description: 'As 5 alternativas de A a E',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    letter: { type: Type.STRING, description: 'A, B, C, D ou E' },
                    text: { type: Type.STRING, description: 'Texto da alternativa' }
                  },
                  required: ['letter', 'text']
                }
              },
              correctOption: { type: Type.STRING, description: 'Letra correta: A, B, C, D ou E' },
              explanation: { type: Type.STRING, description: 'Gabarito comentado detalhado com fundamentação' },
              distractorsExplanation: {
                type: Type.OBJECT,
                properties: {
                  A: { type: Type.STRING },
                  B: { type: Type.STRING },
                  C: { type: Type.STRING },
                  D: { type: Type.STRING },
                  E: { type: Type.STRING }
                },
                required: ['A', 'B', 'C', 'D', 'E']
              },
              legislationReference: { type: Type.STRING, description: 'Artigo da lei, autor ou fundamentação teórica' },
              source: { type: Type.STRING, description: 'Identificação da fonte, ex: FCC - Inédita SEDUC/MA' }
            },
            required: ['id', 'discipline', 'topic', 'difficulty', 'statement', 'options', 'correctOption', 'explanation', 'source']
          }
        }
      }
    });

    const textOutput = response.text || '[]';
    const parsedQuestions = JSON.parse(textOutput);

    // Sanitize and ensure format
    const sanitized = parsedQuestions.map((q: any, idx: number) => ({
      ...q,
      id: q.id || `fcc-gen-${Date.now()}-${idx + 1}`,
      discipline: q.discipline || discipline,
      topic: q.topic || topic || 'Tópico Especial FCC',
      difficulty: q.difficulty || difficulty,
      source: q.source || 'FCC - Inédita IA SEDUC/MA',
      isAiGenerated: true
    }));

    return res.json({ success: true, questions: sanitized });
  } catch (err: any) {
    console.error('Erro ao gerar questões via Gemini API:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Falha ao gerar questões com a IA.',
    });
  }
});

app.post('/api/parse-edital', async (req: Request<{}, {}, { editalText: string; cargo?: string }>, res: Response) => {
  const { editalText, cargo = 'Professor da Educação Básica' } = req.body;

  if (!editalText || editalText.trim().length < 20) {
    return res.status(400).json({
      success: false,
      error: 'Texto do edital muito curto ou inválido.',
    });
  }

  const systemInstruction = `Você é um analista especialista em editais de concursos públicos da banca Fundação Carlos Chagas (FCC) para a SEDUC-MA (Secretaria de Educação do Maranhão).
Sua tarefa é ler o texto do edital ou conteúdo programático fornecido pelo usuário e convertê-lo em uma estrutura precisa de disciplinas e tópicos para alimentar o gerador de questões e simulados.
Organize por disciplinas claras (ex: Língua Portuguesa, Legislação Educacional do MA, Conhecimentos Pedagógicos, Conhecimentos Específicos do Cargo).
Para cada disciplina, extraia uma lista com 4 a 10 tópicos principais detalhados exatamente como cobrados no edital.`;

  const prompt = `Analise o seguinte trecho ou conteúdo programático do edital da FCC para SEDUC-MA (Cargo: ${cargo}):
"""
${editalText}
"""

Extraia as disciplinas e seus respectivos tópicos em formato JSON estruturado.`;

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY não configurada no ambiente.');
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            editalTitle: { type: Type.STRING, description: 'Título ou identificação do edital' },
            cargo: { type: Type.STRING, description: 'Cargo ou área de atuação' },
            summary: { type: Type.STRING, description: 'Resumo das novidades ou destaques do edital' },
            disciplines: {
              type: Type.ARRAY,
              description: 'Lista de disciplinas e tópicos programáticos',
              items: {
                type: Type.OBJECT,
                properties: {
                  disciplineName: { type: Type.STRING, description: 'Nome da disciplina' },
                  topics: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Tópicos específicos cobrados nesta disciplina'
                  }
                },
                required: ['disciplineName', 'topics']
              }
            }
          },
          required: ['disciplines', 'summary']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error('Erro ao processar edital via IA:', err?.message || err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Falha ao processar texto do edital.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // In dev, attach Vite middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`SimulaFCC SEDUC-MA server rodando na porta ${PORT}`);
  });
}

startServer();
