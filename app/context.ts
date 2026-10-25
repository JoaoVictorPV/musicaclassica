import { newDossiers } from './context-additions';

export type Source = { label: string; url: string };
export type Dossier = {
  history: string;
  construction: string;
  listening: string;
  perspective: string;
  inclusion: string;
  sources: Source[];
};

export const editorialRevision = '25 de outubro de 2026';
export const dossiers: Record<string, Dossier> = {
  sacre: {
    history:
      'A estreia parisiense de 1913 reuniu a música de Stravinsky, os Ballets Russes de Diaghilev, a coreografia de Nijinsky e o projeto visual associado a Nicholas Roerich. Portanto, trata-se também de uma criação cênica coletiva. A célebre agitação da estreia pertence à história da recepção: não resume a partitura nem explica, sozinha, a experiência de ouvi-la hoje.',
    construction:
      'O balé se divide em duas partes, ligadas à adoração da terra e ao sacrifício. A orquestração expõe registros incomuns, como o fagote agudo da abertura. Acentos, ostinatos e justaposição de materiais podem organizar a percepção de continuidade. Uma mudança abrupta não significa ausência de construção: o corte também estabelece proporções e expectativas entre os episódios.',
    listening:
      'Escolha um episódio em que o pulso pareça reconhecível. Bata discretamente uma pulsação regular e observe os acentos que não coincidem com ela; depois abandone o gesto e escute a distribuição dos instrumentos. Registre qual estratégia revelou mais detalhes. Em outra sessão, compare o início contemplativo com uma passagem de alta densidade, sem tentar percorrer toda a obra de uma vez.',
    perspective:
      'Evite reduzir o balé a uma representação fiel de um ritual ancestral. O passado é imaginado e transformado por artistas do início do século XX, para uma produção situada em Paris. Também não presuma que toda dissonância seja um gesto de violência: descreva primeiro registro, duração e articulação, deixando a interpretação emocional como hipótese pessoal e revisável.',
    inclusion:
      'É uma porta de entrada para reconhecer o ritmo como princípio de forma, e não apenas como acompanhamento de uma melodia. A comparação com Mosolov testa o papel da repetição; com Bartók, a distribuição da energia; com Debussy, a percepção de transição e de corte. Essas aproximações são propostas pedagógicas: não constituem, por si, provas de influência entre as obras.',
    sources: [
      {
        label: 'The Rite of Spring Project — documentação e contexto do balé',
        url: 'https://www.riteofspringproject.org/',
      },
    ],
  },
  quarteto8: {
    history:
      'O quarteto foi composto em 1960 durante uma estadia de Shostakovich em Dresden. A dedicatória às vítimas do fascismo e da guerra convive com fortes marcas de autorreferência musical. A coexistência desses elementos pede cuidado: o documento público, as citações e os relatos biográficos não têm exatamente o mesmo estatuto e não precisam produzir uma interpretação única.',
    construction:
      'Cinco movimentos se encadeiam sem interrupção. O motivo DSCH corresponde, na notação alemã, a ré, mi bemol, dó e si, formando uma assinatura do compositor. Citações de outras obras atravessam o percurso. A identidade das alturas é apenas parte do reconhecimento: registro, velocidade, intensidade e distribuição entre os quatro instrumentos alteram a maneira como o motivo se apresenta.',
    listening:
      'Na primeira sessão, procure somente o desenho das quatro notas. Não interrompa a reprodução quando perder o fio: espere outro retorno e anote o que tornou esse retorno reconhecível. Depois compare um trecho lento e um rápido, perguntando se a ideia parece cantar, insistir ou interromper. Use palavras descritivas antes de associar cada passagem a um acontecimento da vida do autor.',
    perspective:
      'Leituras autobiográficas são relevantes, mas a obra não funciona como um diário cujo código teria uma solução definitiva. Evite também transformar todo contraste em mensagem política secreta. A dedicatória é documentada; sensações como ameaça, luto ou resistência são interpretações que precisam admitir outras escutas. Ao consultar um relato, pergunte quem o produziu, em que momento e com que evidências.',
    inclusion:
      'A formação reduzida facilita acompanhar a circulação de uma ideia, enquanto a rede de retornos oferece profundidade para muitas revisitas. Compare com a memória de longa duração em Weinberg e com as mudanças de linguagem em Schnittke. O objetivo não é decidir qual obra expressa mais sofrimento, mas observar como recursos musicais diferentes tornam a lembrança perceptível ao ouvinte.',
    sources: [
      {
        label:
          'Los Angeles Philharmonic — Quarteto nº 8: composição, dedicatória e motivo',
        url: 'https://www.laphil.com/works/string-quartet-no-8-in-c-minor-op-110',
      },
    ],
  },
  extase: {
    history:
      'Concluído em 1908, O poema do êxtase pertence ao período em que Scriabin aproximava composição, poesia e especulação espiritual. A obra estreou em Nova York sob a direção de Modest Altschuler. Essa circulação internacional importa: uma formação vinculada ao Império Russo não significa que a vida pública de uma partitura se limite ao território de sua origem.',
    construction:
      'A obra se desenvolve em um movimento para grande orquestra. Gestos solistas e expansões coletivas estabelecem contrastes de escala; a escrita harmônica prolonga a expectativa de chegada. O título e o universo poético do compositor oferecem referências, mas uma descrição de forma pode começar por eventos sonoros concretos: entrada de uma linha, crescimento de densidade, interrupção e retomada.',
    listening:
      'Escolha uma aproximação de clímax e marque mentalmente três estados: início do acúmulo, ponto em que você espera uma chegada e momento em que reconhece essa chegada. Na segunda escuta, investigue o que mudou entre os estados. Foram acrescentados instrumentos? O registro se abriu? A dinâmica cresceu? Compare suas respostas sem exigir que a mesma passagem produza sempre a mesma sensação.',
    perspective:
      'Não é necessário compartilhar as crenças de Scriabin para acompanhar a composição. A palavra êxtase pode despertar uma expectativa tão forte que obscureça pequenos detalhes de articulação e cor. Experimente suspender essa expectativa por alguns minutos. Tampouco use uma impressão de liberdade sonora como prova de ausência de técnica: uma experiência aparentemente ilimitada pode depender de decisões muito precisas.',
    inclusion:
      'Scriabin amplia o modernismo para além da oposição simplista entre tradição tonal e ruptura absoluta. Aqui, interessa aprender a escutar a demora e o desejo de resolução. A aproximação com Icarus propõe investigar como títulos moldam a imaginação; a relação com Stravinsky permite comparar diferentes maneiras de organizar a energia orquestral, sem pressupor uma trajetória histórica inevitável de um para o outro.',
    sources: [
      {
        label: 'Los Angeles Philharmonic — The Poem of Ecstasy',
        url: 'https://www.laphil.com/works/the-poem-of-ecstasy',
      },
    ],
  },
  fabrica: {
    history:
      'A fundição de ferro, composta em 1926–1927, nasceu associada ao projeto de balé Aço e ganhou circulação como peça orquestral independente. Insere-se nas experiências soviéticas dos anos 1920, quando imaginários industriais participavam dos debates artísticos. Esse momento não deve ser tratado como equivalente a todas as políticas culturais posteriores da União Soviética: há diferenças de período, instituição e linguagem.',
    construction:
      'A duração breve torna perceptível a acumulação de figuras repetidas. O termo ostinato ajuda a nomear a persistência de um padrão, mas não descreve sozinho tudo o que ocorre ao redor dele. Entradas instrumentais, densidade e articulação podem transformar uma superfície aparentemente regular. A metáfora da máquina é um ponto de acesso; a organização dos materiais merece atenção própria.',
    listening:
      'Faça duas escutas consecutivas. Na primeira, escolha uma figura que pareça insistir e acompanhe apenas sua permanência. Na segunda, ignore deliberadamente essa figura e procure o que se acrescenta, desaparece ou muda de registro. Compare os registros no diário. Você pode descobrir que a impressão de movimento depende menos da mudança do padrão do que da transformação de sua vizinhança sonora.',
    perspective:
      'Não confunda representação artística da indústria com gravação literal de uma fábrica. Também não deduza entusiasmo político individual apenas do título: uma obra circula em circunstâncias históricas mais complexas do que uma palavra sugere. Ao descrever a escuta, separe a associação imaginativa com engrenagens da observação verificável de ataques, repetições e camadas, permitindo que ambas coexistam sem se substituírem.',
    inclusion:
      'É uma entrada curta e produtiva para revisitar um mesmo objeto sem fadiga de duração. Ao lado de Roslavets, impede reduzir a experimentação soviética a uma estética homogênea. Em comparação com O pêndulo de Foucault, ajuda a distinguir uma imagem de regularidade industrial de processos em que a própria pulsação emerge de transformações do som. A relação proposta é editorial, não uma genealogia.',
    sources: [
      {
        label: 'Melodiya — encarte documental com A fundição de ferro',
        url: 'https://melody.su/upload/iblock/b2c/b2c1a2d49d803a99adbfb7e0828f409d.pdf',
      },
      {
        label:
          'Gresham College — Modernism Rampant, contexto musical soviético',
        url: 'https://www.gresham.ac.uk/watch-now/modernism-rampant',
      },
    ],
  },
  prokofiev: {
    history:
      'Concluída em 1942, a sétima sonata integra o conjunto das sonatas de números seis, sete e oito, frequentemente chamado de sonatas de guerra. O rótulo situa parte de sua recepção e cronologia; não fornece um roteiro literal dos acontecimentos representados. A composição de uma obra pode atravessar vários anos, de modo que a data final não descreve todo o processo criativo.',
    construction:
      'Os três movimentos contrastam impulso incisivo, uma região de maior cantabilidade e um final motor. No último, o compasso de sete tempos permite experimentar um agrupamento assimétrico, como 2+3+2. Uma mesma fonte sonora, o piano, produz planos muito diferentes por meio de ataque, registro, pedal e articulação. O instrumento pode sugerir percussão sem deixar de sustentar linhas e ressonâncias.',
    listening:
      'Comece pelo último movimento e tente agrupar os pulsos sem acelerar as partes mais curtas. Quando o padrão se tornar familiar, pare de contar e observe se ele permanece perceptível no corpo. Em outra sessão, volte ao movimento lento e compare o modo como as notas se conectam. Registre uma diferença de articulação, não apenas uma oposição entre agitação e calma.',
    perspective:
      'A familiaridade com uma métrica não exige saber escrever seu compasso. Se a contagem atrapalhar, acompanhe uma célula curta ou simplesmente observe a recorrência de acentos. Evite tomar a dificuldade pianística como medida exclusiva de valor ou supor que a velocidade explica o efeito inteiro. Interpretações distintas podem alterar clareza, peso e continuidade sem mudar a identidade da obra.',
    inclusion:
      'A sonata oferece uma experiência concentrada de contraste e permite reconhecer uma assimetria com a própria escuta. Serve de ligação entre a energia de Stravinsky, a insistência de Mosolov e o estudo do ataque em outras formações. O objetivo pedagógico não é reduzir a peça a seu final famoso, mas usar esse ponto de entrada para retornar aos três movimentos como um percurso.',
    sources: [
      {
        label: 'PTNA Piano Encyclopedia — Sonata nº 7, cronologia e ficha',
        url: 'https://enc.piano.or.jp/en/musics/235',
      },
      {
        label: 'Los Angeles Philharmonic — programa com contexto da sonata',
        url: 'https://www.laphil.com/posts/pianist-yefim-bronfman-performs-works-by-beethoven-salonen-rachmaninoff-and-prokofiev-in-first-recital-of-2002-2003-celebrity-recital-series',
      },
    ],
  },
  schnittke: {
    history:
      'O Concerto grosso nº 1, de 1977, recupera no título uma forma histórica de confronto e diálogo entre solistas e conjunto. A referência não implica restauração de uma época passada. Schnittke trabalha em um contexto soviético tardio, no qual materiais herdados podem reaparecer em situações muito diferentes daquelas que os tornaram inicialmente reconhecíveis.',
    construction:
      'A instrumentação reúne dois violinos solistas, cravo, piano preparado e cordas. A diferença entre os teclados já oferece uma pista de contraste tímbrico. A convivência de referências estilísticas torna útil a noção de poliestilismo, desde que ela não substitua a observação de cada passagem: interessa saber como uma linguagem chega, quanto permanece e o que acontece quando outra a interrompe.',
    listening:
      'Escolha uma mudança que faça você pensar em outra época. Anote o sinal concreto que provocou essa associação: um ritmo de dança, uma maneira de acompanhar, um timbre ou um gesto melódico. Depois escute os segundos anteriores e posteriores ao ponto escolhido. A transição prepara a novidade, expõe uma fratura ou torna difícil localizar exatamente quando uma linguagem cedeu espaço?',
    perspective:
      'Reconhecer uma referência não resolve seu sentido. Um gesto antigo pode soar afetuoso, mecânico, irônico ou inquietante conforme seu entorno e a interpretação. Evite afirmar ironia como se fosse uma propriedade audível indiscutível. Também não trate poliestilismo como sinônimo de qualquer mistura: a pergunta relevante é como as diferenças de linguagem participam da experiência de forma e de memória.',
    inclusion:
      'A obra transforma o reconhecimento em problema de escuta: perceber algo familiar pode aumentar, e não eliminar, o estranhamento. Compare com a adaptação de Bizet em Shchedrin e com a transformação temática de Gubaidulina. Essas três situações não são equivalentes. Distingui-las ajuda a passar de uma ideia vaga de música que cita o passado para descrições mais precisas de procedimentos e efeitos.',
    sources: [
      {
        label: 'Boosey & Hawkes / Sikorski — Concerto grosso nº 1, catálogo',
        url: 'https://www.boosey.com/pages/cr/catalogue/cat_detail?=&langid=2&musicid=5162',
      },
    ],
  },
  offertorium: {
    history:
      'Offertorium foi composto em 1980 e revisto em 1982 e 1986. A obra se relaciona ao violinista Gidon Kremer e à circulação internacional da música de Gubaidulina. Sua referência a Bach participa de uma elaboração espiritual e composicional, mas a identificação dessa referência é apenas uma das portas de entrada disponíveis para quem ainda não conhece o material de origem.',
    construction:
      'O concerto toma como referência o tema ligado à Oferenda Musical de Bach. Processos de retirada e transformação de material articulam sua concepção; não se trata simplesmente de ouvir uma melodia antiga acompanhada por uma orquestra moderna. A relação entre solista e conjunto permite investigar continuidade, desaparecimento e reaparição em diferentes escalas, do detalhe instrumental ao arco de duração mais amplo.',
    listening:
      'Na primeira sessão, siga apenas o violino e observe quando ele emerge com nitidez ou parece envolvido pelo conjunto. Na segunda, concentre-se nas transferências de material entre instrumentos. Não é obrigatório reconhecer cada transformação do tema: registre mudanças de perfil, textura e direção. Compare o começo e o fim, perguntando que tipo de continuidade você consegue sustentar na memória.',
    perspective:
      'Uma leitura simbólica de oferta, sacrifício ou transfiguração ajuda a compreender o horizonte da compositora, mas não deve converter sua experiência em teste de crença. Também é legítimo ouvir processos materiais sem aderir à interpretação espiritual. Distinguir essas camadas evita dois extremos: reduzir a música a um programa verbal ou ignorar referências que fazem parte de sua concepção documentada.',
    inclusion:
      'A peça permite investigar transformação em vez de mera repetição e amplia a presença de compositoras no núcleo ligado à União Soviética e à diáspora. O encontro com Messiaen propõe comparar diferentes relações entre espiritualidade e duração; com Schnittke, distintas formas de mobilizar o passado. Em ambos os casos, a aproximação é uma ferramenta para escutar diferenças, não para apagar singularidades.',
    sources: [
      {
        label: 'Boosey & Hawkes — Offertorium',
        url: 'https://www.boosey.com/cr/music/Sofia-Gubaidulina-Offertorium/6672',
      },
      {
        label: 'Catálogo da compositora — versões e revisões',
        url: 'https://www.boosey.com/downloads/gubaidulina_werkverzeichnis.pdf',
      },
    ],
  },
  ustvolskaya: {
    history:
      'A Composição nº 2, Dies irae, pertence a 1972–1973; o catálogo do site usa o ano de conclusão. Ustvolskaya desenvolveu uma produção de perfil muito próprio no contexto soviético. O título aproxima a obra de um horizonte religioso, mas sua existência nesse contexto não autoriza preencher todas as lacunas documentais com uma narrativa de resistência política ou de isolamento absoluto.',
    construction:
      'O conjunto reúne oito contrabaixos, piano e um cubo ou caixa de madeira percutido. Essa escolha concentra a atenção em registro, ataque, peso e ressonância. Antes de procurar uma melodia principal, vale distinguir os diferentes modos de produzir e interromper o som. A restrição da paleta instrumental não impede contrastes: pequenas alterações podem adquirir grande importância em uma superfície insistente.',
    listening:
      'Ouça um trecho em volume confortável, sem tentar reproduzir fisicamente o impacto de uma sala de concerto. Compare o início do som da madeira com o do piano e depois acompanhe o que resta de cada ataque. Em outra escuta, preste atenção aos contrabaixos. Descreva a relação entre massa e detalhe, registrando se a repetição torna diferenças mais ou menos perceptíveis.',
    perspective:
      'Não transforme intensidade em obrigação de sentir angústia. A sua resposta pode mudar entre sessões, e uma sensação corporal não precisa ser traduzida imediatamente em mensagem. O título Dies irae tampouco basta para afirmar uma citação de determinado canto em cada passagem. A cautela é parte da escuta: reconhecer o limite do que você identificou preserva a possibilidade de descobrir mais.',
    inclusion:
      'A obra desafia a expectativa de que variedade dependa sempre de muitos materiais. É uma oportunidade de investigar concentração, persistência e materialidade. A relação com Ligeti confronta dois caminhos muito distintos para ouvir massas sonoras; com Saunders, a atenção ao início e ao fim dos sons. São lentes de comparação, não afirmações de equivalência estilística ou de influência direta.',
    sources: [
      {
        label: 'Arquivo de Galina Ustvolskaya — catálogo de obras',
        url: 'https://ustvolskaya.org/eng/catalog.php',
      },
      {
        label: 'Sikorski — documentação da instrumentação de Dies irae',
        url: 'https://www.boosey.com/downloads/sikorski_magazin_2018_01.pdf',
      },
    ],
  },
  debussy: {
    history:
      'La Mer foi composta entre 1903 e 1905 e apresentada como três esboços sinfônicos. O mar, as artes visuais e a imaginação do compositor fazem parte de seu horizonte, mas não transformam a partitura em uma reprodução acústica de paisagens. Sua circulação francesa oferece um contraponto ao núcleo russo do atlas, sem pressupor que fronteiras nacionais determinem linguagens isoladas.',
    construction:
      'Os três movimentos recebem títulos associados ao percurso da manhã ao meio-dia, ao jogo das ondas e ao diálogo do vento com o mar. Fragmentos, cores instrumentais e mudanças de intensidade articulam a experiência. A palavra esboço não significa ausência de elaboração: o ouvinte pode reconhecer direção e retorno mesmo quando não encontra uma melodia longa dominando toda a textura.',
    listening:
      'Escolha um gesto curto e tente acompanhá-lo quando sua cor mudar. Se não conseguir, passe a observar apenas a densidade: quantos planos você percebe em determinado momento? Em seguida, compare uma transição suave com outra que pareça romper o fluxo. Faça anotações sobre eventos sonoros antes de usar imagens de ondas, espuma ou tempestade; depois veja o que essas imagens acrescentam.',
    perspective:
      'O rótulo impressionismo pode ser uma referência histórica útil, mas não deve virar explicação automática para qualquer passagem vaga ou delicada. Há ataques definidos, contrastes e direcionalidade a investigar. Também não é necessário reconhecer um mar específico. A experiência imaginativa ganha precisão quando você sabe distinguir uma associação pessoal de uma informação do título ou de uma observação da partitura.',
    inclusion:
      'La Mer ajuda a ouvir cor e transformação como elementos estruturais. O contraste com a Sagração põe à prova uma primeira oposição entre fluxo e bloco, que deve ser refinada a cada escuta. O diálogo editorial com Saariaho estende a pergunta ao século XXI: o que faz uma mudança de timbre ser percebida como mudança de forma, mesmo sem um tema em primeiro plano?',
    sources: [
      {
        label: 'Los Angeles Philharmonic — La Mer, composição e movimentos',
        url: 'https://www.laphil.com/works/la-mer',
      },
    ],
  },
  schoenberg: {
    history:
      'Pierrot lunaire foi composto em 1912 sobre poemas de Albert Giraud, em tradução alemã de Otto Erich Hartleben. A encomenda de Albertine Zehme participa de uma cultura de recitação e apresentação cênica. O ciclo precede a formulação do método de composição com doze sons: chamar sua linguagem de atonal não significa classificá-la automaticamente como dodecafônica.',
    construction:
      'São 21 melodramas para voz e pequeno conjunto, organizados em três grupos de sete. A Sprechstimme situa a emissão em uma relação particular entre falar e cantar. As combinações instrumentais variam, de modo que o conjunto não precisa soar sempre como um bloco. Texto, contorno, gesto e recorrência de figuras podem orientar a escuta mesmo sem uma tônica estável.',
    listening:
      'Escolha um único número do ciclo. Ouça primeiro a voz como gesto: subida, queda, interrupção, sustentação. Depois acompanhe um instrumento e observe suas relações com a emissão vocal. Somente então consulte o poema em uma tradução confiável. Registre o que o texto modificou na percepção, sem invalidar a primeira experiência. Uma sessão curta e repetida pode revelar mais do que percorrer os 21 números distraidamente.',
    perspective:
      'Estranhamento não é sinônimo de desorganização, e compreender não exige começar por uma análise de alturas. Tampouco trate a Sprechstimme como uma técnica sem regras ou como canto simplesmente desafinado. As realizações variam entre intérpretes; essa variação é uma oportunidade de comparar escolhas, não uma razão para supor que qualquer emissão produz necessariamente o mesmo resultado musical.',
    inclusion:
      'O ciclo amplia as formas de ouvir a voz e fornece uma entrada concreta para a atonalidade sem exigir um curso prévio de harmonia. Em comparação com Denisov, interessa a relação entre texto e conjunto; com Saunders, os limites entre presença vocal e textura. A proximidade temporal com a Sagração também revela que a modernidade musical não segue uma única direção técnica ou estética.',
    sources: [
      {
        label: 'Arnold Schönberg Center — cronologia do compositor',
        url: 'https://schoenberg.at/en/schoenberg/timeline',
      },
      {
        label: 'IRCAM — Pierrot lunaire, ficha da obra',
        url: 'https://ressources.ircam.fr/en/work/pierrot-lunaire-op.-21',
      },
    ],
  },
  ligeti: {
    history:
      'Atmosphères, de 1961, pertence à trajetória europeia de Ligeti após sua saída da Hungria. O compositor tornou-se uma referência para a investigação de texturas orquestrais densas. Sua circulação posterior no cinema ampliou o público da obra, mas a partitura não precisa ser ouvida como trilha de uma imagem específica: ela possui uma organização temporal que pode ser explorada autonomamente.',
    construction:
      'A micropolifonia designa o entrelaçamento de linhas que tendem a ser percebidas como uma textura global, em vez de melodias separadas. Densidade, registro e transformação interna assumem papel central na orientação da escuta. Uma aparente imobilidade da massa pode coexistir com atividade detalhada. Por isso, não encontrar um pulso saliente ou uma melodia destacada não significa que nada esteja acontecendo.',
    listening:
      'Na primeira escuta, acompanhe somente a fronteira superior do som: ela sobe, desce, desaparece? Na segunda, concentre-se na região grave. Depois compare as duas descrições e tente ouvir a distância entre esses limites. Não se preocupe em identificar todos os instrumentos. Um pequeno vocabulário de densidade, largura, continuidade e contraste já permite registrar transformações que antes passavam despercebidas.',
    perspective:
      'Evite chamar qualquer acorde denso de micropolifonia. O conceito envolve uma organização de linhas, não apenas o resultado de muitas notas simultâneas. Ao mesmo tempo, você não precisa comprovar cada detalhe na partitura para ter uma experiência significativa. Separe o recurso técnico descrito pelas fontes da metáfora que escolhe para narrar sua percepção, como nuvem, superfície ou espaço.',
    inclusion:
      'A duração relativamente curta permite revisitas focadas e oferece uma alternativa à escuta centrada em temas. A comparação com Debussy e Saariaho investiga transformações de cor em linguagens diferentes; com Ustvolskaya, a relação entre massa e material. O objetivo não é colocar tudo sob o rótulo de música atmosférica, mas aprender a perceber diferenças dentro de fenômenos inicialmente parecidos.',
    sources: [
      {
        label: 'Schott Music — Atmosphères, catálogo editorial',
        url: 'https://schottmusiclondon.com/atmospheres-no96536.html',
      },
    ],
  },
  part: {
    history:
      'Fratres foi concebida em 1977, inicialmente sem uma instrumentação fixa, e ganhou numerosas versões. Pärt é um compositor estoniano cuja trajetória atravessa o contexto soviético e a emigração. Esses dados não são sinônimos: a inclusão no entorno histórico do núcleo russo não autoriza absorver sua identidade estoniana em uma categoria nacional diferente.',
    construction:
      'A obra se relaciona à linguagem tintinnabuli de Pärt, na qual linhas melódicas e notas de uma tríade entram em relações reguladas. As diferentes versões conservam uma identidade reconhecível, mas alteram registro, ataque, sustentação e duração percebida. Por isso, os onze minutos indicados no catálogo são apenas uma referência aproximada: ao escolher uma gravação, registre também sua instrumentação.',
    listening:
      'Ouça duas versões, preferencialmente com formações bastante diferentes. Escolha um retorno reconhecível e compare o que permanece e o que muda. O silêncio parece ter o mesmo tamanho? O ataque torna a passagem mais nítida ou mais contínua? Anote a formação e os intérpretes junto de suas impressões, para não atribuir à composição uma diferença que pode depender da realização sonora.',
    perspective:
      'Não tome simplicidade aparente como ausência de trabalho composicional, nem serenidade como reação obrigatória. A repetição pode produzir concentração, tensão ou estranhamento em momentos distintos. A dimensão espiritual da recepção não elimina outras leituras. Também é importante não transformar tintinnabuli em rótulo genérico para toda música lenta: ele nomeia procedimentos, não apenas um clima ou uma preferência de andamento.',
    inclusion:
      'Fratres torna especialmente clara a diferença entre obra e gravação, central neste atlas. A comparação com as Canções silenciosas propõe observar retorno e decaimento do som sem confundir poéticas estoniana e ucraniana. Com Offertorium, a pergunta se desloca para espiritualidade e transformação. Em qualquer percurso, o teste principal continua sendo auditivo: o que você consegue reconhecer quando a superfície instrumental muda?',
    sources: [
      {
        label: 'Arvo Pärt Centre — Fratres, concepção e versões',
        url: 'https://www.arvopart.ee/en/arvo-part/work/417/',
      },
    ],
  },
  ...newDossiers,
};
