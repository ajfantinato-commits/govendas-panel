// ── DADOS HISTÓRICOS DE MQLs ─────────────────────────────────────────────────
export const historicoMQL = {
  totalMQL: 228,
  clientesAtivos: 10,
  taxaConversao: 4.4,
  reuniaoNaoConverteu: 81,
  agendadoNaoConverteu: 27,
  semConexao: 21,
  pciOkNaoAgendou: 15,
  emAberto: 34,
  desqualificados: 35,
  perdidoConcorrente: 2,
  semInteresse: 3,
}

export const funnelData = [
  { etapa: 'Total MQL', valor: 228, pct: 100 },
  { etapa: 'Com PCI Confirmado', valor: 143, pct: 62.7 },
  { etapa: 'Agendados', valor: 114, pct: 50.0 },
  { etapa: 'Reunião Realizada', valor: 91, pct: 39.9 },
  { etapa: 'Convertidos', valor: 10, pct: 4.4 },
]

export const statusMQLData = [
  { name: 'Reunião Feita – Não converteu', value: 81, color: '#C00000' },
  { name: 'Em Aberto', value: 34, color: '#595959' },
  { name: 'Desqualificados', value: 35, color: '#FF7F00' },
  { name: 'Agendado – Não converteu', value: 27, color: '#ED7D31' },
  { name: 'Sem Conexão', value: 21, color: '#7030A0' },
  { name: 'PCI OK – Não agendou', value: 15, color: '#2E75B6' },
  { name: 'Clientes Ativos', value: 10, color: '#375623' },
  { name: 'Sem Interesse', value: 3, color: '#C00000' },
  { name: 'Perdido p/ concorrente', value: 2, color: '#833C00' },
]

export const prospectorData = [
  { nome: 'Deisy', total: 167, clientes: 9, taxaConv: 5.4, reunioes: 60, semConexao: 14 },
  { nome: 'Helen', total: 61, clientes: 1, taxaConv: 1.6, reunioes: 21, semConexao: 7 },
]

export const clientesAtivos = [
  { empresa: 'Regional Molas', mrr: 4000, produtos: 'GoVendas + GoChat', prospector: 'Marilia' },
  { empresa: 'Caiado Pneus', mrr: 3635, produtos: 'GoVendas + GoChat + GoFone', prospector: 'Deisy' },
  { empresa: 'DentalSul Distribuidora', mrr: 2300, produtos: 'GoVendas + GoChat', prospector: 'Deisy' },
  { empresa: 'Multpel Atacadista', mrr: 2200, produtos: 'GoVendas + GoChat', prospector: 'Deisy' },
  { empresa: 'Viacolor', mrr: 2236, produtos: 'GoVendas + GoChat', prospector: 'Marilia' },
  { empresa: 'Embrast', mrr: 2146, produtos: 'GoVendas + Mix', prospector: 'Deisy' },
  { empresa: 'Hightech Informatica', mrr: 1920, produtos: 'GoVendas + GoChat', prospector: 'Deisy' },
  { empresa: 'Metzler Comercial', mrr: 1250, produtos: 'GoVendas', prospector: 'Deisy' },
  { empresa: 'Motordiesel', mrr: 1250, produtos: 'GoVendas', prospector: 'Deisy' },
  { empresa: 'Thibabem Distribuidora', mrr: 1200, produtos: 'GoVendas', prospector: 'Deisy' },
]

export const mrrTotal = clientesAtivos.reduce((s, c) => s + c.mrr, 0)

// ── ACOMPANHAMENTO DE CONVERSÃO POR CANAL ────────────────────────────────────
export type CanalRow = {
  canal: string
  totalMQL: number | null
  sql: number | null
  pend: number | null
  taxaMQLSQL: number | null
  taxaFechamento: number | null
}

