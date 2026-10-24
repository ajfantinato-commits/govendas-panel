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

export const leadsSemContato = [
  { empresa: 'Rio Azul Distribuidora', email: 'anderson._angelo@hotmail.com', celular: '91 98572-1441', segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta' },
  { empresa: 'Trevo Lubrificantes', email: 'marketingevendas@trevolubri.com.br', celular: '16 98199-0879', segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta' },
  { empresa: 'DIPAL Parafusos', email: 'diegodipal1@gmail.com', celular: '63 99226-5954', segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta' },
  { empresa: 'Duttra Distribuidora', email: 'leandrojansen79@gmail.com', celular: '99 98487-3350', segmento: 'Atacadista', validacao: 'Confirmado', prioridade: 'Alta' },
  { empresa: 'Chemax', email: 'fabio@chemax.com.br', celular: '(11) 99422-6469', segmento: 'Indústria', validacao: 'Confirmado', prioridade: 'Alta' },
  { empresa: 'Inbeb', email: 'renato.chopp95@gmail.com', celular: '43 99919-3734', segmento: 'Indústria', validacao: 'Confirmado', prioridade: 'Alta' },
  { empresa: 'GVseg Distribuidora', email: 'osmairjs@gmail.com', celular: '(19) 99367-8111', segmento: 'Indefinido', validacao: 'Verificar', prioridade: 'Média' },
  { empresa: 'Sulmedic', email: 'paulo.oliveira@sulmedic.com.br', celular: '(51) 98559-6758', segmento: 'Indefinido', validacao: 'Verificar', prioridade: 'Média' },
  { empresa: 'Ama Distribuidora', email: 'samaracosta00@gmail.com', celular: '82 96817-555', segmento: 'Atacadista', validacao: 'Não encontrado', prioridade: 'Baixa' },
  { empresa: 'TCI Comercial', email: 'felipeferrazdaconceicao@gmail.com', celular: '(12) 99230-8293', segmento: 'Atacadista', validacao: 'Não encontrado', prioridade: 'Baixa' },
  { empresa: 'PS Distribuidora', email: 'moretoanderson6666@gmail.com', celular: '(51) 98479-8260', segmento: 'Atacadista', validacao: 'Duplicata', prioridade: 'Baixa' },
]