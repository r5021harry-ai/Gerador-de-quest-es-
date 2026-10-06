export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

export type OptionLetter = 'A' | 'B' | 'C' | 'D' | 'E';

export interface QuestionOption {
  letter: OptionLetter;
  text: string;
}

export interface Question {
  id: string;
  discipline: string;
  topic: string;
  difficulty: Difficulty;
  statement: string;
  textSupport?: string;
  options: QuestionOption[];
  correctOption: OptionLetter;
  explanation: string;
  distractorsExplanation?: Record<OptionLetter, string>;
  legislationReference?: string;
  source: string; // e.g. "FCC - SEDUC/MA 2024 (Adaptada)", "FCC - Magistério", "FCC - Inédita IA"
  isAiGenerated?: boolean;
}

export interface SimulationAttempt {
  id: string;
  title: string;
  timestamp: string; // ISO format
  disciplineFilter: string;
  difficultyFilter: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  mode: 'simulado' | 'treino';
  questions: Question[];
  userAnswers: Record<string, OptionLetter>; // questionId -> option
  eliminatedOptions?: Record<string, OptionLetter[]>; // questionId -> eliminated options
  isWeaknessReinforcement?: boolean;
}

export interface TopicStat {
  topic: string;
  discipline: string;
  answered: number;
  correct: number;
  incorrect: number;
  winRate: number;
}

export interface DisciplineStat {
  discipline: string;
  answered: number;
  correct: number;
  incorrect: number;
  winRate: number;
}

export interface UserStats {
  totalAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallWinRate: number;
  totalTimeSpentSeconds: number;
  disciplines: Record<string, { answered: number; correct: number; incorrect: number }>;
  topics: Record<string, { answered: number; correct: number; incorrect: number }>;
  difficulties: Record<Difficulty, { answered: number; correct: number; incorrect: number }>;
  attempts: SimulationAttempt[];
  wrongQuestionIds: string[]; // List of question IDs currently flagged as mistakes
  studyStreakDays: number;
  lastStudyDate?: string;
}

export interface FilterConfig {
  discipline: string;
  topic: string;
  difficulty: string;
  count: number;
  mode: 'simulado' | 'treino';
  timeLimitMinutes?: number;
}

export interface EditalInfo {
  status: 'pre-edital' | 'pos-edital';
  editalTitle: string;
  cargo: string;
  updatedAt: string;
  summary?: string;
  disciplines: Record<string, string[]>;
}

