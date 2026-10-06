import React, { useState } from 'react';
import { UserStats, Question } from '../types';
import { getWeakestTopicsList, getAllAvailableQuestions } from '../services/storageService';
import { 
  Target, 
  Sparkles, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  BookMarked,
  Flame,
  ArrowRight
} from 'lucide-react';

interface WeaknessReinforcementViewProps {
  stats: UserStats;
  onLaunchReinforcementSimulation: (
    topics: string[], 
    questionCount: number, 
    useAiGenerator: boolean
  ) => void;
  onGoToConfigurator: () => void;
}

export const WeaknessReinforcementView: React.FC<WeaknessReinforcementViewProps> = ({
  stats,
  onLaunchReinforcementSimulation,
  onGoToConfigurator,
}) => {
  const weakTopics = getWeakestTopicsList(stats);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    weakTopics.slice(0, 5).map((t) => t.topic)
  );
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [modeType, setModeType] = useState<'ai' | 'bank'>('ai');

  const toggleTopic = (topicName: string) => {
    if (selectedTopics.includes(topicName)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topicName));
    } else {
      setSelectedTopics([...selectedTopics, topicName]);
    }
  };

  const selectAll = () => {
    setSelectedTopics(weakTopics.map((t) => t.topic));
  };

  const clearAll = () => {
    setSelectedTopics([]);
  };

  const handleLaunch = () => {
    const topicsToUse = selectedTopics.length > 0
      ? selectedTopics
      : weakTopics.map((t) => t.topic);
    onLaunchReinforcementSimulation(topicsToUse, questionCount, modeType === 'ai');
  };

  // If no mistakes recorded yet
  if (weakTopics.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Nenhum Ponto Fraco Detectado Ainda!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Assim que você responder simulados e registrar eventuais erros, nosso algoritmo mapeará automaticamente os tópicos de maior dificuldade da FCC para gerar listas cirúrgicas de reforço.
          </p>
        </div>
        <button
          onClick={onGoToConfigurator}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow transition inline-flex items-center space-x-2"
        >
          <span>Realizar Meu Primeiro Simulado</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner Intro */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Target className="w-3.5 h-3.5" />
            <span>Aprendizagem Adaptativa • SEDUC-MA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simulado de Reforço Focado em Erros
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
            O método mais rápido para aprovação em concursos é sanar imediatamente as falhas conceituais detectadas nas rodadas anteriores. Mapeamos os conteúdos em que você mais errou para criar seu treino intensivo.
          </p>
        </div>
      </div>

      {/* Topics Diagnostic Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Tópicos com Maior Índice de Erros no seu Histórico
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selecione quais temas deseja priorizar neste simulado de reforço
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <button
              onClick={selectAll}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Marcar Todos
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={clearAll}
              className="text-slate-500 hover:underline"
            >
              Desmarcar
            </button>
          </div>
        </div>

        {/* Weakness cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {weakTopics.map((item) => {
            const isSelected = selectedTopics.includes(item.topic);

            return (
              <div
                key={item.topic}
                onClick={() => toggleTopic(item.topic)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-slate-900 dark:text-slate-100 ring-1 ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}} // handled by div
                  className="mt-1 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate text-slate-900 dark:text-white">
                    {item.topic}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {item.discipline}
                  </div>
                  <div className="flex items-center space-x-3 mt-2 text-[11px]">
                    <span className="font-semibold text-rose-600 dark:text-rose-400">
                      {item.incorrectCount} {item.incorrectCount === 1 ? 'erro registrado' : 'erros registrados'}
                    </span>
                    <span className="text-slate-400">
                      Taxa de erro: {item.errorRate}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reinforcement Configuration */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Mode: New AI Questions vs Retest Existing Mistake Pool */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
            Tipo de Simulado de Reforço
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => setModeType('ai')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                modeType === 'ai'
                  ? 'border-rose-600 bg-rose-50/60 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/30'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <span>Gerar Questões Inéditas com IA FCC</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                A inteligência artificial formulará questões inéditas com as pegadinhas típicas da FCC focadas nos tópicos que você mais errou.
              </p>
            </div>

            <div
              onClick={() => setModeType('bank')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                modeType === 'bank'
                  ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 text-blue-950 dark:text-blue-100 ring-2 ring-blue-500/30'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2 font-bold text-sm">
                <RotateCcw className="w-4 h-4 text-blue-600" />
                <span>Retestar Questões Reais com Erros</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Refaça exatamente as questões que você já errou em rodadas passadas para validar se o conteúdo foi devidamente assimilado.
              </p>
            </div>
          </div>
        </div>

        {/* Number of Questions */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
            Quantidade de Questões de Reforço
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 10, 15, 20].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuestionCount(num)}
                className={`py-2 px-3 rounded-lg text-xs font-bold text-center border transition ${
                  questionCount === num
                    ? 'border-rose-600 bg-rose-600 text-white shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {num} questões
              </button>
            ))}
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={handleLaunch}
          disabled={selectedTopics.length === 0}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Iniciar Simulado de Reforço ({questionCount} Questões)</span>
        </button>

      </div>

    </div>
  );
};