export const canalData: CanalRow[] = [
  { canal: 'Inbound Ads',  totalMQL: 46, sql: 4,  pend: 11, taxaMQLSQL: 8.7,  taxaFechamento: 0 },
  { canal: 'Outbound SDR', totalMQL: 10, sql: 2,  pend: 0,  taxaMQLSQL: 20.0, taxaFechamento: 0 },
  { canal: 'Orgânico',     totalMQL: 7,  sql: 0,  pend: 0,  taxaMQLSQL: 0,    taxaFechamento: 0 },
  { canal: 'Parceria',     totalMQL: 1,  sql: 1,  pend: 0,  taxaMQLSQL: 100,  taxaFechamento: 0 },
]

// ── ACOMPANHAMENTO DE METAS (GERAL) ─────────────────────────────────────────
export type MetaGeral = {
  etapa: string
  meta: number
  real: number
  pctFechamento?: number
}

export const metasGeral: MetaGeral[] = [
  { etapa: 'MQL Gerados',       meta: 64,  real: 64  },
  { etapa: 'SQL Qualificados',  meta: 20,  real: 7   },
  { etapa: 'Demos Realizadas',  meta: 15,  real: 5   },
  { etapa: 'Fechamentos',       meta: 5,   real: 1,  pctFechamento: 20 },
]

// ── DADOS ANÁLISE SEMANAL ────────────────────────────────────────────────────
export const desafiosData = [
  { desafio: 'Minha equipe não tem rotina estruturada', total: 41, pct: 25.9, categoria: 'Gestão de Equipe' },
  { desafio: 'Dificuldade de acompanhar a execução', total: 24, pct: 15.2, categoria: 'Gestão de Equipe' },
  { desafio: 'Falta de visibilidade da carteira', total: 19, pct: 12.0, categoria: 'Gestão de Carteira' },
  { desafio: 'Metas sem base real, por intuição', total: 18, pct: 11.4, categoria: 'Gestão de Metas' },
  { desafio: 'Outro', total: 17, pct: 10.8, categoria: 'Outros' },
  { desafio: 'Clientes inativos que não percebo a tempo', total: 12, pct: 7.6, categoria: 'Gestão de Carteira' },
  { desafio: 'Descubro o gap de meta no dia 28', total: 11, pct: 7.0, categoria: 'Gestão de Metas' },
  { desafio: 'Mix de produtos concentrado', total: 8, pct: 5.1, categoria: 'Gestão de Produtos' },
  { desafio: 'Alta rotatividade de vendedores', total: 8, pct: 5.1, categoria: 'RH / Pessoas' },
]

export const segmentosData = [
  { segmento: 'Comércio varejista ou Ecommerce', total: 50, pci: false },
  { segmento: 'Atacadista ou Distribuidor', total: 40, pci: true },
  { segmento: 'Representante comercial', total: 30, pci: false },
  { segmento: 'Indústria / Manufatura', total: 16, pci: true },
  { segmento: 'Consultoria / Assessoria', total: 9, pci: false },
  { segmento: 'Serviços gerais', total: 6, pci: false },
  { segmento: 'Saúde e bem-estar', total: 5, pci: false },
  { segmento: 'Serviços financeiros', total: 2, pci: false },
]

export const cruzamentoData = [
  { desafio: 'Falta de rotina', atacadista: 14, varejo: 11, representante: 6, industria: 6 },
  { desafio: 'Acompanhar execução', atacadista: 5, varejo: 8, representante: 2, industria: 4 },
  { desafio: 'Visibilidade carteira', atacadista: 3, varejo: 10, representante: 3, industria: 0 },
  { desafio: 'Metas por intuição', atacadista: 8, varejo: 5, representante: 3, industria: 1 },
  { desafio: 'Clientes inativos', atacadista: 3, varejo: 2, representante: 5, industria: 0 },
]

