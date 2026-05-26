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
