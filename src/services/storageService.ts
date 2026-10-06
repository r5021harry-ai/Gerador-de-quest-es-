import { UserStats, SimulationAttempt, Question, Difficulty, EditalInfo } from '../types';
import { DEFAULT_QUESTIONS, SYLLABUS_DISCIPLINES } from '../data/defaultQuestions';

const STATS_STORAGE_KEY = 'simulafcc_seduc_ma_stats_v1';
const SAVED_QUESTIONS_KEY = 'simulafcc_seduc_ma_saved_questions_v1';
const EDITAL_STORAGE_KEY = 'simulafcc_seduc_ma_edital_hb_v2';

export function getDefaultEditalInfo(): EditalInfo {
  return {
    status: 'pre-edital',
    editalTitle: 'Edital SEDUC-MA • Professor de História e Biologia (Ensino Médio)',
    cargo: 'Professor de Ensino Médio - História & Biologia',
    updatedAt: new Date().toISOString(),
    summary: 'Estrutura programática focada exclusivamente nos conteúdos específicos para Professor de História e Professor de Biologia do Ensino Médio da SEDUC-MA (Banca FCC), acompanhada de Legislação do Maranhão (Lei 9.860/13), Conhecimentos Pedagógicos e Língua Portuguesa.',
    disciplines: SYLLABUS_DISCIPLINES,
  };
}

export function loadEditalInfo(): EditalInfo {
  try {
    const raw = localStorage.getItem(EDITAL_STORAGE_KEY);
    if (!raw) return getDefaultEditalInfo();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultEditalInfo(),
      ...parsed,
    };
  } catch (e) {
    return getDefaultEditalInfo();
  }
}

export function saveEditalInfo(info: EditalInfo): void {
  try {
    localStorage.setItem(EDITAL_STORAGE_KEY, JSON.stringify(info));
  } catch (e) {
    console.error('Erro ao salvar edital no localStorage:', e);
  }
}

export function resetEditalToDefault(): EditalInfo {
  const def = getDefaultEditalInfo();
  saveEditalInfo(def);
  return def;
}

export function getInitialStats(): UserStats {
  return {
    totalAnswered: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    overallWinRate: 0,
    totalTimeSpentSeconds: 0,
    disciplines: {},
    topics: {},
    difficulties: {
      'Fácil': { answered: 0, correct: 0, incorrect: 0 },
      'Médio': { answered: 0, correct: 0, incorrect: 0 },
      'Difícil': { answered: 0, correct: 0, incorrect: 0 },
    },
    attempts: [],
    wrongQuestionIds: [],
    studyStreakDays: 0,
    lastStudyDate: undefined,
  };
}

export function loadUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return getInitialStats();
    const parsed = JSON.parse(raw);
    return {
      ...getInitialStats(),
      ...parsed,
    };
  } catch (e) {
    console.error('Erro ao ler estatísticas do localStorage:', e);
    return getInitialStats();
  }
}

export function saveUserStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Erro ao salvar estatísticas no localStorage:', e);
  }
}