export const campanhasData = [
  { campanha: 'FUNDO - MQL 2.0 (Advantage)', total: 43, pct: 48.3, qualidade: 'Baixa' },
  { campanha: 'MEIO - Calculadora', total: 29, pct: 32.6, qualidade: 'Média' },
  { campanha: 'FUNDO - Teste Públicos MQL 1.0', total: 9, pct: 10.1, qualidade: 'Baixa' },
  { campanha: 'Sem UTM (orgânico)', total: 7, pct: 7.9, qualidade: 'Alta' },
  { campanha: 'MEIO - Webinar / Outros', total: 1, pct: 1.1, qualidade: 'Média' },
]

export const semContato = {
  total: 89,
  semConexao: 26,
  emTentativa: 26,
  potencialPCI: 11,
  reuniaoJaAgendada: 4,
}

// ── LEADS SEM CONTATO COM CADÊNCIA ──────────────────────────────────────────
export type LeadSemContato = {
  id: number
  empresa: string
  email: string
  celular: string
  segmento: string
  validacao: string
  prioridade: string
  cadencia: string[]
  statusConversao: 'Pendente' | 'Convertido' | 'Não Convertido'
  checksCadencia: boolean[]
}

export const leadsSemContato: LeadSemContato[] = [
  {
    id: 1, empresa: 'Rio Azul Distribuidora', email: 'anderson._angelo@hotmail.com', celular: '91 98572-1441',
    segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta',
    cadencia: ['D1 WhatsApp', 'D1 E-mail', 'D3 WhatsApp', 'D3 E-mail', 'D5 WhatsApp'],
    statusConversao: 'Pendente', checksCadencia: [false, false, false, false, false],
  },
  {
    id: 2, empresa: 'Trevo Lubrificantes', email: 'marketingevendas@trevolubri.com.br', celular: '16 98199-0879',
    segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta',
    cadencia: ['D1 WhatsApp', 'D1 E-mail', 'D3 WhatsApp', 'D3 E-mail', 'D5 WhatsApp'],
    statusConversao: 'Pendente', checksCadencia: [false, false, false, false, false],
  },
  {
    id: 3, empresa: 'DIPAL Parafusos', email: 'diegodipal1@gmail.com', celular: '63 99226-5954',
    segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta',
    cadencia: ['D1 WhatsApp', 'D1 E-mail', 'D3 WhatsApp', 'D3 E-mail', 'D5 WhatsApp'],
    statusConversao: 'Pendente', checksCadencia: [false, false, false, false, false],
  },
  {
    id: 4, empresa: 'Duttra Distribuidora', email: 'leandrojansen79@gmail.com', celular: '99 98487-3350',
    segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta',
    cadencia: ['D1 WhatsApp', 'D1 E-mail', 'D3 WhatsApp', 'D3 E-mail', 'D5 WhatsApp'],
    statusConversao: 'Pendente', checksCadencia: [true, true, false, false, false],
  },
  {
    id: 5, empresa: 'Chemax', email: 'fabio@chemax.com.br', celular: '(11) 99422-6469',
    segmento: 'Indústria', validacao: 'Confirmado', prioridade: 'Alta',
    cadencia: ['D1 WhatsApp', 'D1 E-mail', 'D3 WhatsApp', 'D3 E-mail', 'D5 WhatsApp'],
    statusConversao: 'Pendente', checksCadencia: [true, false, false, false, false],
  },
  {
    id: 6, empresa: 'Inbeb', email: 'renato.chopp95@gmail.com', celular: '43 99919-3734',
    segmento: 'Indústria', validacao: 'Confirmado', prioridade: 'Alta',
    cadencia: ['D1 WhatsApp', 'D1 E-mail', 'D3 WhatsApp', 'D3 E-mail', 'D5 WhatsApp'],
    statusConversao: 'Convertido', checksCadencia: [true, true, true, true, true],
  },
  {
    id: 7, empresa: 'GVseg Distribuidora', email: 'osmairjs@gmail.com', celular: '(19) 99367-8111',
    segmento: 'Indefinido', validacao: 'Verificar', prioridade: 'Média',
    cadencia: ['D1 WhatsApp', 'D3 E-mail', 'D5 LinkedIn', 'D7 E-mail'],
    statusConversao: 'Pendente', checksCadencia: [false, false, false, false],
  },
  {
    id: 8, empresa: 'Sulmedic', email: 'paulo.oliveira@sulmedic.com.br', celular: '(51) 98559-6758',
    segmento: 'Indefinido', validacao: 'Verificar', prioridade: 'Média',
    cadencia: ['D1 WhatsApp', 'D3 E-mail', 'D5 LinkedIn', 'D7 E-mail'],
    statusConversao: 'Não Convertido', checksCadencia: [true, true, true, true],
  },
  {
    id: 9, empresa: 'Ama Distribuidora', email: 'samaracosta00@gmail.com', celular: '82 96817-555',
    segmento: 'Atacadista', validacao: 'Não encontrado', prioridade: 'Baixa',
    cadencia: ['D1 WhatsApp', 'D3 E-mail', 'D7 Reativação'],
    statusConversao: 'Pendente', checksCadencia: [false, false, false],
  },
  {
    id: 10, empresa: 'TCI Comercial', email: 'felipeferrazdaconceicao@gmail.com', celular: '(12) 99230-8293',
    segmento: 'Atacadista', validacao: 'Não encontrado', prioridade: 'Baixa',
    cadencia: ['D1 WhatsApp', 'D3 E-mail', 'D7 Reativação'],
    statusConversao: 'Pendente', checksCadencia: [false, false, false],
  },
  {
    id: 11, empresa: 'PS Distribuidora', email: 'moretoanderson6666@gmail.com', celular: '(51) 98479-8260',
    segmento: 'Atacadista', validacao: 'Duplicata', prioridade: 'Baixa',
    cadencia: ['D1 WhatsApp', 'D3 E-mail', 'D7 Reativação'],
    statusConversao: 'Pendente', checksCadencia: [false, false, false],
  },
]

