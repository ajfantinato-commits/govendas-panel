'use client'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts'

const historicoMensal = [
  { mes: 'Jan', leads: 39,  mql: 11, sql: 4,  cpl: 102, custoMQL: 360, custoSQL: 991  },
  { mes: 'Fev', leads: 51,  mql: 9,  sql: 4,  cpl: 79,  custoMQL: 450, custoSQL: 1013 },
  { mes: 'Mar', leads: 67,  mql: 10, sql: 7,  cpl: 60,  custoMQL: 399, custoSQL: 570  },
  { mes: 'Abr', leads: 77,  mql: 9,  sql: 7,  cpl: 58,  custoMQL: 492, custoSQL: 633  },
  { mes: 'Mai', leads: 87,  mql: 11, sql: 14, cpl: 39,  custoMQL: 311, custoSQL: 244  },
  { mes: 'Jun', leads: 201, mql: 32, sql: 10, cpl: 24,  custoMQL: 149, custoSQL: 477  },
  { mes: 'Jul', leads: 174, mql: 31, sql: 14, cpl: 37,  custoMQL: 211, custoSQL: 467  },
  { mes: 'Ago', leads: 127, mql: 22, sql: 8,  cpl: 33,  custoMQL: 190, custoSQL: 522  },
  { mes: 'Set', leads: 133, mql: 43, sql: 5,  cpl: 34,  custoMQL: 104, custoSQL: 896  },
  { mes: 'Out', leads: 113, mql: 33, sql: 7,  cpl: 39,  custoMQL: 134, custoSQL: 630  },
]

// Trimestres
const trimestres = [
  {
    tri: 'Q1 (Jan-Mar)', leads: 39+51+67, mql: 11+9+10, sql: 4+4+7,
    invest: 3963+4050+3993, cplMed: Math.round((102+79+60)/3),
    custoMQLMed: Math.round((360+450+399)/3), custoSQLMed: Math.round((991+1013+570)/3),
    color: '#2E75B6',
  },
  {
    tri: 'Q2 (Abr-Jun)', leads: 77+87+201, mql: 9+11+32, sql: 7+14+10,
    invest: 4430+3420+4770, cplMed: Math.round((58+39+24)/3),
    custoMQLMed: Math.round((492+311+149)/3), custoSQLMed: Math.round((633+244+477)/3),
    color: '#375623',
  },
  {
    tri: 'Q3 (Jul-Set)', leads: 174+127+133, mql: 31+22+43, sql: 14+8+5,
    invest: 6544+4175+4480, cplMed: Math.round((37+33+34)/3),
    custoMQLMed: Math.round((211+190+104)/3), custoSQLMed: Math.round((467+522+896)/3),
    color: '#ED7D31',
  },
  {
    tri: 'Q4 (Out)', leads: 113, mql: 33, sql: 7,
    invest: 4410, cplMed: 39,
    custoMQLMed: 134, custoSQLMed: 630,
    color: '#7030A0',
  },
]

const metasOut = [
  { etapa: 'Investimento', real: 4410, meta: 4800, unidade: 'R$', ok: true },
  { etapa: 'Leads Gerados', real: 113, meta: 180, unidade: '', ok: false },
  { etapa: 'CPL', real: 39, meta: 50, unidade: 'R$', ok: true, inverso: true },
  { etapa: 'MQL Inbound', real: 33, meta: 30, unidade: '', ok: true },
  { etapa: 'Custo por MQL', real: 134, meta: 250, unidade: 'R$', ok: true, inverso: true },
  { etapa: 'SQL (Demo)', real: 7, meta: 25, unidade: '', ok: false },
  { etapa: 'Custo por SQL', real: 630, meta: 500, unidade: 'R$', ok: false, inverso: true },
]

