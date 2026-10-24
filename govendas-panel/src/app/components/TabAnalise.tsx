'use client'
import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import KPICard from './KPICard'
import UploadCSV from './UploadCSV'
import {
  desafiosData, segmentosData, cruzamentoData, campanhasData,
  semContato, leadsSemContato
} from '../lib/data'

const CORES_DESAFIO = ['#C00000','#ED7D31','#ED7D31','#ED7D31','#FFC000','#FFC000','#FFC000','#70AD47','#70AD47']
const CORES_SEG = ['#FFC7CE','#C6EFCE','#FFE4B5','#C6EFCE','#FFC7CE','#FFC7CE','#FFC7CE','#FFC7CE']
const CORES_CAMP = { 'Alta': '#C6EFCE', 'Média': '#FFEB9C', 'Baixa': '#FFC7CE' }

export default function TabAnalise() {
  const [uploadMsg, setUploadMsg] = useState('')
  const [activeLeads, setActiveLeads] = useState(leadsSemContato)
  const [filtro, setFiltro] = useState('Todos')

  function handleUpload(rows: Record<string, string>[]) {
    setUploadMsg(`✓ ${rows.length} leads carregados. Processando análise...`)
    setTimeout(() => setUploadMsg(''), 4000)
  }

  const leadsFiltrados = filtro === 'Todos'
    ? activeLeads
    : activeLeads.filter(l => l.prioridade === filtro)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Análise Semanal de Leads</h2>
          <p className="text-sm text-slate-500">Desafios × Segmento × Sem Contato — atualização semanal</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <UploadCSV onData={handleUpload} label="Atualizar leads da semana" />
          {uploadMsg && <span className="text-xs text-green-600 font-medium">{uploadMsg}</span>}
        </div>
      </div>

      {/* KPIs sem contato */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard label="Leads Sem Contato" value={semContato.total} color="#1F4E79" icon="📵" />
        <KPICard label="Potencial PCI" value={semContato.potencialPCI} sub="Atacado/Indústria" color="#375623" icon="🎯" />
        <KPICard label="Sem Conexão" value={semContato.semConexao} sub="Não atenderam" color="#C00000" icon="🔴" />
        <KPICard label="Em Tentativa" value={semContato.emTentativa} sub="1ª ou 2ª tentativa" color="#ED7D31" icon="🟠" />
        <KPICard label="Reunião Agendada" value={semContato.reuniaoJaAgendada} sub="Já avançaram" color="#70AD47" icon="✅" />
      </div>

      {/* Desafios + Segmentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Ranking de desafios */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Ranking de Desafios da Operação</h3>
          <div className="space-y-2">
            {desafiosData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-44 shrink-0 leading-tight">{d.desafio}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(d.total / 41) * 100}%`, backgroundColor: CORES_DESAFIO[i] }}
                  >
                    <span className="text-white text-xs font-bold">{d.total}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-10 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Segmentos */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Distribuição por Segmento</h3>
          <div className="space-y-2">
            {segmentosData.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`text-xs w-2 h-2 rounded-full shrink-0 ${s.pci ? 'bg-green-500' : 'bg-red-400'}`} />
                <span className="text-xs text-slate-600 w-44 shrink-0">{s.segmento}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(s.total / 50) * 100}%`, backgroundColor: s.pci ? '#375623' : '#94a3b8' }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 w-6 text-right">{s.total}</span>
                {s.pci && <span className="text-xs bg-green-100 text-green-700 px-1 rounded font-bold">PCI</span>}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-xs text-slate-500">Dentro do PCI</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-400" /><span className="text-xs text-slate-500">Fora do PCI</span></div>
          </div>
        </div>
      </div>

      {/* Cruzamento Desafio × Segmento */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Cruzamento: Desafio × Segmento</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={cruzamentoData} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="desafio" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="atacadista" name="Atacadista/Dist." fill="#2E75B6" radius={[3,3,0,0]} />
            <Bar dataKey="varejo" name="Varejo/Ecomm." fill="#ED7D31" radius={[3,3,0,0]} />
            <Bar dataKey="representante" name="Representante" fill="#FFC000" radius={[3,3,0,0]} />
            <Bar dataKey="industria" name="Indústria" fill="#375623" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Análise de campanhas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Análise por Campanha — Leads Sem Contato</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {['Campanha', 'Leads', '%', 'Qualidade', 'Ação'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campanhasData.map((c, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="py-2 px-3 font-medium text-slate-800 text-xs">{c.campanha}</td>
                  <td className="py-2 px-3 font-bold text-slate-700">{c.total}</td>
                  <td className="py-2 px-3 text-slate-500">{c.pct}%</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      c.qualidade === 'Alta' ? 'bg-green-100 text-green-700' :
                      c.qualidade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>{c.qualidade}</span>
                  </td>
                  <td className="py-2 px-3 text-xs text-slate-500">
                    {c.qualidade === 'Alta' ? 'Investigar origem e replicar' :
                     c.qualidade === 'Média' ? 'Manter e refinar segmentação' :
                     'Revisar público-alvo'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads PCI sem contato */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-700">Leads PCI — Prioridade de Reabordagem</h3>
          <div className="flex gap-2">
            {['Todos', 'Alta', 'Média', 'Baixa'].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${
                  filtro === f
                    ? 'bg-brand-navy text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {['Empresa', 'Segmento', 'Celular', 'E-mail', 'Validação', 'Prioridade'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadsFiltrados.map((l, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="py-2 px-3 font-semibold text-slate-800 text-xs">{l.empresa}</td>
                  <td className="py-2 px-3 text-xs text-slate-600">{l.segmento}</td>
                  <td className="py-2 px-3 text-xs text-slate-600 font-mono">{l.celular}</td>
                  <td className="py-2 px-3 text-xs text-blue-600">{l.email}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      l.validacao === 'Confirmado' ? 'bg-green-100 text-green-700' :
                      l.validacao === 'Verificar' ? 'bg-yellow-100 text-yellow-700' :
                      l.validacao === 'Duplicata' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{l.validacao}</span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      l.prioridade === 'Alta' ? 'bg-red-100 text-red-700' :
                      l.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{l.prioridade === 'Alta' ? '🔴 Alta' : l.prioridade === 'Média' ? '🟡 Média' : '🟢 Baixa'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}