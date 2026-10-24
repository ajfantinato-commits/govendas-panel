'use client'
import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LabelList
} from 'recharts'
import KPICard from './KPICard'
import UploadCSV from './UploadCSV'
import {
  historicoMQL, funnelData, statusMQLData, prospectorData,
  clientesAtivos, mrrTotal, canalData, metasData, CanalRow, MetaRow
} from '../lib/data'

const COLORS = ['#C00000','#595959','#FF7F00','#ED7D31','#7030A0','#2E75B6','#375623','#C00000','#833C00']

function fmt(v: number | null) {
  if (v === null) return <span className="text-slate-300">—</span>
  return v
}

function pctBar(real: number, meta: number) {
  const pct = Math.min((real / meta) * 100, 100)
  const color = pct >= 100 ? '#375623' : pct >= 70 ? '#ED7D31' : '#C00000'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color }}>{real}</span>
      <span className="text-xs text-slate-400">/{meta}</span>
    </div>
  )
}

export default function TabHistorico() {
  const [uploadMsg, setUploadMsg] = useState('')
  const [canais, setCanais] = useState<CanalRow[]>(canalData)
  const [metas, setMetas] = useState<MetaRow[]>(metasData)

  function handleUpload(rows: Record<string, string>[]) {
    setUploadMsg(`✓ ${rows.length} registros carregados.`)
    setTimeout(() => setUploadMsg(''), 4000)
  }

  // Totais canal
  const totalCanal: CanalRow = {
    canal: 'TOTAL',
    s1: canais.reduce((s, r) => s + (r.s1 ?? 0), 0),
    s2: canais.reduce((s, r) => s + (r.s2 ?? 0), 0),
    s3: canais.reduce((s, r) => s + (r.s3 ?? 0), 0),
    total: canais.reduce((s, r) => s + (r.total ?? 0), 0),
    myd: canais.reduce((s, r) => s + (r.myd ?? 0), 0),
    sql: canais.reduce((s, r) => s + (r.sql ?? 0), 0),
    pend: canais.reduce((s, r) => s + (r.pend ?? 0), 0),
    taxa: null,
  }
  const taxaTotal = totalCanal.total ? Math.round(((totalCanal.myd ?? 0) / totalCanal.total) * 100) : 0

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Histórico de MQLs</h2>
          <p className="text-sm text-slate-500">Série histórica de 228 leads qualificados trabalhados</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <UploadCSV onData={handleUpload} label="Atualizar histórico" />
          {uploadMsg && <span className="text-xs text-green-600 font-medium">{uploadMsg}</span>}
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard label="Total MQLs" value={historicoMQL.totalMQL} sub="Série histórica" color="#1F4E79" icon="📋" />
        <KPICard label="Clientes Ativos" value={historicoMQL.clientesAtivos} sub={`${historicoMQL.taxaConversao}% de conversão`} color="#375623" icon="✅" />
        <KPICard label="MRR Ativo" value={`R$ ${mrrTotal.toLocaleString('pt-BR')}`} sub="Receita mensal recorrente" color="#2E75B6" icon="💰" />
        <KPICard label="Reunião s/ Fechar" value={historicoMQL.reuniaoNaoConverteu} sub="Maior oportunidade" color="#C00000" icon="🔥" />
      </div>

      {/* KPIs secundários */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KPICard label="Agendado s/ Fechar" value={historicoMQL.agendadoNaoConverteu} sub="11,8%" color="#ED7D31" />
        <KPICard label="Sem Conexão" value={historicoMQL.semConexao} sub="9,2%" color="#7030A0" />
        <KPICard label="PCI OK s/ Agendar" value={historicoMQL.pciOkNaoAgendou} sub="6,6%" color="#2E75B6" />
        <KPICard label="Em Aberto" value={historicoMQL.emAberto} sub="14,9%" color="#595959" />
        <KPICard label="Desqualificados" value={historicoMQL.desqualificados} sub="15,4%" color="#FF7F00" />
      </div>

      {/* Funil + Pizza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Funil de Conversão</h3>
          <div className="space-y-2">
            {funnelData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-36 shrink-0">{item.etapa}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 relative overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${item.pct}%`, backgroundColor: i === 4 ? '#375623' : '#2E75B6' }}>
                    <span className="text-white text-xs font-bold">{item.valor}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 w-10 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Distribuição por Status</h3>
          <div className="flex gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={statusMQLData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                  {statusMQLData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v} leads`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1 overflow-y-auto max-h-44">
              {statusMQLData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-slate-600 leading-tight">{item.name}</span>
                  <span className="text-xs font-bold text-slate-800 ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ACOMPANHAMENTO DE CONVERSÃO POR CANAL ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-700">Acompanhamento de Conversão por Canal</h3>
            <p className="text-xs text-slate-400">S1/S2/S3 = semanas | MYD = convertidos | SQL = qualificados | Pend. = pendentes</p>
          </div>
          <button
            onClick={() => {
              const novo = prompt('Nome do novo canal:')
              if (novo) setCanais(prev => [...prev, { canal: novo, s1: null, s2: null, s3: null, total: null, myd: null, sql: null, pend: null, taxa: null }])
            }}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            + Canal
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-[#1F4E79]">
                {['Canal','S1','S2','S3','Total','MYD','SQL','Pend.','Taxa'].map(h => (
                  <th key={h} className={`py-2 px-3 text-xs font-bold text-[#1F4E79] uppercase text-center ${h === 'Canal' ? 'text-left' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {canais.map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                  <td className="py-2 px-3 font-semibold text-slate-800 text-xs">{row.canal}</td>
                  {[row.s1, row.s2, row.s3, row.total, row.myd, row.sql, row.pend].map((v, j) => (
                    <td key={j} className="py-2 px-3 text-center text-xs text-slate-600">{fmt(v)}</td>
                  ))}
                  <td className="py-2 px-3 text-center">
                    {row.taxa !== null && row.total !== null ? (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${row.taxa >= 10 ? 'bg-green-100 text-green-700' : row.taxa > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                        {row.taxa}%
                      </span>
                    ) : <span className="text-slate-300 text-xs">—</span>}
                  </td>
                </tr>
              ))}
              {/* Linha total */}
              <tr className="border-t-2 border-[#1F4E79] bg-[#EBF3FB] font-bold">
                <td className="py-2 px-3 text-xs font-bold text-[#1F4E79]">TOTAL</td>
                {[totalCanal.s1, totalCanal.s2, totalCanal.s3, totalCanal.total, totalCanal.myd, totalCanal.sql, totalCanal.pend].map((v, j) => (
                  <td key={j} className="py-2 px-3 text-center text-xs font-bold text-[#1F4E79]">{v}</td>
                ))}
                <td className="py-2 px-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${taxaTotal >= 10 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {taxaTotal}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ACOMPANHAMENTO DE METAS ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-700">Acompanhamento de Metas por Prospector(a)</h3>
            <p className="text-xs text-slate-400">Real / Meta — barra de progresso por etapa do funil</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#1F4E79]">
                {['Prospector(a)','MQL (Meta/Real)','SQL (Meta/Real)','Demo (Meta/Real)','Fechamento (Meta/Real)','Ação'].map(h => (
                  <th key={h} className={`py-2 px-3 text-xs font-bold text-[#1F4E79] uppercase ${h === 'Prospector(a)' ? 'text-left' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metas.map((m, i) => {
                const taxaFech = m.realMQL > 0 ? ((m.realFechamento / m.realMQL) * 100).toFixed(1) : '0'
                return (
                  <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <td className="py-3 px-3 font-bold text-slate-800">{m.prospector}</td>
                    <td className="py-3 px-3 min-w-[140px]">{pctBar(m.realMQL, m.metaMQL)}</td>
                    <td className="py-3 px-3 min-w-[140px]">{pctBar(m.realSQL, m.metaSQL)}</td>
                    <td className="py-3 px-3 min-w-[140px]">{pctBar(m.realDemo, m.metaDemo)}</td>
                    <td className="py-3 px-3 min-w-[140px]">{pctBar(m.realFechamento, m.metaFechamento)}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        m.realFechamento >= m.metaFechamento ? 'bg-green-100 text-green-700' :
                        m.realMQL < m.metaMQL * 0.7 ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {m.realFechamento >= m.metaFechamento ? '✅ Meta atingida' :
                         m.realMQL < m.metaMQL * 0.7 ? '🔴 Acelerar MQL' :
                         '🟡 Focar em SQL'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance por prospector */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Performance por Prospector(a)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                {['Prospector(a)', 'Total MQL', 'Clientes', 'Taxa Conv.', 'Reuniões Feitas', 'Sem Conexão'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prospectorData.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="py-2 px-3 font-semibold text-slate-800">{p.nome}</td>
                  <td className="py-2 px-3 text-slate-600">{p.total}</td>
                  <td className="py-2 px-3 text-green-700 font-bold">{p.clientes}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.taxaConv >= 5 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.taxaConv}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-600">{p.reunioes}</td>
                  <td className="py-2 px-3 text-purple-700">{p.semConexao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MRR por cliente */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-700">Clientes Ativos — MRR por Cliente</h3>
          <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">
            Total: R$ {mrrTotal.toLocaleString('pt-BR')}/mês
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={[...clientesAtivos].sort((a, b) => b.mrr - a.mrr)} layout="vertical" margin={{ left: 10, right: 60 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickFormatter={v => `R$${(v/1000).toFixed(1)}k`} tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="empresa" tick={{ fontSize: 11 }} width={160} />
            <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, 'MRR']} />
            <Bar dataKey="mrr" fill="#2E75B6" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="mrr" position="right" formatter={(v: number) => `R$${(v/1000).toFixed(1)}k`} style={{ fontSize: 10, fill: '#475569' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}