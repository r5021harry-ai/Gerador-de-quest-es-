import React, { useState, useEffect } from 'react';
import { 
  SimulationAttempt, 
  Question, 
  OptionLetter 
} from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trophy, 
  RotateCcw, 
  Printer, 
  PlusCircle, 
  BookMarked, 
  Sparkles, 
  HelpCircle,
  TrendingUp,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SimulationResultProps {
  attempt: SimulationAttempt;
  onNewSimulation: () => void;
  onStartReinforcement: (weakTopics: string[]) => void;
  onGoToMistakeNotebook: () => void;
  onGoToStats: () => void;
  onAddQuestionToMistakes?: (questionId: string) => void;
}

export const SimulationResult: React.FC<SimulationResultProps> = ({
  attempt,
  onNewSimulation,
  onStartReinforcement,
  onGoToMistakeNotebook,
  onGoToStats,
  onAddQuestionToMistakes,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'errors' | 'corrects'>('all');
  const [retestingQuestionId, setRetestingQuestionId] = useState<string | null>(null);
  const [retestChoice, setRetestChoice] = useState<Record<string, OptionLetter>>({});

  useEffect(() => {
    if (attempt.scorePercentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore confetti errors
      }
    }
  }, [attempt.scorePercentage]);

  // Extract topics of wrong questions
  const wrongQuestions = attempt.questions.filter(
    (q) => attempt.userAnswers[q.id] !== q.correctOption
  );
  const wrongTopics = Array.from(new Set(wrongQuestions.map((q) => q.topic)));

  const filteredQuestions = attempt.questions.filter((q) => {
    const isCorrect = attempt.userAnswers[q.id] === q.correctOption;
    if (filterMode === 'errors') return !isCorrect;
    if (filterMode === 'corrects') return isCorrect;
    return true;
  });

  const avgSecondsPerQ = Math.round(attempt.timeSpentSeconds / attempt.totalQuestions);
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Hero Scorecard */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Background gradient decorative glow */}
        <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
          attempt.scorePercentage >= 70 ? 'bg-emerald-500' :
          attempt.scorePercentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
        }`} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Main Score & Diagnostic */}
          <div className="flex items-center space-x-6 text-center sm:text-left">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex flex-col items-center justify-center font-black shadow-inner border-4 ${
              attempt.scorePercentage >= 75
                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                : attempt.scorePercentage >= 50
                ? 'bg-amber-50 border-amber-500 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                : 'bg-rose-50 border-rose-500 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
            }`}>
              <span className="text-3xl sm:text-4xl">{attempt.scorePercentage}%</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Aproveitamento</span>
            </div>

            <div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Resultado da Prova
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {attempt.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-lg">
                {attempt.scorePercentage >= 80
                  ? 'Desempenho de excelência! Você alcançou padrão de pontuação com altíssimas chances de convocação no concurso da SEDUC-MA.'
                  : attempt.scorePercentage >= 60
                  ? 'Bom rendimento! Mantenha a constância e revise os pontos comentados dos distratores da FCC para subir para a faixa dos 80%.'
                  : 'Fase de construção e ajuste de base. Utilize o Simulado de Reforço abaixo para focar cirurgicamente nos temas com erros!'}
              </p>
            </div>
          </div>

          {/* Quick Stats Pill Column */}
          <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
            <div className="flex-1 sm:flex-initial bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center sm:text-left">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Acertos</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                {attempt.correctCount} / {attempt.totalQuestions}
              </span>
            </div>

            <div className="flex-1 sm:flex-initial bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center sm:text-left">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Tempo Total</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                {formatTime(attempt.timeSpentSeconds)}
              </span>
            </div>

            <div className="flex-1 sm:flex-initial bg-slate-50 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center sm:text-left">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Média por Questão</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                {avgSecondsPerQ}s
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons Row */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2.5">
          
          {/* Key Requirement: Simulado de Reforço de Erros */}
          {wrongQuestions.length > 0 && (
            <button
              onClick={() => onStartReinforcement(wrongTopics)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Simulado de Reforço com Esses {wrongQuestions.length} Erros</span>
            </button>
          )}

          <button
            onClick={onNewSimulation}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow transition flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Novo Simulado</span>
          </button>

          <button
            onClick={onGoToMistakeNotebook}
            className="px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center space-x-1.5"
            title="Abrir Caderno de Erros completo"
          >
            <BookMarked className="w-4 h-4 text-amber-500" />
            <span>Caderno de Erros</span>
          </button>

          <button
            onClick={onGoToStats}
            className="px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center space-x-1.5"
          >
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            <span>Ver Evolução</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center space-x-1.5 print:hidden"
            title="Imprimir ou Salvar em PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / PDF</span>
          </button>
        </div>

      </div>

      {/* Answer Key Filter Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Gabaritos Comentados & Análise da FCC
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Veja a fundamentação completa, pegadinhas e justificativas de cada alternativa
          </p>
        </div>

        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              filterMode === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Todas ({attempt.totalQuestions})
          </button>
          <button
            onClick={() => setFilterMode('errors')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1 ${
              filterMode === 'errors'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-600 dark:text-rose-400 hover:text-rose-700'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Erros ({attempt.incorrectCount})</span>
          </button>
          <button
            onClick={() => setFilterMode('corrects')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center space-x-1 ${
              filterMode === 'corrects'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Acertos ({attempt.correctCount})</span>
          </button>
        </div>
      </div>

      {/* Questions Detailed Accordion / Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const userChoice = attempt.userAnswers[q.id];
          const isCorrect = userChoice === q.correctOption;
          const isRetesting = retestingQuestionId === q.id;

          return (
            <div
              key={q.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border transition shadow-sm overflow-hidden ${
                isCorrect
                  ? 'border-emerald-200 dark:border-emerald-900/60'
                  : 'border-rose-200 dark:border-rose-900/60'
              }`}
            >
              
              {/* Question Header */}
              <div className={`p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b ${
                isCorrect
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/40'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        Questão {idx + 1}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {isCorrect ? 'Você Acertou' : 'Você Errou'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {q.discipline} • {q.topic}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <div className="bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 font-medium">
                    Sua resposta: <strong className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                      {userChoice || 'Em branco'}
                    </strong>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 font-bold">
                    Gabarito: {q.correctOption}
                  </div>
                </div>
              </div>

              {/* Question Body */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Text Support if present */}
                {q.textSupport && (
                  <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200/80 dark:border-slate-750 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic border-l-4 border-l-blue-500">
                    <span className="font-bold not-italic text-slate-500 block text-[11px] mb-1">
                      Texto Motivador FCC:
                    </span>
                    {q.textSupport}
                  </div>
                )}

                {/* Statement */}
                <div className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium leading-relaxed">
                  {q.statement}
                </div>

                {/* Options Review */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const isUserPick = userChoice === opt.letter;
                    const isGabarito = q.correctOption === opt.letter;

                    let rowStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300';
                    if (isGabarito) {
                      rowStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-medium ring-1 ring-emerald-500';
                    } else if (isUserPick && !isCorrect) {
                      rowStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 line-through ring-1 ring-rose-500';
                    }

                    return (
                      <div
                        key={opt.letter}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start space-x-3 transition ${rowStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isGabarito
                            ? 'bg-emerald-600 text-white'
                            : isUserPick
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {opt.letter}
                        </span>
                        <div className="flex-1 leading-relaxed pt-0.5">
                          {opt.text}
                        </div>
                        {isGabarito && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white shrink-0">
                            CORRETA
                          </span>
                        )}
                        {isUserPick && !isCorrect && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white shrink-0">
                            SEU ERRO
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* In-depth Commented Resolution Box */}
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Comentário Detalhado do Gabarito (Padrão FCC)</span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {q.explanation}
                  </p>

                  {/* Distractor traps explanation if available */}
                  {q.distractorsExplanation && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block uppercase">
                        Análise dos Distratores e Pegadinhas da FCC:
                      </span>
                      {Object.entries(q.distractorsExplanation).map(([letter, distText]) => (
                        <div key={letter} className="text-xs text-slate-600 dark:text-slate-400 pl-2 border-l-2 border-slate-300 dark:border-slate-600">
                          <strong>Alternativa {letter}:</strong> {distText}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Legal/Theoretical Reference */}
                  {q.legislationReference && (
                    <div className="pt-2 text-[11px] text-blue-700 dark:text-blue-300 font-semibold flex items-center space-x-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Fundamentação Legal / Referência: {q.legislationReference}</span>
                    </div>
                  )}
                </div>

                {/* Retest Inline Helper if Wrong */}
                {!isCorrect && (
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => setRetestingQuestionId(isRetesting ? null : q.id)}
                      className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isRetesting ? 'Fechar Reteste' : 'Refazer esta questão agora para fixar'}</span>
                    </button>
                    {onAddQuestionToMistakes && (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                        Adicionada automaticamente ao Caderno de Erros
                      </span>
                    )}
                  </div>
                )}

                {isRetesting && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                      Reteste Imediato: Escolha a alternativa correta sem olhar o gabarito
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt.letter}
                          onClick={() => setRetestChoice((prev) => ({ ...prev, [q.id]: opt.letter }))}
                          className={`w-9 h-9 rounded-lg font-bold text-xs border ${
                            retestChoice[q.id] === opt.letter
                              ? opt.letter === q.correctOption
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-rose-600 text-white border-rose-600'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300'
                          }`}
                        >
                          {opt.letter}
                        </button>
                      ))}
                    </div>
                    {retestChoice[q.id] && (
                      <div className="text-xs font-bold">
                        {retestChoice[q.id] === q.correctOption ? (
                          <span className="text-emerald-700 dark:text-emerald-300">
                            Excelente! Você acertou na segunda tentativa e fixou o conceito!
                          </span>
                        ) : (
                          <span className="text-rose-700 dark:text-rose-300">
                            Ainda incorreto. O gabarito oficial é a letra {q.correctOption}.
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
