'use client'
import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar, Legend
} from 'recharts'

// ── DADOS HUBSPOT — OUTUBRO 2026 ─────────────────────────────────────────────
const emailData = {
  envios: 97,
  aberturas: 59,
  taxaAbertura: 60.82,
  taxaClique: 6.78,
  respostas: 0,
  grupos: 4,
}

const atividadesData = [
  { tipo: 'Chamadas',    valor: 111, icon: '📞', color: '#2E75B6' },
  { tipo: 'Tarefas',    valor: 35,  icon: '✅', color: '#ED7D31' },
  { tipo: 'Observações',valor: 7,   icon: '📝', color: '#FFC000' },
  { tipo: 'Reuniões',   valor: 3,   icon: '🗓️', color: '#375623' },
  { tipo: 'WhatsApp',   valor: 8,   icon: '💬', color: '#25D366' },
]
const totalAtividades = 164

const chamadasGeral = {
  total: 186,
  conectadas: 52,
  pctConectadas: 28,
  mensagemAtiva: 93,
  semResposta: 39,
  numeroErrado: 1,
  ocupado: 1,
}

const chamadasPorAtendente = [
  {
    nome: 'Deisy Silva',
    total: 179,
    conectadas: 45,
    pctConectadas: 25.1,
    mensagemAtiva: 93,
    semResposta: 39,
    numeroErrado: 1,
    media: 7.16,
    color: '#2E75B6',
  },
  {
    nome: 'Marília Frantiele',
    total: 7,
    conectadas: 7,
    pctConectadas: 100,
    mensagemAtiva: 0,
    semResposta: 0,
    numeroErrado: 0,
    media: 0.28,
    color: '#375623',
  },
]

const resultadoChamadas = [
  { name: 'Conectadas',       value: 52,  color: '#375623' },
  { name: 'Mensagem Ativa',   value: 93,  color: '#ED7D31' },
  { name: 'Sem Resposta',     value: 39,  color: '#C00000' },
  { name: 'Nº Errado/Outros', value: 2,   color: '#94a3b8' },
]

function KPI({ label, value, sub, color, icon }: { label: string; value: string | number; sub?: string; color?: string; icon?: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <span className="text-3xl font-bold" style={{ color: color || '#1F4E79' }}>{value}</span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  )
}

function GaugeBar({ pct, color, label }: { pct: number; color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 w-28 shrink-0">{label}</span>
      <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
        <div className="h-full rounded-full flex items-center justify-end pr-2"
          style={{ width: `${pct}%`, backgroundColor: color }}>
          <span className="text-white text-xs font-bold">{pct}%</span>
        </div>
      </div>
    </div>
  )
}

