import { Question, FilterConfig, Difficulty } from '../types';
import { getAllAvailableQuestions, saveCustomQuestions } from './storageService';

export interface GenerateOptions {
  discipline: string;
  topic?: string;
  difficulty: Difficulty | 'Todos' | string;
  count: number;
  isWeaknessReinforcement?: boolean;
  weakTopics?: string[];
}

export async function requestAIGeneratedQuestions(options: GenerateOptions): Promise<{ questions: Question[]; source: 'api' | 'fallback' }> {
  try {
    const res = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        saveCustomQuestions(data.questions);
        return { questions: data.questions, source: 'api' };
      }
    }
  } catch (err) {
    console.warn('API de geração indisponível ou offline. Usando banco estruturado.', err);
  }

  // Fallback to intelligent local sampling & enrichment
  const fallbackQuestions = generateFallbackQuestions(options);
  return { questions: fallbackQuestions, source: 'fallback' };
}

function generateFallbackQuestions(options: GenerateOptions): Question[] {
  const allPool = getAllAvailableQuestions();
  let filtered = allPool.filter(q => {
    if (options.discipline && options.discipline !== 'Todas' && q.discipline !== options.discipline) {
      return false;
    }
    if (options.topic && options.topic !== 'Todos' && q.topic !== options.topic) {
      return false;
    }
    if (options.difficulty && options.difficulty !== 'Todos' && q.difficulty !== options.difficulty) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    // relax difficulty or topic
    filtered = allPool.filter(q => {
      if (options.discipline && options.discipline !== 'Todas') return q.discipline === options.discipline;
      return true;
    });
  }

  if (filtered.length === 0) {
    filtered = [...allPool];
  }

  // Shuffle
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, options.count);
}

export function filterLocalQuestions(
  pool: Question[],
  filters: {
    discipline?: string;
    topic?: string;
    difficulty?: string;
    count?: number;
  }
): Question[] {
  let matched = pool.filter(q => {
    if (filters.discipline && filters.discipline !== 'Todas' && q.discipline !== filters.discipline) {
      return false;
    }
    if (filters.topic && filters.topic !== 'Todos' && q.topic !== filters.topic) {
      return false;
    }
    if (filters.difficulty && filters.difficulty !== 'Todos' && q.difficulty !== filters.difficulty) {
      return false;
    }
    return true;
  });

  if (matched.length === 0) {
    matched = pool;
  }

  const shuffled = [...matched].sort(() => Math.random() - 0.5);
  const count = filters.count || 5;
  return shuffled.slice(0, count);
}