export function loadSavedCustomQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(SAVED_QUESTIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveCustomQuestions(newQuestions: Question[]): void {
  try {
    const existing = loadSavedCustomQuestions();
    const existingIds = new Set(existing.map(q => q.id));
    const toAdd = newQuestions.filter(q => !existingIds.has(q.id));
    const merged = [...existing, ...toAdd];
    localStorage.setItem(SAVED_QUESTIONS_KEY, JSON.stringify(merged));
  } catch (e) {
    console.error('Erro ao salvar questões geradas:', e);
  }
}

export function getAllAvailableQuestions(): Question[] {
  const custom = loadSavedCustomQuestions();
  const idMap = new Map<string, Question>();
  // default first
  for (const q of DEFAULT_QUESTIONS) {
    idMap.set(q.id, q);
  }
  // then custom
  for (const q of custom) {
    idMap.set(q.id, q);
  }
  return Array.from(idMap.values());
}

export function recordSimulationAttempt(attempt: SimulationAttempt): UserStats {
  const current = loadUserStats();
  const todayStr = new Date().toISOString().split('T')[0];

  // Update streak
  let streak = current.studyStreakDays || 0;
  if (!current.lastStudyDate) {
    streak = 1;
  } else if (current.lastStudyDate !== todayStr) {
    const lastDate = new Date(current.lastStudyDate);
    const today = new Date(todayStr);
    const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }

  // Aggregates
  const totalAnswered = current.totalAnswered + attempt.totalQuestions;
  const totalCorrect = current.totalCorrect + attempt.correctCount;
  const totalIncorrect = current.totalIncorrect + attempt.incorrectCount;
  const overallWinRate = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const totalTimeSpentSeconds = (current.totalTimeSpentSeconds || 0) + attempt.timeSpentSeconds;

  // Breakdown copies
  const disciplines = { ...current.disciplines };
  const topics = { ...current.topics };
  const difficulties = { ...current.difficulties };

  const wrongIdsSet = new Set(current.wrongQuestionIds || []);

  // Process each question answered
  attempt.questions.forEach((q) => {
    const userChoice = attempt.userAnswers[q.id];
    const isCorrect = userChoice === q.correctOption;

    // Discipline
    if (!disciplines[q.discipline]) {
      disciplines[q.discipline] = { answered: 0, correct: 0, incorrect: 0 };
    }
    disciplines[q.discipline].answered += 1;
    if (isCorrect) disciplines[q.discipline].correct += 1;
    else disciplines[q.discipline].incorrect += 1;

    // Topic
    if (!topics[q.topic]) {
      topics[q.topic] = { answered: 0, correct: 0, incorrect: 0 };
    }
    topics[q.topic].answered += 1;
    if (isCorrect) {
      topics[q.topic].correct += 1;
      // If was previously in wrong list and now answered correctly in a regular attempt, could be kept or resolved
    } else {
      topics[q.topic].incorrect += 1;
      wrongIdsSet.add(q.id);
    }

    // Difficulty
    const diffKey = q.difficulty as Difficulty;
    if (difficulties[diffKey]) {
      difficulties[diffKey].answered += 1;
      if (isCorrect) difficulties[diffKey].correct += 1;
      else difficulties[diffKey].incorrect += 1;
    }
  });

  // Save any AI generated questions inside the attempt so they can be re-accessed
  const aiQuestions = attempt.questions.filter(q => q.isAiGenerated);
  if (aiQuestions.length > 0) {
    saveCustomQuestions(aiQuestions);
  }

  const updated: UserStats = {
    totalAnswered,
    totalCorrect,
    totalIncorrect,
    overallWinRate,
    totalTimeSpentSeconds,
    disciplines,
    topics,
    difficulties,
    attempts: [attempt, ...(current.attempts || [])],
    wrongQuestionIds: Array.from(wrongIdsSet),
    studyStreakDays: streak,
    lastStudyDate: todayStr,
  };

  saveUserStats(updated);
  return updated;
}

export function removeWrongQuestion(questionId: string): UserStats {
  const current = loadUserStats();
  const updatedIds = current.wrongQuestionIds.filter(id => id !== questionId);
  const updated: UserStats = {
    ...current,
    wrongQuestionIds: updatedIds,
  };
  saveUserStats(updated);
  return updated;
}

export function getWeakestTopicsList(stats: UserStats, minAttempts = 1): { topic: string; discipline: string; errorRate: number; incorrectCount: number }[] {
  const result: { topic: string; discipline: string; errorRate: number; incorrectCount: number }[] = [];
  
  for (const [topicName, data] of Object.entries(stats.topics)) {
    if (data.answered >= minAttempts && data.incorrect > 0) {
      const errorRate = Math.round((data.incorrect / data.answered) * 100);
      // find discipline from known questions
      const foundQ = getAllAvailableQuestions().find(q => q.topic === topicName);
      result.push({
        topic: topicName,
        discipline: foundQ?.discipline || 'Conhecimentos Gerais',
        errorRate,
        incorrectCount: data.incorrect,
      });
    }
  }

  return result.sort((a, b) => b.incorrectCount - a.incorrectCount || b.errorRate - a.errorRate);
}