export default function TabHubspot() {
  const [periodo] = useState('Outubro 2026')

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Atividades HubSpot</h2>
          <p className="text-sm text-slate-500">Relatório de chamadas, e-mails, tarefas e atendimentos — {periodo}</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
          <span className="text-orange-500 text-lg">🟠</span>
          <div>
            <p className="text-xs font-bold text-orange-700">HubSpot CRM</p>
            <p className="text-xs text-orange-500">{periodo}</p>
          </div>
        </div>
      </div>

      {/* ── SEÇÃO 1: ATIVIDADES GERAIS ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">📊 Total de Atividades nas Contas-Alvo</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {atividadesData.map((a, i) => (
            <div key={i} className="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-4 border border-slate-100">
              <span className="text-2xl mb-1">{a.icon}</span>
              <span className="text-2xl font-bold" style={{ color: a.color }}>{a.valor}</span>
              <span className="text-xs text-slate-500 mt-0.5">{a.tipo}</span>
              <span className="text-xs text-slate-400">{Math.round((a.valor / totalAtividades) * 100)}% do total</span>
            </div>
          ))}
        </div>

        {/* Gráfico de barras atividades */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-slate-600">Distribuição por tipo</p>
          <span className="text-xs bg-[#1F4E79] text-white px-2 py-0.5 rounded-full font-bold">Total: {totalAtividades}</span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={atividadesData} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="tipo" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="valor" name="Atividades" radius={[4,4,0,0]}>
              {atividadesData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── SEÇÃO 2: E-MAILS ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">📧 Desempenho de E-mails e Modelos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KPI label="Envios" value={emailData.envios} sub={`${emailData.grupos} grupos`} color="#1F4E79" icon="📤" />
          <KPI label="Aberturas" value={emailData.aberturas} sub="de 97 enviados" color="#2E75B6" icon="👁️" />
          <KPI label="Taxa de Abertura" value={`${emailData.taxaAbertura}%`} sub="por envio" color="#375623" icon="📈" />
          <KPI label="Taxa de Clique" value={`${emailData.taxaClique}%`} sub="sobre abertos" color="#ED7D31" icon="🖱️" />
        </div>

        {/* Barras de taxa */}
        <div className="space-y-3">
          <GaugeBar pct={emailData.taxaAbertura} color="#375623" label="Taxa de Abertura" />
          <GaugeBar pct={emailData.taxaClique} color="#2E75B6" label="Taxa de Clique" />
          <GaugeBar pct={0} color="#C00000" label="Taxa de Resposta" />
        </div>

        {/* Insight */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start gap-2">
          <span className="text-yellow-500 text-lg shrink-0">💡</span>
          <div>
            <p className="text-xs font-bold text-yellow-700">Insight</p>
            <p className="text-xs text-yellow-600">
              Taxa de abertura de <strong>60,8%</strong> está acima da média do mercado B2B (~25%). Porém, <strong>0 respostas</strong> indicam que o CTA dos e-mails precisa ser revisado. Testar assuntos mais diretos com pergunta âncora dos 4 elos pode aumentar a taxa de resposta.
            </p>
          </div>
        </div>
      </div>

      {/* ── SEÇÃO 3: CHAMADAS GERAL ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">📞 Desempenho Geral de Chamadas</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <KPI label="Total Chamadas" value={chamadasGeral.total} color="#1F4E79" icon="📞" />
          <KPI label="Conectadas" value={chamadasGeral.conectadas} sub={`${chamadasGeral.pctConectadas}% do total`} color="#375623" icon="✅" />
          <KPI label="Mensagem Ativa" value={chamadasGeral.mensagemAtiva} sub="deixou recado" color="#ED7D31" icon="📢" />
          <KPI label="Sem Resposta" value={chamadasGeral.semResposta} sub="não atendeu" color="#C00000" icon="❌" />
        </div>

        {/* Pizza + Barras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-600 mb-3">Resultado das Chamadas</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={resultadoChamadas} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                  {resultadoChamadas.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v} chamadas`, '']} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-600 mb-3">Distribuição percentual</p>
            {resultadoChamadas.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-32 shrink-0">{r.name}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${Math.round((r.value / chamadasGeral.total) * 100)}%`, backgroundColor: r.color }}>
                    <span className="text-white text-xs font-bold">{r.value}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">{Math.round((r.value / chamadasGeral.total) * 100)}%</span>
              </div>
            ))}

            {/* Insight chamadas */}
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-xs font-bold text-red-700">⚠️ Atenção</p>
              <p className="text-xs text-red-600">
                Apenas <strong>28% de conexão</strong> nas chamadas. 50% deixou mensagem ativa sem retorno. Estratégia: combinar chamada com WhatsApp simultâneo para aumentar taxa de conexão.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEÇÃO 4: POR ATENDENTE ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">👤 Desempenho por Atendente</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chamadasPorAtendente.map((a, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: a.color }}>
                    {a.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{a.nome}</p>
                    <p className="text-xs text-slate-400">{a.total} chamadas · média {a.media}/dia</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                  a.pctConectadas >= 50 ? 'bg-green-100 text-green-700' :
                  a.pctConectadas >= 25 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {a.pctConectadas}% conectadas
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Conectadas', value: a.conectadas, total: a.total, color: '#375623' },
                  { label: 'Mensagem Ativa', value: a.mensagemAtiva, total: a.total, color: '#ED7D31' },
                  { label: 'Sem Resposta', value: a.semResposta, total: a.total, color: '#C00000' },
                ].map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-28 shrink-0">{item.label}</span>
                    <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${item.total > 0 ? Math.round((item.value / item.total) * 100) : 0}%`, backgroundColor: item.color }} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-6 text-right">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Badge especial Marília */}
              {a.pctConectadas === 100 && (
                <div className="mt-3 p-2 bg-green-50 border border-green-100 rounded-lg">
                  <p className="text-xs text-green-700 font-semibold">🏆 100% de conexão — referência para o time!</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparativo gráfico */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-slate-600 mb-3">Comparativo de chamadas por atendente</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={[
                { nome: 'Deisy Silva',       conectadas: 45, mensagem: 93, semResposta: 39 },
                { nome: 'Marília Frantiele', conectadas: 7,  mensagem: 0,  semResposta: 0  },
              ]}
              margin={{ left: 0, right: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="conectadas"  name="Conectadas"     fill="#375623" radius={[3,3,0,0]} />
              <Bar dataKey="mensagem"    name="Mensagem Ativa" fill="#ED7D31" radius={[3,3,0,0]} />
              <Bar dataKey="semResposta" name="Sem Resposta"   fill="#C00000" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── SEÇÃO 5: INSIGHTS E AÇÕES ── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">🎯 Insights e Ações Recomendadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: '📧', cor: 'blue', titulo: 'E-mail — Aumentar taxa de resposta',
              insight: 'Taxa de abertura excelente (60,8%) mas 0 respostas. O problema está no CTA, não no assunto.',
              acao: 'Revisar corpo do e-mail: usar pergunta âncora dos 4 elos como CTA. Testar "Quinta às 10h ou sexta às 14h?" no final.',
            },
            {
              icon: '📞', cor: 'red', titulo: 'Chamadas — Aumentar taxa de conexão',
              insight: 'Apenas 28% de conexão em 186 chamadas. 50% deixou mensagem sem retorno.',
              acao: 'Combinar chamada + WhatsApp simultâneo. Ligar no horário de pico (9h-11h e 14h-16h). Evitar segunda manhã e sexta tarde.',
            },
            {
              icon: '💬', cor: 'green', titulo: 'WhatsApp — Escalar de 8 para 30+/mês',
              insight: 'Apenas 8 WhatsApps registrados vs 111 chamadas. Canal com maior taxa de resposta subutilizado.',
              acao: 'Usar cadência D1 WhatsApp + D1 E-mail para todos os leads PCI. Registrar todos os WhatsApps no HubSpot.',
            },
            {
              icon: '🏆', cor: 'purple', titulo: 'Marília — Replicar abordagem para Deisy',
              insight: 'Marília tem 100% de conexão em 7 chamadas. Deisy tem 25,1% em 179 chamadas.',
              acao: 'Analisar script e horário das chamadas da Marília. Criar sessão de escuta e feedback com o time. Padronizar abordagem.',
            },
          ].map((item, i) => {
            const corMap: Record<string, { bg: string; border: string; title: string; text: string }> = {
              blue:   { bg: 'bg-blue-50',   border: 'border-blue-100',   title: 'text-blue-700',   text: 'text-blue-600' },
              red:    { bg: 'bg-red-50',    border: 'border-red-100',    title: 'text-red-700',    text: 'text-red-600' },
              green:  { bg: 'bg-green-50',  border: 'border-green-100',  title: 'text-green-700',  text: 'text-green-600' },
              purple: { bg: 'bg-purple-50', border: 'border-purple-100', title: 'text-purple-700', text: 'text-purple-600' },
            }
            const c = corMap[item.cor]
            return (
              <div key={i} className={`${c.bg} border ${c.border} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <p className={`text-xs font-bold ${c.title}`}>{item.titulo}</p>
                </div>
                <p className={`text-xs ${c.text} mb-2`}><strong>Insight:</strong> {item.insight}</p>
                <p className={`text-xs ${c.text}`}><strong>Ação:</strong> {item.acao}</p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}