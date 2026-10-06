import React, { useState, useEffect } from 'react';
import { 
  FilterConfig, 
  Question, 
  SimulationAttempt, 
  UserStats,
  EditalInfo 
} from './types';
import { 
  loadUserStats, 
  recordSimulationAttempt, 
  removeWrongQuestion,
  getAllAvailableQuestions,
  getWeakestTopicsList,
  loadEditalInfo,
  saveEditalInfo,
  resetEditalToDefault
} from './services/storageService';
import { requestAIGeneratedQuestions, filterLocalQuestions } from './services/apiService';
import { Navbar } from './components/Navbar';
import { SimuladoConfigurator } from './components/SimuladoConfigurator';
import { ExamRoom } from './components/ExamRoom';
import { SimulationResult } from './components/SimulationResult';
import { WeaknessReinforcementView } from './components/WeaknessReinforcementView';
import { MistakeNotebookView } from './components/MistakeNotebookView';
import { StatsEvolutionView } from './components/StatsEvolutionView';
import { EditalHubView } from './components/EditalHubView';
import { Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [editalInfo, setEditalInfo] = useState<EditalInfo>(() => loadEditalInfo());
  const [currentTab, setCurrentTab] = useState<'novo' | 'reforco' | 'caderno' | 'stats' | 'historico' | 'edital'>('novo');
  
  // Active Exam state
  const [activeExam, setActiveExam] = useState<{
    questions: Question[];
    mode: 'simulado' | 'treino';
    discipline: string;
    difficulty: string;
    timeLimitMinutes?: number;
    isWeaknessReinforcement?: boolean;
  } | null>(null);

  // Active Completed Simulation Result
  const [currentResult, setCurrentResult] = useState<SimulationAttempt | null>(null);

  // AI Generation Loading state
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'info' | 'success' | 'error' } | null>(null);

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('simulafcc_dark') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('simulafcc_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('simulafcc_dark', 'false');
    }
  }, [darkMode]);

  const showToast = (text: string, type: 'info' | 'success' | 'error' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Start regular exam
  const handleStartExam = async (config: FilterConfig, useAiGenerator: boolean) => {
    setIsLoadingAi(true);

    try {
      if (useAiGenerator) {
        showToast('Formulando questões inéditas no padrão FCC para a SEDUC-MA...', 'info');
        const { questions, source } = await requestAIGeneratedQuestions({
          discipline: config.discipline === 'Todas' ? 'Legislação Educacional e do Maranhão' : config.discipline,
          topic: config.topic === 'Todos' ? undefined : config.topic,
          difficulty: (config.difficulty === 'Todos' ? 'Médio' : config.difficulty) as any,
          count: config.count,
        });

        if (questions.length === 0) {
          throw new Error('Nenhuma questão gerada.');
        }

        if (source === 'api') {
          showToast('Questões inéditas elaboradas com sucesso pela IA da FCC!', 'success');
        } else {
          showToast('Questões selecionadas com sucesso do banco oficial da banca.', 'info');
        }

        setActiveExam({
          questions,
          mode: config.mode,
          discipline: config.discipline,
          difficulty: config.difficulty,
          timeLimitMinutes: config.timeLimitMinutes,
          isWeaknessReinforcement: false,
        });
        setCurrentResult(null);
      } else {
        // From curated pool
        const pool = getAllAvailableQuestions();
        const selected = filterLocalQuestions(pool, {
          discipline: config.discipline,
          topic: config.topic,
          difficulty: config.difficulty,
          count: config.count,
        });

        if (selected.length === 0) {
          showToast('Sem questões exatas com esses filtros. Carregando simulado geral da banca.', 'info');
        }

        setActiveExam({
          questions: selected.length > 0 ? selected : pool.slice(0, config.count),
          mode: config.mode,
          discipline: config.discipline,
          difficulty: config.difficulty,
          timeLimitMinutes: config.timeLimitMinutes,
          isWeaknessReinforcement: false,
        });
        setCurrentResult(null);
      }
    } catch (err: any) {
      console.error(err);
      showToast('Carregando questões autênticas do banco estruturado...', 'info');
      const pool = getAllAvailableQuestions();
      setActiveExam({
        questions: pool.slice(0, config.count),
        mode: config.mode,
        discipline: config.discipline,
        difficulty: config.difficulty,
        timeLimitMinutes: config.timeLimitMinutes,
        isWeaknessReinforcement: false,
      });
      setCurrentResult(null);
    } finally {
      setIsLoadingAi(false);
    }
  };

  // Launch targeted weakness reinforcement simulation
  const handleLaunchReinforcementSimulation = async (
    topics: string[], 
    count: number, 
    useAiGenerator: boolean
  ) => {
    setIsLoadingAi(true);
    showToast('Preparando Simulado de Reforço focado em suas fraquezas...', 'info');

    try {
      if (useAiGenerator) {
        const { questions } = await requestAIGeneratedQuestions({
          discipline: 'Legislação e Conhecimentos Pedagógicos',
          difficulty: 'Médio',
          count: count,
          isWeaknessReinforcement: true,
          weakTopics: topics,
        });

        setActiveExam({
          questions,
          mode: 'simulado',
          discipline: 'Reforço de Erros',
          difficulty: 'Médio',
          timeLimitMinutes: count * 3,
          isWeaknessReinforcement: true,
        });
        setCurrentResult(null);
      } else {
        // Pool of user mistakes
        const all = getAllAvailableQuestions();
        const wrongIds = stats.wrongQuestionIds || [];
        let matching = all.filter((q) => wrongIds.includes(q.id) || topics.includes(q.topic));
        
        if (matching.length === 0) {
          matching = all;
        }

        const shuffled = [...matching].sort(() => Math.random() - 0.5).slice(0, count);

        setActiveExam({
          questions: shuffled,
          mode: 'simulado',
          discipline: 'Reforço de Erros',
          difficulty: 'Médio',
          timeLimitMinutes: count * 3,
          isWeaknessReinforcement: true,
        });
        setCurrentResult(null);
      }
    } catch (e) {
      console.error(e);
      showToast('Iniciando com as questões do banco...', 'info');
    } finally {
      setIsLoadingAi(false);
    }
  };

  // When Exam is Finished
  const handleFinishExam = (attempt: SimulationAttempt) => {
    const updatedStats = recordSimulationAttempt(attempt);
    setStats(updatedStats);
    setActiveExam(null);
    setCurrentResult(attempt);
    showToast('Simulado concluído! Confira seus gabaritos e estatísticas.', 'success');
  };

  // Remove mistake from mistake notebook
  const handleRemoveMistake = (questionId: string) => {
    const updated = removeWrongQuestion(questionId);
    setStats(updated);
    showToast('Questão dominada e removida do Caderno de Erros!', 'success');
  };

  // Edital management handlers
  const handleUpdateEdital = (newInfo: EditalInfo) => {
    saveEditalInfo(newInfo);
    setEditalInfo(newInfo);
    showToast('Edital e matriz de disciplinas atualizados!', 'success');
  };

  const handleResetEdital = () => {
    const def = resetEditalToDefault();
    setEditalInfo(def);
    showToast('Matriz base do histórico da FCC restaurada.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center space-x-2 px-4 py-3 rounded-xl shadow-xl border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs sm:text-sm animate-bounce">
          {toastMessage.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />}
          {toastMessage.type === 'info' && <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Navigation Header */}
      {!activeExam && (
        <Navbar
          currentTab={currentTab}
          setCurrentTab={(tab) => {
            setCurrentResult(null);
            setCurrentTab(tab);
          }}
          stats={stats}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onQuickReinforce={() => {
            setCurrentResult(null);
            setCurrentTab('reforco');
          }}
          editalStatus={editalInfo.status}
        />
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Active Exam in Progress */}
        {activeExam ? (
          <ExamRoom
            questions={activeExam.questions}
            mode={activeExam.mode}
            disciplineName={activeExam.discipline}
            difficultyFilter={activeExam.difficulty}
            timeLimitMinutes={activeExam.timeLimitMinutes}
            isWeaknessReinforcement={activeExam.isWeaknessReinforcement}
            onFinishExam={handleFinishExam}
            onCancelExam={() => setActiveExam(null)}
          />
        ) : currentResult ? (
          /* Finished Simulation Result & Answer Key */
          <SimulationResult
            attempt={currentResult}
            onNewSimulation={() => {
              setCurrentResult(null);
              setCurrentTab('novo');
            }}
            onStartReinforcement={(weakTopics) => {
              handleLaunchReinforcementSimulation(weakTopics, 10, true);
            }}
            onGoToMistakeNotebook={() => {
              setCurrentResult(null);
              setCurrentTab('caderno');
            }}
            onGoToStats={() => {
              setCurrentResult(null);
              setCurrentTab('stats');
            }}
            onAddQuestionToMistakes={() => {}}
          />
        ) : (
          /* Tab Views */
          <>
            {currentTab === 'novo' && (
              <SimuladoConfigurator
                onStartExam={handleStartExam}
                isLoadingAi={isLoadingAi}
                weakTopicsCount={stats.wrongQuestionIds?.length || 0}
                onGoToWeaknessTab={() => setCurrentTab('reforco')}
                editalInfo={editalInfo}
                onGoToEditalTab={() => setCurrentTab('edital')}
              />
            )}

            {currentTab === 'reforco' && (
              <WeaknessReinforcementView
                stats={stats}
                onLaunchReinforcementSimulation={handleLaunchReinforcementSimulation}
                onGoToConfigurator={() => setCurrentTab('novo')}
              />
            )}

            {currentTab === 'caderno' && (
              <MistakeNotebookView
                stats={stats}
                onRemoveMistake={handleRemoveMistake}
                onStartReinforcement={(topics) => {
                  handleLaunchReinforcementSimulation(topics, 10, true);
                }}
              />
            )}

            {currentTab === 'stats' && (
              <StatsEvolutionView
                stats={stats}
                onReviewPastAttempt={(att) => setCurrentResult(att)}
                onStartNewSimulation={() => setCurrentTab('novo')}
              />
            )}

            {currentTab === 'historico' && (
              <StatsEvolutionView
                stats={stats}
                onReviewPastAttempt={(att) => setCurrentResult(att)}
                onStartNewSimulation={() => setCurrentTab('novo')}
              />
            )}

            {currentTab === 'edital' && (
              <EditalHubView
                editalInfo={editalInfo}
                onUpdateEdital={handleUpdateEdital}
                onResetEdital={handleResetEdital}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            SimulaFCC SEDUC-MA • Plataforma de Estudos Especializada para o Concurso do Magistério do Maranhão
          </span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Fundação Carlos Chagas</span>
            <span>•</span>
            <span>Estatuto do Educador (Lei 9.860/13)</span>
            <span>•</span>
            <span>LDB 9.394/96</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
