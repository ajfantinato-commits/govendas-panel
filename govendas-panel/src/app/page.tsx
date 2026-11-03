'use client'
import { useState } from 'react'
import TabMetas from './components/TabMetas'
import TabHistorico from './components/TabHistorico'
import TabAnalise from './components/TabAnalise'
import TabInsights from './components/TabInsights'
import TabHubspot from './components/TabHubspot'

const tabs = [
  { id: 'metas',     label: '📊 Metas YTD 2026',       desc: 'Indicadores, funil e tendência' },
  { id: 'historico', label: '📋 Histórico de MQLs',     desc: 'Série histórica e clientes ativos' },
  { id: 'analise',   label: '🔍 Análise Semanal',        desc: 'Desafios, segmentos e canais' },
  { id: 'insights',  label: '💡 Insights & Ações',       desc: 'Análises e plano de ação' },
  { id: 'sdr',       label: '📞 Atividade SDR',          desc: 'Chamadas, e-mails e follow-up' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('metas')

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-[#1F4E79] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ED7D31] rounded-lg flex items-center justify-center font-bold text-sm">GV</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">GoVendas</h1>
              <p className="text-xs text-blue-200">Painel Comercial de Leads</p>
            </div>
          </div>
          <div className="text-xs text-blue-200">
            Atualizado: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-semibold border-b-2 transition-all flex flex-col items-start gap-0.5 whitespace-nowrap ${
                  activeTab === tab.id ? 'border-[#ED7D31] text-[#1F4E79]' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}>
                <span>{tab.label}</span>
                <span className="text-xs font-normal text-slate-400">{tab.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'metas'     && <TabMetas />}
        {activeTab === 'historico' && <TabHistorico />}
        {activeTab === 'analise'   && <TabAnalise />}
        {activeTab === 'insights'  && <TabInsights />}
        {activeTab === 'sdr'       && <TabHubspot />}
      </main>

      <footer className="text-center py-6 text-xs text-slate-400">
        GoVendas Painel Comercial · {new Date().getFullYear()}
      </footer>
    </div>
  )
}