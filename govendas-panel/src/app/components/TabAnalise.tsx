'use client'
import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import KPICard from './KPICard'
import UploadCSV from './UploadCSV'
import {
  desafiosData, segmentosData, cruzamentoData, campanhasData,
  semContato, leadsSemContato, followUpLeads,
  LeadSemContato, FollowUpLead
} from '../lib/data'

const CORES_DESAFIO = ['#C00000','#ED7D31','#ED7D31','#ED7D31','#FFC000','#FFC000','#FFC000','#70AD47','#70AD47']

const CADENCIA_LABELS: Record<string, { bg: string; text: string }> = {
  'D1 WhatsApp':  { bg: 'bg-green-100', text: 'text-green-700' },
  'D1 E-mail':    { bg: 'bg-blue-100',  text: 'text-blue-700' },
  'D3 WhatsApp':  { bg: 'bg-green-100', text: 'text-green-700' },
  'D3 E-mail':    { bg: 'bg-blue-100',  text: 'text-blue-700' },
  'D5 WhatsApp':  { bg: 'bg-orange-100',text: 'text-orange-700' },
  'D5 LinkedIn':  { bg: 'bg-indigo-100',text: 'text-indigo-700' },
  'D7 E-mail':    { bg: 'bg-slate-100', text: 'text-slate-600' },
  'D7 Reativação':{ bg: 'bg-slate-100', text: 'text-slate-600' },
}

const STATUS_CONV: Record<string, { bg: string; text: string; label: string }> = {
  'Pendente':       { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '⏳ Pendente' },
  'Convertido':     { bg: 'bg-green-100',  text: 'text-green-700',  label: '✅ Convertido' },
  'Não Convertido': { bg: 'bg-red-100',    text: 'text-red-700',    label: '❌ Não Convertido' },
}

