import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  SlidersHorizontal, 
  Clock, 
  HelpCircle, 
  AlertTriangle, 
  Award,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';
import { SYLLABUS_DISCIPLINES } from '../data/defaultQuestions';
import { FilterConfig, Difficulty, EditalInfo } from '../types';

interface SimuladoConfiguratorProps {
  onStartExam: (config: FilterConfig, useAiGenerator: boolean) => void;
  isLoadingAi: boolean;
  weakTopicsCount: number;
  onGoToWeaknessTab: () => void;
  editalInfo?: EditalInfo;
  onGoToEditalTab?: () => void;
}

export const SimuladoConfigurator: React.FC<SimuladoConfiguratorProps> = ({
  onStartExam,
  isLoadingAi,
  weakTopicsCount,
  onGoToWeaknessTab,
  editalInfo,
  onGoToEditalTab,
}) => {
  const currentDisciplines = editalInfo?.disciplines || SYLLABUS_DISCIPLINES;

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('Todas');
  const [selectedTopic, setSelectedTopic] = useState<string>('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Todos');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [mode, setMode] = useState<'simulado' | 'treino'>('simulado');
  const [hasTimeLimit, setHasTimeLimit] = useState<boolean>(true);

  // Topics for current selected discipline
  const availableTopics = selectedDiscipline !== 'Todas' && currentDisciplines[selectedDiscipline]
    ? currentDisciplines[selectedDiscipline]
    : [];

  const handleDisciplineChange = (disc: string) => {
    setSelectedDiscipline(disc);
    setSelectedTopic('Todos');
  };

  const calculatedTimeMinutes = hasTimeLimit ? Math.round(questionCount * 3) : undefined;

  const handleStart = (useAi: boolean) => {
    const config: FilterConfig = {
      discipline: selectedDiscipline,
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      count: questionCount,
      mode: mode,
      timeLimitMinutes: calculatedTimeMinutes,
    };
    onStartExam(config, useAi);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Weakness Alert Banner if user has mistakes */}
      {weakTopicsCount > 0 && (
        <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent border border-rose-200 dark:border-rose-900/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-rose-500 text-white shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Plano de Reforço Ativo: {weakTopicsCount} questão(ões) no Caderno de Erros
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Aumente sua retenção realizando um simulado focado especificamente nos conteúdos que você mais errou.
              </p>
            </div>
          </div>
          <button
            onClick={onGoToWeaknessTab}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition flex items-center space-x-1.5 shrink-0 shadow"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Fazer Simulado de Reforço</span>
          </button>
        </div>
      )}

      {/* Main Configuration Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Configurar Simulado FCC • SEDUC-MA</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Personalize disciplina, profundidade e modo de treino da banca</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onGoToEditalTab && (
              <button
                type="button"
                onClick={onGoToEditalTab}
                className="inline-flex items-center space-x-1.5 text-xs font-bold px-2.5 py-1 rounded-md border transition hover:brightness-95 bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-700"
                title="Ver e atualizar conteúdo com o edital publicado"
              >
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {editalInfo?.status === 'pos-edital' ? 'Edital Publicado' : 'Edital Base FCC'}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Quick Specialty Focus Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Área do Cargo (Ensino Médio):
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleDisciplineChange('Todas')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedDiscipline === 'Todas'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                Geral / Combinado
              </button>
              <button
                type="button"
                onClick={() => handleDisciplineChange('História (Ensino Médio)')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedDiscipline === 'História (Ensino Médio)'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 hover:bg-slate-100'
                }`}
              >
                Foco: Professor de História
              </button>
              <button
                type="button"
                onClick={() => handleDisciplineChange('Biologia (Ensino Médio)')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  selectedDiscipline === 'Biologia (Ensino Médio)'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 hover:bg-slate-100'
                }`}
              >
                Foco: Professor de Biologia
              </button>
            </div>
          </div>

          {/* Discipline Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              1. Disciplina do Edital
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDisciplineChange('Todas')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedDiscipline === 'Todas'
                    ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/30 font-semibold'
                    : 'border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50/40 dark:bg-slate-850'
                }`}
              >
                <div className="text-sm font-bold flex items-center justify-between">
                  <span>Todas as Disciplinas</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200">Geral</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Simulação mista com questões de todo o edital</p>
              </button>

              {Object.keys(currentDisciplines).map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => handleDisciplineChange(disc)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedDiscipline === disc
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/30 font-semibold'
                      : 'border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50/40 dark:bg-slate-850'
                  }`}
                >
                  <div className="text-sm font-bold truncate">{disc}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                    {currentDisciplines[disc]?.length || 0} tópicos estruturados
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Specific Topic Selector (when a discipline is chosen) */}
          {selectedDiscipline !== 'Todas' && availableTopics.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                2. Tópico Específico (Opcional)
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todos">Todos os tópicos de {selectedDiscipline}</option>
                {availableTopics.map((top) => (
                  <option key={top} value={top}>{top}</option>
                ))}
              </select>
            </div>
          )}

          {/* Difficulty & Number of Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
            
            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                3. Nível de Dificuldade da FCC
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['Todos', 'Fácil', 'Médio', 'Difícil'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-center border transition-all ${
                      selectedDifficulty === diff
                        ? diff === 'Difícil'
                          ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 ring-2 ring-rose-400/40'
                          : diff === 'Médio'
                          ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 ring-2 ring-amber-400/40'
                          : diff === 'Fácil'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 ring-2 ring-emerald-400/40'
                          : 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 ring-2 ring-blue-400/40'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                {selectedDifficulty === 'Difícil' && 'Questões com pegadinhas de jurisprudência/gramática e textos longos da FCC.'}
                {selectedDifficulty === 'Médio' && 'Padrão predominante nas provas do magistério da FCC.'}
                {selectedDifficulty === 'Fácil' && 'Conceitos literais e fixação inicial dos artigos.'}
                {selectedDifficulty === 'Todos' && 'Equilíbrio real reproduzindo a composição da prova da SEDUC-MA.'}
              </p>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                4. Quantidade de Questões
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold text-center border transition-all ${
                      questionCount === num
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {num} questões
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Tempo recomendado FCC: ~{questionCount * 3} minutos</span>
              </p>
            </div>
          </div>

          {/* Mode Configuration: Simulado vs Treino Imediato */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
              5. Modo de Realização da Lista
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setMode('simulado')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  mode === 'simulado'
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Modo Simulado / Prova Real</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Gabarito e comentários detalhados liberados <strong>somente ao final</strong> de todas as questões. Cronômetro ativo, cartão de respostas e relatório completo de desempenho.
                </p>
              </div>

              <div
                onClick={() => setMode('treino')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  mode === 'treino'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-500/30'
                    : 'border-slate-200 dark:border-slate-750 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Modo Treino com Comentário Imediato</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Permite revelar o gabarito comentado e a fundamentação legal a cada questão respondida, ideal para estudo ativo e fixação teórica imediata.
                </p>
              </div>
            </div>
          </div>

          {/* Time Limit Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Cronômetro de Prova</span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {hasTimeLimit ? `Tempo padrão de prova ativado (${calculatedTimeMinutes} min)` : 'Sem contagem regressiva (tempo livre)'}
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hasTimeLimit}
                onChange={(e) => setHasTimeLimit(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            
            {/* Start from Curated Bank */}
            <button
              type="button"
              onClick={() => handleStart(false)}
              className="flex-1 py-3.5 px-6 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Iniciar Simulado Agora ({questionCount} Questões)</span>
            </button>

            {/* Generate Inéditas with Gemini AI */}
            <button
              type="button"
              disabled={isLoadingAi}
              onClick={() => handleStart(true)}
              className="py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 via-indigo-600 to-purple-600 hover:from-amber-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              <Sparkles className={`w-4 h-4 ${isLoadingAi ? 'animate-spin' : ''}`} />
              <span>{isLoadingAi ? 'Gerando Questões com IA...' : 'Gerar Inéditas com IA FCC'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Info card: FCC specifics for SEDUC MA (História & Biologia) */}
      <div className="bg-slate-100/80 dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Diretrizes FCC • Professor de História e Biologia (Ensino Médio - SEDUC-MA):</span>
        </div>
        <p>
          • <strong>História (Ensino Médio):</strong> A FCC enfatiza crítica documental e historiográfica (Jacques Le Goff, Annales), a História do Maranhão (França Equinocial, Balaiada com a liderança de Cosme Bento, Revolta de Beckman e Ciclo do Algodão), Ditadura Militar de 1964 e aplicação das Leis 10.639/03 e 11.645/08 na prática pedagógica.
        </p>
        <p>
          • <strong>Biologia (Ensino Médio):</strong> Alta incidência de metabolismo energético (quimiosmose e cadeia respiratória), biotecnologia (enzimas de restrição, DNA recombinante e clonagem), ecologia aplicada (magnificação trófica e biomas maranhenses: Amazônia, Cerrado, Baixada e manguezais) e genética mendeliana/molecular.
        </p>
        <p>
          • <strong>Legislação e Pedagógicos:</strong> Estatuto do Educador do Maranhão (Lei Estadual nº 9.860/2013), Lei 6.107/1994, LDBEN 9.394/1996 e BNCC do Ensino Médio (Ciências Humanas e Ciências da Natureza).
        </p>
      </div>

    </div>
  );
};
