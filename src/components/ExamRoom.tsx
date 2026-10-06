import React, { useState, useEffect, useCallback } from 'react';
import { 
  Question, 
  OptionLetter, 
  SimulationAttempt 
} from '../types';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Strikethrough, 
  BookOpen, 
  Send,
  X
} from 'lucide-react';

interface ExamRoomProps {
  questions: Question[];
  mode: 'simulado' | 'treino';
  disciplineName: string;
  difficultyFilter: string;
  timeLimitMinutes?: number;
  isWeaknessReinforcement?: boolean;
  onFinishExam: (attempt: SimulationAttempt) => void;
  onCancelExam: () => void;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({
  questions,
  mode,
  disciplineName,
  difficultyFilter,
  timeLimitMinutes,
  isWeaknessReinforcement,
  onFinishExam,
  onCancelExam,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, OptionLetter>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string, OptionLetter[]>>({});
  const [showTrainingExplanation, setShowTrainingExplanation] = useState<Record<string, boolean>>({});
  const [showFinishConfirm, setShowFinishConfirm] = useState<boolean>(false);

  // Timers
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const timeLimitSeconds = timeLimitMinutes ? timeLimitMinutes * 60 : undefined;
  const [secondsRemaining, setSecondsRemaining] = useState<number | undefined>(timeLimitSeconds);

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);

      if (timeLimitSeconds !== undefined) {
        setSecondsRemaining((prev) => {
          if (prev === undefined || prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimitSeconds]);

  const currentQ = questions[currentIndex];

  // Option selection
  const handleSelectOption = (letter: OptionLetter) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: letter,
    }));
  };

  // Toggle eliminate option
  const handleToggleEliminate = (e: React.MouseEvent, letter: OptionLetter) => {
    e.stopPropagation();
    const currentElim = eliminatedOptions[currentQ.id] || [];
    if (currentElim.includes(letter)) {
      setEliminatedOptions((prev) => ({
        ...prev,
        [currentQ.id]: currentElim.filter((l) => l !== letter),
      }));
    } else {
      setEliminatedOptions((prev) => ({
        ...prev,
        [currentQ.id]: [...currentElim, letter],
      }));
    }
  };

  // Toggle mark review
  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  // Toggle explanation in Training Mode
  const handleToggleExplanation = () => {
    setShowTrainingExplanation((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  // Build and submit attempt
  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === q.correctOption) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    const attempt: SimulationAttempt = {
      id: `sim-${Date.now()}`,
      title: isWeaknessReinforcement
        ? 'Simulado de Reforço (Conteúdos Mais Errados)'
        : `Simulado FCC - ${disciplineName} (${difficultyFilter})`,
      timestamp: new Date().toISOString(),
      disciplineFilter: disciplineName,
      difficultyFilter: difficultyFilter,
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      scorePercentage,
      timeSpentSeconds: secondsElapsed,
      mode,
      questions,
      userAnswers,
      eliminatedOptions,
      isWeaknessReinforcement,
    };

    onFinishExam(attempt);
  }, [questions, userAnswers, eliminatedOptions, disciplineName, difficultyFilter, secondsElapsed, mode, isWeaknessReinforcement, onFinishExam]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showFinishConfirm) return;
      if (['ArrowRight', 'PageDown'].includes(e.key) && currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key) && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      } else if (['a', 'A', '1'].includes(e.key)) {
        handleSelectOption('A');
      } else if (['b', 'B', '2'].includes(e.key)) {
        handleSelectOption('B');
      } else if (['c', 'C', '3'].includes(e.key)) {
        handleSelectOption('C');
      } else if (['d', 'D', '4'].includes(e.key)) {
        handleSelectOption('D');
      } else if (['e', 'E', '5'].includes(e.key)) {
        handleSelectOption('E');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, currentQ?.id, showFinishConfirm]);

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  // Format timer
  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCurrentAnswered = userAnswers[currentQ.id] !== undefined;
  const currentElims = eliminatedOptions[currentQ.id] || [];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      
      {/* Top Bar: Progress, Timer, and Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Info & Counter */}
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold">
            Questão {currentIndex + 1} de {questions.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            <span>Respondidas: <strong>{answeredCount}</strong>/{questions.length}</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold border ${
            secondsRemaining !== undefined && secondsRemaining < 180
              ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>
              {secondsRemaining !== undefined
                ? `Tempo Restante: ${formatTime(secondsRemaining)}`
                : `Tempo Decorrido: ${formatTime(secondsElapsed)}`}
            </span>
          </div>

          <button
            onClick={() => setShowFinishConfirm(true)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition flex items-center space-x-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finalizar Prova</span>
          </button>
        </div>
      </div>

      {/* Question Index Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Navegação da Prova
          </span>
          <div className="flex items-center space-x-3 text-[10px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>Respondida</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Revisão</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
              <span>Em branco</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isReviewed = markedForReview[q.id];
            const isCurrent = idx === currentIndex;

            let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200';
            if (isAnswered) {
              bgClass = 'bg-blue-600 text-white font-bold';
            }
            if (isReviewed) {
              bgClass = 'bg-amber-500 text-white font-bold ring-2 ring-amber-300';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs flex items-center justify-center transition-all relative ${bgClass} ${
                  isCurrent ? 'ring-2 ring-offset-2 ring-blue-500 scale-105' : ''
                }`}
                title={`Questão ${idx + 1}`}
              >
                {idx + 1}
                {isReviewed && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Question Main Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Question Metadata Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800">
              {currentQ.discipline}
            </span>
            <span className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
              {currentQ.topic}
            </span>
            <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
              currentQ.difficulty === 'Difícil'
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                : currentQ.difficulty === 'Médio'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              {currentQ.source}
            </span>
            <button
              onClick={handleToggleReview}
              className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition ${
                markedForReview[currentQ.id]
                  ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
              title="Marcar questão para revisar depois"
            >
              <Flag className={`w-3.5 h-3.5 ${markedForReview[currentQ.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">Revisar</span>
            </button>
          </div>
        </div>

        {/* Text Support (Texto Motivador) */}
        {currentQ.textSupport && (
          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200/80 dark:border-slate-750 text-slate-800 dark:text-slate-200 text-sm leading-relaxed italic border-l-4 border-l-blue-500">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase not-italic mb-1">
              Texto de Apoio • Fundação Carlos Chagas:
            </div>
            {currentQ.textSupport}
          </div>
        )}

        {/* Statement (Enunciado) */}
        <div className="text-slate-900 dark:text-slate-100 font-medium text-base sm:text-lg leading-relaxed">
          {currentQ.statement}
        </div>

        {/* Options List (A to E) */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt) => {
            const isSelected = userAnswers[currentQ.id] === opt.letter;
            const isEliminated = currentElims.includes(opt.letter);

            return (
              <div
                key={opt.letter}
                onClick={() => handleSelectOption(opt.letter)}
                className={`relative flex items-start p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                  isEliminated
                    ? 'opacity-40 bg-slate-100/60 dark:bg-slate-800/40 border-dashed border-slate-300 dark:border-slate-700 line-through'
                    : isSelected
                    ? 'border-blue-600 bg-blue-50/90 dark:bg-blue-950/50 text-blue-950 dark:text-blue-100 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                }`}
              >
                {/* Letter Circle */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-3.5 shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {opt.letter}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-sm sm:text-base leading-relaxed pt-0.5">
                  {opt.text}
                </div>

                {/* Eliminate Option Button (Strikethrough) */}
                <button
                  type="button"
                  onClick={(e) => handleToggleEliminate(e, opt.letter)}
                  className={`ml-2 p-1.5 rounded-lg text-xs transition shrink-0 ${
                    isEliminated
                      ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={isEliminated ? 'Restaurar alternativa' : 'Riscar/eliminar alternativa'}
                >
                  <Strikethrough className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Training Mode Immediate Explanation */}
        {mode === 'treino' && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleToggleExplanation}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {showTrainingExplanation[currentQ.id]
                  ? 'Ocultar Gabarito Comentado Desta Questão'
                  : 'Revelar Gabarito Comentado Desta Questão'}
              </span>
            </button>

            {showTrainingExplanation[currentQ.id] && (
              <div className="mt-3 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm space-y-2">
                <div className="flex items-center space-x-2 font-bold text-indigo-900 dark:text-indigo-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Gabarito Oficial: Letra {currentQ.correctOption}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
                {currentQ.legislationReference && (
                  <div className="text-[11px] text-indigo-800 dark:text-indigo-300 font-semibold pt-1 border-t border-indigo-200 dark:border-indigo-800">
                    Fundamentação: {currentQ.legislationReference}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Questão Anterior</span>
          </button>

          <span className="text-xs text-slate-400 hidden sm:inline">
            Atalho: Teclas 1 a 5 ou A a E para marcar • Setas para navegar
          </span>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow transition flex items-center space-x-1"
            >
              <span>Próxima Questão</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowFinishConfirm(true)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition flex items-center space-x-1"
            >
              <Send className="w-4 h-4" />
              <span>Finalizar Simulado</span>
            </button>
          )}
        </div>

      </div>

      {/* Confirmation Modal Before Submission */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-lg">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span>Confirmar Envio da Prova</span>
              </div>
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Deseja entregar o simulado agora e gerar seu relatório detalhado de desempenho com os gabaritos comentados?
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Total de questões:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Questões respondidas:</span>
                <span className="font-bold text-blue-600">{answeredCount}</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-amber-600 dark:text-amber-400 font-semibold">
                  <span>Questões em branco:</span>
                  <span>{unansweredCount}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Revisar Mais
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition"
              >
                Sim, Entregar Prova
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