// ── AÇÕES PARA ATINGIR A META ────────────────────────────────────────────────
export type AcaoMeta = {
  id: number
  tipo: 'Cadência Follow-up' | 'Teste de Script' | 'Reabordagem' | 'Novo Canal' | 'Qualificação' | 'Treinamento'
  titulo: string
  descricao: string
  responsavel: string
  prazo: string
  impactoEstimado: string
  status: 'Pendente' | 'Em andamento' | 'Concluído' | 'Bloqueado'
  prioridade: 'Alta' | 'Média' | 'Baixa'
  metaRelacionada: string
  resultado?: string
}

export const acoesMeta: AcaoMeta[] = [
  // ── INBOUND ──────────────────────────────────────────────────────────────
  {
    id: 1,
    tipo: 'Cadência Follow-up',
    titulo: 'Executar cadência nos 11 leads pendentes do Inbound',
    descricao: 'Disparar D1 WhatsApp + D1 E-mail para os 11 leads PCI pendentes do Inbound Ads. Usar script PCI Alto 2.1 — abertura pelo gap de meta. Registrar resultado no CRM após cada contato.',
    responsavel: 'Deisy',
    prazo: '25/10/2026',
    impactoEstimado: '+3 a 5 SQLs qualificados',
    status: 'Em andamento',
    prioridade: 'Alta',
    metaRelacionada: 'Inbound — SQL: 4 atual / meta 10',
    resultado: '2 respostas recebidas',
  },
  {
    id: 2,
    tipo: 'Cadência Follow-up',
    titulo: 'Reativar 81 leads que fizeram reunião mas não fecharam',
    descricao: 'Usar script de reativação 7 dias. Mencionar novidade do produto + oferecer condição especial. Priorizar os com maior MRR potencial. Registrar motivo de não fechamento no CRM.',
    responsavel: 'Deisy',
    prazo: '28/10/2026',
    impactoEstimado: '+2 a 4 fechamentos',
    status: 'Pendente',
    prioridade: 'Alta',
    metaRelacionada: 'Inbound — Fechamento: 1 atual / meta 5',
  },
  {
    id: 3,
    tipo: 'Teste de Script',
    titulo: 'Validar abertura "gap de meta no dia 28" vs "rotina sem estrutura" (Inbound)',
    descricao: 'Testar as duas aberturas em 10 ligações cada com leads do Inbound. Registrar taxa de resposta e engajamento. Definir qual gera mais agendamentos e padronizar para o time.',
    responsavel: 'Alessandro',
    prazo: '27/10/2026',
    impactoEstimado: 'Aumentar taxa MQL→SQL de 8,7% para 15%',
    status: 'Em andamento',
    prioridade: 'Alta',
    metaRelacionada: 'Inbound — Taxa MQL→SQL: 8,7% atual',
    resultado: 'Gap de meta: 60% engajamento | Rotina: 40%',
  },
  {
    id: 4,
    tipo: 'Teste de Script',
    titulo: 'A/B test assunto de e-mail por desafio (Inbound)',
    descricao: 'Desafio 2: "Quantos clientes não receberam atendimento este mês?" vs "Sua agenda do dia pelo ciclo de vida". Medir taxa de abertura e resposta em 50 envios cada.',
    responsavel: 'Alessandro',
    prazo: '30/10/2026',
    impactoEstimado: '+10% taxa de abertura de e-mail',
    status: 'Pendente',
    prioridade: 'Média',
    metaRelacionada: 'Inbound — MQL: 46 atual',
  },
  {
    id: 5,
    tipo: 'Qualificação',
    titulo: 'Confirmar televendas dos leads Inbound com faixa 4-10',
    descricao: 'Uma ligação resolve: "Quantos televendas exatamente?" → Se ≥5: SQL confirmado. Priorizar os com segmento Atacadista/Indústria. Registrar resultado no CRM.',
    responsavel: 'Deisy',
    prazo: '31/10/2026',
    impactoEstimado: '+3 a 5 SQLs adicionais',
    status: 'Pendente',
    prioridade: 'Alta',
    metaRelacionada: 'Inbound — SQL: 4 atual / meta 10',
  },
  // ── OUTBOUND ─────────────────────────────────────────────────────────────
  {
    id: 6,
    tipo: 'Cadência Follow-up',
    titulo: 'Escalar cadência Outbound SDR — de 10 para 30 MQLs/mês',
    descricao: 'Aumentar volume de prospecção ativa. Usar lista de atacadistas/distribuidores com CNAE específico. Aplicar script Outbound 2.2 com abertura pela dor de rotina. Meta: 30 MQLs/mês.',
    responsavel: 'Deisy',
    prazo: '01/11/2026',
    impactoEstimado: '+20 MQLs/mês no Outbound',
    status: 'Pendente',
    prioridade: 'Alta',
    metaRelacionada: 'Outbound — MQL: 10 atual / meta 30',
  },
  {
    id: 7,
    tipo: 'Reabordagem',
    titulo: 'Contatar leads Outbound sem conexão via LinkedIn',
    descricao: 'Usar script LinkedIn 10.1. Buscar decisor pelo nome da empresa. Mensagem personalizada com dor específica do segmento. Máximo 2 toques, depois reativar em 7 dias.',
    responsavel: 'Deisy',
    prazo: '29/10/2026',
    impactoEstimado: '+3 a 5 novas conexões',
    status: 'Pendente',
    prioridade: 'Média',
    metaRelacionada: 'Outbound — SQL: 2 atual / meta 8',
  },
  // ── ORGÂNICO ─────────────────────────────────────────────────────────────
  {
    id: 8,
    tipo: 'Novo Canal',
    titulo: 'Posicionamento orgânico — LinkedIn GoVendas + Vagner Sacramento',
    descricao: 'Publicar 3x/semana no LinkedIn da GoVendas e no perfil do Vagner Sacramento. Conteúdo focado em dores de gestores comerciais de atacadistas/distribuidores: rotina, carteira, metas. Objetivo: gerar leads orgânicos qualificados sem custo de mídia.',
    responsavel: 'Vagner Sacramento',
    prazo: 'Contínuo — revisão mensal',
    impactoEstimado: 'De 7 para 20+ MQLs orgânicos/mês',
    status: 'Em andamento',
    prioridade: 'Alta',
    metaRelacionada: 'Orgânico — MQL: 7 atual / meta 20',
    resultado: 'Estratégia de conteúdo em construção — primeiros posts publicados',
  },
  {
    id: 9,
    tipo: 'Teste de Script',
    titulo: 'Criar série de conteúdo "4 elos da execução" para redes sociais',
    descricao: 'Produzir 4 posts/vídeos curtos sobre cada elo da cadeia: agenda do dia, execução, conversão e resultado. Usar dados reais da pesquisa com 158 gestores. Publicar no LinkedIn GoVendas e Vagner. Medir engajamento e leads gerados.',
    responsavel: 'Vagner Sacramento + Marketing',
    prazo: '05/11/2026',
    impactoEstimado: '+5 a 10 leads orgânicos qualificados',
    status: 'Pendente',
    prioridade: 'Média',
    metaRelacionada: 'Orgânico — SQL: 0 atual / meta 5',
  },
  // ── PARCERIA ─────────────────────────────────────────────────────────────
  {
    id: 10,
    tipo: 'Novo Canal',
    titulo: 'Busca ativa de parceiros com carteira aderente ao GoVendas',
    descricao: 'Identificar e abordar parceiros estratégicos com carteira de clientes atacadistas/distribuidores/indústria: consultorias de vendas B2B, ERPs (Winthor, Protheus, Sankhya), associações de atacadistas, aceleradoras. Proposta: comissão por indicação qualificada (MQL que vira SQL).',
    responsavel: 'Vagner Sacramento',
    prazo: '10/11/2026',
    impactoEstimado: '+5 a 15 MQLs qualificados/mês via parceiros',
    status: 'Em andamento',
    prioridade: 'Alta',
    metaRelacionada: 'Parceria — MQL: 1 atual / meta 10',
    resultado: '1 parceiro ativo — 1 SQL gerado. Mapeando 5 novos parceiros potenciais.',
  },
  {
    id: 11,
    tipo: 'Novo Canal',
    titulo: 'Estruturar programa formal de parceria GoVendas',
    descricao: 'Criar material de apresentação do programa de parceria: proposta de valor, modelo de comissão, processo de indicação e acompanhamento. Definir critérios de qualificação do parceiro: deve ter carteira com ≥10 clientes atacadistas/distribuidores/indústria.',
    responsavel: 'Alessandro + Vagner',
    prazo: '15/11/2026',
    impactoEstimado: 'Canal recorrente de 10+ MQLs/mês',
    status: 'Pendente',
    prioridade: 'Alta',
    metaRelacionada: 'Parceria — MQL: 1 atual / meta 10',
  },
  // ── GERAL ─────────────────────────────────────────────────────────────────
  {
    id: 12,
    tipo: 'Treinamento',
    titulo: 'Validar scripts v3 com Vagner e Alessandro antes de liberar para o time',
    descricao: 'Testar aberturas em 10 ligações reais por canal. Verificar quais aberturas geram resposta. Testar pergunta âncora dos 4 elos na qualificação. Ajustar falas que não conectaram e só então liberar para Deisy e equipe.',
    responsavel: 'Vagner + Alessandro',
    prazo: '28/10/2026',
    impactoEstimado: 'Aumentar taxa de conversão demo→fechamento',
    status: 'Em andamento',
    prioridade: 'Alta',
    metaRelacionada: 'Todos os canais — Fechamento: 1 atual / meta 5',
    resultado: 'Em validação — 5 ligações feitas. Gap de meta com 60% engajamento.',
  },
]