const STATUS_FOLLOW: Record<string, { bg: string; text: string }> = {
  'Novo':              { bg: 'bg-blue-100',   text: 'text-blue-700' },
  'Em contato':        { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Demo agendada':     { bg: 'bg-purple-100', text: 'text-purple-700' },
  'Proposta enviada':  { bg: 'bg-orange-100', text: 'text-orange-700' },
  'Convertido':        { bg: 'bg-green-100',  text: 'text-green-700' },
  'Perdido':           { bg: 'bg-red-100',    text: 'text-red-700' },
}

export default function TabAnalise() {
  const [uploadMsg, setUploadMsg] = useState('')
  const [leads, setLeads] = useState<LeadSemContato[]>(leadsSemContato)
  const [followUps, setFollowUps] = useState<FollowUpLead[]>(followUpLeads)
  const [filtro, setFiltro] = useState('Todos')
  const [expandedLead, setExpandedLead] = useState<number | null>(null)

  function handleUpload(rows: Record<string, string>[]) {
    setUploadMsg(`✓ ${rows.length} leads carregados.`)
    setTimeout(() => setUploadMsg(''), 4000)
  }

  function toggleCheck(leadId: number, checkIdx: number) {
    setLeads(prev => prev.map(l => {
      if (l.id !== leadId) return l
      const checks = [...l.checksCadencia]
      checks[checkIdx] = !checks[checkIdx]
      return { ...l, checksCadencia: checks }
    }))
  }

  function setStatusConv(leadId: number, status: LeadSemContato['statusConversao']) {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, statusConversao: status } : l))
  }

  function setFollowStatus(id: number, status: FollowUpLead['status']) {
    setFollowUps(prev => prev.map(f => f.id === id ? { ...f, status } : f))
  }

  const leadsFiltrados = filtro === 'Todos' ? leads : leads.filter(l => l.prioridade === filtro)

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

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KPICard label="Leads Sem Contato" value={semContato.total} color="#1F4E79" icon="📵" />
        <KPICard label="Potencial PCI" value={semContato.potencialPCI} sub="Atacado/Indústria" color="#375623" icon="🎯" />
        <KPICard label="Sem Conexão" value={semContato.semConexao} sub="Não atenderam" color="#C00000" icon="🔴" />
        <KPICard label="Em Tentativa" value={semContato.emTentativa} sub="1ª ou 2ª tentativa" color="#ED7D31" icon="🟠" />
        <KPICard label="Reunião Agendada" value={semContato.reuniaoJaAgendada} sub="Já avançaram" color="#70AD47" icon="✅" />
      </div>

      {/* Desafios + Segmentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Ranking de Desafios da Operação</h3>
          <div className="space-y-2">
            {desafiosData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-slate-500 w-44 shrink-0 leading-tight">{d.desafio}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(d.total / 41) * 100}%`, backgroundColor: CORES_DESAFIO[i] }}>
                    <span className="text-white text-xs font-bold">{d.total}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-10 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Distribuição por Segmento</h3>
          <div className="space-y-2">
            {segmentosData.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${s.pci ? 'bg-green-500' : 'bg-red-400'}`} />
                <span className="text-xs text-slate-600 w-44 shrink-0">{s.segmento}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(s.total / 50) * 100}%`, backgroundColor: s.pci ? '#375623' : '#94a3b8' }} />
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

      {/* Cruzamento */}
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

      {/* Campanhas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Análise por Campanha — Leads Sem Contato</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {['Campanha','Leads','%','Qualidade','Ação Recomendada'].map(h => (
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
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${c.qualidade === 'Alta' ? 'bg-green-100 text-green-700' : c.qualidade === 'Média' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{c.qualidade}</span>
                  </td>
                  <td className="py-2 px-3 text-xs text-slate-500">
                    {c.qualidade === 'Alta' ? 'Investigar origem e replicar' : c.qualidade === 'Média' ? 'Manter e refinar segmentação' : 'Revisar público-alvo'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── LEADS PCI COM CADÊNCIA E STATUS ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-700">Leads PCI — Cadência de Reabordagem</h3>
            <p className="text-xs text-slate-400">Marque cada etapa da cadência e atualize o status de conversão</p>
          </div>
          <div className="flex gap-2">
            {['Todos','Alta','Média','Baixa'].map(f => (
              <button key={f} onClick={() => setFiltro(f)}
                className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${filtro === f ? 'bg-[#1F4E79] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {leadsFiltrados.map((lead) => {
            const isExpanded = expandedLead === lead.id
            const checksFeitos = lead.checksCadencia.filter(Boolean).length
            const totalChecks = lead.checksCadencia.length
            const pctCadencia = Math.round((checksFeitos / totalChecks) * 100)
            const sc = STATUS_CONV[lead.statusConversao]

            return (
              <div key={lead.id} className={`border rounded-xl overflow-hidden transition-all ${
                lead.statusConversao === 'Convertido' ? 'border-green-200 bg-green-50' :
                lead.statusConversao === 'Não Convertido' ? 'border-red-200 bg-red-50' :
                'border-slate-200 bg-white'
              }`}>
                {/* Linha principal */}
                <div className="flex items-center gap-3 p-3 cursor-pointer" onClick={() => setExpandedLead(isExpanded ? null : lead.id)}>
                  {/* Prioridade */}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    lead.prioridade === 'Alta' ? 'bg-red-100 text-red-700' :
                    lead.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>{lead.prioridade === 'Alta' ? '🔴' : lead.prioridade === 'Média' ? '🟡' : '🟢'}</span>

                  {/* Empresa */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 truncate">{lead.empresa}</span>
                      <span className="text-xs text-slate-400 shrink-0">{lead.segmento}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-slate-500 font-mono">{lead.celular}</span>
                      <span className="text-xs text-blue-500 truncate">{lead.email}</span>
                    </div>
                  </div>

                  {/* Progresso cadência */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-20 bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-[#2E75B6]" style={{ width: `${pctCadencia}%` }} />
                    </div>
                    <span className="text-xs text-slate-500">{checksFeitos}/{totalChecks}</span>
                  </div>

                  {/* Status conversão */}
                  <span className={`text-xs px-2 py-1 rounded-full font-bold shrink-0 ${sc.bg} ${sc.text}`}>
                    {sc.label}
                  </span>

                  {/* Expand */}
                  <span className="text-slate-400 text-xs shrink-0">{isExpanded ? '▲' : '▼'}</span>
                </div>

                {/* Detalhes expandidos */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-4 space-y-4 bg-white">
                    {/* Cadência com checks */}
                    <div>
                      <p className="text-xs font-bold text-slate-600 mb-2">Cadência de Contato</p>
                      <div className="flex flex-wrap gap-2">
                        {lead.cadencia.map((etapa, idx) => {
                          const style = CADENCIA_LABELS[etapa] || { bg: 'bg-slate-100', text: 'text-slate-600' }
                          const done = lead.checksCadencia[idx]
                          return (
                            <button key={idx} onClick={() => toggleCheck(lead.id, idx)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                done ? 'border-green-400 bg-green-50 text-green-700' : `${style.bg} ${style.text} border-transparent hover:border-current`
                              }`}>
                              <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${done ? 'bg-green-500 border-green-500 text-white' : 'border-current'}`}>
                                {done ? '✓' : ''}
                              </span>
                              {etapa}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Status de conversão */}
                    <div>
                      <p className="text-xs font-bold text-slate-600 mb-2">Status de Conversão</p>
                      <div className="flex gap-2">
                        {(['Pendente','Convertido','Não Convertido'] as const).map(s => {
                          const st = STATUS_CONV[s]
                          return (
                            <button key={s} onClick={() => setStatusConv(lead.id, s)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                                lead.statusConversao === s ? `${st.bg} ${st.text} border-current` : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'
                              }`}>
                              {st.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Validação */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Validação web:</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        lead.validacao === 'Confirmado' ? 'bg-green-100 text-green-700' :
                        lead.validacao === 'Verificar' ? 'bg-yellow-100 text-yellow-700' :
                        lead.validacao === 'Duplicata' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>{lead.validacao}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── FOLLOW-UP NOVOS LEADS ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-700">Acompanhamento de Follow-up — Novos Leads</h3>
            <p className="text-xs text-slate-400">Leads recentes em processo de qualificação e agendamento</p>
          </div>
          <div className="flex gap-2 text-xs">
            {Object.entries(STATUS_FOLLOW).map(([s, style]) => (
              <span key={s} className={`px-2 py-0.5 rounded-full font-semibold ${style.bg} ${style.text}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#1F4E79]">
                {['Empresa','Contato','Desafio','Segmento','Etapa Atual','Próxima Ação','Data','Resp.','Status','Obs.'].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-xs font-bold text-[#1F4E79] uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {followUps.map((f, i) => {
                const st = STATUS_FOLLOW[f.status]
                return (
                  <tr key={f.id} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <td className="py-2 px-2 font-bold text-slate-800 text-xs whitespace-nowrap">{f.empresa}</td>
                    <td className="py-2 px-2 text-xs text-slate-600 whitespace-nowrap">{f.contato}</td>
                    <td className="py-2 px-2 text-xs text-slate-600 max-w-[120px] truncate" title={f.desafio}>{f.desafio}</td>
                    <td className="py-2 px-2 text-xs">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${
                        f.segmento.includes('Atacadista') || f.segmento.includes('Indústria') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>{f.segmento.split(' ')[0]}</span>
                    </td>
                    <td className="py-2 px-2 text-xs text-slate-600 whitespace-nowrap">{f.etapaAtual}</td>
                    <td className="py-2 px-2 text-xs font-medium text-[#1F4E79] max-w-[140px]">{f.proximaAcao}</td>
                    <td className="py-2 px-2 text-xs text-slate-500 whitespace-nowrap">{f.dataProximaAcao}</td>
                    <td className="py-2 px-2 text-xs font-semibold text-slate-700">{f.responsavel}</td>
                    <td className="py-2 px-2">
                      <select
                        value={f.status}
                        onChange={e => setFollowStatus(f.id, e.target.value as FollowUpLead['status'])}
                        className={`text-xs px-2 py-1 rounded-full font-bold border-0 cursor-pointer ${st.bg} ${st.text}`}
                      >
                        {Object.keys(STATUS_FOLLOW).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-2 px-2 text-xs text-slate-400 max-w-[120px] truncate" title={f.observacao}>{f.observacao}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}