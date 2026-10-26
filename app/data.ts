import { additionalWorks } from './additions';
import { frenchWorks } from './french-additions';
import { newPaths, newConnections } from './journeys';

export type Work = {
  id: string;
  title: string;
  composer: string;
  original: string;
  year: number;
  region: string;
  duration: number;
  tags: string[];
  color: string;
  invitation: string;
  context: string;
  listen: string[];
  question: string;
  source: string;
  video?: string;
};
export const works: Work[] = [
  {
    id: 'sacre',
    title: 'A sagração da primavera',
    composer: 'Igor Stravinsky',
    original: 'Игорь Стравинский',
    year: 1913,
    region: 'Rússia · França',
    duration: 35,
    tags: ['Ritmo', 'Orquestra', 'Modernismo'],
    color: '#bde790',
    invitation: 'Quando o ritmo deixa de acompanhar e passa a comandar.',
    context:
      'Um balé em duas partes, criado para os Ballets Russes e estreado em Paris em 1913. Blocos de material, acentos deslocados e sobreposição de camadas organizam a escuta pela energia e pelo contraste. A formação russa de Stravinsky e a produção parisiense convidam a pensar a circulação cultural.',
    listen: [
      'Ouça o registro agudo do fagote no início.',
      'Tente manter um pulso constante diante dos acentos deslocados.',
      'Perceba as mudanças entre blocos: transição gradual ou corte?',
    ],
    question:
      'O que mais organiza sua escuta: melodia, pulso ou mudança de textura?',
    source: 'https://www.riteofspringproject.org/',
    video: '5iP3jjNDb4o',
  },
  {
    id: 'quarteto8',
    title: 'Quarteto de cordas nº 8',
    composer: 'Dmitri Shostakovich',
    original: 'Дмитрий Шостакович',
    year: 1960,
    region: 'União Soviética',
    duration: 22,
    tags: ['Motivo', 'Memória', 'Câmara'],
    color: '#d8bf96',
    invitation: 'Quatro notas. Muitas maneiras de lembrar.',
    context:
      'Os cinco movimentos se conectam sem interrupção. O motivo ré–mi bemol–dó–si, conhecido como DSCH pela notação alemã, percorre a obra. Sua dedicatória às vítimas do fascismo e da guerra não esgota as interpretações autobiográficas. Evite adotar uma narrativa única antes de escutar.',
    listen: [
      'Acompanhe as quatro notas iniciais quando passam entre as vozes.',
      'Compare o peso dos movimentos lentos com a energia dos rápidos.',
      'Procure os retornos: o mesmo motivo conserva o mesmo efeito?',
    ],
    question: 'Uma repetição pode soar como lembrança, insistência ou ameaça?',
    source:
      'https://www.laphil.com/works/string-quartet-no-8-in-c-minor-op-110',
    video: 'uGoxfQ2H3ns',
  },
  {
    id: 'extase',
    title: 'O poema do êxtase',
    composer: 'Alexander Scriabin',
    original: 'Александр Скрябин',
    year: 1908,
    region: 'Império Russo',
    duration: 20,
    tags: ['Harmonia', 'Orquestra', 'Modernismo'],
    color: '#b7a4dd',
    invitation:
      'Uma música que parece desejar um horizonte sempre mais distante.',
    context:
      'Poema sinfônico em um movimento, ligado ao universo filosófico e poético de Scriabin. A expansão harmônica e o acúmulo orquestral permitem escutar tensão como processo prolongado. A leitura espiritual oferece contexto, não uma sensação obrigatória.',
    listen: [
      'Distinga linhas solo e massas orquestrais.',
      'Observe o que se acumula antes de um clímax.',
      'A chegada depende de um acorde ou da energia de toda a orquestra?',
    ],
    question: 'Em que momento você sente repouso, e quanto ele dura?',
    source: 'https://www.laphil.com/works/the-poem-of-ecstasy',
  },
  {
    id: 'fabrica',
    title: 'A fundição de ferro',
    composer: 'Alexander Mosolov',
    original: 'Александр Мосолов',
    year: 1927,
    region: 'União Soviética',
    duration: 4,
    tags: ['Ritmo', 'Orquestra', 'Máquina'],
    color: '#c9a17f',
    invitation:
      'Entre na engrenagem. Encontre o que se move dentro da repetição.',
    context:
      'Peça orquestral também conhecida como Iron Foundry, associada à imaginação industrial da vanguarda soviética. Sua duração curta favorece a repetição da escuta: ostinatos e camadas podem ser percebidos antes de uma explicação histórica extensa.',
    listen: [
      'Encontre uma figura que persiste.',
      'Escute as entradas que tornam a textura mais densa.',
      'Separe regularidade rítmica e transformação da instrumentação.',
    ],
    question: 'Se tantas figuras se repetem, por que a música não fica parada?',
    source: 'https://www.gresham.ac.uk/watch-now/modernism-rampant',
  },
  {
    id: 'prokofiev',
    title: 'Sonata para piano nº 7',
    composer: 'Sergei Prokofiev',
    original: 'Сергей Прокофьев',
    year: 1942,
    region: 'União Soviética',
    duration: 19,
    tags: ['Ritmo', 'Piano', 'Contraste'],
    color: '#dfb583',
    invitation: 'O piano entre canto, gesto e percussão.',
    context:
      'A sétima sonata integra o grupo frequentemente chamado de sonatas de guerra. Seus três movimentos contrastam energia incisiva, lirismo e impulso motor. O final em sete tempos oferece uma experiência concreta de assimetria métrica.',
    listen: [
      'Compare o ataque do piano nos diferentes movimentos.',
      'No final, experimente agrupar o pulso em 2+3+2.',
      'Observe como a energia se mantém com esse agrupamento.',
    ],
    question: 'O pulso assimétrico parece instável ou se torna familiar?',
    source: 'https://enc.piano.or.jp/en/musics/235',
  },
  {
    id: 'schnittke',
    title: 'Concerto grosso nº 1',
    composer: 'Alfred Schnittke',
    original: 'Альфред Шнитке',
    year: 1977,
    region: 'União Soviética',
    duration: 28,
    tags: ['Memória', 'Poliestilismo', 'Câmara'],
    color: '#d6a8b7',
    invitation: 'E se épocas diferentes dividissem a mesma sala?',
    context:
      'Obra para dois violinos, cravo, piano preparado e cordas. Referências barrocas e materiais contrastantes convivem em um percurso que coloca estilos em tensão. A relação com o passado pode ser afetuosa, perturbadora ou ambígua.',
    listen: [
      'Identifique gestos que parecem pertencer a outra época.',
      'Perceba a distância tímbrica entre teclados e cordas.',
      'A mudança de estilo cria continuidade ou interrupção?',
    ],
    question: 'Uma linguagem antiga reaparece como homenagem ou estranhamento?',
    source:
      'https://www.boosey.com/pages/cr/catalogue/cat_detail?=&langid=2&musicid=5162',
  },
  {
    id: 'offertorium',
    title: 'Offertorium',
    composer: 'Sofia Gubaidulina',
    original: 'София Губайдулина',
    year: 1980,
    region: 'União Soviética · diáspora',
    duration: 40,
    tags: ['Transformação', 'Violino', 'Espiritualidade'],
    color: '#abcbbb',
    invitation: 'Uma ideia perde partes e encontra outra forma de existir.',
    context:
      'Concerto para violino e orquestra de 1980, revisto em 1982 e 1986. A transformação de um tema associado à Oferenda Musical de Bach participa de sua concepção. Observe as relações entre solista e orquestra antes de se fixar em uma interpretação simbólica.',
    listen: [
      'Observe como o material inicial se distribui entre instrumentos.',
      'Siga o violino: ele se destaca ou se incorpora ao conjunto?',
      'Compare a textura inicial e a final.',
    ],
    question: 'Você percebe transformação mesmo sem conseguir cantar o tema?',
    source:
      'https://www.boosey.com/cr/music/Sofia-Gubaidulina-Offertorium/6672',
  },
  {
    id: 'ustvolskaya',
    title: 'Composição nº 2 — Dies irae',
    composer: 'Galina Ustvolskaya',
    original: 'Галина Уствольская',
    year: 1973,
    region: 'União Soviética',
    duration: 20,
    tags: ['Timbre', 'Repetição', 'Contraste'],
    color: '#b7b5a2',
    invitation: 'Poucos materiais podem ocupar todo o espaço.',
    context:
      'Escrita para oito contrabaixos, piano e caixa de madeira. Massa, registro e insistência estão no centro desta proposta de escuta. A instrumentação permite investigar como uma identidade sonora emerge de recursos restritos.',
    listen: [
      'Ouça o peso do registro grave.',
      'Compare os ataques da caixa e do piano.',
      'Observe como a insistência afeta a percepção do tempo.',
    ],
    question: 'A repetição reduz a tensão ou a intensifica?',
    source: 'https://ustvolskaya.org/eng/catalog.php',
  },
  {
    id: 'debussy',
    title: 'La Mer',
    composer: 'Claude Debussy',
    original: 'Claude Debussy',
    year: 1905,
    region: 'França',
    duration: 24,
    tags: ['Timbre', 'Orquestra', 'Transformação'],
    color: '#8ebbc2',
    invitation: 'Forma como correnteza: o que muda sem desaparecer?',
    context:
      'Três esboços sinfônicos para orquestra. O título convida à imaginação, mas a escuta também pode se concentrar em gestos, cores e transformações. Oferece um contraponto à organização em blocos da Sagração.',
    listen: [
      'Acompanhe um gesto curto através de diferentes instrumentos.',
      'Observe as passagens entre planos de intensidade.',
      'Escute movimento antes de procurar uma melodia.',
    ],
    question: 'Você percebe seções nítidas ou transformação contínua?',
    source: 'https://www.laphil.com/works/la-mer',
  },
  {
    id: 'schoenberg',
    title: 'Pierrot lunaire',
    composer: 'Arnold Schoenberg',
    original: 'Arnold Schönberg',
    year: 1912,
    region: 'Áustria · Alemanha',
    duration: 35,
    tags: ['Voz', 'Atonalidade', 'Câmara'],
    color: '#b4abd0',
    invitation: 'Na fronteira entre falar e cantar, outra escuta começa.',
    context:
      'Ciclo de 21 melodramas para voz e pequeno conjunto, com uso de Sprechstimme. A ausência de uma tônica estável não implica ausência de organização: motivo, gesto, timbre e texto também articulam relações.',
    listen: [
      'Compare a voz com uma melodia cantada.',
      'Acompanhe um instrumento de cada vez.',
      'Busque pequenas figuras recorrentes.',
    ],
    question: 'O que cria unidade quando uma cadência tonal não vem?',
    source: 'https://ressources.ircam.fr/en/work/pierrot-lunaire-op.-21',
  },
  {
    id: 'ligeti',
    title: 'Atmosphères',
    composer: 'György Ligeti',
    original: 'Ligeti György',
    year: 1961,
    region: 'Hungria · Áustria',
    duration: 9,
    tags: ['Timbre', 'Textura', 'Orquestra'],
    color: '#9fb9d7',
    invitation: 'Aproxime o ouvido de uma nuvem que se transforma.',
    context:
      'Obra orquestral associada a massas sonoras e micropolifonia. A atenção se desloca de temas destacados para densidade, registro e movimento interno. Uma entrada curta para ouvir forma como transformação de textura.',
    listen: [
      'Tente separar camadas dentro do conjunto.',
      'Acompanhe a região grave e depois a aguda.',
      'Observe mudanças de densidade sem um pulso evidente.',
    ],
    question: 'Você consegue descrever movimento sem usar a palavra melodia?',
    source: 'https://schottmusiclondon.com/atmospheres-no96536.html',
  },
  {
    id: 'part',
    title: 'Fratres',
    composer: 'Arvo Pärt',
    original: 'Arvo Pärt',
    year: 1977,
    region: 'Estônia · diáspora',
    duration: 11,
    tags: ['Repetição', 'Silêncio', 'Espiritualidade'],
    color: '#c1c79e',
    invitation: 'O retorno muda a música — e muda quem escuta.',
    context:
      'Concebida em 1977 e realizada em diferentes instrumentações. Observe a versão da gravação: duração e timbre variam. Sua inclusão amplia o contexto báltico sem classificar automaticamente a música estoniana como russa.',
    listen: [
      'Reconheça o que permanece entre reapresentações.',
      'Observe a relação entre registro, intensidade e silêncio.',
      'Compare diferentes instrumentações.',
    ],
    question: 'O que permanece reconhecível quando os instrumentos mudam?',
    source: 'https://www.arvopart.ee/en/arvo-part/work/417/',
  },
  ...additionalWorks,
  ...frenchWorks,
];
export const paths = [
  ...newPaths,
  {
    id: 'russo',
    title: 'Música russa e diásporas',
    subtitle: 'Contextos imperiais, soviéticos e contemporâneos',
    description:
      'Do Império Russo às experiências soviéticas e à diáspora contemporânea. Trajetórias distintas, não uma identidade única.',
    ids: [
      'extase',
      'sacre',
      'roslavets',
      'fabrica',
      'rachmaninoff',
      'prokofiev',
      'quarteto8',
      'denisov',
      'shchedrin',
      'ustvolskaya',
      'schnittke',
      'offertorium',
      'tarnopolski',
      'auerbach',
    ],
    color: '#bde790',
  },
  {
    id: 'ritmo',
    title: 'Ritmo e pulsação',
    subtitle: 'Pulso, acento e métrica',
    description:
      'Compare a pulsação, os acentos e os padrões repetidos em diferentes formações instrumentais.',
    ids: [
      'fabrica',
      'sacre',
      'prokofiev',
      'bartok',
      'shchedrin',
      'tarnopolski',
    ],
    color: '#dcb285',
  },
  {
    id: 'textura',
    title: 'Timbre e textura',
    subtitle: 'Instrumentação e densidade',
    description:
      'Observe mudanças de instrumentação, registro e densidade para identificar seções e contrastes.',
    ids: [
      'debussy',
      'ligeti',
      'ustvolskaya',
      'offertorium',
      'denisov',
      'saariaho',
      'saunders',
      'auerbach',
      'schoenberg',
      'roslavets',
    ],
    color: '#aabbdc',
  },
  {
    id: 'memoria',
    title: 'Memória e citação',
    subtitle: 'Citação, retorno e transformação',
    description:
      'Citação, duração e lembrança em trajetórias russas, polonesas, ucranianas, bálticas e francesas. Comparar não é igualar.',
    ids: [
      'quarteto8',
      'schnittke',
      'part',
      'offertorium',
      'rachmaninoff',
      'weinberg',
      'silvestrov',
      'messiaen',
    ],
    color: '#dab6c5',
  },
];
export const concepts = [
  { name: 'Tons inteiros', text: 'Seis passos iguais dividem a oitava. No laboratório, compare essa coleção com a escala maior: a regularidade dos intervalos muda os pontos de referência do ouvido.', ids: ['debussy', 'messiaen'], example: '' },
  { name: 'Paralelismo', text: 'Um desenho pode se deslocar preservando sua estrutura intervalar. Compare o movimento de acordes como blocos com uma sequência que mantém as notas de uma mesma escala.', ids: ['debussy', 'ravel'], example: '' },
  { name: 'Transformação temática', text: 'Uma ideia reconhecível retorna com outra aparência: andamento, registro, articulação ou contexto harmônico mudam seu efeito. Reconhecer e estranhar podem acontecer ao mesmo tempo.', ids: ['berlioz', 'saintsaens', 'quarteto8'], example: '' },
  { name: 'Orquestração', text: 'Escolher e combinar instrumentos participa da forma, não apenas da decoração. Acompanhe quem conduz, quem sustenta e como uma ideia muda ao passar entre vozes.', ids: ['ravel', 'boulanger', 'roussel'], example: '' },
  {
    name: 'Ostinato',
    text: 'Uma figura que se repete persistentemente. As camadas ao redor podem mudar enquanto ela permanece.',
    ids: ['fabrica', 'sacre', 'prokofiev'],
    example: 'ostinato',
  },
  {
    name: 'Polirritmia',
    text: 'Organizações rítmicas diferentes soam simultaneamente. No exemplo, três ataques convivem com dois no mesmo intervalo.',
    ids: ['sacre', 'prokofiev'],
    example: 'polirritmia',
  },
  {
    name: 'Timbre',
    text: 'A qualidade que diferencia sons de altura semelhante. Escute a mesma nota com diferentes combinações de harmônicos.',
    ids: ['ligeti', 'debussy', 'ustvolskaya'],
    example: 'timbre',
  },
  {
    name: 'Motivo',
    text: 'Uma ideia curta que pode retornar transformada. Reconhecer seus contornos ajuda a ouvir relações.',
    ids: ['quarteto8', 'offertorium'],
    example: 'motivo',
  },
  {
    name: 'Poliestilismo',
    text: 'Convivência e confronto de linguagens historicamente diferentes dentro de uma obra.',
    ids: ['schnittke'],
    example: '',
  },
  {
    name: 'Atonalidade',
    text: 'Música sem uma tônica estável. Relações de motivo, registro e ritmo podem construir coerência.',
    ids: ['schoenberg'],
    example: '',
  },
  {
    name: 'Micropolifonia',
    text: 'Linhas próximas se entrelaçam até serem percebidas como textura, em vez de vozes individuais.',
    ids: ['ligeti'],
    example: '',
  },
  {
    name: 'Escuta comparativa',
    text: 'Escolher uma pergunta e ouvir duas obras ou interpretações procurando diferenças concretas.',
    ids: ['debussy', 'sacre', 'part'],
    example: '',
  },
];
export const connections = [
  ...newConnections,
  [
    'rachmaninoff',
    'quarteto8',
    'Comparação editorial',
    'Retornos musicais como ponto de partida para escutar memória; não implica o mesmo programa.',
  ],
  [
    'roslavets',
    'schoenberg',
    'Problema compartilhado',
    'Buscar orientação além de cadências familiares, sem equiparar os sistemas composicionais.',
  ],
  [
    'roslavets',
    'fabrica',
    'Contraponto histórico',
    'Duas experiências dos anos 1920 soviéticos: pluralidade além de uma estética única.',
  ],
  [
    'denisov',
    'schoenberg',
    'Comparação editorial',
    'Relações entre voz e pequeno conjunto em linguagens e contextos diferentes.',
  ],
  [
    'weinberg',
    'quarteto8',
    'Comparação editorial',
    'Escutar memória e retorno sem reduzir identidades judaica polonesa e russa a uma narrativa comum.',
  ],
  [
    'shchedrin',
    'schnittke',
    'Problema compartilhado',
    'Materiais do passado voltam em novas condições sonoras: adaptação não é o mesmo que poliestilismo.',
  ],
  [
    'shchedrin',
    'bartok',
    'Afinidade perceptiva',
    'Percussão e cordas permitem investigar ataque e articulação; não é uma afirmação de influência.',
  ],
  [
    'tarnopolski',
    'fabrica',
    'Comparação editorial',
    'Pulsações e regularidade: a máquina imaginada e o tempo construído por processos sonoros.',
  ],
  [
    'auerbach',
    'extase',
    'Comparação editorial',
    'A relação entre um título sugestivo e uma experiência orquestral permanece aberta.',
  ],
  [
    'silvestrov',
    'part',
    'Comparação editorial',
    'Repetição e atenção ao decaimento do som em poéticas ucraniana e estoniana distintas.',
  ],
  [
    'bartok',
    'sacre',
    'Problema compartilhado',
    'Organização rítmica e distribuição de energia sem presumir um mesmo tratamento do folclore.',
  ],
  [
    'messiaen',
    'offertorium',
    'Contexto comparável',
    'Referências espirituais explícitas, materiais e concepções de tempo diferentes.',
  ],
  [
    'saariaho',
    'ligeti',
    'Problema compartilhado',
    'Transformações de textura como orientação da escuta; comparação não prova filiação direta.',
  ],
  [
    'saariaho',
    'debussy',
    'Comparação editorial',
    'Cor orquestral e continuidade ou ruptura entre planos sonoros.',
  ],
  [
    'saunders',
    'denisov',
    'Comparação editorial',
    'Voz e conjunto: distinguir protagonismo vocal de integração tímbrica.',
  ],
  [
    'saunders',
    'ustvolskaya',
    'Afinidade perceptiva',
    'Ataque, sustentação e materialidade do som, sem confundir as técnicas.',
  ],
  [
    'sacre',
    'fabrica',
    'Problema compartilhado',
    'Ritmo e repetição organizam massas orquestrais.',
  ],
  [
    'sacre',
    'debussy',
    'Comparação editorial',
    'Blocos contrastantes e transformações contínuas.',
  ],
  [
    'fabrica',
    'prokofiev',
    'Afinidade perceptiva',
    'Gesto motor e persistência rítmica; não implica influência.',
  ],
  [
    'quarteto8',
    'schnittke',
    'Problema compartilhado',
    'Retorno e citação colocam a memória no centro.',
  ],
  [
    'schnittke',
    'offertorium',
    'Comparação editorial',
    'Transformações de materiais do passado.',
  ],
  [
    'ustvolskaya',
    'ligeti',
    'Comparação editorial',
    'Processos distintos deslocam a atenção para a textura.',
  ],
  [
    'part',
    'offertorium',
    'Contexto comparável',
    'Leituras espirituais em linguagens distintas.',
  ],
  [
    'debussy',
    'ligeti',
    'Problema compartilhado',
    'Timbre e densidade como forças de organização.',
  ],
  [
    'extase',
    'sacre',
    'Contexto histórico',
    'Caminhos do modernismo ligados à formação russa.',
  ],
  [
    'schoenberg',
    'sacre',
    'Contraponto histórico',
    'Respostas diferentes à expansão da linguagem musical.',
  ],
];
