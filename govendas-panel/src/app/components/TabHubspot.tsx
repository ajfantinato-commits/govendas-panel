'use client'
import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts'

// ── DADOS OUTUBRO 2026 ───────────────────────────────────────────────────────
const atividadesData = [
  { tipo: 'Chamadas', valor: 111, icon: '📞', color: '#2E75B6' },
  { tipo: 'Tarefas', valor: 35, icon: '✅', color: '#ED7D31' },
  { tipo: 'WhatsApp', valor: 8, icon: '💬', color: '#25D366' },
  { tipo: 'Observações', valor: 7, icon: '📝', color: '#FFC000' },
  { tipo: 'Reuniões', valor: 3, icon: '🗓️', color: '#375623' },
]

const resultadoChamadas = [
  { name: 'Conectadas', value: 52, color: '#375623' },
  { name: 'Mensagem Ativa', value: 93, color: '#ED7D31' },
  { name: 'Sem Resposta', value: 39, color: '#C00000' },
  { name: 'Nº Errado/Outros', value: 2, color: '#94a3b8' },
]

const atendentes = [
  { nome: 'Deisy Silva', total: 179, conectadas: 45, pct: 25.1, mensagem: 93, semResp: 39, media: 7.16, color: '#2E75B6' },
  { nome: 'Marília Frantiele', total: 7, conectadas: 7, pct: 100, mensagem: 0, semResp: 0, media: 0.28, color: '#375623' },
]

const historicoMensal = [
  { mes: 'Jan', leads: 39, mql: 11, sql: 4, cpl: 102 },
  { mes: 'Fev', leads: 51, mql: 9, sql: 4, cpl: 79 },
  { mes: 'Mar', leads: 67, mql: 10, sql: 7, cpl: 60 },
  { mes: 'Abr', leads: 77, mql: 9, sql: 7, cpl: 58 },
  { mes: 'Mai', leads: 87, mql: 11, sql: 14, cpl: 39 },
  { mes: 'Jun', leads: 201, mql: 32, sql: 10, cpl: 24 },
  { mes: 'Jul', leads: 174, mql: 31, sql: 14, cpl: 37 },
  { mes: 'Ago', leads: 127, mql: 22, sql: 8, cpl: 33 },
  { mes: 'Set', leads: 133, mql: 43, sql: 5, cpl: 34 },
  { mes: 'Out', leads: 113, mql: 33, sql: 7, cpl: 39 },
]

const mqlStatusData = [
  { label: 'Em Tentativa de Contato', valor: 29, color: '#ED7D31' },
  { label: 'Desqualificado', valor: 5, color: '#C00000' },
  { label: 'Sem Interesse', valor: 3, color: '#FF7F00' },
  { label: 'Reunião Agendada', valor: 2, color: '#375623' },
  { label: 'Convertido', valor: 2, color: '#2E75B6' },
  { label: 'PCI Confirmado', valor: 4, color: '#1F4E79' },
]

const novosLeads = [
  { empresa: 'Alumínios Forten', segmento: 'Atacadista/Dist.', tv: '1-3', campanha: 'MEIO Calculadora', pci: true },
  { empresa: 'MANSUR SHOWROOM', segmento: 'Representante', tv: '1-3', campanha: 'MEIO Calculadora', pci: false },
  { empresa: 'P2b', segmento: 'Serviços gerais', tv: '11-20', campanha: 'MEIO Calculadora', pci: false },
  { empresa: 'Xcel', segmento: 'Consultoria', tv: 'Sem TV', campanha: 'MEIO Calculadora', pci: false },
  { empresa: 'FJ Gestão de Marcas', segmento: 'Representante', tv: '1-3', campanha: 'FUNDO MQL 2.0', pci: false },
]

function KPIBox({ label, value, sub, color, icon, ok }: {
  label: string; value: string | number; sub?: string; color?: string; icon?: string; ok?: boolean
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <span className="text-3xl font-bold" style={{ color: color || '#1F4E79' }}>{value}</span>
      <div className="flex items-center gap-2">
        {sub && <span className="text-xs text-slate-400">{sub}</span>}
        {ok !== undefined && (
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {ok ? '✓ Atingido' : '✗ Não atingido'}
          </span>
        )}
      </div>
    </div>
  )
}

