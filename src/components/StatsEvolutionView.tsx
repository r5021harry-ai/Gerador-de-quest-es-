import React from 'react';
import { UserStats, SimulationAttempt } from '../types';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  History, 
  Target,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';

interface StatsEvolutionViewProps {
  stats: UserStats;
  onReviewPastAttempt: (attempt: SimulationAttempt) => void;
  onStartNewSimulation: () => void;
}

export const StatsEvolutionView: React.FC<StatsEvolutionViewProps> = ({
  stats,
  onReviewPastAttempt,
  onStartNewSimulation,
}) => {
  const attempts = stats.attempts || [];

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes} minutos`;
  };

  // Evolution data: last 10 attempts in chronological order
  const chronologicalAttempts = [...attempts].reverse().slice(-10);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Questions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Questões Respondidas
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {stats.totalAnswered}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {attempts.length} {attempts.length === 1 ? 'simulado concluído' : 'simulados concluídos'}
          </div>
        </div>

        {/* Global Accuracy Rate */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Aproveitamento Geral
          </div>
          <div className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
            stats.overallWinRate >= 75 ? 'text-emerald-600 dark:text-emerald-400' :
            stats.overallWinRate >= 50 ? 'text-amber-600 dark:text-amber-400' :
            'text-slate-800 dark:text-slate-200'
          }`}>
            {stats.overallWinRate}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {stats.totalCorrect} acertos • {stats.totalIncorrect} erros
          </div>
        </div>

        {/* Study Time */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Tempo de Treino</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {formatHours(stats.totalTimeSpentSeconds || 0)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Dedicados à prova SEDUC-MA
          </div>
        </div>

        {/* Active Streak */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Sequência Ativa</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {stats.studyStreakDays} {stats.studyStreakDays === 1 ? 'dia' : 'dias'}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Constância diária
          </div>
        </div>

      </div>

      {/* Evolution Chart (Simulated Bar Timeline) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Evolução Temporal das Notas (%)
            </h2>
          </div>
          <span className="text-xs text-slate-500">Últimos {chronologicalAttempts.length} simulados</span>
        </div>

        {chronologicalAttempts.length > 0 ? (
          <div className="pt-4 pb-2">
            <div className="h-44 flex items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-700 px-2 pb-2">
              {chronologicalAttempts.map((att, i) => {
                const heightPercent = Math.max(att.scorePercentage, 8);
                const isGreat = att.scorePercentage >= 75;
                const isMedium = att.scorePercentage >= 50;

                return (
                  <div key={att.id} className="flex-1 flex flex-col items-center group relative">
                    {/* Tooltip hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-lg z-20">
                      {att.scorePercentage}% ({att.correctCount}/{att.totalQuestions})
                      <br />
                      {new Date(att.timestamp).toLocaleDateString('pt-BR')}
                    </div>

                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1 group-hover:scale-110 transition">
                      {att.scorePercentage}%
                    </span>

                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                        isGreat
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:brightness-110'
                          : isMedium
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 group-hover:brightness-110'
                          : 'bg-gradient-to-t from-rose-600 to-rose-400 group-hover:brightness-110'
                      }`}
                    />

                    <span className="text-[9px] text-slate-400 mt-2 truncate w-full text-center">
                      #{chronologicalAttempts.length - chronologicalAttempts.length + i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 px-2">
              <span>Primeiros Simulados</span>
              <span className="text-emerald-600 font-semibold">Meta de Aprovação SEDUC-MA: ≥ 75%</span>
              <span>Simulados Recentes</span>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">
            Nenhum simulado registrado ainda. Inicie um simulado para gerar seu gráfico de evolução!
          </div>
        )}
      </div>

      {/* Performance by Discipline Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Aproveitamento por Disciplina do Edital</span>
        </h2>

        <div className="space-y-3">
          {Object.entries(stats.disciplines).length > 0 ? (
            Object.entries(stats.disciplines).map(([discName, discData]) => {
              const winRate = discData.answered > 0
                ? Math.round((discData.correct / discData.answered) * 100)
                : 0;

              return (
                <div key={discName} className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-750">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {discName}
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {winRate}% ({discData.correct}/{discData.answered})
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${winRate}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        winRate >= 75 ? 'bg-emerald-500' :
                        winRate >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-4 text-center text-xs text-slate-500">
              Ainda não há dados acumulados por disciplina.
            </div>
          )}
        </div>
      </div>

      {/* History of Past Simulations */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <History className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span>Histórico de Rodadas Anteriores</span>
          </h2>
          <span className="text-xs text-slate-500">
            {attempts.length} {attempts.length === 1 ? 'rodada gravada' : 'rodadas gravadas'}
          </span>
        </div>

        {attempts.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {attempts.map((att) => (
              <div
                key={att.id}
                onClick={() => onReviewPastAttempt(att)}
                className="py-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 p-2 rounded-xl transition cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition flex items-center space-x-2">
                    <span>{att.title}</span>
                    {att.isWeaknessReinforcement && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold">
                        Reforço
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center space-x-3">
                    <span>{new Date(att.timestamp).toLocaleString('pt-BR')}</span>
                    <span>•</span>
                    <span>{att.totalQuestions} questões</span>
                    <span>•</span>
                    <span>{Math.floor(att.timeSpentSeconds / 60)} min</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-base font-black px-2.5 py-1 rounded-lg ${
                    att.scorePercentage >= 75
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : att.scorePercentage >= 50
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}>
                    {att.scorePercentage}%
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-500">
            Nenhuma rodada no histórico. Conclua seu primeiro simulado!
          </div>
        )}
      </div>

    </div>
  );
};
