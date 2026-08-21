# UltraMunck — Site Institucional

## Estrutura do Projeto

```
app/
  layout.tsx          → SEO, fonts, structured data
  page.tsx            → Composição de todas as seções
  globals.css         → Design system industrial
  sitemap.ts          → Sitemap automático
  robots.ts           → Robots.txt automático

components/
  Header.tsx          → Cabeçalho com glass effect + menu mobile fullscreen
  Hero.tsx            → Hero cinematográfico com video scrub
  Impact.tsx          → Pilares: Força, Precisão, Segurança, Velocidade
  Services.tsx        → 4 serviços com CTAs para WhatsApp
  Fleet.tsx           → Apresentação de equipamentos com tilt 3D
  Differentials.tsx   → 4 diferenciais
  WhyUltraMunck.tsx   → Seção editorial "Por que UltraMunck"
  Testimonials.tsx    → Carrossel de depoimentos + marquee
  InstagramSection.tsx→ Posts reais do Instagram (via edge function)
  Contact.tsx         → CTA WhatsApp + mapa + dados de contato
  Footer.tsx          → Rodapé com navegação e contato
  FloatingWhatsApp.tsx→ Botão flutuante com pulse
  CustomCursor.tsx    → Cursor customizado (desktop)
  LoadingScreen.tsx   → Tela de carregamento com progresso

  animations/
    Reveal.tsx           → Reveal + Stagger com Framer Motion
    MagneticButton.tsx   → Botão magnético
    Parallax.tsx         → Parallax scroll
    VideoScroll.tsx      → Video scrub com GSAP ScrollTrigger
    SmoothScroll.tsx     → Hook Lenis smooth scroll
    SmoothScrollProvider → Provider + registro GSAP

  shared/
    SectionHeading.tsx   → Cabeçalho de seção reutilizável

data/
  company.ts         → Dados da empresa, links WhatsApp, navegação
  services.ts        → Lista de serviços (Munck, Micro Escavadeiras, Transporte, Operações)
  fleet.ts           → Dados da frota com fotos reais
  testimonials.ts    → Depoimentos reais fornecidos
  differentials.ts   → Diferenciais

lib/
  utils.ts           → cn() helper
  analytics.ts       → Arquitetura de eventos (preparado p/ GTM/GA/Pixel)

supabase/
  functions/
    instagram-posts/  → Edge function que busca posts do Instagram Graph API
```

## Serviços oferecidos

- Locação de Munck
- Micro Escavadeiras
- Transporte de Cargas
- Operações Industriais

## Fotos da frota (já incluídas)

- `public/images/muncks/` — fotos dos caminhões munck
- `public/images/mini-escavadeiras/` — foto da micro escavadeira

As fotos já estão referenciadas em `data/fleet.ts`.

## Onde colocar os assets restantes

### Vídeo do Hero
Coloque o arquivo em: `public/videos/hero.mp4`
- Formato MP4 (H.264) para máxima compatibilidade
- Sem áudio (o site funciona sem som)
- Duração: 10-30s ideal para scrub

### Poster do Hero
Coloque em: `public/images/hero-poster.jpg`
- Tamanho: 1920x1080 ou maior

### Open Graph (compartilhamento social)
Coloque em: `public/images/og-image.jpg` (1200x630)

## Onde alterar dados

| Dado              | Arquivo           |
|-------------------|-------------------|
| Empresa, WhatsApp, endereço | `data/company.ts` |
| Serviços          | `data/services.ts` |
| Equipamentos/Frota | `data/fleet.ts`   |
| Depoimentos       | `data/testimonials.ts` |
| Diferenciais      | `data/differentials.ts` |
| SEO/Metadata      | `app/layout.tsx`  |

## Instagram — exibir posts reais

A seção de Instagram busca automaticamente os posts mais recentes da @ultramunck
através de uma edge function no Supabase.

Para ativar:

1. Obtenha um token de acesso de longa duração e o ID da conta no
   [Instagram Graph API](https://developers.facebook.com/docs/instagram-api).
2. Configure os secrets no Supabase:
   - `INSTAGRAM_ACCESS_TOKEN`
   - `INSTAGRAM_USER_ID`
3. A edge function `instagram-posts` já está deployada e retornará os posts automaticamente.

Enquanto os secrets não estiverem configurados, a seção mostra um grid de placeholders.

## Configurar Analytics (futuro)

1. `lib/analytics.ts` — funções `track()` já prontas
2. Adicione IDs em variáveis de ambiente quando disponível
3. Descomente as linhas `window.gtag` / `window.fbq` no arquivo

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
```

## Especificações da frota

Os valores de capacidade, alcance e altura estão como "A definir" em `data/fleet.ts`.
Substitua pelos valores reais quando disponíveis.
