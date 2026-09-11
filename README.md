# Equipe Perfeita

Aplicação web para dividir jogadores em dois times de forma rápida, prática e visual. O app foi pensado para partidas de futebol, society, futsal ou qualquer jogo em que seja preciso montar equipes equilibradas sem discussão antes da partida.

## O que o app faz

- Recebe uma lista de jogadores, um por linha.
- Sorteia dois times automaticamente no modo rápido.
- Permite configurar goleiros, posições e nível técnico no modo avançado.
- Tenta equilibrar os times por quantidade de jogadores, habilidade e posição.
- Mantém goleiros em times opostos quando possível.
- Gera uma escalação pronta para copiar e enviar.
- Exibe espaços opcionais para anúncios locais ou vindos do Supabase.

## Modos de uso

### Sorteio Rápido

Ideal para começar sem configurar nada. Basta colar os nomes dos jogadores e o app divide a lista em dois times aleatórios.

Dica: se o nome tiver a palavra `goleiro`, o app já identifica esse jogador como goleiro automaticamente.

### Escalação Elite

Modo avançado para partidas em que o equilíbrio importa mais. Nele você pode ajustar:

- Goleiro
- Posição: `GOL`, `DEF`, `LAT`, `MC`, `ATA`
- Habilidade de 1 a 5 estrelas

Depois disso, o app monta os times buscando equilibrar força total e distribuição por posição.

## Tecnologias

- React
- TypeScript
- Vite
- Supabase
- lucide-react
- uuid

## Como rodar localmente

### Pré-requisitos

- Node.js instalado
- npm instalado

### Instalação

```bash
npm install

```

## Google AdSense

O script global usa o publicador `ca-pub-6239237268971394`. Os espaços de publicidade nas telas inicial e avançada usam o componente `AdSenseAd`, com blocos responsivos.

O bloco responsivo `ad_01`, com `data-ad-slot="2219850050"`, já está configurado como padrão nos espaços existentes, sem exigir variáveis de ambiente.

Para usar outro bloco, configure `VITE_ADSENSE_SLOT` no `.env.local` ou no ambiente de build da hospedagem. Execute `npm run build` e publique a pasta `dist`. Alterações nessa variável exigem um novo build.

Definir explicitamente `VITE_ADSENSE_SLOT` como vazio oculta os espaços manuais e desativa suas solicitações. O script global continua disponível para anúncios automáticos, caso estejam ativados no painel do AdSense; seus posicionamentos são definidos pelo Google. A exibição depende da aprovação do site e da disponibilidade de anúncios.

O arquivo `public/ads.txt` é publicado em `/ads.txt` e autoriza o publicador informado.

Referência: https://support.google.com/adsense/answer/9274019?hl=pt-BR
