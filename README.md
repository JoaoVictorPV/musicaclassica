# Acervo Clássico

Um espaço pessoal de formação musical: Europa e diásporas, com núcleos russos e franceses, sem confundir identidades nacionais. Antes chamado Constelação, agora combina carvão, laranja vibrante e tons pastel com arte vetorial responsiva.

## Edição ampliada · outubro de 2026

- **36 obras e 36 compositores e compositoras**, incluindo 12 novas entradas francesas.
- Séculos XIX a XXI, mantendo o núcleo russo e as trajetórias contemporâneas.
- **36 cadernos de contexto**, com cinco camadas: história, organização musical, experiência de escuta, cuidado interpretativo e justificativa de curadoria. Mais de 11 mil palavras de contexto, além dos resumos.
- Fontes institucionais, editoriais e de compositores, separadas das propostas de interpretação.
- Oito percursos com perguntas e retomada, 44 relações explicadas, busca, filtro francês, cronologia e atlas por vizinhanças.
- Diário, favoritos, progresso e backup local preservados; 12 conceitos e laboratório sonoro.
- Seis experimentos A/B com velocidade, volume e parada: escalas, acordes, métrica, densidade, envelope e inversão de motivo. Quatro exemplos curtos anteriores mantidos. Síntese didática, não trechos das partituras.

Esta expansão acrescenta Ravel, Berlioz, Saint-Saëns, Fauré, Bizet, Dukas, Chausson, Lili Boulanger, Germaine Tailleferre, Poulenc, Satie e Roussel. Uma entrada por autor. Durações são aproximadas; datas de versões e revisões são explicadas nas respectivas páginas. Alguns catálogos institucionais bloquearam consulta integral: as limitações estão identificadas nas referências, sem inventar detalhes para preencher lacunas.

## Executar a partir do repositório

Instale **Node.js 22.22 ou superior compatível** e, na pasta do projeto:

```sh
npm ci
npm run dev
```

Abra o endereço local informado. Para executar o site compilado:

```sh
npm run typecheck
npm test
npm run build
npm start
```

O servidor local abre em `http://127.0.0.1:4173`. Não o exponha como servidor público; para hospedagem, publique os arquivos estáticos de `dist` em um provedor apropriado. O projeto usa React, TypeScript e Vite. Não exige banco de dados para as funções atuais.

## Hospedagem

Site público: **https://joaovictorpv.github.io/musicaclassica/**.

O workflow `.github/workflows/pages.yml` testa, compila e publica somente a pasta `dist` a cada envio para `main`. Em **Settings → Pages → Build and deployment**, a origem deve ser **GitHub Actions**, não a pasta raiz da branch. Publicar o `index.html` do código-fonte diretamente causa uma página em branco, pois o navegador não executa os arquivos TypeScript sem compilação.

O caminho base é relativo e a navegação usa fragmentos de URL, compatíveis com o subdiretório do GitHub Pages. O workflow `check.yml` mantém as verificações independentes, inclusive para pull requests. A Vercel também pode importar este repositório: `npm run build`, pasta de saída `dist`.

## Persistência e privacidade

O diário é salvo no navegador, por origem, com a chave histórica `constelacao:v1`. A mudança de nome preserva os identificadores das 24 obras anteriores e o formato de backup. Dados pessoais não são enviados ao repositório. Limpar dados do navegador pode apagá-los; exporte um backup regularmente. Ao trocar de endereço local para uma hospedagem, importe o backup na nova origem. Não há sincronização entre dispositivos nem serviço de IA conectado.

## Áudio e curadoria

O site não redistribui gravações comerciais. Duas obras mantêm vídeos previamente identificados; nas demais, a opção **Escolher gravação** permite buscar e usar uma interpretação disponível no YouTube. Disponibilidade e incorporação dependem do provedor. As 36 entradas não significam 36 gravações incorporadas. O laboratório gera sons com Web Audio, começa em volume baixo e só toca por ação do usuário. Ao trocar de experiência ou ajustar controles, a reprodução para.

O conteúdo é uma edição editorial datada, não um feed automático. Informações históricas e de catálogo possuem fontes nas páginas. Exercícios, comparações e critérios de inclusão são propostas editoriais, não provas de influência nem revisão musicológica independente. O catálogo inclui tradições ucraniana, estoniana e judaica polonesa sem absorvê-las na identidade russa.

## Arquivos principais

- `app/data.ts` e `app/additions.ts`: obras, percursos, conceitos e relações.
- `app/context.ts` e `app/context-additions.ts`: textos e bibliografia por obra.
- `app/WorkContext.tsx`: leitura progressiva e referências.
- `app/graph.ts`: vizinhanças do atlas, sem quantidade fixa de nós.
- `app/french-additions.ts` e `app/context-french.ts`: expansão francesa e bibliografia.
- `app/journeys.ts`: novos percursos, perguntas e relações explícitas.
- `app/SonicLab.tsx`: seis experiências A/B, parâmetros e sequências testáveis.
- `app/ResonanceArt.tsx` e `app/acervo.css`: identidade vetorial e layout responsivo.
- `tests.mjs`: integridade editorial, cobertura, renderização e compatibilidade dos backups.

O pacote portátil Windows anteriormente entregue contém runtime e executável. Eles **não são incluídos neste repositório**, assim como `node_modules`, arquivos de ambiente, builds gerados e dados pessoais. `Launcher.cs` e `server.cjs` preservam o código do inicializador; consulte `LEIA-ME.md` para o pacote portátil.
