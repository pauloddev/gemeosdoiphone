import { CookieConsent } from './components/Cookies'
import { Intro } from './components/Intro'
import {
  Header, Hero, Strip, Aparelhos, Parcelamento, Clientes, Gemeos, ComClientes, Vitrine, Proximo, Footer, FloatWhats,
} from './components/Sections'

export default function App() {
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Strip />
        <Aparelhos />
        <Parcelamento />
        <Clientes />
        <Gemeos />
        <ComClientes />
        <Vitrine />
        <Proximo />
      </main>
      <Footer />
      <FloatWhats />
      <CookieConsent />
      <Intro />
    </>
  )
}
