# Acervo Clássico — Atlas de escuta

Nome anterior: Constelação. O inicializador portátil antigo conserva seu nome de arquivo por compatibilidade; o site publicado e este código usam a nova identidade. A atualização do GitHub não atualiza automaticamente uma cópia portátil já baixada.

## Abrir o site

As instruções desta seção são para o **pacote portátil Windows**. Se você baixou somente o repositório GitHub, siga o `README.md`: runtime, executável e build não são versionados.

Dê dois cliques em **Constelacao.exe**. O Chrome abre o atlas em `http://127.0.0.1:4173/`. Se o Chrome não estiver instalado, será usado o navegador padrão.

O pacote inclui um runtime Node.js portátil: nenhuma instalação, terminal ou conta é necessária. Mantenha as pastas `runtime` e `dist` junto de `Constelacao.exe` e `server.cjs`. O executável é um inicializador Windows, não um instalador. Seu código-fonte está em `Launcher.cs`.

Se a porta 4173 estiver ocupada, encerre a outra instância que a utiliza e abra novamente. O servidor escuta somente neste computador. Ele encerra automaticamente após 15 minutos sem requisições do navegador.

## O que funciona nesta edição

- 36 obras de 36 autores, cada uma com cinco camadas de contexto, perguntas próprias de escuta e fontes documentais.
- Busca por títulos, conceitos, nomes latinos e nomes em cirílico.
- Filtros de linguagem e foco geográfico.
- Oito percursos com progresso declarado, perguntas e retomada na próxima obra.
- Reprodutor YouTube, com escolha de vídeo, posição, pausa e marcação de instante.
- Diário: criar, editar, pesquisar, exportar e importar notas.
- Gosto, familiaridade e compreensão registrados separadamente.
- Atlas interativo por vizinhança, seletor das 36 obras, 44 relações, cronologia e comparação de obras.
- Coleção pessoal e marcação para revisão.
- Laboratório com seis experiências A/B ajustáveis e os quatro exemplos anteriores de ostinato, polirritmia, timbre e motivo.
- Interface responsiva com navegação por teclado.

## Reprodução e internet

O catálogo, diário e laboratório funcionam localmente. As gravações do YouTube precisam de internet e podem estar indisponíveis ou bloquear incorporação. Duas obras possuem gravações previamente identificadas; nas demais, use **Escolher gravação** para buscar uma interpretação e colar o endereço do YouTube. Nenhum áudio comercial foi baixado ou redistribuído.

O HTML da aplicação é `dist/index.html`, servido automaticamente pelo executável. Abrir esse HTML diretamente pelo protocolo `file://` pode bloquear módulos e incorporações; use o executável.

## Seus dados

Anotações e progresso são salvos no armazenamento local do navegador, no endereço `http://127.0.0.1:4173`. Eles sobrevivem ao fechamento e à reinicialização, mas podem ser removidos quando você limpa os dados do navegador. O OneDrive NÃO sincroniza esse armazenamento. Use **Preferências → Exportar backup completo** regularmente. Importar mescla notas sem apagar as existentes.

## Limites desta edição

O corpus cobre os séculos XIX a XXI. Os textos ampliados distinguem contexto documentado e propostas editoriais de escuta, mas não constituem revisão musicológica independente. O guia socrático utiliza perguntas escritas: **não há modelo de IA conectado**. O progresso é autodeclarado; não equivale a uma avaliação objetiva de domínio. Os lembretes de revisão aparecem ao retornar ao site; não enviam notificações. O conteúdo é uma edição fixa, não uma atualização automática de notícias ou novas obras.

Supabase, login e sincronização na nuvem ainda não estão conectados. Não coloque chaves secretas no código do navegador. O produto completo do planejamento original exige etapas adicionais de conteúdo, backend e tutoria.

## Desenvolvimento

Requer Node.js 22.13 ou superior (o runtime incluído pode ser usado), npm e internet na instalação de dependências.

```text
npm ci
npm run dev
npm run build
npm start
```

A aplicação usa React, TypeScript e Vite, com componentes acessíveis Base UI. O build gera os arquivos públicos em `dist`. `server.cjs` não usa dependências externas. O scaffold Sites foi adaptado para distribuição estática e execução local, conforme solicitado.

## Publicar futuramente na Vercel

Importe o repositório na Vercel. O arquivo `vercel.json` define o build `npm run build` e a pasta `dist`. Neste repositório, o GitHub Pages já publica automaticamente os envios à branch main pelo workflow de publicação. Na nova origem, importe um backup para transferir suas anotações locais. `node_modules`, runtime, executáveis e dados pessoais não devem ser versionados.

## Recompilar o inicializador

O compilador C# do .NET Framework pode compilar `Launcher.cs` como aplicação Windows, com referência a `System.Windows.Forms.dll`. O runtime portátil inclui a licença original do Node.js. O executável gerado localmente não tem assinatura digital comercial.
