import React, { useState } from 'react';
import { UserStats, Question, OptionLetter } from '../types';
import { getAllAvailableQuestions } from '../services/storageService';
import { 
  BookMarked, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Trash2, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface MistakeNotebookViewProps {
  stats: UserStats;
  onRemoveMistake: (questionId: string) => void;
  onStartReinforcement: (topics: string[]) => void;
}

export const MistakeNotebookView: React.FC<MistakeNotebookViewProps> = ({
  stats,
  onRemoveMistake,
  onStartReinforcement,
}) => {
  const allPool = getAllAvailableQuestions();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Todas');
  const [activeAnswers, setActiveAnswers] = useState<Record<string, OptionLetter>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Filter questions currently in wrongQuestionIds
  const wrongIds = stats.wrongQuestionIds || [];
  const wrongQuestions = allPool.filter((q) => wrongIds.includes(q.id));

  const filtered = selectedDiscipline === 'Todas'
    ? wrongQuestions
    : wrongQuestions.filter((q) => q.discipline === selectedDiscipline);

  const disciplinesInMistakes = Array.from(new Set(wrongQuestions.map((q) => q.discipline)));

  const handleSelectOption = (questionId: string, letter: OptionLetter) => {
    setActiveAnswers((prev) => ({
      ...prev,
      [questionId]: letter,
    }));
  };

  const handleToggleReveal = (questionId: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (wrongQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Caderno de Erros Vazio e Limpo!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Você não possui nenhuma questão pendente de revisão no momento. Faça novos simulados para mapear conteúdos desafiadores.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-lg">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Caderno de Erros ({wrongQuestions.length} questões)
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Revise cada item individualmente até dominar o assunto e remover a questão da lista de erros
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onStartReinforcement(wrongQuestions.map((q) => q.topic))}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow transition flex items-center space-x-2 shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Simulado Geral de Reforço</span>
        </button>
      </div>

      {/* Discipline filter chips */}
      {disciplinesInMistakes.length > 1 && (
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 flex items-center space-x-1 shrink-0 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar:</span>
          </span>
          <button
            onClick={() => setSelectedDiscipline('Todas')}
            className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              selectedDiscipline === 'Todas'
                ? 'bg-amber-600 text-white shadow-sm font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Todas ({wrongQuestions.length})
          </button>
          {disciplinesInMistakes.map((disc) => (
            <button
              key={disc}
              onClick={() => setSelectedDiscipline(disc)}
              className={`px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
                selectedDiscipline === disc
                  ? 'bg-amber-600 text-white shadow-sm font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {disc}
            </button>
          ))}
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-4">
        {filtered.map((q, idx) => {
          const userChoice = activeAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctOption;
          const isRevealed = revealedSolutions[q.id];

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-800">
                    {q.discipline}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {q.topic}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveMistake(q.id)}
                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 transition text-xs flex items-center space-x-1"
                  title="Remover do Caderno de Erros"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Remover</span>
                </button>
              </div>

              {/* Statement */}
              <div className="text-slate-900 dark:text-slate-100 text-sm font-medium leading-relaxed">
                {q.statement}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt) => {
                  const isSelected = userChoice === opt.letter;
                  const isTargetCorrect = q.correctOption === opt.letter;

                  let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300';
                  if (isSelected) {
                    style = isTargetCorrect
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 font-medium'
                      : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900';
                  } else if (isRevealed && isTargetCorrect) {
                    style = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 font-semibold';
                  }

                  return (
                    <div
                      key={opt.letter}
                      onClick={() => handleSelectOption(q.id, opt.letter)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start space-x-3 cursor-pointer transition ${style}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? isTargetCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {opt.letter}
                      </span>
                      <div className="flex-1 pt-0.5 leading-relaxed">
                        {opt.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback and Solution */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => handleToggleReveal(q.id)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isRevealed ? 'Ocultar Gabarito Comentado' : 'Ver Gabarito Comentado'}
                </button>

                {isAnswered && (
                  <div className="flex items-center space-x-2 text-xs">
                    {isCorrect ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-600 font-bold flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Acertou!</span>
                        </span>
                        <button
                          onClick={() => onRemoveMistake(q.id)}
                          className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition"
                        >
                          Limpar do Caderno
                        </button>
                      </div>
                    ) : (
                      <span className="text-rose-600 font-bold flex items-center space-x-1">
                        <XCircle className="w-4 h-4" />
                        <span>Ainda incorreto. Tente novamente!</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Solution box */}
              {isRevealed && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Gabarito Oficial: Letra {q.correctOption}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>
                  {q.legislationReference && (
                    <div className="text-[11px] text-blue-700 dark:text-blue-300 font-semibold pt-1 border-t border-slate-200 dark:border-slate-700">
                      Fundamentação: {q.legislationReference}
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
