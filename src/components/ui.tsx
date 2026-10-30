import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from 'react'

/* ---------- Revelação ao rolar ---------- */
let io: IntersectionObserver | null = null
const seen = new WeakMap<Element, () => void>()
function getIO() {
  if (io || typeof window === 'undefined') return io
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { seen.get(e.target)?.(); io!.unobserve(e.target) } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return io
}
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, set] = useState(false)
  useEffect(() => {
    const el = ref.current; const o = getIO()
    if (!el || !o) { set(true); return }
    seen.set(el, () => set(true)); o.observe(el)
    return () => o.unobserve(el)
  }, [])
  return [ref, inView] as const
}

type RevealProps = { as?: ElementType; className?: string; delay?: number; variant?: 'up' | 'photo' | 'fade' | 'right'; children: ReactNode; style?: CSSProperties; [k: string]: unknown }
export function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = 'up', children, style, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} className={`rv rv--${variant} ${inView ? 'is-in' : ''} ${className}`} style={{ ...style, '--d': `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </Tag>
  )
}

/* Título com linhas que sobem por trás de uma máscara. {texto} vira destaque laranja */
export function SplitTitle({ as: Tag = 'h2', lines, className = '', id }: { as?: ElementType; lines: string[]; className?: string; id?: string }) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} id={id} aria-label={lines.join(' ').replace(/[{}]/g, '')} className={`split ${inView ? 'is-in' : ''} ${className}`}>
      {lines.map((l, i) => (
        <span className="split__mask" key={i} aria-hidden>
          <span className="split__line" style={{ '--d': `${i * 90}ms` } as CSSProperties}>{l.split(/(\{[^}]+\})/).map((part, j) => part.startsWith('{') ? <span key={j} className="accent">{part.slice(1, -1)}</span> : part)}{i < lines.length - 1 ? ' ' : ''}</span>
        </span>
      ))}
    </Tag>
  )
}

/* Letras que entram uma a uma */
export function Letters({ text, className = '', delay = 0, step = 45 }: { text: string; className?: string; delay?: number; step?: number }) {
  return (
    <span className={`letters ${className}`} aria-label={text}>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden className="letters__c" style={{ '--i': i, '--d0': `${delay}ms`, '--st': `${step}ms` } as CSSProperties}>{c === ' ' ? ' ' : c}</span>
      ))}
    </span>
  )
}

/* Número que conta ao entrar na tela */
export function CountUp({ to, run, duration = 1400 }: { to: number; run: boolean; duration?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return }
    let raf = 0; const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, duration])
  return <>{n}</>
}
