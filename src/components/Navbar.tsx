import React from 'react';
import { 
  GraduationCap, 
  RotateCcw, 
  BookMarked, 
  TrendingUp, 
  PlusCircle, 
  Sparkles, 
  Flame, 
  Moon, 
  Sun,
  History,
  FileText
} from 'lucide-react';
import { UserStats } from '../types';

interface NavbarProps {
  currentTab: 'novo' | 'reforco' | 'caderno' | 'stats' | 'historico' | 'edital';
  setCurrentTab: (tab: 'novo' | 'reforco' | 'caderno' | 'stats' | 'historico' | 'edital') => void;
  stats: UserStats;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onQuickReinforce: () => void;
  editalStatus?: 'pre-edital' | 'pos-edital';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  stats,
  darkMode,
  setDarkMode,
  onQuickReinforce,
  editalStatus = 'pre-edital',
}) => {
  const wrongCount = stats.wrongQuestionIds?.length || 0;

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('novo')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 shadow-md text-white font-bold">
              <GraduationCap className="w-6 h-6" />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border-2 border-white dark:border-slate-900"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Simula<span className="text-blue-600 dark:text-blue-400">FCC</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
                  SEDUC-MA • Ensino Médio
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Magistério Ensino Médio: História & Biologia • Fundação Carlos Chagas
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar (Middle desktop) */}
          <div className="hidden md:flex items-center space-x-4 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 dark:text-slate-400">Respondidas:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{stats.totalAnswered}</span>
            </div>
            <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-500 dark:text-slate-400">Aproveitamento:</span>
              <span className={`font-bold ${
                stats.overallWinRate >= 75 ? 'text-emerald-600 dark:text-emerald-400' :
                stats.overallWinRate >= 50 ? 'text-amber-600 dark:text-amber-400' :
                'text-slate-700 dark:text-slate-300'
              }`}>
                {stats.overallWinRate}%
              </span>
            </div>
            {stats.studyStreakDays > 0 && (
              <>
                <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700" />
                <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400 font-semibold" title="Dias consecutivos de estudo">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{stats.studyStreakDays} {stats.studyStreakDays === 1 ? 'dia' : 'dias'}</span>
                </div>
              </>
            )}
          </div>

          {/* Controls: Dark mode & Reinforcement CTA */}
          <div className="flex items-center space-x-2">
            {wrongCount > 0 && (
              <button
                onClick={onQuickReinforce}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 transition"
                title="Praticar conteúdos com maior número de erros"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span>Simulado Reforço ({wrongCount})</span>
              </button>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Alternar tema"
              title={darkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm">
          <button
            onClick={() => setCurrentTab('novo')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              currentTab === 'novo'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Novo Simulado</span>
          </button>

          <button
            onClick={() => setCurrentTab('reforco')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all relative ${
              currentTab === 'reforco'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Simulado de Reforço (Erros)</span>
            {wrongCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                currentTab === 'reforco' ? 'bg-white text-rose-700' : 'bg-rose-500 text-white'
              }`}>
                {wrongCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('caderno')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              currentTab === 'caderno'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>Caderno de Erros</span>
          </button>

          <button
            onClick={() => setCurrentTab('stats')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              currentTab === 'stats'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Evolução & Estatísticas</span>
          </button>

          <button
            onClick={() => setCurrentTab('historico')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              currentTab === 'historico'
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Histórico de Simulados</span>
          </button>

          <button
            onClick={() => setCurrentTab('edital')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all relative ${
              currentTab === 'edital'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Edital SEDUC-MA</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              editalStatus === 'pos-edital'
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
            }`}>
              {editalStatus === 'pos-edital' ? 'Publicado' : 'Base FCC'}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
