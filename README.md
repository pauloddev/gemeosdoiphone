# Gêmeos do iPhone — landing page

Landing page da Gêmeos do iPhone (iPhones novos e seminovos, João Pessoa · PB).
React + TypeScript + Vite, sem backend.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/ (é ela que vai para o Vercel)
```

No Vercel: framework **Vite**, build `npm run build`, saída `dist`.

## Onde editar

- **WhatsApp, Instagram, nomes e @ dos gêmeos, modelos de iPhone:** `src/data/site.ts`.
- **Mensagens pré-preenchidas do WhatsApp:** `src/data/site.ts` (`MSG`).
- **Fotos:** `public/img/` (`aparelhos`, `clientes`, `gemeos`). Fotos individuais em 4:5;
  fotos em grupo (gêmeos com clientes) em 5:4. Todas recortadas sem os textos das artes.
- **Textos das seções:** `src/components/Sections.tsx`.
- **Cores, tipografia e animações:** variáveis no topo de `src/index.css`.
- **Seção 21x:** a arte é recriada em HTML/CSS (não é imagem), com letras animadas e contador.

## Capa do link (WhatsApp, Instagram, Facebook)

A capa é `public/og.jpg` (1200×630, logo sobre fundo preto). O endereço completo da imagem é
preenchido no build: no Vercel ele usa o domínio de produção automaticamente. Ao conectar um
domínio próprio, crie a variável `SITE_URL` no Vercel (ex.: `https://www.gemeosdoiphone.com.br`)
e faça um novo deploy. Se trocar a imagem, mude o `?v=1` em `index.html`.
