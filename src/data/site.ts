// Conteúdo central da Gêmeos do iPhone.
// Para atualizar contatos, nomes, fotos ou modelos, edite somente este arquivo.

const B = import.meta.env.BASE_URL
export const asset = (p: string) => `${B}${p}`

export const BRAND = {
  name: 'Gêmeos do iPhone',
  city: 'João Pessoa · PB',
  whatsapp: '5583981289228',
  whatsappLabel: '(83) 98128-9228',
  instagram: 'https://www.instagram.com/gemeosdoiphonepb/',
  instagramHandle: '@gemeosdoiphonepb',
}

export const whatsapp = (text = MSG.geral) =>
  `https://api.whatsapp.com/send/?phone=${BRAND.whatsapp}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`

export const MSG = {
  geral: 'Olá! Vim pelo site e gostaria de falar com a Gêmeos do iPhone.',
  iphone: 'Olá! Estou procurando meu próximo iPhone. Quais modelos vocês têm disponíveis?',
  modelo: (m: string) => `Olá! Vi o ${m} no site da Gêmeos do iPhone e gostaria de consultar disponibilidade e condições.`,
  parcelamento: 'Olá! Gostaria de simular o parcelamento em até 21x de um iPhone.',
  entrega: 'Olá! Gostaria de saber sobre a entrega do iPhone no meu endereço.',
}

// CEOs — ordem: foto 1, foto 2
export const CEOS = [
  { name: 'Isaac', handle: '@isaacdoiphone_', url: 'https://www.instagram.com/isaacdoiphone_/', src: asset('img/gemeos/ceo-1.webp'), alt: 'Isaac, sócio da Gêmeos do iPhone, sorrindo com as mãos entrelaçadas ao lado de um MacBook' },
  { name: 'Davi', handle: '@davidoiphone_', url: 'https://www.instagram.com/davidoiphone_/', src: asset('img/gemeos/ceo-2.webp'), alt: 'Davi, sócio da Gêmeos do iPhone, sorrindo atrás de um MacBook' },
]

export const APARELHOS = [
  { model: 'iPhone 13 Pro Max', tag: 'Seminovo', src: asset('img/aparelhos/iphone-13-pro-max.webp'), alt: 'iPhone 13 Pro Max prateado na mão' },
  { model: 'iPhone 14 Pro Max', tag: 'Seminovo', src: asset('img/aparelhos/iphone-14-pro-max.webp'), alt: 'iPhone 14 Pro Max roxo-profundo ao lado da caixa' },
  { model: 'iPhone 15', tag: 'Seminovo', src: asset('img/aparelhos/iphone-15-azul.webp'), alt: 'iPhone 15 azul na mão' },
  { model: 'iPhone 14', tag: 'Seminovo', src: asset('img/aparelhos/iphone-14-azul.webp'), alt: 'iPhone 14 azul na mão' },
  { model: 'iPhone 14 · várias cores', tag: 'Seminovo', src: asset('img/aparelhos/iphone-14-cores.webp'), alt: 'Quatro iPhone 14 em leque: meia-noite, estelar, meia-noite e roxo' },
  { model: 'iPhone 13', tag: 'Seminovo', src: asset('img/aparelhos/iphone-13-branco.webp'), alt: 'iPhone 13 estelar na caixa' },
  { model: 'iPhone 13 rosa', tag: 'Seminovo', src: asset('img/aparelhos/iphone-13-rosa.webp'), alt: 'iPhone 13 rosa na mão' },
  { model: 'iPhone XR', tag: 'Seminovo', src: asset('img/aparelhos/iphone-xr.webp'), alt: 'iPhone XR branco na mão' },
]

export const CLIENTE_DESTAQUE = { src: asset('img/clientes/destaque.webp'), alt: 'Cliente sorrindo com o iPhone novo e a sacola branca da Gêmeos do iPhone' }
const cli = (n: string, alt: string) => ({ src: asset(`img/clientes/${n}.webp`), alt })
export const CLIENTES = [
  cli('c01', 'Cliente com sacola branca da Gêmeos do iPhone e iPhone na mão'),
  cli('c16', 'Cliente fazendo joinha com iPhone Pro novo e sacola preta'),
  cli('c03', 'Cliente segurando o iPhone novo'),
  cli('c04', 'Cliente com iPhone 14 Pro e a caixa'),
  cli('c05', 'Cliente com o iPhone 16 e a caixa'),
  cli('c06', 'Cliente com iPhone Pro e a caixa em um shopping'),
  cli('c07', 'Cliente com sacola da Gêmeos do iPhone e a caixa do iPhone'),
  cli('c08', 'Cliente sorrindo com iPhone azul e sacola'),
  cli('c15', 'Cliente com iPhone e sacola preta da loja'),
  cli('c09', 'Cliente com dois iPhones e sacola'),
  cli('c10', 'Cliente com a caixa do iPhone 13 rosa'),
  cli('c11', 'Cliente com iPhone lilás e sacola da Gêmeos do iPhone'),
  cli('c12', 'Cliente com iPhone novo, caixa e sacola'),
  cli('c13', 'Cliente com a caixa do iPhone 16 verde'),
  cli('c14', 'Cliente com a caixa do iPhone 16 e a sacola'),
]

const gm = (n: string, alt: string) => ({ src: asset(`img/gemeos/${n}.webp`), alt })
export const GEMEOS_CLIENTES = [
  gm('g01', 'Os gêmeos apontando para a cliente com o iPhone novo'),
  gm('g06', 'Os gêmeos com cliente segurando iPhone 14 Pro roxo em um shopping'),
  gm('g02', 'Os gêmeos com cliente segurando iPhone laranja na loja'),
  gm('g03', 'Os gêmeos com cliente segurando o iPhone novo'),
  gm('g04', 'Os gêmeos com cliente segurando a caixa do iPhone'),
  gm('g05', 'Os gêmeos com cliente segurando a caixa do MacBook'),
]

export type Slide = { kind: 'video' | 'image'; src: string; poster?: string; alt: string }
const v = (n: string, alt: string): Slide => ({ kind: 'video', src: asset(`vitrine/${n}.mp4`), poster: asset(`vitrine/${n}.jpg`), alt })
export const VITRINE: Slide[] = [
  v('iphone-camera-azul', 'Detalhe do módulo de câmeras de um iPhone azul'),
  v('chip-a20', 'Chip Apple iluminado'),
  v('dobravel-tela', 'iPhone na mão mostrando a tela inicial'),
  v('iphone-lateral-bordo', 'Lateral de um iPhone bordô em movimento'),
  v('iphone-941-lateral', 'iPhone na horizontal com a tela de bloqueio'),
  v('dobravel-941', 'iPhone aberto com a tela de bloqueio'),
]
