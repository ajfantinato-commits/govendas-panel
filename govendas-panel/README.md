# GoVendas — Painel Comercial de Leads

Painel interno para análise de MQLs, histórico de leads e análise semanal de desafios × segmentos.

## 🚀 Deploy no Vercel

1. Faça fork ou clone este repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Configure as variáveis de ambiente (se necessário)
4. Clique em **Deploy** — pronto!

## 💻 Rodar localmente

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📋 Abas do Painel

### Aba 1 — Histórico de MQLs
- KPIs: total MQLs, clientes ativos, MRR, reuniões sem fechar
- Funil de conversão visual
- Distribuição por status (pizza)
- Performance por prospector(a)
- MRR por cliente ativo (gráfico de barras)
- **Upload de planilha** para atualizar dados

### Aba 2 — Análise Semanal
- KPIs: leads sem contato, potencial PCI, sem conexão, em tentativa
- Ranking de desafios da operação
- Distribuição por segmento (com indicador PCI)
- Cruzamento Desafio × Segmento (gráfico agrupado)
- Análise por campanha (qualidade e ação recomendada)
- Lista de leads PCI com filtro por prioridade
- **Upload de CSV** para atualizar leads da semana

## 🛠️ Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (estilização)
- **Recharts** (gráficos)
- **xlsx** (parse de planilhas)
- **Vercel** (deploy)

## 📈 Próximos passos (roadmap)

- [ ] Integração com Supabase (banco de dados persistente)
- [ ] Autenticação (NextAuth)
- [ ] Disparo de e-mail via Resend
- [ ] Integração WhatsApp (Z-API ou Evolution API)
- [ ] Atualização automática via webhook do RD Station