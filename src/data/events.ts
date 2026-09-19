import type { GameEvent, GameStateData } from '../types';
import { formatMoney } from '../utils/format';

const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

export const LIFE_EVENTS: GameEvent[] = [
  // ---------- BEBÉ / PRIMEIRA INFÂNCIA ----------
  {
    id: 'primeiros-passos',
    icon: '👣',
    title: 'Primeiros Passos',
    text: () => 'Depois de muitas tentativas, dás os teus primeiros passos sozinho. Os teus pais celebram cada segundo.',
    minAge: 1,
    maxAge: 1,
    once: true,
    weight: 10,
    choices: [
      {
        id: 'explorar',
        label: 'Explorar tudo à tua volta',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 6), smarts: clamp(s.smarts + 3) },
          resultText: 'Passas os dias a explorar cada canto de casa. Curioso desde cedo.',
        }),
      },
      {
        id: 'colo',
        label: 'Preferir ficar ao colo',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 8), health: clamp(s.health + 3) },
          resultText: 'Preferes o conforto do colo dos teus pais. Uma infância tranquila.',
        }),
      },
    ],
  },
  {
    id: 'primeiras-palavras',
    icon: '🗣️',
    title: 'Primeiras Palavras',
    text: () => 'Começas a dizer as tuas primeiras palavras. Toda a família está em euforia.',
    minAge: 2,
    maxAge: 3,
    once: true,
    weight: 9,
    choices: [
      {
        id: 'falar-muito',
        label: 'Falar sem parar',
        apply: (s) => ({
          state: { smarts: clamp(s.smarts + 6), happiness: clamp(s.happiness + 4) },
          resultText: 'Tornas-te uma criança extremamente comunicativa.',
        }),
      },
      {
        id: 'observar-silencioso',
        label: 'Observar caladinho',
        apply: (s) => ({
          state: { smarts: clamp(s.smarts + 4) },
          resultText: 'Preferes observar tudo em silêncio antes de agir. Uma mente atenta.',
        }),
      },
    ],
  },
  {
    id: 'infancia-brincadeiras',
    icon: '🧸',
    title: 'Tempo de Brincar',
    text: () => 'És uma criança cheia de energia. Como preferes passar as tardes?',
    minAge: 3,
    maxAge: 4,
    weight: 8,
    choices: [
      {
        id: 'brincar-fora',
        label: 'Brincar ao ar livre com outras crianças',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 8), health: clamp(s.health + 4) },
          resultText: 'Fazes os teus primeiros amigos no parque. A infância feliz que todos merecem.',
        }),
      },
      {
        id: 'brincar-livros',
        label: 'Ficar em casa com livros e puzzles',
        apply: (s) => ({
          state: { smarts: clamp(s.smarts + 8), happiness: clamp(s.happiness + 2) },
          resultText: 'Mostras um interesse invulgar por livros e quebra-cabeças desde pequeno.',
        }),
      },
    ],
  },

  // ---------- INFÂNCIA ----------
  {
    id: 'primeiro-dia-escola',
    icon: '🎒',
    title: 'Primeiro Dia de Escola',
    text: () => 'É o teu primeiro dia de escola. Estás nervoso mas curioso com o mundo lá fora.',
    minAge: 5,
    maxAge: 7,
    once: true,
    weight: 10,
    choices: [
      {
        id: 'estudar',
        label: 'Concentrar-te nos estudos',
        apply: (s) => ({
          state: { smarts: clamp(s.smarts + 8), happiness: clamp(s.happiness - 2) },
          resultText: 'Tornas-te o melhor aluno da turma. Os professores adoram-te.',
        }),
      },
      {
        id: 'amigos',
        label: 'Fazer amigos',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 8), reputation: clamp(s.reputation + 4) },
          resultText: 'Fazes um grupo de amigos inseparável logo no primeiro dia.',
        }),
      },
    ],
  },
  {
    id: 'dinheiro-na-rua',
    icon: '🪙',
    title: 'Moedas Perdidas',
    text: () => 'Encontras umas moedas caídas no chão do recreio. Ninguém está a olhar.',
    minAge: 6,
    maxAge: 11,
    weight: 6,
    choices: [
      {
        id: 'guardar',
        label: 'Guardar o dinheiro',
        apply: (s) => ({
          state: { cash: s.cash + 15, happiness: clamp(s.happiness + 1) },
          resultText: 'Guardas as moedas no mealheiro. O início da tua fortuna.',
        }),
      },
      {
        id: 'entregar',
        label: 'Entregar à professora',
        apply: (s) => ({
          state: { reputation: clamp(s.reputation + 6), happiness: clamp(s.happiness + 2) },
          resultText: 'A professora elogia-te à frente de toda a turma.',
        }),
      },
    ],
  },
  {
    id: 'visita-negocio-familia',
    icon: '🏢',
    title: 'Visita ao Escritório do Pai',
    text: () => 'O teu pai leva-te ao escritório dele pela primeira vez. Vês pessoas de fato a assinar contratos milionários.',
    minAge: 8,
    maxAge: 12,
    once: true,
    weight: 8,
    choices: [
      {
        id: 'observar',
        label: 'Observar tudo com atenção',
        apply: (s) => ({
          state: { smarts: clamp(s.smarts + 10) },
          resultText: 'Algo desperta em ti. Um dia, este escritório vai ser teu.',
        }),
      },
      {
        id: 'brincar',
        label: 'Ir brincar lá fora',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 6) },
          resultText: 'Preferes aproveitar a tarde livre a brincar no jardim.',
        }),
      },
    ],
  },

  // ---------- ADOLESCÊNCIA ----------
  {
    id: 'primeiro-emprego',
    icon: '🧾',
    title: 'Primeiro Emprego de Verão',
    text: () => 'Um café perto de casa precisa de ajuda no verão. Podes candidatar-te.',
    minAge: 14,
    maxAge: 17,
    once: true,
    weight: 9,
    choices: [
      {
        id: 'trabalhar',
        label: 'Aceitar o trabalho',
        apply: (s) => ({
          state: { cash: s.cash + 600, smarts: clamp(s.smarts + 3), happiness: clamp(s.happiness - 3) },
          resultText: 'Trabalhas todo o verão e sentes o gosto do primeiro salário.',
        }),
      },
      {
        id: 'ferias',
        label: 'Aproveitar as férias',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 8) },
          resultText: 'Passas o verão a relaxar com os amigos, sem uma preocupação.',
        }),
      },
    ],
  },
  {
    id: 'festa-arriscada',
    icon: '🎉',
    title: 'A Festa do Ano',
    text: () => 'Convidam-te para a maior festa da escola, mas sabes que vai haver problemas.',
    minAge: 14,
    maxAge: 18,
    weight: 6,
    choices: [
      {
        id: 'ir',
        label: 'Ir à festa',
        apply: (s) => {
          const problema = Math.random() < 0.35;
          if (problema) {
            return {
              state: { health: clamp(s.health - 10), reputation: clamp(s.reputation - 8) },
              resultText: 'A festa sai de controlo e acordas com uma ressaca terrível e fama duvidosa.',
            };
          }
          return {
            state: { happiness: clamp(s.happiness + 10), reputation: clamp(s.reputation + 5) },
            resultText: 'A festa corre lindamente. Tornas-te ainda mais popular.',
          };
        },
      },
      {
        id: 'ficar',
        label: 'Ficar em casa a estudar',
        apply: (s) => ({
          state: { smarts: clamp(s.smarts + 6), happiness: clamp(s.happiness - 4) },
          resultText: 'Ficas em casa a estudar. Chato, mas produtivo.',
        }),
      },
    ],
  },
  {
    id: 'espirito-empreendedor',
    icon: '💡',
    title: 'A Primeira Ideia de Negócio',
    text: () => 'Tens uma ideia: revender lanches mais baratos aos colegas na escola.',
    minAge: 15,
    maxAge: 18,
    once: true,
    weight: 8,
    choices: [
      {
        id: 'arriscar',
        label: 'Investir as poupanças',
        apply: (s) => {
          const sucesso = Math.random() < 0.6;
          if (sucesso) {
            return {
              state: { cash: s.cash + 900, smarts: clamp(s.smarts + 5), reputation: clamp(s.reputation + 5) },
              resultText: 'O negócio dos lanches é um sucesso! Já pensam em ti como "o empresário da escola".',
            };
          }
          return {
            state: { cash: Math.max(0, s.cash - 150), happiness: clamp(s.happiness - 4) },
            resultText: 'O diretor apanha-te e o negócio é fechado. Perdes o investimento.',
          };
        },
      },
      {
        id: 'nao-arriscar',
        label: 'Não arriscar',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 1) },
          resultText: 'Decides não arriscar. A vida continua tranquila.',
        }),
      },
    ],
  },

  // ---------- JOVEM ADULTO ----------
  {
    id: 'sair-de-casa',
    icon: '🔑',
    title: 'Hora de Voar Sozinho',
    text: () => 'Fazes 18 anos. Legalmente já podes sair de casa dos teus pais e arranjar o teu próprio espaço — quando tiveres dinheiro para isso.',
    minAge: 18,
    maxAge: 18,
    once: true,
    weight: 12,
    choices: [
      {
        id: 'independencia',
        label: 'Começar já a poupar para sair de casa',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 4), smarts: clamp(s.smarts + 2) },
          resultText: 'Decides que é hora de seres independente. Vais até à secção de Residência assim que tiveres dinheiro.',
        }),
      },
      {
        id: 'ficar-mais',
        label: 'Ficar mais um tempo em casa dos pais',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 6) },
          resultText: 'Preferes aproveitar mais algum tempo em casa dos teus pais, sem pressa para sair.',
        }),
      },
    ],
  },
  {
    id: 'escolha-universidade',
    icon: '🎓',
    title: 'O Caminho Depois da Escola',
    text: () => 'Chegou a hora de decidir o teu futuro académico e profissional.',
    minAge: 18,
    maxAge: 19,
    once: true,
    weight: 12,
    choices: [
      {
        id: 'elite',
        label: 'Universidade de elite (caro)',
        apply: (s) => ({
          state: {
            cash: Math.max(0, s.cash - 4000),
            smarts: clamp(s.smarts + 20),
            reputation: clamp(s.reputation + 10),
            education: 'pos-graduacao',
          },
          resultText: 'Entras numa universidade de prestígio. As portas certas começam a abrir-se.',
        }),
      },
      {
        id: 'publica',
        label: 'Faculdade pública',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 1200), smarts: clamp(s.smarts + 12), education: 'universidade' },
          resultText: 'Tiras o curso numa faculdade pública, com muito trabalho e pouco dinheiro.',
        }),
      },
      {
        id: 'mercado',
        label: 'Ir direto para o mercado de trabalho',
        apply: (s) => ({
          state: { cash: s.cash + 3000, education: 'secundario', smarts: clamp(s.smarts + 2) },
          resultText: 'Começas a trabalhar cedo. Sem diploma, mas com experiência real.',
        }),
      },
    ],
  },
  {
    id: 'startup-risco',
    icon: '🚀',
    title: 'Tudo ou Nada',
    text: () => `Um amigo propõe fundares uma startup com ele. Precisas de investir ${formatMoney(5000)} das tuas poupanças.`,
    minAge: 20,
    maxAge: 30,
    once: true,
    weight: 9,
    condition: (s) => s.cash >= 5000,
    choices: [
      {
        id: 'investir',
        label: 'Investir tudo',
        apply: (s) => {
          const sucesso = Math.random() < 0.45;
          if (sucesso) {
            return {
              state: { cash: s.cash - 5000 + 40000, reputation: clamp(s.reputation + 15) },
              resultText: 'A startup explode! Uma grande empresa compra o projeto por uma fortuna.',
            };
          }
          return {
            state: { cash: s.cash - 5000, happiness: clamp(s.happiness - 10) },
            resultText: 'A startup falha ao fim de um ano. Perdes tudo o que investiste.',
          };
        },
      },
      {
        id: 'recusar',
        label: 'Recusar e manter o emprego estável',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 2) },
          resultText: 'Preferes a segurança. O teu amigo segue sozinho com a ideia.',
        }),
      },
    ],
  },
  {
    id: 'heranca-familiar',
    icon: '📜',
    title: 'Herança Inesperada',
    text: () => 'Um familiar distante falece e deixa-te uma pequena herança.',
    minAge: 20,
    maxAge: 40,
    once: true,
    weight: 5,
    choices: [
      {
        id: 'investir-heranca',
        label: 'Investir tudo no negócio',
        apply: (s) => ({
          state: { cash: s.cash + 12000 },
          resultText: 'Investes a herança de forma inteligente e sentes que era isso que ele queria.',
        }),
      },
      {
        id: 'gastar-heranca',
        label: 'Dar-te a um luxo',
        apply: (s) => ({
          state: { cash: s.cash + 4000, happiness: clamp(s.happiness + 12) },
          resultText: 'Gastas parte do dinheiro num capricho. Sentes-te bem, mas culpado.',
        }),
      },
    ],
  },

  // ---------- ADULTO: NEGÓCIOS E MERCADOS ----------
  {
    id: 'crash-bolsa',
    icon: '📉',
    title: 'Crash na Bolsa',
    text: () => 'Os mercados globais entram em colapso repentino. As tuas ações despencam.',
    minAge: 22,
    weight: 10,
    condition: (s) => s.stocks.some((st) => st.shares > 0),
    choices: [
      {
        id: 'manter',
        label: 'Manter a calma e não vender',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness - 5) },
          resultText: 'Aguentas a tempestade. O mercado é volátil, mas o tempo dá-te razão.',
        }),
      },
      {
        id: 'vender-panico',
        label: 'Vender tudo em pânico',
        apply: (s) => {
          const valor = s.stocks.reduce((sum, st) => sum + st.price * st.shares * 0.7, 0);
          return {
            state: {
              cash: s.cash + valor,
              stocks: s.stocks.map((st) => ({ ...st, shares: 0 })),
              happiness: clamp(s.happiness - 8),
            },
            resultText: 'Vendes tudo com prejuízo. Semanas depois, o mercado recupera sem ti.',
          };
        },
      },
      {
        id: 'comprar-mais',
        label: 'Comprar mais enquanto está barato',
        apply: (s) => {
          if (s.cash < 2000) {
            return { state: {}, resultText: 'Não tens dinheiro suficiente para arriscar mais.' };
          }
          return {
            state: {
              cash: s.cash - 2000,
              stocks: s.stocks.map((st) => ({ ...st, shares: st.shares + Math.floor(1000 / st.price) })),
            },
            resultText: 'Compras na baixa. Uma jogada arriscada... mas os grandes investidores fazem-no.',
          };
        },
      },
    ],
  },
  {
    id: 'auditoria-fiscal',
    icon: '🏛️',
    title: 'Auditoria Fiscal',
    text: () => 'As autoridades fiscais decidem investigar as tuas empresas. Enquanto isto não se resolve, os rendimentos ficam suspensos.',
    minAge: 24,
    minNetWorth: 500000,
    weight: 8,
    choices: [
      {
        id: 'pagar',
        label: 'Pagar a coima e regularizar',
        apply: (s) => {
          const coima = Math.round(s.cash * 0.1);
          return {
            state: { cash: Math.max(0, s.cash - coima), taxSuspended: false },
            resultText: `Pagas ${formatMoney(coima)} em coimas. Os negócios voltam ao normal.`,
          };
        },
      },
      {
        id: 'advogados',
        label: 'Contratar advogados fiscais',
        apply: (s) => {
          const sucesso = Math.random() < 0.55;
          if (sucesso) {
            return {
              state: { cash: Math.max(0, s.cash - 3000), taxSuspended: false, reputation: clamp(s.reputation + 3) },
              resultText: 'Os teus advogados resolvem tudo legalmente. Ficas com a reputação intacta.',
            };
          }
          return {
            state: { cash: Math.max(0, s.cash - 8000), taxSuspended: false, reputation: clamp(s.reputation - 5) },
            resultText: 'O caso arrasta-se e acaba por custar-te mais do que esperavas.',
          };
        },
      },
    ],
  },
  {
    id: 'escandalo-negocio',
    icon: '📰',
    title: 'Escândalo Corporativo',
    text: () => 'Um dos teus negócios é acusado publicamente de práticas duvidosas. A imprensa está em cima do assunto.',
    minAge: 25,
    weight: 7,
    condition: (s) => s.businesses.some((b) => b.owned),
    choices: [
      {
        id: 'campanha-pr',
        label: 'Lançar campanha de relações públicas',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 4000), reputation: clamp(s.reputation + 6) },
          resultText: 'A campanha funciona e a tempestade mediática passa sem grandes danos.',
        }),
      },
      {
        id: 'encobrir',
        label: 'Tentar encobrir tudo',
        apply: (s) => {
          const descoberto = Math.random() < 0.5;
          if (descoberto) {
            return {
              state: { reputation: clamp(s.reputation - 20), happiness: clamp(s.happiness - 10) },
              resultText: 'É descoberto que tentaste encobrir o caso. O escândalo piora dramaticamente.',
            };
          }
          return {
            state: { reputation: clamp(s.reputation - 3) },
            resultText: 'Consegues abafar o caso, por agora.',
          };
        },
      },
      {
        id: 'assumir',
        label: 'Assumir o erro publicamente',
        apply: (s) => ({
          state: { reputation: clamp(s.reputation + 2), happiness: clamp(s.happiness + 4) },
          resultText: 'A tua honestidade surpreende toda a gente. Ganhas respeito por seres transparente.',
        }),
      },
    ],
  },
  {
    id: 'greve-funcionarios',
    icon: '✊',
    title: 'Greve nos Teus Negócios',
    text: () => 'Os funcionários das tuas empresas organizam uma greve a exigir melhores condições.',
    minAge: 24,
    weight: 6,
    condition: (s) => s.businesses.some((b) => b.owned),
    choices: [
      {
        id: 'negociar',
        label: 'Negociar e aumentar salários',
        apply: (s) => ({
          state: {
            cash: Math.max(0, s.cash - 2500),
            businesses: s.businesses.map((b) => ({ ...b, suspended: false })),
            reputation: clamp(s.reputation + 8),
          },
          resultText: 'Chegas a acordo. Os funcionários voltam motivados e a tua reputação sobe.',
        }),
      },
      {
        id: 'ignorar',
        label: 'Ignorar e manter a posição',
        apply: (s) => ({
          state: {
            businesses: s.businesses.map((b) => (b.owned ? { ...b, suspended: true } : b)),
            reputation: clamp(s.reputation - 10),
          },
          resultText: 'Recusas negociar. Os negócios ficam suspensos e a imagem pública piora.',
        }),
      },
    ],
  },
  {
    id: 'processo-judicial',
    icon: '⚖️',
    title: 'Processo Judicial',
    text: () => 'Um antigo sócio processa-te, alegando que lhe deves parte dos lucros de um negócio antigo.',
    minAge: 26,
    minNetWorth: 200000,
    weight: 7,
    choices: [
      {
        id: 'acordo',
        label: 'Chegar a acordo fora de tribunal',
        apply: (s) => {
          const valor = Math.round(Math.max(3000, s.cash * 0.08));
          return {
            state: { cash: Math.max(0, s.cash - valor) },
            resultText: `Pagas ${formatMoney(valor)} para resolver tudo discretamente.`,
          };
        },
      },
      {
        id: 'tribunal',
        label: 'Lutar em tribunal',
        apply: (s) => {
          const ganhas = Math.random() < 0.5;
          if (ganhas) {
            return {
              state: { reputation: clamp(s.reputation + 10), cash: s.cash + 2000 },
              resultText: 'Ganhas o processo! A justiça está do teu lado e ainda recebes uma compensação.',
            };
          }
          return {
            state: { cash: Math.max(0, s.cash - 15000), reputation: clamp(s.reputation - 8) },
            resultText: 'Perdes o processo. A conta final é muito mais alta do que um acordo teria custado.',
          };
        },
      },
    ],
  },
  {
    id: 'dica-privilegiada',
    icon: '🕵️',
    title: 'Informação Privilegiada',
    text: () => 'Um contacto próximo oferece-te uma dica sobre uma fusão que ainda não é pública. Poderias ganhar muito... se ninguém descobrir.',
    minAge: 25,
    weight: 5,
    choices: [
      {
        id: 'usar',
        label: 'Usar a informação para investir',
        apply: (s) => {
          const apanhado = Math.random() < 0.3;
          if (apanhado) {
            return {
              state: { cash: Math.max(0, s.cash - 20000), reputation: clamp(s.reputation - 25) },
              resultText: 'És apanhado por uso de informação privilegiada. A multa e o escândalo custam-te caro.',
            };
          }
          return {
            state: { cash: s.cash + 18000 },
            resultText: 'A jogada resulta na perfeição. Ninguém suspeita de nada... desta vez.',
          };
        },
      },
      {
        id: 'recusar-dica',
        label: 'Recusar por princípio',
        apply: (s) => ({
          state: { reputation: clamp(s.reputation + 4) },
          resultText: 'Recusas. Dormes tranquilo sabendo que jogaste limpo.',
        }),
      },
    ],
  },
  {
    id: 'desastre-natural',
    icon: '🌪️',
    title: 'Desastre Natural',
    text: () => 'Uma tempestade violenta atinge a região onde tens propriedades. Os danos são consideráveis.',
    minAge: 22,
    weight: 6,
    condition: (s) => s.realEstate.some((r) => r.owned),
    choices: [
      {
        id: 'reparar',
        label: 'Reparar tudo imediatamente',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 6000) },
          resultText: 'Investes na reparação. As propriedades ficam como novas.',
        }),
      },
      {
        id: 'vender-danificado',
        label: 'Vender a propriedade danificada',
        apply: (s) => {
          const owned = s.realEstate.find((r) => r.owned);
          if (!owned) return { state: {}, resultText: 'Acabas por não ter nada para vender.' };
          return {
            state: {
              cash: s.cash + owned.value * 0.5,
              realEstate: s.realEstate.map((r) => (r.id === owned.id ? { ...r, owned: false } : r)),
            },
            resultText: 'Vendes a propriedade danificada por metade do valor, só para te livrares do problema.',
          };
        },
      },
    ],
  },

  // ---------- ADULTO: VIDA PESSOAL ----------
  {
    id: 'pedido-casamento',
    icon: '💍',
    title: 'O Grande Pedido',
    text: () => 'Estás numa relação séria há algum tempo. Sentes que é a hora certa de dar o próximo passo.',
    minAge: 24,
    maxAge: 50,
    weight: 7,
    condition: (s) => !s.married,
    choices: [
      {
        id: 'pedir',
        label: 'Pedir em casamento',
        apply: (s) => ({
          state: {
            married: true,
            spouseName: 'Alex',
            happiness: clamp(s.happiness + 15),
            cash: Math.max(0, s.cash - 8000),
          },
          resultText: 'O casamento é lindo e inesquecível. Começas um novo capítulo da tua vida.',
        }),
      },
      {
        id: 'esperar',
        label: 'Esperar mais um pouco',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness - 2) },
          resultText: 'Decides esperar. Nem tudo tem de ter pressa.',
        }),
      },
    ],
  },
  {
    id: 'nascimento-filho',
    icon: '👶',
    title: 'Um Novo Membro da Família',
    text: () => 'Descobres que vais ser pai/mãe. A notícia muda tudo.',
    minAge: 24,
    maxAge: 48,
    weight: 6,
    condition: (s) => s.married,
    choices: [
      {
        id: 'celebrar',
        label: 'Celebrar a novidade',
        apply: (s) => ({
          state: { children: s.children + 1, happiness: clamp(s.happiness + 18), cash: Math.max(0, s.cash - 3000) },
          resultText: 'Nasce o teu filho. A tua vida ganha um novo sentido, apesar do cansaço.',
        }),
      },
    ],
  },
  {
    id: 'crise-conjugal',
    icon: '💔',
    title: 'Crise no Casamento',
    text: () => 'O trabalho absorve-te tanto que o teu casamento começa a ressentir-se.',
    minAge: 26,
    weight: 5,
    condition: (s) => s.married && s.happiness < 55,
    choices: [
      {
        id: 'reconquistar',
        label: 'Tirar tempo para reconquistar o casamento',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 12), cash: Math.max(0, s.cash - 2000) },
          resultText: 'Uma escapadinha a dois salva o casamento. Reencontram-se um ao outro.',
        }),
      },
      {
        id: 'divorcio',
        label: 'Aceitar que é o fim',
        apply: (s) => ({
          state: {
            married: false,
            spouseName: null,
            cash: Math.max(0, s.cash * 0.7),
            happiness: clamp(s.happiness - 15),
          },
          resultText: 'O divórcio é doloroso e caro, mas sentes que era inevitável.',
        }),
      },
    ],
  },
  {
    id: 'susto-saude',
    icon: '🏥',
    title: 'Susto de Saúde',
    text: () => 'Tens uma dor forte no peito e acabas às urgências. Os médicos querem fazer exames completos.',
    minAge: 30,
    weight: 8,
    choices: [
      {
        id: 'melhor-tratamento',
        label: 'Pagar o melhor tratamento privado',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 12000), health: clamp(s.health + 20) },
          resultText: 'O tratamento privado resolve tudo rapidamente. Sais mais saudável do que entraste.',
        }),
      },
      {
        id: 'publico',
        label: 'Usar o sistema público',
        apply: (s) => ({
          state: { health: clamp(s.health + 8), happiness: clamp(s.happiness - 3) },
          resultText: 'Esperas semanas, mas acabas por ser tratado sem gastar uma fortuna.',
        }),
      },
      {
        id: 'ignorar-saude',
        label: 'Ignorar e voltar ao trabalho',
        apply: (s) => ({
          state: { health: clamp(s.health - 18) },
          resultText: 'Voltas ao trabalho como se nada fosse. O teu corpo vai cobrar essa decisão.',
        }),
      },
    ],
  },
  {
    id: 'esgotamento',
    icon: '🥵',
    title: 'Esgotamento Total',
    text: () => 'Meses sem parar cobram o seu preço. Sentes-te exausto todos os dias.',
    minAge: 24,
    weight: 6,
    condition: (s) => s.happiness < 50,
    choices: [
      {
        id: 'ferias-luxo',
        label: 'Tirar férias e desligar de tudo',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 20), health: clamp(s.health + 10), cash: Math.max(0, s.cash - 5000) },
          resultText: 'Umas férias longe de tudo recarregam-te por completo.',
        }),
      },
      {
        id: 'continuar',
        label: 'Continuar a trabalhar sem parar',
        apply: (s) => ({
          state: { health: clamp(s.health - 15), happiness: clamp(s.happiness - 10) },
          resultText: 'Continuas a trabalhar, mas sentes que estás a queimar-te por dentro.',
        }),
      },
    ],
  },
  {
    id: 'gala-caridade',
    icon: '🎗️',
    title: 'Gala de Caridade',
    text: () => 'Convidam-te para uma gala beneficente. Câmaras e imprensa vão estar presentes.',
    minAge: 26,
    minNetWorth: 300000,
    weight: 5,
    choices: [
      {
        id: 'doar-muito',
        label: 'Fazer uma doação generosa',
        apply: (s) => {
          const doacao = Math.max(5000, Math.round(s.cash * 0.05));
          return {
            state: { cash: Math.max(0, s.cash - doacao), reputation: clamp(s.reputation + 15), happiness: clamp(s.happiness + 6) },
            resultText: `Doas ${formatMoney(doacao)}. A tua generosidade sai em todos os jornais.`,
          };
        },
      },
      {
        id: 'doar-pouco',
        label: 'Fazer uma doação simbólica',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 500), reputation: clamp(s.reputation + 2) },
          resultText: 'Fazes uma doação modesta. Ninguém repara muito.',
        }),
      },
      {
        id: 'nao-ir',
        label: 'Não comparecer',
        apply: (s) => ({
          state: { reputation: clamp(s.reputation - 5) },
          resultText: 'A tua ausência é notada e comentada nos bastidores.',
        }),
      },
    ],
  },
  {
    id: 'crise-meia-idade',
    icon: '🏎️',
    title: 'Crise da Meia-Idade',
    text: () => 'De repente sentes uma vontade irresistível de fazer algo drástico e impulsivo.',
    minAge: 42,
    maxAge: 58,
    once: true,
    weight: 6,
    choices: [
      {
        id: 'comprar-carro',
        label: 'Comprar um carro desportivo',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 60000), happiness: clamp(s.happiness + 15) },
          resultText: 'Compras o carro dos teus sonhos. Sentes-te 20 anos mais novo.',
        }),
      },
      {
        id: 'investir-saude',
        label: 'Investir na tua saúde e bem-estar',
        apply: (s) => ({
          state: { health: clamp(s.health + 15), cash: Math.max(0, s.cash - 8000) },
          resultText: 'Contratas um nutricionista e um personal trainer. O corpo agradece.',
        }),
      },
    ],
  },
  {
    id: 'legado-filantropico',
    icon: '🏛️',
    title: 'Construir um Legado',
    text: () => 'Com a fortuna que construíste, começas a pensar no legado que vais deixar.',
    minAge: 50,
    minNetWorth: 5000000,
    once: true,
    weight: 5,
    choices: [
      {
        id: 'fundacao',
        label: 'Criar uma fundação com o teu nome',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 200000), reputation: clamp(s.reputation + 25), happiness: clamp(s.happiness + 15) },
          resultText: 'Fundas uma instituição que vai ajudar milhares de pessoas. O teu nome ficará para a história.',
        }),
      },
      {
        id: 'guardar-fortuna',
        label: 'Manter a fortuna na família',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 3) },
          resultText: 'Decides que a prioridade é o futuro da tua própria família.',
        }),
      },
    ],
  },
  {
    id: 'cirurgia-idade',
    icon: '🩺',
    title: 'Cirurgia Delicada',
    text: () => 'Os médicos recomendam uma cirurgia importante. Não é algo para adiar.',
    minAge: 60,
    weight: 9,
    choices: [
      {
        id: 'melhor-cirurgiao',
        label: 'Contratar o melhor cirurgião do país',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 40000), health: clamp(s.health + 25) },
          resultText: 'A cirurgia corre na perfeição. Sais do hospital com uma nova energia.',
        }),
      },
      {
        id: 'adiar-cirurgia',
        label: 'Adiar a cirurgia',
        apply: (s) => ({
          state: { health: clamp(s.health - 25) },
          resultText: 'Adiares a cirurgia foi um erro. A tua saúde piora visivelmente.',
        }),
      },
    ],
  },
  {
    id: 'pensar-reforma',
    icon: '🌅',
    title: 'Pensamentos de Reforma',
    text: () => 'Já construíste um império. Será que é hora de passar o testemunho e aproveitar a vida com calma?',
    minAge: 65,
    weight: 6,
    choices: [
      {
        id: 'passar-testemunho',
        label: 'Preparar sucessão do império',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 12), health: clamp(s.health + 5) },
          resultText: 'Começas a preparar a próxima geração para continuar o teu legado.',
        }),
      },
      {
        id: 'continuar-trabalhar',
        label: 'Continuar a trabalhar sem parar',
        apply: (s) => ({
          state: { health: clamp(s.health - 8), cash: s.cash + 5000 },
          resultText: 'Recusas abrandar. Os negócios crescem, mas o corpo sente o peso dos anos.',
        }),
      },
    ],
  },

  // ---------- SORTE / AZAR ALEATÓRIOS ----------
  {
    id: 'assalto',
    icon: '🚨',
    title: 'Assalto',
    text: () => 'Assaltam uma das tuas propriedades durante a noite.',
    minAge: 20,
    weight: 5,
    condition: (s) => s.cash > 5000 || s.vehicles.some((v) => v.owned),
    choices: [
      {
        id: 'seguranca',
        label: 'Investir em segurança reforçada',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - 4000) },
          resultText: 'Instalas um sistema de segurança de ponta. Nunca mais te voltam a assaltar.',
        }),
      },
      {
        id: 'nada',
        label: 'Não fazer nada',
        apply: (s) => ({
          state: { cash: Math.max(0, s.cash - Math.round(s.cash * 0.05)), happiness: clamp(s.happiness - 6) },
          resultText: 'Perdes bens de valor e ficas com uma sensação de vulnerabilidade.',
        }),
      },
    ],
  },
  {
    id: 'lotaria',
    icon: '🎰',
    title: 'Bilhete de Lotaria',
    text: () => 'Compras um bilhete de lotaria por impulso numa loja de bairro.',
    minAge: 18,
    weight: 4,
    choices: [
      {
        id: 'jogar',
        label: 'Verificar o resultado',
        apply: (s) => {
          const ganha = Math.random() < 0.12;
          if (ganha) {
            return { state: { cash: s.cash + 25000, happiness: clamp(s.happiness + 20) }, resultText: 'Não acreditas: ganhaste o prémio! Um golpe de sorte inesperado.' };
          }
          return { state: { cash: Math.max(0, s.cash - 10) }, resultText: 'Não tens sorte desta vez. É sempre assim.' };
        },
      },
    ],
  },
  {
    id: 'oferta-endosso',
    icon: '🎤',
    title: 'Convite Para Embaixador de Marca',
    text: () => 'Uma marca de luxo quer usar a tua imagem numa campanha publicitária.',
    minAge: 25,
    minNetWorth: 1000000,
    weight: 5,
    choices: [
      {
        id: 'aceitar-endosso',
        label: 'Aceitar o acordo',
        apply: (s) => ({
          state: { cash: s.cash + 15000, reputation: clamp(s.reputation + 10) },
          resultText: 'A campanha é um sucesso e a tua imagem pública dispara.',
        }),
      },
      {
        id: 'recusar-endosso',
        label: 'Recusar, preferes discrição',
        apply: (s) => ({
          state: { reputation: clamp(s.reputation + 2) },
          resultText: 'Preferes manter-te fora dos holofotes.',
        }),
      },
    ],
  },
  {
    id: 'boom-cripto',
    icon: '🚀',
    title: 'Boom das Criptomoedas',
    text: () => 'Uma das criptomoedas que segues dispara de valor da noite para o dia.',
    minAge: 20,
    weight: 6,
    condition: (s) => s.crypto.some((c) => c.amount > 0),
    choices: [
      {
        id: 'vender-cripto',
        label: 'Vender no pico',
        apply: (s) => {
          const valor = s.crypto.reduce((sum, c) => sum + c.price * c.amount * 1.8, 0);
          return {
            state: { cash: s.cash + valor, crypto: s.crypto.map((c) => ({ ...c, amount: 0 })) },
            resultText: 'Vendes tudo no momento certo. Um golpe de génio financeiro.',
          };
        },
      },
      {
        id: 'manter-cripto',
        label: 'Manter e esperar mais',
        apply: (s) => ({
          state: { happiness: clamp(s.happiness + 4) },
          resultText: 'Decides não vender. Só o tempo dirá se foi a decisão certa.',
        }),
      },
    ],
  },
];

export function pickRandomEvent(state: GameStateData, netWorthValue: number): GameEvent | null {
  const candidates = LIFE_EVENTS.filter((e) => {
    if (e.once && state.seenOnceEvents.includes(e.id)) return false;
    if (e.minAge !== undefined && state.age < e.minAge) return false;
    if (e.maxAge !== undefined && state.age > e.maxAge) return false;
    if (e.minNetWorth !== undefined && netWorthValue < e.minNetWorth) return false;
    if (e.maxNetWorth !== undefined && netWorthValue > e.maxNetWorth) return false;
    if (e.condition && !e.condition(state)) return false;
    return true;
  });

  if (candidates.length === 0) return null;

  const totalWeight = candidates.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const event of candidates) {
    roll -= event.weight;
    if (roll <= 0) return event;
  }
  return candidates[candidates.length - 1];
}
