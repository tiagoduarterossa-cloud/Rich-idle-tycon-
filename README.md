# Rich Idle Tycoon

Jogo de simulação de vida e magnata dos negócios, inspirado no visual de apps de "idle tycoon" e na mecânica de progressão anual do estilo BitLife.

## Conceito

- **Ganhos** — clica para ganhar dinheiro e melhora o valor por clique.
- **Atividade** — compra e melhora negócios (bancos, tecnologia, aviação, etc.) que geram rendimento por hora, ou faz fusões entre empresas.
- **Investimento** — compra e vende ações, imóveis e criptomoedas com preços que flutuam.
- **Artigos** — coleciona carros, aviões, iates, arte e melhora a tua residência.
- **Perfil** — acompanha a tua fortuna total, distribuída por categoria, e a tua vida: idade, saúde, felicidade, inteligência e reputação.
- **Avançar Ano** — o coração do jogo: cada ano dispara eventos de vida dramáticos e imprevisíveis (crashes na bolsa, escândalos, casamentos, auditorias fiscais, cirurgias, heranças...) com escolhas reais que têm consequências. A saúde e a idade avançada trazem risco de morte — e no fim de cada vida começa uma nova geração, com um bónus de herança baseado na fortuna deixada.

## Stack

- React + TypeScript + Vite
- Zustand (estado global do jogo, com persistência em `localStorage`)

## Desenvolvimento

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção (verifica tipos + gera dist/)
```