// ── FOLLOW-UP NOVOS LEADS ────────────────────────────────────────────────────
export type FollowUpLead = {
  id: number
  empresa: string
  contato: string
  email: string
  celular: string
  dataEntrada: string
  desafio: string
  segmento: string
  etapaAtual: string
  proximaAcao: string
  dataProximaAcao: string
  responsavel: string
  status: 'Novo' | 'Em contato' | 'Demo agendada' | 'Proposta enviada' | 'Convertido' | 'Perdido'
  observacao: string
}

export const followUpLeads: FollowUpLead[] = [
  {
    id: 1, empresa: 'Ivangas', contato: 'Francisco Ivan', email: 'ivanpaixaofilhoo@gmail.com', celular: '85 99645-4464',
    dataEntrada: '23/10/2026', desafio: 'Falta de rotina', segmento: 'Atacadista ou Distribuidor',
    etapaAtual: '1ª Tentativa', proximaAcao: 'Ligar — confirmar televendas', dataProximaAcao: '25/10/2026',
    responsavel: 'Deisy', status: 'Novo', observacao: 'Faixa 4-10 televendas — confirmar qtd exata',
  },
  {
    id: 2, empresa: 'Evolução', contato: 'Gerente de Vendas', email: 'fernandatpv22026@gmail.com', celular: '86 99447-5593',
    dataEntrada: '18/10/2026', desafio: 'Minha equipe não tem rotina', segmento: 'Indústria / Manufatura',
    etapaAtual: '1ª Tentativa', proximaAcao: 'WhatsApp — abertura INBOUND', dataProximaAcao: '25/10/2026',
    responsavel: 'Deisy', status: 'Em contato', observacao: 'Respondeu formulário com dor de rotina',
  },
  {
    id: 3, empresa: 'Mart Minas', contato: 'Gerente Comercial', email: 'martminas@gmail.com', celular: '31 99252-1274',
    dataEntrada: '18/10/2026', desafio: 'Dificuldade de acompanhar execução', segmento: 'Comércio varejista',
    etapaAtual: '2ª Tentativa', proximaAcao: 'E-mail follow-up', dataProximaAcao: '26/10/2026',
    responsavel: 'Deisy', status: 'Em contato', observacao: '21-50 televendas — fora do PCI (varejo)',
  },
  {
    id: 4, empresa: 'DIPAL parafusos', contato: 'Diego Costa', email: 'diegodipal1@gmail.com', celular: '63 99226-5954',
    dataEntrada: '20/10/2026', desafio: 'Metas por intuição', segmento: 'Atacadista ou Distribuidor',
    etapaAtual: 'Demo agendada', proximaAcao: 'Realizar demo — Oferta 3', dataProximaAcao: '27/10/2026',
    responsavel: 'Deisy', status: 'Demo agendada', observacao: '21-50 televendas — PCI confirmado',
  },
  {
    id: 5, empresa: 'MA Soluções em Tecnologia', contato: 'Rogério Veiga', email: 'rogerio.veiga@maoficial.com.br', celular: '(11) 99422-6469',
    dataEntrada: '18/10/2026', desafio: 'Gap de meta no dia 28', segmento: 'Indefinido',
    etapaAtual: 'Reunião reagendada', proximaAcao: 'Confirmar presença', dataProximaAcao: '25/10/2026',
    responsavel: 'Marilia', status: 'Demo agendada', observacao: '51-100 televendas — PCI Sim',
  },
  {
    id: 6, empresa: 'Tudo para o Vidraceiro', contato: 'Fernanda', email: 'fernandatpv22026@gmail.com', celular: '86 99447-5593',
    dataEntrada: '18/10/2026', desafio: 'Falta de visibilidade da carteira', segmento: 'Indústria / Manufatura',
    etapaAtual: 'Reunião agendada', proximaAcao: 'Realizar demo — Oferta 2', dataProximaAcao: '26/10/2026',
    responsavel: 'Alessandro', status: 'Demo agendada', observacao: '6-20 televendas — PCI Não (verificar)',
  },
]