function BarraProgresso({ label, valor, total, color }: { label: string; valor: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((valor / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 w-32 shrink-0">{label}</span>
      <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold text-slate-700 w-6 text-right">{valor}</span>
    </div>
  )
}

export default function TabHubspot() {
  const [secao, setSecao] = useState<'atividades' | 'mql' | 'metas' | 'novos'>('atividades')

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Atividades HubSpot + Marketing</h2>
          <p className="text-sm text-slate-500">Dados reais — Outubro 2026 | Atualizado em 25/10/2026</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
          <span className="text-orange-500 text-lg">🟠</span>
          <div>
            <p className="text-xs font-bold text-orange-700">HubSpot + RD Station</p>
            <p className="text-xs text-orange-500">Outubro 2026</p>
          </div>
        </div>
      </div>

      {/* Sub-navegação */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'atividades', label: '📞 Chamadas e Atividades' },
          { id: 'mql', label: '🎯 Análise MQL Outubro' },
          { id: 'metas', label: '📊 Metas YTD 2026' },
          { id: 'novos', label: '🆕 Novos Leads (Nov)' },
        ].map(s => (
          <button key={s.id} onClick={() => setSecao(s.id as typeof secao)}
            className={`text-sm px-4 py-2 rounded-lg font-semibold transition-colors ${secao === s.id ? 'bg-[#1F4E79] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* ── CHAMADAS E ATIVIDADES ── */}
      {secao === 'atividades' && (
        <div className="space-y-6">

          {/* KPIs atividades */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {atividadesData.map((a, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col items-center">
                <span className="text-2xl mb-1">{a.icon}</span>
                <span className="text-2xl font-bold" style={{ color: a.color }}>{a.valor}</span>
                <span className="text-xs text-slate-500 mt-0.5">{a.tipo}</span>
                <span className="text-xs text-slate-400">{Math.round((a.valor / 164) * 100)}%</span>
              </div>
            ))}
          </div>

          {/* E-mails */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">📧 Desempenho de E-mails e Modelos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <KPIBox label="Envios" value={97} sub="4 grupos" color="#1F4E79" icon="📤" />
              <KPIBox label="Aberturas" value={59} sub="de 97 enviados" color="#2E75B6" icon="👁️" />
              <KPIBox label="Taxa Abertura" value="60,82%" color="#375623" icon="📈" ok={true} />
              <KPIBox label="Respostas" value="0 (0%)" sub="CTA precisa revisão" color="#C00000" icon="💬" ok={false} />
            </div>
            <div className="space-y-2">
              {[
                { label: 'Taxa de Abertura', pct: 60.82, color: '#375623' },
                { label: 'Taxa de Clique', pct: 6.78, color: '#2E75B6' },
                { label: 'Taxa de Resposta', pct: 0, color: '#C00000' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-32 shrink-0">{item.label}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                    <div className="h-full rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.min(item.pct, 100)}%`, backgroundColor: item.color }}>
                      {item.pct > 5 && <span className="text-white text-xs font-bold">{item.pct}%</span>}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-600 w-12 text-right">{item.pct}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
              <p className="text-xs font-bold text-yellow-700">💡 Insight</p>
              <p className="text-xs text-yellow-600">Taxa de abertura de 60,8% está acima da média B2B (~25%). Porém 0 respostas indicam que o CTA precisa ser revisado. Testar pergunta âncora dos 4 elos como CTA.</p>
            </div>
          </div>

          {/* Chamadas */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">📞 Desempenho de Chamadas — 186 total</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <KPIBox label="Total Chamadas" value={186} color="#1F4E79" icon="📞" />
              <KPIBox label="Conectadas" value={52} sub="28% do total" color="#375623" icon="✅" />
              <KPIBox label="Mensagem Ativa" value={93} sub="50% — sem retorno" color="#ED7D31" icon="📢" />
              <KPIBox label="Sem Resposta" value={39} sub="21% do total" color="#C00000" icon="❌" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-3">Resultado das Chamadas</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={resultadoChamadas} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                      {resultadoChamadas.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v} chamadas`, '']} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {atendentes.map((a, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: a.color }}>{a.nome.charAt(0)}</div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{a.nome}</p>
                          <p className="text-xs text-slate-400">{a.total} chamadas · {a.media}/dia</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${a.pct >= 50 ? 'bg-green-100 text-green-700' : a.pct >= 25 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {a.pct}% conectadas
                      </span>
                    </div>
                    <BarraProgresso label="Conectadas" valor={a.conectadas} total={a.total} color="#375623" />
                    <BarraProgresso label="Msg Ativa" valor={a.mensagem} total={a.total} color="#ED7D31" />
                    <BarraProgresso label="Sem Resposta" valor={a.semResp} total={a.total} color="#C00000" />
                    {a.pct === 100 && <p className="text-xs text-green-700 font-semibold mt-2">🏆 100% de conexão — referência!</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">💡 Insights e Ações Recomendadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-700 mb-1">📧 E-mail — Revisar CTA</p>
                <p className="text-xs text-blue-600 mb-1"><strong>Insight:</strong> Taxa de abertura excelente (60,8%) mas 0 respostas. Problema no CTA, não no assunto.</p>
                <p className="text-xs text-blue-600"><strong>Ação:</strong> Usar pergunta âncora dos 4 elos como CTA: "Quinta às 10h ou sexta às 14h?"</p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <p className="text-xs font-bold text-red-700 mb-1">📞 Chamadas — Aumentar conexão</p>
                <p className="text-xs text-red-600 mb-1"><strong>Insight:</strong> Apenas 28% de conexão. 50% deixou mensagem sem retorno.</p>
                <p className="text-xs text-red-600"><strong>Ação:</strong> Combinar chamada + WhatsApp simultâneo. Ligar 9h-11h e 14h-16h.</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-xs font-bold text-green-700 mb-1">💬 WhatsApp — Escalar de 8 para 30+</p>
                <p className="text-xs text-green-600 mb-1"><strong>Insight:</strong> Apenas 8 WhatsApps vs 111 chamadas. Canal subutilizado.</p>
                <p className="text-xs text-green-600"><strong>Ação:</strong> Usar cadência D1 WhatsApp + D1 E-mail para todos os leads PCI.</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <p className="text-xs font-bold text-purple-700 mb-1">🏆 Marília — Replicar para Deisy</p>
                <p className="text-xs text-purple-600 mb-1"><strong>Insight:</strong> Marília: 100% conexão em 7 chamadas. Deisy: 25,1% em 179 chamadas.</p>
                <p className="text-xs text-purple-600"><strong>Ação:</strong> Analisar script e horário da Marília. Sessão de escuta e feedback.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ANÁLISE MQL OUTUBRO ── */}
      {secao === 'mql' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPIBox label="Total MQL Out/26" value={68} sub="todos Inbound — Deisy" color="#1F4E79" icon="📋" />
            <KPIBox label="Reuniões Agendadas" value={2} sub="2,9% do total" color="#375623" icon="🗓️" />
            <KPIBox label="Convertidos" value={2} sub="Pet Shopp + Nova Chevrolet" color="#2E75B6" icon="✅" />
            <KPIBox label="Em Tentativa" value={29} sub="42,6% do total" color="#ED7D31" icon="📞" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Status dos 68 MQLs de Outubro</h3>
              <div className="space-y-2">
                {mqlStatusData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-44 shrink-0">{item.label}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                      <div className="h-full rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(item.valor / 68) * 100}%`, backgroundColor: item.color }}>
                        <span className="text-white text-xs font-bold">{item.valor}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 w-8 text-right">{Math.round((item.valor / 68) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Segmentos Identificados</h3>
              <div className="space-y-2 mb-4">
                {[
                  { seg: 'Comércio varejista/Ecomm', valor: 25, color: '#FFC7CE' },
                  { seg: 'Saúde e bem-estar', valor: 6, color: '#FFE4B5' },
                  { seg: 'Representante comercial', valor: 5, color: '#FFD9D9' },
                  { seg: 'Consultoria/Assessoria', valor: 3, color: '#FFE4B5' },
                  { seg: 'Serviços gerais', valor: 3, color: '#FFE4B5' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0 bg-red-400" />
                    <span className="text-xs text-slate-600 w-44 shrink-0">{s.seg}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(s.valor / 25) * 100}%`, backgroundColor: s.color }} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-5 text-right">{s.valor}</span>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-xs font-bold text-red-700">⚠️ Perfil predominante fora do PCI</p>
                <p className="text-xs text-red-600">Varejo/Ecommerce domina com 37% dos MQLs. Apenas 4 leads (5,9%) com PCI confirmado.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── METAS YTD ── */}
      {secao === 'metas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPIBox label="Investimento Out" value="R$ 4.410" sub="meta: R$4.800" color="#375623" ok={true} />
            <KPIBox label="Leads Gerados" value={113} sub="62,8% da meta (180)" color="#ED7D31" ok={false} />
            <KPIBox label="CPL" value="R$ 39,02" sub="meta: menor R$50" color="#375623" ok={true} />
            <KPIBox label="MQL Inbound" value={33} sub="meta: maior 30" color="#375623" ok={true} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPIBox label="Custo por MQL" value="R$ 134" sub="meta: menor R$250" color="#375623" ok={true} />
            <KPIBox label="SQL (Demo)" value={7} sub="28% da meta (25)" color="#C00000" ok={false} />
            <KPIBox label="Custo por SQL" value="R$ 630" sub="meta: menor R$500" color="#C00000" ok={false} />
            <KPIBox label="Taxa Lead→MQL" value="29,2%" sub="29 de cada 100 leads" color="#2E75B6" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">📈 Tendência Mensal 2026 — Leads, MQL e SQL</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={historicoMensal} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="leads" name="Leads" stroke="#2E75B6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="mql" name="MQL" stroke="#375623" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="sql" name="SQL" stroke="#ED7D31" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">💰 Evolução do CPL por Mês</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={historicoMensal} margin={{ left: 0, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`R$ ${v}`, 'CPL']} />
                <Bar dataKey="cpl" name="CPL (R$)" fill="#2E75B6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">📋 Resumo YTD 2026 — Todos os Meses</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b-2 border-[#1F4E79]">
                    {['Mês', 'Invest.', 'Leads', 'CPL', 'MQL', 'C/MQL', 'L→M', 'SQL', 'C/SQL', 'M→S'].map(h => (
                      <th key={h} className="py-2 px-2 text-center text-xs font-bold text-[#1F4E79] uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Jan/26', 'R$3.963', '39', 'R$102', '11', 'R$360', '28%', '4', 'R$991', '36%'],
                    ['Fev/26', 'R$4.050', '51', 'R$79', '9', 'R$450', '18%', '4', 'R$1.013', '44%'],
                    ['Mar/26', 'R$3.993', '67', 'R$60', '10', 'R$399', '15%', '7', 'R$570', '70%'],
                    ['Abr/26', 'R$4.430', '77', 'R$58', '9', 'R$492', '12%', '7', 'R$633', '78%'],
                    ['Mai/26', 'R$3.420', '87', 'R$39', '11', 'R$311', '13%', '14', 'R$244', '127%'],
                    ['Jun/26', 'R$4.770', '201', 'R$24', '32', 'R$149', '16%', '10', 'R$477', '31%'],
                    ['Jul/26', 'R$6.544', '174', 'R$37', '31', 'R$211', '18%', '14', 'R$467', '45%'],
                    ['Ago/26', 'R$4.175', '127', 'R$33', '22', 'R$190', '17%', '8', 'R$522', '36%'],
                    ['Set/26', 'R$4.480', '133', 'R$34', '43', 'R$104', '32%', '5', 'R$896', '12%'],
                    ['Out/26', 'R$4.410', '113', 'R$39', '33', 'R$134', '29%', '7', 'R$630', '21%'],
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${i === 9 ? 'bg-blue-50 font-bold' : i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      {row.map((cell, j) => (
                        <td key={j} className="py-1.5 px-2 text-center text-slate-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── NOVOS LEADS ── */}
      {secao === 'novos' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <span className="text-2xl">🆕</span>
            <div>
              <p className="text-sm font-bold text-blue-700">Novos Leads — Semana de 02/11/2026</p>
              <p className="text-xs text-blue-600">10 leads capturados. Maioria via campanha MEIO Calculadora. Perfil predominante: Representante e Serviços (fora do PCI).</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-4">Leads da Semana — Classificação PCI</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-[#1F4E79]">
                    {['Empresa', 'Segmento', 'Televendas', 'Campanha', 'PCI', 'Ação'].map(h => (
                      <th key={h} className="py-2 px-3 text-left text-xs font-bold text-[#1F4E79] uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {novosLeads.map((l, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${l.pci ? 'bg-green-50' : i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                      <td className="py-2 px-3 font-semibold text-slate-800 text-xs">{l.empresa}</td>
                      <td className="py-2 px-3 text-xs text-slate-600">{l.segmento}</td>
                      <td className="py-2 px-3 text-xs text-slate-600">{l.tv}</td>
                      <td className="py-2 px-3 text-xs text-slate-500">{l.campanha}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${l.pci ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {l.pci ? '✅ PCI' : '❌ Fora'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-xs">
                        {l.pci
                          ? <span className="text-green-700 font-semibold">🔴 Ligar — qualificar TV</span>
                          : <span className="text-slate-500">Nutrir ou desqualificar</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-xs font-bold text-green-700">✅ Alumínios Forten — Potencial PCI</p>
              <p className="text-xs text-green-600 mt-1">Atacadista/Distribuidor com 1-3 televendas. Segmento correto. Ligar para confirmar crescimento da equipe. Campanha: MEIO Calculadora.</p>
            </div>
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-xs font-bold text-red-700">⚠️ 4 de 5 leads fora do PCI</p>
              <p className="text-xs text-red-600 mt-1">Representantes e Serviços dominam. Campanha FUNDO MQL 2.0 continua atraindo perfil errado. Reforçar refinamento de público.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}