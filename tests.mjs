import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});
try {
  const { works, paths, connections } =
    await server.ssrLoadModule('/app/data.ts');
  const { default: App, validBackup } =
    await server.ssrLoadModule('/app/page.tsx');
  const { dossiers } = await server.ssrLoadModule('/app/context.ts');
  const { default: WorkContext, contextWordCount } = await server.ssrLoadModule(
    '/app/WorkContext.tsx',
  );
  const { graphNeighborhood } = await server.ssrLoadModule('/app/graph.ts');
  const ids = new Set(works.map((w) => w.id));
  const { experiments, makeSequence, default: SonicLab } = await server.ssrLoadModule('/app/SonicLab.tsx');
  const { pathwayQuestions } = await server.ssrLoadModule('/app/journeys.ts');
  assert.equal(experiments.length, 6);
  for (const experiment of experiments) {
    for (const id of experiment.works) assert.ok(ids.has(id));
    for (const variant of ['a', 'b']) {
      const events = makeSequence(experiment.id, variant);
      assert.ok(events.length > 0);
      for (const event of events) {
        assert.ok(event.midi >= 21 && event.midi <= 108);
        assert.ok(event.beat >= 0 && event.length > 0);
        assert.ok(event.level > 0 && event.level <= 1);
      }
    }
    assert.notDeepEqual(makeSequence(experiment.id, 'a'), makeSequence(experiment.id, 'b'));
  }
  assert.ok(renderToString(React.createElement(SonicLab, {open: () => {}})).includes('Velocidade'));
  for (const path of paths) assert.equal(pathwayQuestions[path.id].length, 3);
  assert.equal(works.length, 36);
  assert.equal(ids.size, 36);
  assert.equal(paths.length, 8);
  assert.equal(new Set(works.map((w) => w.composer)).size, 36);
  assert.deepEqual(Object.keys(dossiers).sort(), [...ids].sort());
  assert.ok(
    works.some((w) => w.year > 2000),
    'The catalogue includes the 21st century',
  );
  const pathwayIds = new Set(paths.flatMap((p) => p.ids));
  let totalWords = 0;
  for (const work of works) {
    assert.ok(
      pathwayIds.has(work.id),
      `${work.id} must be included in a pathway`,
    );
    const dossier = dossiers[work.id];
    const count = contextWordCount(dossier);
    assert.ok(
      count >= 250,
      `${work.id}: expanded context has only ${count} words`,
    );
    totalWords += count;
    assert.ok(dossier.sources.length >= 1);
    for (const source of dossier.sources) {
      assert.equal(new URL(source.url).protocol, 'https:');
      assert.ok(source.label.length > 10);
    }
    const article = renderToString(React.createElement(WorkContext, { work }));
    for (const key of [
      'history',
      'construction',
      'listening',
      'perspective',
      'inclusion',
    ]) {
      assert.ok(dossier[key].length > 100);
      assert.ok(article.includes(`context-${work.id}-${key}`));
    }
    assert.ok(article.includes('Fontes e documentação'));
    assert.ok(article.includes('aria-expanded="true"'));
    assert.ok(article.includes('aria-expanded="false"'));
    const graph = graphNeighborhood(work.id);
    assert.equal(graph.nodes[0].id, work.id);
    assert.ok(graph.edges.length > 0, `${work.id} is disconnected`);
    assert.equal(
      new Set(graph.nodes.map((w) => w.id)).size,
      graph.nodes.length,
    );
    for (const node of graph.nodes) {
      const { x, y } = graph.position(node.id);
      assert.ok(x >= 0 && x <= 800 && y >= 0 && y <= 550);
    }
    for (const [a, b] of graph.edges) {
      assert.ok(a === work.id || b === work.id);
      assert.ok(
        graph.nodes.some((w) => w.id === a) &&
          graph.nodes.some((w) => w.id === b),
      );
    }
  }
  for (const path of paths)
    for (const id of path.ids)
      assert.ok(ids.has(id), `Unknown path work ${id}`);
  for (const [a, b, type, reason] of connections) {
    assert.ok(ids.has(a) && ids.has(b));
    assert.ok(type && reason);
  }
  for (const w of works) {
    assert.equal(w.listen.length, 3);
    assert.ok(new URL(w.source).protocol === 'https:');
    if (w.video) assert.match(w.video, /^[\w-]{11}$/);
  }
  const backup = {
    version: 1,
    notes: [],
    progress: {},
    bookmarks: {},
    videos: {},
    last: 'sacre',
    name: '',
  };
  assert.ok(validBackup(backup));
  assert.ok(!validBackup(null));
  assert.ok(!validBackup({ ...backup, notes: [null] }));
  assert.ok(!validBackup({ ...backup, progress: { sacre: { heard: 'yes' } } }));
  assert.ok(
    !validBackup({ ...backup, videos: { sacre: 'javascript:alert(1)' } }),
  );
  const note = {
    id: 'test',
    workId: 'sacre',
    text: 'Ouvi camadas.',
    date: new Date().toISOString(),
    time: 25,
    videoId: '5iP3jjNDb4o',
  };
  assert.ok(validBackup({ ...backup, notes: [note] }));
  assert.ok(
    validBackup({
      ...backup,
      last: 'saunders',
      progress: { saunders: { heard: true } },
      notes: [note, { ...note, id: 'new-work', workId: 'saunders' }],
    }),
  );
  assert.ok(!validBackup({ ...backup, notes: [{ ...note, time: -5 }] }));
  assert.ok(!validBackup({ ...backup, notes: [{ ...note, date: 'invalid' }] }));
  const html = renderToString(React.createElement(App));
  assert.ok(html.includes('Iniciar escuta guiada'));
  assert.ok(html.includes('Acervo Clássico'));
  assert.ok(html.includes('Catálogo musical'));
  assert.ok(html.includes('Repertório francês'));
  for (const slogan of ['A música permanece', 'Seu ouvido se transforma', 'Você não gostou', 'OUVIR · PERCEBER · DESCOBRIR', 'Um atlas para construir seu ouvido']) {
    assert.ok(!html.includes(slogan), `Slogan removido não deve voltar: ${slogan}`);
  }
  assert.ok(validBackup({ ...backup, last: 'boulanger', progress: { boulanger: {heard: true} } }));
  assert.ok(html.includes('A sagração da primavera'));
  assert.ok(!html.includes('Building your site'));
  console.log(
    `PASS: 36 works / 36 composers; ${totalWords} words across all 36 context dossiers; pathway coverage, graph neighborhoods, sources, legacy and expanded backups, all context renders and initial React render.`,
  );
} finally {
  await server.close();
}
