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

const TIPOS = ['Todos', 'Cadência Follow-up', 'Teste de Script', 'Reabordagem', 'Novo Canal', 'Qualificação', 'Treinamento']
const STATUS_LIST = ['Pendente', 'Em andamento', 'Concluído', 'Bloqueado'] as const

export default function TabAcoes() {
  const [acoes, setAcoes] = useState<AcaoMeta[]>(acoesMeta)
  const [filtroTipo, setFiltroTipo] = useState('Todos')
  const [filtroStatus, setFiltroStatus] = useState('Todos')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [novoResultado, setNovoResultado] = useState<Record<number, string>>({})

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

  // KPIs
  const total = acoes.length
  const concluidas = acoes.filter(a => a.status === 'Concluído').length
  const emAndamento = acoes.filter(a => a.status === 'Em andamento').length
  const pendentes = acoes.filter(a => a.status === 'Pendente').length
  const bloqueadas = acoes.filter(a => a.status === 'Bloqueado').length
  const pctConcluido = Math.round((concluidas / total) * 100)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Ações para Atingir a Meta</h2>
          <p className="text-sm text-slate-500">Follow-up de cadência, testes de script e ações comerciais</p>
        </div>
        <button
          onClick={() => {
            const titulo = prompt('Título da nova ação:')
            if (!titulo) return
            const nova: AcaoMeta = {
              id: Date.now(),
              tipo: 'Cadência Follow-up',
              titulo,
              descricao: '',
              responsavel: '',
              prazo: '',
              impactoEstimado: '',
              status: 'Pendente',
              prioridade: 'Média',
              metaRelacionada: '',
            }
            setAcoes(prev => [nova, ...prev])
          }}
          className="flex items-center gap-2 bg-[#1F4E79] hover:bg-[#2E75B6] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <span>+</span> Nova Ação
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 col-span-2 md:col-span-1">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Progresso Geral</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-[#1F4E79]">{pctConcluido}%</span>
          </div>
          <div className="mt-2 bg-slate-100 rounded-full h-2">
            <div className="h-2 rounded-full bg-[#375623] transition-all" style={{ width: `${pctConcluido}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-1">{concluidas} de {total} ações</p>
        </div>
        {[
          { label: 'Em Andamento', value: emAndamento, color: '#2E75B6', icon: '🔵' },
          { label: 'Pendentes', value: pendentes, color: '#ED7D31', icon: '⏳' },
          { label: 'Concluídas', value: concluidas, color: '#375623', icon: '✅' },
          { label: 'Bloqueadas', value: bloqueadas, color: '#C00000', icon: '🚫' },
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
        <div className="flex gap-1 flex-wrap">
          <span className="text-xs text-slate-500 self-center mr-1 font-semibold">Tipo:</span>
          {TIPOS.map(t => (
            <button key={t} onClick={() => setFiltroTipo(t)}
              className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${filtroTipo === t ? 'bg-[#1F4E79] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
              {t === 'Todos' ? t : (TIPO_CONFIG[t]?.icon + ' ' + t.split(' ')[0])}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          <span className="text-xs text-slate-500 self-center mr-1 font-semibold">Status:</span>
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
            <div key={acao.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all ${
              acao.status === 'Concluído' ? 'border-green-200' :
              acao.status === 'Bloqueado' ? 'border-red-200' :
              acao.status === 'Em andamento' ? 'border-blue-200' :
              'border-slate-200'
            }`}>
              {/* Linha principal */}
              <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpanded(isExp ? null : acao.id)}>

                {/* Tipo icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0 ${tipo.bg}`}>
                  {tipo.icon}
                </div>

                {/* Conteúdo principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tipo.bg} ${tipo.text}`}>{acao.tipo}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${prio.bg} ${prio.text}`}>{acao.prioridade}</span>
                  </div>
                  <p className={`text-sm font-bold mt-0.5 ${acao.status === 'Concluído' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {acao.titulo}
                  </p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-slate-500">👤 {acao.responsavel}</span>
                    <span className="text-xs text-slate-500">📅 {acao.prazo}</span>
                    <span className="text-xs text-[#2E75B6] font-medium">🎯 {acao.metaRelacionada}</span>
                  </div>
                </div>

                {/* Status + expand */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-bold ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {acao.status}
                  </span>
                  <span className="text-slate-400 text-xs">{isExp ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Detalhes expandidos */}
              {isExp && (
                <div className="border-t border-slate-100 p-4 space-y-4 bg-slate-50">

                  {/* Descrição */}
                  <div>
                    <p className="text-xs font-bold text-slate-600 mb-1">Descrição da Ação</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{acao.descricao}</p>
                  </div>

                  {/* Impacto estimado */}
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <span className="text-blue-500">📈</span>
                    <div>
                      <p className="text-xs font-bold text-blue-700">Impacto Estimado</p>
                      <p className="text-xs text-blue-600">{acao.impactoEstimado}</p>
                    </div>
                  </div>

                  {/* Resultado atual */}
                  {acao.resultado && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                      <span className="text-green-500">✅</span>
                      <div>
                        <p className="text-xs font-bold text-green-700">Resultado Atual</p>
                        <p className="text-xs text-green-600">{acao.resultado}</p>
                      </div>
                    </div>
                  )}

                  {/* Registrar resultado */}
                  <div>
                    <p className="text-xs font-bold text-slate-600 mb-1">Registrar Resultado / Observação</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ex: 3 respostas recebidas, demo agendada para 28/10..."
                        value={novoResultado[acao.id] || ''}
                        onChange={e => setNovoResultado(prev => ({ ...prev, [acao.id]: e.target.value }))}
                        className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#2E75B6]"
                      />
                      <button onClick={() => salvarResultado(acao.id)}
                        className="text-xs bg-[#2E75B6] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#1F4E79] transition-colors">
                        Salvar
                      </button>
                    </div>
                  </div>

                  {/* Alterar status */}
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

        {acoesFiltradas.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-4xl mb-2">📋</p>
            <p className="text-sm">Nenhuma ação encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>

    </div>
  )
}