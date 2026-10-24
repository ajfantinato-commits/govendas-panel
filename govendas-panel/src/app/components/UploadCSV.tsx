'use client'
import { useState } from 'react'
import * as XLSX from 'xlsx'

interface UploadCSVProps {
  onData: (rows: Record<string, string>[]) => void
  label?: string
}

export default function UploadCSV({ onData, label = 'Atualizar dados' }: UploadCSVProps) {
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setError('')
    setFileName(file.name)
    try {
      const buf = await file.arrayBuffer()
      const wb = XLSX.read(buf, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json<Record<string, string>>(ws, { defval: '' })
      onData(rows)
    } catch {
      setError('Erro ao ler o arquivo. Verifique se é um CSV ou XLSX válido.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-navy text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {loading ? 'Carregando...' : label}
        <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={handleFile} />
      </label>
      {fileName && !error && (
        <span className="text-xs text-green-600 font-medium">✓ {fileName}</span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}