function KPIBox({ label, value, sub, color, ok }: { label: string; value: string | number; sub?: string; color?: string; ok?: boolean }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
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

export default function TabMetas() {
  const totalLeads = historicoMensal.reduce((s, m) => s + m.leads, 0)
  const totalMQL   = historicoMensal.reduce((s, m) => s + m.mql, 0)
  const totalSQL   = historicoMensal.reduce((s, m) => s + m.sql, 0)
  const totalInvest = 3963+4050+3993+4430+3420+4770+6544+4175+4480+4410

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Metas YTD 2026</h2>
          <p className="text-sm text-slate-500">Indicadores acumulados Jan–Out/2026 | Atualizado em Nov/2026</p>
        </div>
        <div className="flex gap-3">
          <div className="text-center bg-white rounded-xl border border-slate-100 px-4 py-2 shadow-sm">
            <p className="text-xs text-slate-500">Meses</p>
            <p className="text-xl font-bold text-[#1F4E79]">10</p>
          </div>
          <div className="text-center bg-white rounded-xl border border-slate-100 px-4 py-2 shadow-sm">
            <p className="text-xs text-slate-500">Invest. Total</p>
            <p className="text-xl font-bold text-[#ED7D31]">R${(totalInvest/1000).toFixed(0)}k</p>
          </div>
        </div>
      </div>

      {/* KPIs acumulados YTD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPIBox label="Leads YTD" value={totalLeads.toLocaleString('pt-BR')} sub="meta: 1.800" color="#2E75B6" ok={totalLeads >= 1800} />
        <KPIBox label="MQL YTD" value={totalMQL} sub="meta: >300" color="#375623" ok={totalMQL >= 300} />
        <KPIBox label="SQL YTD" value={totalSQL} sub="meta: 250" color={totalSQL >= 250 ? '#375623' : '#C00000'} ok={totalSQL >= 250} />
        <KPIBox label="CPL Médio" value={`R$ ${Math.round(totalInvest/totalLeads)}`} sub="meta: <R$50" color="#375623" ok={Math.round(totalInvest/totalLeads) < 50} />
      </div>

      {/* Metas outubro */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">🎯 Metas de Outubro 2026 — Resultado</h3>
        <div className="space-y-3">
          {metasOut.map((m, i) => {
            const pct = m.inverso
              ? Math.min(Math.round((m.meta / m.real) * 100), 100)
              : Math.min(Math.round((m.real / m.meta) * 100), 100)
            const color = m.ok ? '#375623' : '#C00000'
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-slate-600 w-36 shrink-0 font-medium">{m.etapa}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-5 overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${pct}%`, backgroundColor: color }}>
                    <span className="text-white text-xs font-bold">{m.unidade}{m.real.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 w-24 text-right">meta: {m.unidade}{m.meta}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold w-24 text-center ${m.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {m.ok ? '✓ Atingido' : `${pct}%`}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Resumo YTD — tabela completa (PRIMEIRO) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">📋 Resumo YTD 2026 — Todos os Meses</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-[#1F4E79]">
                {['Mês','Invest.','Leads','CPL','MQL','C/MQL','L→M','SQL','C/SQL','M→S'].map(h => (
                  <th key={h} className="py-2 px-2 text-center text-xs font-bold text-[#1F4E79] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Jan/26','R$3.963','39','R$102','11','R$360','28%','4','R$991','36%'],
                ['Fev/26','R$4.050','51','R$79','9','R$450','18%','4','R$1.013','44%'],
                ['Mar/26','R$3.993','67','R$60','10','R$399','15%','7','R$570','70%'],
                ['Abr/26','R$4.430','77','R$58','9','R$492','12%','7','R$633','78%'],
                ['Mai/26','R$3.420','87','R$39','11','R$311','13%','14','R$244','127%'],
                ['Jun/26','R$4.770','201','R$24','32','R$149','16%','10','R$477','31%'],
                ['Jul/26','R$6.544','174','R$37','31','R$211','18%','14','R$467','45%'],
                ['Ago/26','R$4.175','127','R$33','22','R$190','17%','8','R$522','36%'],
                ['Set/26','R$4.480','133','R$34','43','R$104','32%','5','R$896','12%'],
                ['Out/26','R$4.410','113','R$39','33','R$134','29%','7','R$630','21%'],
              ].map((row, i) => (
                <tr key={i} className={`border-b border-slate-100 ${i === 9 ? 'bg-blue-50 font-bold' : i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                  {row.map((cell, j) => (
                    <td key={j} className="py-1.5 px-2 text-center text-slate-700">{cell}</td>
                  ))}
                </tr>
              ))}
              <tr className="border-t-2 border-[#1F4E79] bg-[#EBF3FB] font-bold">
                {['TOTAL YTD',`R$${(totalInvest/1000).toFixed(0)}k`,totalLeads,`R$${Math.round(totalInvest/totalLeads)}`,totalMQL,`R$${Math.round(totalInvest/totalMQL)}`,`${Math.round(totalMQL/totalLeads*100)}%`,totalSQL,`R$${Math.round(totalInvest/totalSQL)}`,`${Math.round(totalSQL/totalMQL*100)}%`].map((cell, j) => (
                  <td key={j} className="py-2 px-2 text-center text-[#1F4E79] text-xs">{cell}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Análise por Trimestre */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">📅 Análise por Trimestre — 2026</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {trimestres.map((t, i) => (
            <div key={i} className="rounded-xl border-2 p-4" style={{ borderColor: t.color }}>
              <p className="text-xs font-bold mb-3" style={{ color: t.color }}>{t.tri}</p>
              <div className="space-y-1.5">
                <div className="flex justify-between"><span className="text-xs text-slate-500">Leads</span><span className="text-xs font-bold text-slate-800">{t.leads}</span></div>
                <div className="flex justify-between"><span className="text-xs text-slate-500">MQL</span><span className="text-xs font-bold text-slate-800">{t.mql}</span></div>
                <div className="flex justify-between"><span className="text-xs text-slate-500">SQL</span><span className="text-xs font-bold text-slate-800">{t.sql}</span></div>
                <div className="flex justify-between"><span className="text-xs text-slate-500">CPL Méd.</span><span className="text-xs font-bold text-slate-800">R${t.cplMed}</span></div>
                <div className="flex justify-between"><span className="text-xs text-slate-500">C/MQL Méd.</span><span className="text-xs font-bold text-slate-800">R${t.custoMQLMed}</span></div>
                <div className="flex justify-between border-t border-slate-100 pt-1.5 mt-1.5">
                  <span className="text-xs text-slate-500">L→M</span>
                  <span className="text-xs font-bold" style={{ color: t.color }}>{Math.round(t.mql/t.leads*100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">M→S</span>
                  <span className="text-xs font-bold" style={{ color: t.color }}>{Math.round(t.sql/t.mql*100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico comparativo trimestres */}
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={trimestres.map(t => ({ tri: t.tri.split(' ')[0], leads: t.leads, mql: t.mql, sql: t.sql }))} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="tri" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="leads" name="Leads" fill="#2E75B6" radius={[3,3,0,0]} />
            <Bar dataKey="mql" name="MQL" fill="#375623" radius={[3,3,0,0]} />
            <Bar dataKey="sql" name="SQL" fill="#ED7D31" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tendência mensal (DEPOIS da tabela e trimestres) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">📈 Tendência Mensal 2026 — Leads, MQL e SQL</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={historicoMensal} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <ReferenceLine y={30} stroke="#375623" strokeDasharray="4 4" label={{ value: 'Meta MQL', position: 'right', fontSize: 10 }} />
            <Line type="monotone" dataKey="leads" name="Leads" stroke="#2E75B6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="mql" name="MQL" stroke="#375623" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="sql" name="SQL" stroke="#ED7D31" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CPL e Custo MQL */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <h3 className="text-sm font-bold text-slate-700 mb-4">💰 Evolução de Custos — CPL e Custo por MQL</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={historicoMensal} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => [`R$ ${v}`, '']} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <ReferenceLine y={50} stroke="#C00000" strokeDasharray="4 4" label={{ value: 'Meta CPL', position: 'right', fontSize: 10 }} />
            <ReferenceLine y={250} stroke="#ED7D31" strokeDasharray="4 4" label={{ value: 'Meta C/MQL', position: 'right', fontSize: 10 }} />
            <Bar dataKey="cpl" name="CPL (R$)" fill="#2E75B6" radius={[3,3,0,0]} />
            <Bar dataKey="custoMQL" name="Custo MQL (R$)" fill="#ED7D31" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}