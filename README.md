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

O script global usa o publicador `ca-pub-6239237268971394` e é carregado uma única vez no `<head>`. O componente `AdSenseAd` mantém um bloco responsivo após o conteúdo nas telas inicial, avançada e de resultados, sem remontar o anúncio durante as trocas de etapa ou sorteios.

O bloco responsivo `ad_01`, com `data-ad-slot="2219850050"`, já está configurado como padrão nos espaços existentes, sem exigir variáveis de ambiente.

Para usar outro bloco, configure `VITE_ADSENSE_SLOT` no `.env.local` ou no ambiente de build da hospedagem. Execute `npm run build` e publique a pasta `dist`. Alterações nessa variável exigem um novo build.

Uma variável `VITE_ADSENSE_SLOT` ausente ou vazia usa o bloco `ad_01`. O anúncio usa `data-ad-format="auto"` e `data-full-width-responsive="true"`, sem altura fixa no `<ins>`. O contêiner oferece largura de 100% até 970 px, altura livre e separação dos controles. As barras de ações ficam no fluxo da página para não cobrir a publicidade. A solicitação aguarda uma largura positiva e ocorre uma única vez por montagem, inclusive em React StrictMode.

O arquivo `public/ads.txt` é publicado em `/ads.txt` e autoriza o publicador informado.

### Verificação após publicar

- Em **AdSense → Sites**, confirme o status **Pronto** para o domínio publicado. A integração não substitui a aprovação do Google.
- Acesse `/ads.txt` no domínio e confirme uma resposta HTTP 200 com o publicador acima.
- Nas ferramentas de desenvolvimento do navegador, confira o carregamento de `adsbygoogle.js` e o elemento `ins.adsbygoogle` com `data-ad-slot="2219850050"`. `data-adsbygoogle-status="done"` indica processamento; `data-ad-status="filled"` ou `"unfilled"` informa se houve preenchimento. Um espaço vazio não comprova falha de código.
- Verifique celular e desktop sem clicar nos próprios anúncios. Bloqueadores, aprovação pendente e ausência de inventário podem impedir a exibição. Anúncios automáticos são opcionais e não são necessários para este bloco manual.

Referências oficiais:
- [Parâmetros responsivos](https://support.google.com/adsense/answer/9183460?hl=pt-BR)
- [Posicionamento de anúncios](https://support.google.com/adsense/answer/1346295?hl=pt-BR)
- [Status dos sites](https://support.google.com/adsense/answer/12170222?hl=pt-BR)
- [Acesso ao ads.txt](https://support.google.com/adsense/answer/7679060?hl=pt-BR)
