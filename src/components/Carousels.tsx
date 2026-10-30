import { useCallback, useEffect, useRef, useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import type { Slide } from '../data/site'

/* Vitrine: item da vez no centro, vizinhos menores nas laterais */
export function FocusCarousel({ slides, label }: { slides: Slide[]; label: string }) {
  const [i, setI] = useState(0)
  const n = slides.length
  const vids = useRef<(HTMLVideoElement | null)[]>([])
  const wrap = useRef<HTMLDivElement>(null)
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n])

  useEffect(() => {
    vids.current.forEach((v, k) => {
      if (!v) return
      if (k === i) { v.currentTime = 0; v.play().catch(() => {}) } else v.pause()
    })
  }, [i])

  // gesto de arrastar no celular
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    let x0 = 0, y0 = 0
    const s = (e: TouchEvent) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY }
    const end = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
    }
    el.addEventListener('touchstart', s, { passive: true })
    el.addEventListener('touchend', end, { passive: true })
    return () => { el.removeEventListener('touchstart', s); el.removeEventListener('touchend', end) }
  }, [go])

  const pos = (k: number) => {
    let d = k - i
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  return (
    <div className="focus" role="region" aria-roledescription="carrossel" aria-label={label}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }}>
      <div className="focus__stage" ref={wrap}>
        {slides.map((s, k) => {
          const d = pos(k)
          const hidden = Math.abs(d) > 1
          return (
            <figure key={s.src} className={`focus__slide ${d === 0 ? 'is-active' : ''}`} data-pos={hidden ? (d < 0 ? -2 : 2) : d}
              aria-hidden={d !== 0} aria-roledescription="slide" aria-label={`${k + 1} de ${n}`}
              onClick={() => d !== 0 && !hidden && go(d)}>
              {s.kind === 'video'
                ? <video ref={(el) => { vids.current[k] = el }} src={s.src} poster={s.poster} muted loop playsInline preload={Math.abs(d) <= 1 ? 'auto' : 'none'} aria-label={s.alt} />
                : <img src={s.src} alt={s.alt} loading="lazy" decoding="async" />}
            </figure>
          )
        })}
      </div>
      <div className="focus__controls">
        <button className="btn-arrow" onClick={() => go(-1)} aria-label="Anterior"><CaretLeft size={20} weight="bold" /></button>
        <div className="focus__dots" aria-hidden>
          {slides.map((_, k) => <span key={k} className={k === i ? 'on' : ''} />)}
        </div>
        <button className="btn-arrow" onClick={() => go(1)} aria-label="Próximo"><CaretRight size={20} weight="bold" /></button>
      </div>
      <p className="sr-only" aria-live="polite">{slides[i].alt}</p>
    </div>
  )
}

/* Carrossel horizontal com setas (scroll-snap) */
type Media = { kind: 'image' | 'video'; src: string; poster?: string; alt: string }
export function RailCarousel({ items, label }: { items: Media[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState<'start' | 'mid' | 'end'>('start')
  const scroll = (d: number) => {
    const t = track.current; if (!t) return
    const card = t.querySelector<HTMLElement>('.rail__item')
    t.scrollBy({ left: d * ((card?.offsetWidth ?? 280) + 16) * 2, behavior: 'smooth' })
  }
  useEffect(() => {
    const t = track.current; if (!t) return
    const f = () => setEdge(t.scrollLeft < 8 ? 'start' : t.scrollLeft + t.clientWidth > t.scrollWidth - 8 ? 'end' : 'mid')
    t.addEventListener('scroll', f, { passive: true }); f()
    // vídeos: tocar só visíveis
    const o = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target as HTMLVideoElement
      if (e.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {}); else v.pause()
    }), { root: t, threshold: 0.5 })
    t.querySelectorAll('video').forEach((v) => o.observe(v))
    return () => { t.removeEventListener('scroll', f); o.disconnect() }
  }, [])
  return (
    <div className="rail" role="region" aria-roledescription="carrossel" aria-label={label}>
      <div className="rail__track" ref={track} tabIndex={0}>
        {items.map((m) => (
          <figure className="rail__item" key={m.src}>
            {m.kind === 'video'
              ? <video src={m.src} poster={m.poster} muted loop playsInline preload="none" aria-label={m.alt} />
              : <img src={m.src} alt={m.alt} loading="lazy" decoding="async" />}
          </figure>
        ))}
      </div>
      <div className="rail__controls">
        <button className="btn-arrow" onClick={() => scroll(-1)} disabled={edge === 'start'} aria-label="Voltar fotos"><CaretLeft size={20} weight="bold" /></button>
        <button className="btn-arrow" onClick={() => scroll(1)} disabled={edge === 'end'} aria-label="Avançar fotos"><CaretRight size={20} weight="bold" /></button>
      </div>
    </div>
  )
}
