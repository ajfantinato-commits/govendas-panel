import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GoVendas — Painel de Leads',
  description: 'Análise de MQLs, histórico e cadências comerciais',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-100">{children}</body>
    </html>
  )
}