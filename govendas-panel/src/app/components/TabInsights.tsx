'use client'
import { useState } from 'react'
import { acoesMeta, AcaoMeta } from '../lib/data'

const TIPO_CONFIG: Record<string, { icon: string; bg: string; text: string }> = {
  'Cadência Follow-up': { icon: '📞', bg: 'bg-green-100',  text: 'text-green-700' },
  'Teste de Script':    { icon: '🧪', bg: 'bg-purple-100', text: 'text-purple-700' },
  'Reabordagem':        { icon: '🔄', bg: 'bg-blue-100',   text: 'text-blue-700' },
  'Novo Canal':         { icon: '📣', bg: 'bg-orange-100', text: 'text-orange-700' },
  'Qualificação':       { icon: '🎯', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Treinamento':        { icon: '📚', bg: 'bg-slate-100',  text: 'text-slate-700' },
}

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  'Pendente':     { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  'Em andamento': { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500' },
  'Concluído':    { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500' },
  'Bloqueado':    { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
}

const PRIO_CONFIG: Record<string, { bg: string; text: string }> = {
  'Alta':  { bg: 'bg-red-100',    text: 'text-red-700' },
  'Média': { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  'Baixa': { bg: 'bg-slate-100',  text: 'text-slate-600' },
}

const STATUS_LIST = ['Pendente', 'Em andamento', 'Concluído', 'Bloqueado'] as const

// Insights estratégicos consolidados
const insights = [
  {
    categoria: '📧 E-mail',
    cor: 'blue',
    titulo: 'Taxa de abertura excelente — mas 0 respostas',
    dados: '60,8% de abertura em 97 envios. Média B2B = 25%. Porém 0 respostas.',
    causa: 'O CTA dos e-mails não está gerando ação. O assunto atrai, mas o corpo não converte.',
    acao: 'Revisar corpo do e-mail: usar pergunta âncora dos 4 elos como CTA. Testar "Quinta às 10h ou sexta às 14h?" no final.',
    impacto: 'Potencial de +5 a 10 respostas/mês com CTA revisado',
    prioridade: 'Alta',
  },
  {
    categoria: '📞 Chamadas',
    cor: 'red',
    titulo: 'Apenas 28% de conexão em 186 chamadas',
    dados: '52 conectadas, 93 mensagem ativa (50%), 39 sem resposta (21%).',
    causa: 'Horário e canal inadequados. Leads ignoram ligações mas podem responder WhatsApp.',
    acao: 'Combinar chamada + WhatsApp simultâneo. Ligar 9h-11h e 14h-16h. Evitar segunda manhã e sexta tarde.',
    impacto: 'Aumentar conexão de 28% para 40%+ = +22 conexões/mês',
    prioridade: 'Alta',
  },
  {
    categoria: '💬 WhatsApp',
    cor: 'green',
    titulo: 'Canal subutilizado — apenas 8 mensagens vs 111 chamadas',
    dados: '8 WhatsApps registrados vs 111 chamadas. Proporção 1:14.',
    causa: 'Equipe prioriza ligação. WhatsApp tem maior taxa de resposta no B2B brasileiro.',
    acao: 'Usar cadência D1 WhatsApp + D1 E-mail para todos os leads PCI. Registrar todos no HubSpot.',
    impacto: 'Escalar de 8 para 30+ WhatsApps/mês = +3 a 5 SQLs',
    prioridade: 'Alta',
  },
  {
    categoria: '🎯 Segmentação',
    cor: 'orange',
    titulo: 'FUNDO MQL 2.0 gera 48% dos leads sem contato — perfil errado',
    dados: '43 de 89 leads sem contato vieram do FUNDO MQL 2.0. Varejo domina com 37%.',
    causa: 'Público-alvo da campanha muito amplo. Não filtra por CNAE de atacado/indústria.',
    acao: 'Excluir CNAE de varejo. Focar em atacadistas e indústria. Testar criativo com abertura "gap de meta".',
    impacto: 'Reduzir leads fora do PCI em 30% = +15 MQLs qualificados/mês',
    prioridade: 'Alta',
  },
  {
    categoria: '🏆 Marília vs Deisy',
    cor: 'purple',
    titulo: 'Marília tem 100% de conexão — Deisy 25,1%',
    dados: 'Marília: 7 chamadas, 7 conectadas (100%). Deisy: 179 chamadas, 45 conectadas (25,1%).',
    causa: 'Diferença de script, horário ou abordagem. Marília pode ter técnica replicável.',
    acao: 'Sessão de escuta das chamadas da Marília. Identificar padrão. Treinar Deisy com o mesmo script.',
    impacto: 'Aumentar conexão da Deisy de 25% para 40% = +27 conexões/mês',
    prioridade: 'Média',
  },
  {
    categoria: '📊 SQL',
    cor: 'red',
    titulo: 'SQL em 28% da meta — gargalo principal do funil',
    dados: '7 SQLs em outubro vs meta de 25. Taxa MQL→SQL = 21,2%.',
    causa: 'Muitos MQLs fora do PCI. Cadência de qualificação insuficiente. Faixa 4-10 TV não confirmada.',
    acao: 'Confirmar televendas dos 188 leads com faixa 4-10. Focar qualificação nos 11 pendentes do Inbound.',
    impacto: '+5 a 8 SQLs adicionais com qualificação dos pendentes',
    prioridade: 'Alta',
  },
  {
    categoria: '🤝 Parceria',
    cor: 'green',
    titulo: 'Canal Parceria tem 100% de taxa MQL→SQL',
    dados: '1 MQL, 1 SQL (100%). Melhor taxa de todos os canais.',
    causa: 'Leads de parceiros chegam mais qualificados — já passaram por um filtro de confiança.',
    acao: 'Escalar programa de parceria. Buscar 5 novos parceiros com carteira de atacadistas/distribuidores.',
    impacto: 'De 1 para 10+ MQLs/mês via parceiros com taxa de conversão superior',
    prioridade: 'Alta',
  },
  {
    categoria: '🌱 Orgânico',
    cor: 'blue',
    titulo: 'Leads orgânicos têm melhor perfil PCI',
    dados: '7 leads orgânicos com maior proporção de Atacadistas/Distribuidores. Sem custo de mídia.',
    causa: 'Conteúdo orgânico atrai perfil mais qualificado naturalmente.',
    acao: 'Publicar 3x/semana no LinkedIn GoVendas e Vagner Sacramento. Série "4 elos da execução".',
    impacto: 'De 7 para 20+ MQLs orgânicos/mês sem custo adicional',
    prioridade: 'Média',
  },
]

const corMap: Record<string, { bg: string; border: string; title: string; text: string; badge: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   title: 'text-blue-800',   text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    title: 'text-red-800',    text: 'text-red-700',    badge: 'bg-red-100 text-red-700' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  title: 'text-green-800',  text: 'text-green-700',  badge: 'bg-green-100 text-green-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', title: 'text-orange-800', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', title: 'text-purple-800', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
}

export default function TabInsights() {
  const [acoes, setAcoes] = useState<AcaoMeta[]>(acoesMeta)
  const [filtroTipo, setFiltroTipo] = useState('Todos')
  const [filtroStatus, setFiltroStatus] = useState('Todos')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [novoResultado, setNovoResultado] = useState<Record<number, string>>({})
  const [view, setView] = useState<'insights' | 'acoes'>('insights')

  function setStatus(id: number, status: AcaoMeta['status']) {
    setAcoes(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  function salvarResultado(id: number) {
    const res = novoResultado[id]
    if (!res) return
    setAcoes(prev => prev.map(a => a.id === id ? { ...a, resultado: res } : a))
    setNovoResultado(prev => { const n = { ...prev }; delete n[id]; return n })
  }

  const acoesFiltradas = acoes.filter(a => {
    const okTipo = filtroTipo === 'Todos' || a.tipo === filtroTipo
    const okStatus = filtroStatus === 'Todos' || a.status === filtroStatus
    return okTipo && okStatus
  })

  const total = acoes.length
  const concluidas = acoes.filter(a => a.status === 'Concluído').length
  const emAndamento = acoes.filter(a => a.status === 'Em andamento').length
  const pendentes = acoes.filter(a => a.status === 'Pendente').length
  const pctConcluido = Math.round((concluidas / total) * 100)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Insights & Ações</h2>
          <p className="text-sm text-slate-500">Análises estratégicas e plano de ação comercial</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('insights')}
            className={`text-sm px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'insights' ? 'bg-[#1F4E79] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            💡 Insights
          </button>
          <button onClick={() => setView('acoes')}
            className={`text-sm px-4 py-2 rounded-lg font-semibold transition-colors ${view === 'acoes' ? 'bg-[#1F4E79] text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
            🎯 Ações ({acoes.length})
          </button>
        </div>
      </div>

      {/* ── INSIGHTS ── */}
      {view === 'insights' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Insights identificados', value: insights.length, color: '#1F4E79' },
              { label: 'Prioridade Alta', value: insights.filter(i => i.prioridade === 'Alta').length, color: '#C00000' },
              { label: 'Prioridade Média', value: insights.filter(i => i.prioridade === 'Média').length, color: '#ED7D31' },
              { label: 'Canais analisados', value: 4, color: '#375623' },
            ].map((k, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{k.label}</p>
                <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((ins, i) => {
              const c = corMap[ins.cor] ?? corMap['blue']
              return (
                <div key={i} className={`${c.bg} border ${c.border} rounded-xl p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className={`text-xs font-bold ${c.badge.split(' ')[1]} ${c.badge.split(' ')[0]} px-2 py-0.5 rounded-full`}>{ins.categoria}</span>
                      <p className={`text-sm font-bold ${c.title} mt-1`}>{ins.titulo}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${ins.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {ins.prioridade}
                    </span>
                  </div>
                  <p className={`text-xs ${c.text} mb-1`}><strong>Dados:</strong> {ins.dados}</p>
                  <p className={`text-xs ${c.text} mb-1`}><strong>Causa:</strong> {ins.causa}</p>
                  <p className={`text-xs ${c.text} mb-2`}><strong>Ação:</strong> {ins.acao}</p>
                  <div className={`text-xs px-2 py-1 rounded-lg font-semibold ${c.badge.split(' ')[0]} ${c.badge.split(' ')[1]}`}>
                    📈 {ins.impacto}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── AÇÕES ── */}
      {view === 'acoes' && (
        <div className="space-y-6">

          {/* KPIs ações */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 col-span-2 md:col-span-1">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Progresso Geral</p>
              <span className="text-3xl font-bold text-[#1F4E79]">{pctConcluido}%</span>
              <div className="mt-2 bg-slate-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-[#375623]" style={{ width: `${pctConcluido}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1">{concluidas} de {total} ações</p>
            </div>
            {[
              { label: 'Em Andamento', value: emAndamento, color: '#2E75B6', icon: '🔵' },
              { label: 'Pendentes', value: pendentes, color: '#ED7D31', icon: '⏳' },
              { label: 'Concluídas', value: concluidas, color: '#375623', icon: '✅' },
            ].map((k, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{k.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</span>
                  <span className="text-lg">{k.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-1 flex-wrap items-center">
              <span className="text-xs text-slate-500 font-semibold">Tipo:</span>
              {['Todos','Cadência Follow-up','Teste de Script','Reabordagem','Novo Canal','Qualificação','Treinamento'].map(t => (
                <button key={t} onClick={() => setFiltroTipo(t)}
                  className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${filtroTipo === t ? 'bg-[#1F4E79] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {t === 'Todos' ? t : t.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="flex gap-1 flex-wrap items-center">
              <span className="text-xs text-slate-500 font-semibold">Status:</span>
              {['Todos', ...STATUS_LIST].map(s => (
                <button key={s} onClick={() => setFiltroStatus(s)}
                  className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${filtroStatus === s ? 'bg-[#1F4E79] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Cards de ações */}
          <div className="space-y-3">
            {acoesFiltradas.map(acao => {
              const tipo = TIPO_CONFIG[acao.tipo] || { icon: '📌', bg: 'bg-slate-100', text: 'text-slate-700' }
              const status = STATUS_CONFIG[acao.status]
              const prio = PRIO_CONFIG[acao.prioridade]
              const isExp = expanded === acao.id

              return (
                <div key={acao.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
                  acao.status === 'Concluído' ? 'border-green-200' :
                  acao.status === 'Bloqueado' ? 'border-red-200' :
                  acao.status === 'Em andamento' ? 'border-blue-200' : 'border-slate-200'
                }`}>
                  <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpanded(isExp ? null : acao.id)}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${tipo.bg}`}>{tipo.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tipo.bg} ${tipo.text}`}>{acao.tipo}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${prio.bg} ${prio.text}`}>{acao.prioridade}</span>
                      </div>
                      <p className={`text-sm font-bold mt-0.5 ${acao.status === 'Concluído' ? 'line-through text-slate-400' : 'text-slate-800'}`}>{acao.titulo}</p>
                      <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                        <span className="text-xs text-slate-500">👤 {acao.responsavel}</span>
                        <span className="text-xs text-slate-500">📅 {acao.prazo}</span>
                        <span className="text-xs text-[#2E75B6] font-medium">🎯 {acao.metaRelacionada}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold ${status.bg} ${status.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {acao.status}
                      </span>
                      <span className="text-slate-400 text-xs">{isExp ? '▲' : '▼'}</span>
                    </div>
                  </div>

                  {isExp && (
                    <div className="border-t border-slate-100 p-4 space-y-4 bg-slate-50">
                      <div>
                        <p className="text-xs font-bold text-slate-600 mb-1">Descrição</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{acao.descricao}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                        <span className="text-blue-500">📈</span>
                        <div>
                          <p className="text-xs font-bold text-blue-700">Impacto Estimado</p>
                          <p className="text-xs text-blue-600">{acao.impactoEstimado}</p>
                        </div>
                      </div>
                      {acao.resultado && (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                          <span className="text-green-500">✅</span>
                          <div>
                            <p className="text-xs font-bold text-green-700">Resultado Atual</p>
                            <p className="text-xs text-green-600">{acao.resultado}</p>
                          </div>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-slate-600 mb-1">Registrar Resultado</p>
                        <div className="flex gap-2">
                          <input type="text" placeholder="Ex: 3 respostas recebidas..."
                            value={novoResultado[acao.id] || ''}
                            onChange={e => setNovoResultado(prev => ({ ...prev, [acao.id]: e.target.value }))}
                            className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2E75B6]" />
                          <button onClick={() => salvarResultado(acao.id)}
                            className="text-xs bg-[#2E75B6] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#1F4E79]">
                            Salvar
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-600 mb-2">Atualizar Status</p>
                        <div className="flex gap-2 flex-wrap">
                          {STATUS_LIST.map(s => {
                            const sc = STATUS_CONFIG[s]
                            return (
                              <button key={s} onClick={() => setStatus(acao.id, s)}
                                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-bold border-2 transition-all ${
                                  acao.status === s ? `${sc.bg} ${sc.text} border-current` : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                                {s}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}