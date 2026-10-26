// Aproximações de escuta, não afirmações de influência histórica.
export const newPaths = [
  { id: 'frances', title: 'A França em muitas cores', subtitle: 'Da imaginação romântica à invenção moderna', description: 'Comece pelo gesto orquestral, aproxime-se do piano e termine na diversidade do século XX. Não há uma única sonoridade francesa: compare escolhas, meios e contextos.', ids: ['berlioz', 'saintsaens', 'bizet', 'faure', 'chausson', 'dukas', 'debussy', 'ravel', 'satie', 'boulanger', 'roussel', 'tailleferre', 'poulenc', 'messiaen'], color: '#ff783b' },
  { id: 'paris', title: 'Paris, lugar de encontros', subtitle: 'Circulação não é identidade', description: 'Cruze tradições russas e francesas com uma pergunta: como cor e articulação mudam a forma? O percurso propõe comparações, sem transformar toda semelhança em influência.', ids: ['ravel', 'sacre', 'debussy', 'extase', 'poulenc', 'prokofiev', 'saariaho'], color: '#c9b2ea' },
  { id: 'gesto', title: 'Histórias sem palavras', subtitle: 'Narrativa, dança e imaginação', description: 'Compare obras com referências narrativas e sinfonias sem um programa explícito. Descreva retornos e interrupções antes de ler os contextos: nem toda forma conta uma história, nem todo título traduz os sons.', ids: ['berlioz', 'dukas', 'bizet', 'saintsaens', 'roussel', 'shchedrin'], color: '#e6bba1' },
  { id: 'intimidade', title: 'O detalhe e a distância', subtitle: 'Uma prática de escuta atenta', description: 'Escolha um pequeno trecho por sessão. Observe a respiração da frase, o final dos sons e as mudanças de registro. Escreva uma hipótese, retorne no dia seguinte e admita revê-la.', ids: ['faure', 'chausson', 'satie', 'boulanger', 'tailleferre', 'silvestrov', 'part'], color: '#b4c8d1' },
];

export const newConnections = [
  ['berlioz', 'dukas', 'Comparação editorial', 'Retorno e transformação de ideias em obras com referências narrativas; não procure uma equivalência literal entre cada som e uma cena.'],
  ['berlioz', 'extase', 'Problema compartilhado', 'Como o acúmulo orquestral prepara uma chegada? Compare a distribuição da energia, não apenas o volume.'],
  ['saintsaens', 'bizet', 'Comparação editorial', 'Duas concepções de sinfonia: compare a distribuição de contrastes e o tamanho dos gestos, sem impor um programa narrativo.'],
  ['saintsaens', 'schnittke', 'Comparação editorial', 'Reconhecer um gesto familiar não produz o mesmo efeito em contextos históricos e linguagens diferentes.'],
  ['faure', 'satie', 'Contraste de escuta', 'Compare direção da frase e sensação de suspensão; economia de meios não significa simplicidade de experiência.'],
  ['faure', 'chausson', 'Comparação editorial', 'Siga a linha expressiva e a sustentação harmônica antes de descrever o caráter emocional.'],
  ['bizet', 'shchedrin', 'Comparação editorial', 'Da Sinfonia em dó à suíte baseada em outra obra de Bizet, Carmen: compare articulação sem tratar as duas peças como versões da mesma música.'],
  ['dukas', 'fabrica', 'Problema compartilhado', 'Uma figura insistente pode sugerir movimento: compare a construção musical sem confundir os programas.'],
  ['ravel', 'debussy', 'Contraste de escuta', 'Cor orquestral não é um estilo único. Compare continuidade, repetição e separação entre planos.'],
  ['ravel', 'sacre', 'Comparação editorial', 'Investigue como o ritmo organiza a orquestra em duas propostas francesas e franco-russas distintas.'],
  ['chausson', 'offertorium', 'Problema compartilhado', 'O violino pode emergir do conjunto ou se misturar a ele: descreva essa relação antes de interpretar.'],
  ['boulanger', 'debussy', 'Afinidade perceptiva', 'Escute luminosidade como uma combinação concreta de registro, ataque e densidade, não como atributo nacional.'],
  ['boulanger', 'tailleferre', 'Contraponto histórico', 'Duas trajetórias de compositoras francesas: contextos institucionais e escolhas musicais não são intercambiáveis.'],
  ['tailleferre', 'poulenc', 'Contexto histórico', 'A associação ao grupo dos Seis não elimina diferenças de linguagem. Compare articulação, frase e contraste.'],
  ['poulenc', 'schoenberg', 'Comparação editorial', 'Pequenas formações revelam maneiras distintas de distribuir atenção entre os instrumentos.'],
  ['satie', 'part', 'Comparação editorial', 'Repetição e espaço entre gestos convidam à atenção, sem pressupor uma mesma espiritualidade ou técnica.'],
  ['roussel', 'ravel', 'Problema compartilhado', 'Compare movimento e massa orquestral: em que momento a dança vira arquitetura sonora?'],
  ['roussel', 'bartok', 'Afinidade perceptiva', 'Contrastes de articulação ajudam a perceber energia e seções sem exigir o reconhecimento de temas.'],
];

export const pathwayQuestions: Record<string, string[]> = {
  frances: ['Que instrumento conduz sua atenção?', 'O retorno confirma ou transforma uma ideia?', 'Quais diferenças impedem falar em uma única escola francesa?'],
  paris: ['Você ouve um corte ou uma transição?', 'O ritmo está na frente ou dentro da textura?', 'O que é evidência histórica e o que é sua comparação?'],
  gesto: ['Que gesto parece iniciar uma ação?', 'O que o título faz você imaginar?', 'Sua escuta muda depois de ler o contexto?'],
  intimidade: ['Onde uma frase parece respirar?', 'Quanto tempo você percebe depois de um ataque?', 'O que mudou ao ouvir novamente?'],
  russo: ['O contexto político explica tudo o que você ouve?', 'Que diferenças existem entre essas trajetórias?', 'Qual recurso organiza a experiência de tempo?'],
  ritmo: ['Você consegue sustentar um pulso?', 'Onde os acentos o contradizem?', 'A repetição conserva ou transforma a energia?'],
  textura: ['É possível separar vozes ou apenas massas?', 'O registro muda antes da intensidade?', 'Que mudança de timbre articula uma nova seção?'],
  memoria: ['O que faz você reconhecer um retorno?', 'Uma citação continua significando a mesma coisa?', 'Como descrever memória sem impor uma biografia?'],
};
