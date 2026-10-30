import { useEffect, useState } from 'react'
import { asset } from '../data/site'

/*
  Intro: o logo da Gêmeos do iPhone é revelado por uma faixa laranja que corre da esquerda
  para a direita, ganha um brilho e se abre em círculo revelando a página.
  Toca uma vez por sessão; some com movimento reduzido.
*/
const KEY = 'gemeos-intro-v1'
const TOTAL = 2900

function shouldPlay() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try { return !sessionStorage.getItem(KEY) } catch { return true }
}

export const INTRO_PLAYS = shouldPlay()
if (INTRO_PLAYS) document.documentElement.dataset.intro = 'on'

export function Intro() {
  const [phase, setPhase] = useState<'play' | 'leave' | 'done'>(INTRO_PLAYS ? 'play' : 'done')

  useEffect(() => {
    if (phase !== 'play') return
    document.body.style.overflow = 'hidden'
    const finish = () => setPhase('leave')
    const t = window.setTimeout(finish, TOTAL - 500)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish() }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leave') return
    try { sessionStorage.setItem(KEY, '1') } catch { /* sem armazenamento: toca de novo na próxima visita */ }
    delete document.documentElement.dataset.intro
    window.dispatchEvent(new Event('gemeos-intro-done'))
    const t = window.setTimeout(() => { document.body.style.overflow = ''; setPhase('done') }, 650)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'done') return null
  return (
    <div className={`intro ${phase === 'leave' ? 'is-leaving' : ''}`} role="presentation" onClick={() => setPhase('leave')}>
      <div className="intro__glow" aria-hidden />
      <div className="intro__stage" aria-hidden>
        <img src={asset('img/logo.png')} alt="" width={531} height={156} />
        <span className="intro__bar" />
      </div>
      <p className="sr-only">Gêmeos do iPhone</p>
      <button className="intro__skip" onClick={(e) => { e.stopPropagation(); setPhase('leave') }}>Pular intro</button>
    </div>
  )
}
