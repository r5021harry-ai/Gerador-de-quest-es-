import React, { useState } from 'react';
import { EditalInfo } from '../types';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  Upload, 
  Layers, 
  BookOpen, 
  Award, 
  AlertCircle,
  Plus,
  Trash2,
  Calendar
} from 'lucide-react';

interface EditalHubViewProps {
  editalInfo: EditalInfo;
  onUpdateEdital: (info: EditalInfo) => void;
  onResetEdital: () => void;
}

export const EditalHubView: React.FC<EditalHubViewProps> = ({
  editalInfo,
  onUpdateEdital,
  onResetEdital,
}) => {
  const [editalText, setEditalText] = useState<string>('');
  const [cargoName, setCargoName] = useState<string>(editalInfo.cargo || 'Professor da Educação Básica');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processSuccess, setProcessSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manual discipline addition
  const [newDiscName, setNewDiscName] = useState<string>('');
  const [newTopicsText, setNewTopicsText] = useState<string>('');

  const handleProcessEditalWithAi = async () => {
    if (!editalText.trim() || editalText.trim().length < 25) {
      setErrorMessage('Por favor, cole o texto do conteúdo programático do edital para que a IA possa processá-lo.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setProcessSuccess(null);

    try {
      const res = await fetch('/api/parse-edital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          editalText,
          cargo: cargoName,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Falha ao processar o edital.');
      }

      const parsedData = json.data;
      const newDisciplinesRecord: Record<string, string[]> = {};

      if (Array.isArray(parsedData.disciplines)) {
        parsedData.disciplines.forEach((d: { disciplineName: string; topics: string[] }) => {
          if (d.disciplineName && Array.isArray(d.topics)) {
            newDisciplinesRecord[d.disciplineName] = d.topics;
          }
        });
      }

      const updatedInfo: EditalInfo = {
        status: 'pos-edital',
        editalTitle: parsedData.editalTitle || `Edital Oficial Publicado - SEDUC-MA (${cargoName})`,
        cargo: parsedData.cargo || cargoName,
        updatedAt: new Date().toISOString(),
        summary: parsedData.summary || 'Conteúdo programático atualizado com base no edital oficial publicado da FCC.',
        disciplines: Object.keys(newDisciplinesRecord).length > 0
          ? newDisciplinesRecord
          : editalInfo.disciplines,
      };

      onUpdateEdital(updatedInfo);
      setProcessSuccess('Edital atualizado com sucesso! Todas as disciplinas, tópicos e o gerador de questões foram sincronizados com a publicação oficial da FCC.');
      setEditalText('');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Ocorreu um erro ao processar o texto do edital.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddManualDiscipline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscName.trim()) return;

    const topicsArray = newTopicsText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updated = {
      ...editalInfo,
      disciplines: {
        ...editalInfo.disciplines,
        [newDiscName.trim()]: topicsArray.length > 0 ? topicsArray : ['Conceitos Gerais e Legislação'],
      },
      updatedAt: new Date().toISOString(),
    };

    onUpdateEdital(updated);
    setNewDiscName('');
    setNewTopicsText('');
    setProcessSuccess(`Disciplina "${newDiscName.trim()}" adicionada com sucesso ao conteúdo programático!`);
  };

  const handleRemoveDiscipline = (discName: string) => {
    const copy = { ...editalInfo.disciplines };
    delete copy[discName];
    onUpdateEdital({
      ...editalInfo,
      disciplines: copy,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Edital Status Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                editalInfo.status === 'pos-edital'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
              }`}>
                {editalInfo.status === 'pos-edital' ? 'Edital Oficial Publicado' : 'Fase Pré-Edital (Foco FCC)'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Atualizado em: {new Date(editalInfo.updatedAt).toLocaleDateString('pt-BR')}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {editalInfo.editalTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {editalInfo.summary}
            </p>
          </div>

          <button
            onClick={onResetEdital}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center space-x-1.5 shrink-0"
            title="Restaurar conteúdo padrão do histórico FCC"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Matriz Base</span>
          </button>
        </div>
      </div>

      {/* Instant Edital Importer & Parser Box */}
      <div className="bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 border border-blue-200/80 dark:border-blue-900/50 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Atualizador Inteligente de Publicação do Edital
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Quando a FCC publicar o edital oficial da SEDUC-MA, cole o texto do Conteúdo Programático abaixo. A IA atualizará automaticamente todas as disciplinas, tópicos e o gerador de questões da aplicação!
            </p>
          </div>
        </div>

        {processSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 flex items-start space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>{processSuccess}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm text-rose-800 dark:text-rose-200 flex items-start space-x-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Cargo / Especialidade no Concurso SEDUC-MA:
            </label>
            <input
              type="text"
              value={cargoName}
              onChange={(e) => setCargoName(e.target.value)}
              placeholder="Ex: Professor de Educação Básica - Letras / História / Matemática"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Conteúdo Programático do Edital Publicado (Cole o texto do anexo do edital da FCC):
            </label>
            <textarea
              rows={6}
              value={editalText}
              onChange={(e) => setEditalText(e.target.value)}
              placeholder="Cole aqui o texto copiado do PDF do edital da FCC com as disciplinas e itens cobrados... Exemplo: CONHECIMENTOS GERAIS: Língua Portuguesa (...), Legislação do Maranhão (...), Conhecimentos Pedagógicos (...), Conhecimentos Específicos (...)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleProcessEditalWithAi}
            disabled={isProcessing}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>
              {isProcessing
                ? 'Estruturando Conteúdo Programático com IA...'
                : 'Processar e Atualizar Aplicativo com o Edital Publicado'}
            </span>
          </button>
        </div>
      </div>

      {/* Current Active Disciplines & Topics */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Disciplinas e Tópicos Atualmente Integrados ({Object.keys(editalInfo.disciplines).length} disciplinas)
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Alimenta filtros e gerador de simulados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(editalInfo.disciplines).map(([disc, topics]) => (
            <div
              key={disc}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-2 relative group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {disc}
                </h3>
                {Object.keys(editalInfo.disciplines).length > 1 && (
                  <button
                    onClick={() => handleRemoveDiscipline(disc)}
                    className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition"
                    title="Excluir disciplina"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-1">
                {topics.map((top, idx) => (
                  <div key={idx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start space-x-1.5">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{top}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Discipline Add Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Plus className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Adicionar Disciplina ou Especialidade Manualmente
          </h2>
        </div>

        <form onSubmit={handleAddManualDiscipline} className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Nome da Disciplina:
            </label>
            <input
              type="text"
              value={newDiscName}
              onChange={(e) => setNewDiscName(e.target.value)}
              placeholder="Ex: Conhecimentos Específicos - Filosofia / Geografia do Maranhão"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Tópicos (um por linha):
            </label>
            <textarea
              rows={3}
              value={newTopicsText}
              onChange={(e) => setNewTopicsText(e.target.value)}
              placeholder="Tópico 1&#10;Tópico 2&#10;Tópico 3"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar ao Conteúdo</span>
          </button>
        </form>
      </div>

    </div>
  );
};
