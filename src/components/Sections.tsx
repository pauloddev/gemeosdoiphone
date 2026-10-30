import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  WhatsappLogo, InstagramLogo, ArrowRight, List, X, CreditCard, Truck, ShieldCheck, Handshake, Package, House, Moped, Star, SealCheck, MapPin,
} from '@phosphor-icons/react'
import {
  asset, BRAND, MSG, whatsapp, CEOS, APARELHOS, CLIENTE_DESTAQUE, CLIENTES, GEMEOS_CLIENTES, VITRINE,
} from '../data/site'
import { Reveal, SplitTitle, Letters, CountUp, useInView } from './ui'
import { FocusCarousel, RailCarousel } from './Carousels'
import { openCookiePolicy } from './Cookies'

const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#aparelhos', label: 'Aparelhos' },
  { href: '#parcelamento', label: '21x' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#os-gemeos', label: 'Os Gêmeos' },
]

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

function WaBtn({ msg = MSG.geral, children, className = 'btn btn--orange' }: { msg?: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={whatsapp(msg)} {...ext}><WhatsappLogo size={18} weight="fill" aria-hidden /> {children}</a>
}

/* ---------------- HEADER ---------------- */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [menu])
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault(); setMenu(false); document.body.style.overflow = ''
    requestAnimationFrame(() => { document.querySelector(href)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); history.replaceState(null, '', href) })
  }
  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menu ? 'is-open' : ''}`}>
      <div className="nav__bar glass glass--dark">
        <a href="#inicio" className="nav__logo" aria-label="Gêmeos do iPhone, voltar ao início">
          <img src={asset('img/logo.png')} alt="Gêmeos do iPhone" width={531} height={156} />
        </a>
        <nav className="nav__links" aria-label="Principal">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <WaBtn className="btn btn--orange btn--sm nav__cta">Chamar no WhatsApp</WaBtn>
        <button className="icon-btn nav__burger" aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenu((m) => !m)}>
          {menu ? <X size={22} /> : <List size={22} />}
        </button>
      </div>
      <div id="mobile-menu" className="nav__sheet glass glass--dark" hidden={!menu}>
        <nav aria-label="Menu móvel">
          {NAV.map((n, k) => <a key={n.href} href={n.href} onClick={go(n.href)} style={{ '--d': `${k * 40}ms` } as CSSProperties}>{n.label}</a>)}
        </nav>
        <WaBtn>Chamar no WhatsApp</WaBtn>
      </div>
    </header>
  )
}

/* ---------------- HERO (preto) ---------------- */
export function Hero() {
  return (
    <section id="inicio" className="sec sec--dark hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <Reveal variant="fade" className="eyebrow eyebrow--orange">iPhones novos e seminovos · {BRAND.city}</Reveal>
          <SplitTitle id="hero-title" as="h1" className="display" lines={['Sua experiência', 'Apple começa', '{aqui.}']} />
          <Reveal as="p" className="lead" delay={260}>
            Aqui, cada venda é feita com transparência, qualidade e atendimento de verdade. Se você está procurando seu próximo iPhone, está no lugar certo.
          </Reveal>
          <Reveal className="hero__ctas" delay={360}>
            <WaBtn msg={MSG.iphone} className="btn btn--orange btn--lg">Quero meu próximo iPhone</WaBtn>
            <a className="btn btn--glass btn--lg" href={BRAND.instagram} {...ext}><InstagramLogo size={18} aria-hidden /> Ver no Instagram</a>
          </Reveal>
          <Reveal as="ul" className="hero__facts" delay={460}>
            <li><strong>21x</strong><span>parcelamos<br />nos cartões</span></li>
            <li><strong>JP/PB</strong><span>enviamos para<br />toda a região</span></li>
            <li><strong>Novos</strong><span>e seminovos<br />com garantia</span></li>
          </Reveal>
        </div>
        <div className="hero__art">
          <Reveal variant="photo" className="hero__main frame">
            <img src={asset('img/aparelhos/iphone-14-pro-max.webp')} alt="iPhone 14 Pro Max roxo-profundo ao lado da caixa" fetchPriority="high" width={716} height={894} />
          </Reveal>
          <Reveal variant="photo" delay={180} className="hero__second frame">
            <img src={asset('img/aparelhos/iphone-14-cores.webp')} alt="Quatro iPhone 14 em cores diferentes" width={784} height={980} />
          </Reveal>
          <Reveal delay={420} className="hero__chip glass glass--dark">
            <span className="dot" aria-hidden /> Brindes e garantia em cada compra
          </Reveal>
          <div className="hero__ring" aria-hidden />
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAIXA (laranja) ---------------- */
export function Strip() {
  const items = ['Parcelamos em até 21x', 'Enviamos para toda JP/PB', 'iPhones novos e seminovos', 'Transparência em cada venda', 'Brindes e garantia', 'Atendimento de verdade']
  const row = [...items, ...items]
  return (
    <section className="sec sec--orange strip" aria-label="Vantagens da Gêmeos do iPhone">
      <div className="marquee">
        <div className="marquee__track">
          {[0, 1].map((g) => (
            <ul className="marquee__group" key={g} aria-hidden={g === 1}>
              {row.map((t, k) => <li key={k}><Star size={16} weight="fill" aria-hidden />{t}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- APARELHOS (branco) ---------------- */
export function Aparelhos() {
  return (
    <section id="aparelhos" className="sec sec--light apa" aria-labelledby="apa-title">
      <div className="wrap head">
        <div>
          <Reveal className="eyebrow eyebrow--orange">Aparelhos</Reveal>
          <SplitTitle id="apa-title" className="h2" lines={['Escolha o seu.', 'A gente {cuida do resto.}']} />
        </div>
        <Reveal as="p" className="body" delay={120}>
          Seminovos selecionados e revisados, com brindes e garantia. O estoque gira rápido: chame no WhatsApp e confira a disponibilidade do modelo, da cor e da capacidade.
        </Reveal>
      </div>
      <ul className="wrap apa__grid">
        {APARELHOS.map((a, k) => (
          <Reveal as="li" key={a.src} delay={(k % 4) * 80} className="apa__card">
            <div className="frame">
              <img src={a.src} alt={a.alt} loading="lazy" width={800} height={1000} />
              <span className="apa__tag">{a.tag}</span>
            </div>
            <div className="apa__info">
              <h3>{a.model}</h3>
              <a className="apa__cta" href={whatsapp(MSG.modelo(a.model))} {...ext} aria-label={`Consultar ${a.model} no WhatsApp`}>
                Consultar <ArrowRight size={16} weight="bold" aria-hidden />
              </a>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- 21x + ENTREGA (preto) — arte recriada ---------------- */
export function Parcelamento() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <section id="parcelamento" className="sec sec--dark par" aria-labelledby="par-title">
      <div className="par__dots par__dots--l" aria-hidden />
      <div className="par__dots par__dots--r" aria-hidden />
      <div className="par__glow" aria-hidden />
      <div ref={ref} className={`wrap par__inner ${inView ? 'is-in' : ''}`}>
        <h2 id="par-title" className="sr-only">Dividimos em até 21 vezes. Consultar taxas.</h2>
        <div className="par__art" aria-hidden>
          <p className="par__word"><Letters text="Dividimos" delay={100} step={55} /></p>
          <div className="par__row">
            <p className="par__ate"><span>em</span><span>até</span></p>
            <p className="par__num"><span className="par__digits">{inView ? <CountUp to={21} run={inView} duration={1300} /> : '0'}</span><span className="par__x">x</span></p>
          </div>
          <p className="par__note"><Letters text="* consultar taxas" delay={1100} step={30} /></p>
        </div>

        <div className="par__card">
          <div className="par__card-head">
            <Package size={54} weight="light" className="par__ico par__ico--box" aria-hidden />
            <h3>Entregamos</h3>
            <span className="par__pill">a domicílio</span>
          </div>
          <span className="par__rule" aria-hidden />
          <div className="par__cols">
            <div className="par__col">
              <House size={58} weight="bold" className="par__ico" aria-hidden />
              <p>Entrega <strong>segura</strong> no conforto do seu lar</p>
            </div>
            <span className="par__vr" aria-hidden />
            <div className="par__col">
              <Moped size={58} weight="fill" className="par__ico" aria-hidden />
              <p>Entregamos <strong>gratuitamente</strong> em toda <em>João Pessoa e Região</em></p>
            </div>
          </div>
        </div>

        <div className="par__ctas">
          <WaBtn msg={MSG.parcelamento} className="btn btn--orange btn--lg">Simular meu parcelamento</WaBtn>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CLIENTES SATISFEITOS (branco) ---------------- */
export function Clientes() {
  return (
    <section id="clientes" className="sec sec--light cli" aria-labelledby="cli-title">
      <div className="wrap cli__grid">
        <Reveal variant="photo" className="frame cli__big"><img src={CLIENTE_DESTAQUE.src} alt={CLIENTE_DESTAQUE.alt} loading="lazy" width={824} height={1030} /></Reveal>
        <div className="cli__copy">
          <Reveal className="eyebrow eyebrow--orange">Clientes satisfeitos</Reveal>
          <SplitTitle id="cli-title" className="h2" lines={['Cada cliente', 'que sai sorrindo', 'é {nossa vitrine.}']} />
          <Reveal as="p" className="body" delay={140}>
            São pessoas reais de João Pessoa e de toda a Paraíba que confiaram na gente para escolher o próximo iPhone. Atendimento próximo, aparelho conferido na hora e aquela sacola na mão no fim.
          </Reveal>
          <Reveal as="ul" className="cli__stats" delay={220}>
            <li><span className="cli__stars" aria-hidden>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={18} weight="fill" />)}</span><strong>Obrigado pela preferência!</strong></li>
            <li><SealCheck size={22} weight="fill" aria-hidden /><span>Registros reais publicados no nosso Instagram</span></li>
          </Reveal>
          <Reveal delay={300}>
            <a className="btn btn--dark" href={BRAND.instagram} {...ext}><InstagramLogo size={18} aria-hidden /> Ver mais no {BRAND.instagramHandle}</a>
          </Reveal>
        </div>
      </div>
      <Reveal variant="fade" className="wrap cli__rail">
        <RailCarousel items={CLIENTES.map((c) => ({ kind: 'image' as const, ...c }))} label="Fotos de clientes satisfeitos" />
      </Reveal>
    </section>
  )
}

/* ---------------- OS GÊMEOS (preto) ---------------- */
export function Gemeos() {
  const valores = [
    { I: Handshake, t: 'Transparência', d: 'Você sabe exatamente o que está levando.' },
    { I: ShieldCheck, t: 'Qualidade', d: 'Aparelhos conferidos, com garantia.' },
    { I: CreditCard, t: 'Facilidade', d: 'Até 21x nos cartões.' },
    { I: Truck, t: 'Entrega', d: 'Enviamos para toda JP/PB.' },
  ]
  return (
    <section id="os-gemeos" className="sec sec--dark gem" aria-labelledby="gem-title">
      <div className="gem__glow" aria-hidden />
      <div className="wrap gem__grid">
        <Reveal variant="photo" className="frame gem__feature">
          <img src={asset('img/gemeos/destaque.webp')} alt="Os gêmeos Isaac e Davi apontando para o logo da Gêmeos do iPhone, com caixas de iPhone sobre o balcão" loading="lazy" width={1080} height={1350} />
        </Reveal>
        <div className="gem__copy">
          <Reveal className="eyebrow eyebrow--orange">Os Gêmeos</Reveal>
          <SplitTitle id="gem-title" className="h2" lines={['Dois irmãos,', 'um só jeito de', '{atender bem.}']} />
          <Reveal as="p" className="body" delay={140}>
            A Gêmeos do iPhone nasceu da paixão de Isaac e Davi pelo universo Apple e virou referência em João Pessoa por um motivo simples: aqui você compra com confiança. Atendimento de perto, conversa honesta e o cuidado de acompanhar cada cliente até o iPhone chegar nas mãos.
          </Reveal>
          <ul className="gem__values">
            {valores.map(({ I, t, d }, k) => (
              <Reveal as="li" key={t} delay={180 + k * 70}>
                <span className="gem__vicon" aria-hidden><I size={22} weight="duotone" /></span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <ul className="wrap gem__ceos" aria-label="Sócios da Gêmeos do iPhone">
        {CEOS.map((c, k) => (
          <Reveal as="li" key={c.handle} delay={k * 120} className="ceo">
            <div className="frame"><img src={c.src} alt={c.alt} loading="lazy" width={1080} height={1350} /></div>
            <div className="ceo__info">
              <div><strong>{c.name}</strong><span>Sócio · Gêmeos do iPhone</span></div>
              <a className="ceo__handle" href={c.url} {...ext}><InstagramLogo size={18} aria-hidden /> {c.handle}</a>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- GÊMEOS COM OS CLIENTES (laranja) ---------------- */
export function ComClientes() {
  return (
    <section className="sec sec--orange com" aria-labelledby="com-title">
      <div className="wrap head head--center">
        <Reveal className="eyebrow">Entrega em mãos</Reveal>
        <SplitTitle id="com-title" className="h2" lines={['Quem entrega', 'é quem vende.']} />
        <Reveal as="p" className="body" delay={120}>Os gêmeos fazem questão de estar presentes na entrega. É assim que a gente garante que tudo saiu do jeito certo.</Reveal>
      </div>
      <ul className="wrap com__grid">
        {GEMEOS_CLIENTES.map((g, k) => (
          <Reveal as="li" key={g.src} variant="photo" delay={(k % 3) * 90} className="frame frame--wide">
            <img src={g.src} alt={g.alt} loading="lazy" width={1288} height={1030} />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- VITRINE (branco) ---------------- */
export function Vitrine() {
  return (
    <section className="sec sec--light vit" aria-labelledby="vit-title">
      <div className="wrap head">
        <SplitTitle id="vit-title" className="h2" lines={['Tecnologia que', 'dá {vontade de levar.}']} />
        <Reveal as="p" className="body" delay={120}>Detalhes, cores e acabamentos da linha iPhone. Passe pelas setas ou deslize.</Reveal>
      </div>
      <Reveal variant="fade" className="wrap--wide"><FocusCarousel slides={VITRINE} label="Vitrine iPhone" /></Reveal>
    </section>
  )
}

/* ---------------- SEU PRÓXIMO IPHONE (laranja) — mão entra da direita ---------------- */
export function Proximo() {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <section ref={ref} className={`sec sec--orange prox ${inView ? 'is-in' : ''}`} aria-labelledby="prox-title">
      <div className="wrap prox__inner">
        <div className="prox__copy">
          <Reveal className="eyebrow">{BRAND.city}</Reveal>
          <SplitTitle id="prox-title" className="display prox__title" lines={['Seu próximo', 'iPhone te', 'espera aqui!']} />
          <Reveal as="p" className="lead" delay={160}>Novo ou seminovo, do modelo que você sonha. Parcelado em até 21x e entregue em toda João Pessoa e região.</Reveal>
          <Reveal className="prox__ctas" delay={260}>
            <WaBtn msg={MSG.iphone} className="btn btn--black btn--lg">Falar com os Gêmeos</WaBtn>
            <a className="btn btn--line btn--lg" href={BRAND.instagram} {...ext}><InstagramLogo size={18} aria-hidden /> {BRAND.instagramHandle}</a>
          </Reveal>
        </div>
      </div>
      <img className="prox__hand" src={asset('img/mao-iphone.webp')} alt="Mão segurando um iPhone laranja" loading="lazy" width={1561} height={1096} />
    </section>
  )
}

/* ---------------- FOOTER (preto) ---------------- */
export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__top">
        <div className="foot__brand">
          <img src={asset('img/logo.png')} alt="Gêmeos do iPhone" width={531} height={156} loading="lazy" />
          <p>iPhones novos e seminovos com transparência, qualidade e atendimento de verdade. Parcelamos em até 21x e enviamos para toda JP/PB.</p>
        </div>
        <nav className="foot__nav" aria-label="Rodapé">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
      </div>
      <div className="wrap foot__cols">
        <div className="foot__col">
          <h3>Atendimento</h3>
          <a href={whatsapp()} {...ext}><WhatsappLogo size={16} aria-hidden /> {BRAND.whatsappLabel}</a>
          <a href={BRAND.instagram} {...ext}><InstagramLogo size={16} aria-hidden /> {BRAND.instagramHandle}</a>
        </div>
        <div className="foot__col">
          <h3>Os Gêmeos</h3>
          {CEOS.map((c) => <a key={c.handle} href={c.url} {...ext}><InstagramLogo size={16} aria-hidden /> {c.name} · {c.handle}</a>)}
        </div>
        <div className="foot__col">
          <h3>Onde atendemos</h3>
          <p><MapPin size={16} weight="fill" aria-hidden /> João Pessoa e toda a Paraíba</p>
          <p><Truck size={16} aria-hidden /> Entrega a domicílio</p>
        </div>
      </div>
      <div className="wrap foot__bottom">
        <p>Pagamento: PIX · Cartões em até 21x</p>
        <p>© {new Date().getFullYear()} Gêmeos do iPhone. Todos os direitos reservados. · <button className="link" onClick={openCookiePolicy}>Política de cookies</button></p>
      </div>
    </footer>
  )
}

/* ---------------- BOTÃO FLUTUANTE ---------------- */
export function FloatWhats() {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700
      let ok = window.scrollY > 700 && !nearEnd
      const el = ref.current
      if (ok && el) {
        const r = el.getBoundingClientRect()
        const pts: [number, number][] = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + 4, r.bottom - 4], [r.right - 4, r.bottom - 4]]
        for (const [x, y] of pts) {
          const under = document.elementsFromPoint(x, y).find((n) => !el.contains(n))
          if (under?.closest('a, button, .frame, .rail__item, .par__card, figure')) { ok = false; break }
        }
      }
      setShow(ok)
    }
    const f = () => { if (!raf) raf = requestAnimationFrame(check) }
    check(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); cancelAnimationFrame(raf) }
  }, [])
  return (
    <a ref={ref} className={`float ${show ? 'is-in' : ''}`} href={whatsapp()} {...ext} aria-label="Falar com a Gêmeos do iPhone pelo WhatsApp" tabIndex={show ? 0 : -1}>
      <WhatsappLogo size={28} weight="fill" aria-hidden />
    </a>
  )
}
