'use client'
import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, FunnelChart, Funnel, LabelList
} from 'recharts'
import KPICard from './KPICard'
import UploadCSV from './UploadCSV'
import {
  historicoMQL, funnelData, statusMQLData, prospectorData,
  clientesAtivos, mrrTotal
} from '../lib/data'

const COLORS = ['#C00000','#595959','#FF7F00','#ED7D31','#7030A0','#2E75B6','#375623','#C00000','#833C00']

export default function TabHistorico() {
  const [uploadMsg, setUploadMsg] = useState('')

  function handleUpload(rows: Record<string, string>[]) {
    setUploadMsg(`✓ ${rows.length} registros carregados. Integração com banco de dados em breve.`)
    setTimeout(() => setUploadMsg(''), 4000)
  }

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

        {/* Funil de conversão */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Funil de Conversão</h3>
          <div className="space-y-2">
            {funnelData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-36 shrink-0">{item.etapa}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 relative overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${item.pct}%`, backgroundColor: i === 4 ? '#375623' : '#2E75B6' }}
                  >
                    <span className="text-white text-xs font-bold">{item.valor}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600 w-10 text-right">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pizza de status */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4">Distribuição por Status</h3>
          <div className="flex gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={statusMQLData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                  {statusMQLData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
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

      {/* Clientes ativos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-700">Clientes Ativos — MRR por Cliente</h3>
          <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">
            Total: R$ {mrrTotal.toLocaleString('pt-BR')}/mês
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={[...clientesAtivos].sort((a, b) => b.mrr - a.mrr)} layout="vertical" margin={{ left: 10, right: 40 }}>
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