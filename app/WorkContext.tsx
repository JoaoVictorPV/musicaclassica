import { useState } from 'react';
import { BookOpen, ChevronDown, ExternalLink } from 'lucide-react';
import { dossiers, editorialRevision, type Dossier } from './context';
import type { Work } from './data';

const sections: {
  key: Exclude<keyof Dossier, 'sources'>;
  title: string;
  label: string;
}[] = [
  {
    key: 'history',
    title: 'Origem, época e circulação',
    label: 'Contexto documentado',
  },
  {
    key: 'construction',
    title: 'Como se organiza a experiência',
    label: 'Ficha e leitura musical',
  },
  {
    key: 'listening',
    title: 'Uma experiência para a próxima escuta',
    label: 'Proposta editorial',
  },
  {
    key: 'perspective',
    title: 'O que não reduzir a uma explicação',
    label: 'Cuidado interpretativo',
  },
  {
    key: 'inclusion',
    title: 'Por que esta obra está no atlas?',
    label: 'Decisão de curadoria',
  },
];

export function contextWordCount(dossier: Dossier) {
  return sections
    .map(({ key }) => dossier[key])
    .join(' ')
    .trim()
    .split(/\s+/u).length;
}

export default function WorkContext({ work }: { work: Work }) {
  const dossier = dossiers[work.id];
  const [expanded, setExpanded] = useState<string[]>([
    'history',
    'construction',
  ]);
  const allOpen = expanded.length === sections.length;
  return (
    <article
      className="essay context-dossier"
      aria-label={`Contexto de ${work.title}`}
    >
      <span className="eyebrow">03 · CADERNO DE CONTEXTO</span>
      <h2>Escutar com mais camadas.</h2>
      <p className="context-intro">{work.context}</p>
      <div className="context-toolbar">
        <span>
          <BookOpen size={16} /> {sections.length} camadas · leitura de cerca de{' '}
          {Math.ceil(
            (contextWordCount(dossier) + work.context.split(/\s+/u).length) /
              180,
          )}{' '}
          min
        </span>
        <button
          className="link-button"
          onClick={() => setExpanded(allOpen ? [] : sections.map((s) => s.key))}
        >
          {allOpen ? 'Recolher camadas' : 'Ler todas as camadas'}
        </button>
      </div>
      <p className="context-legend">
        Leia no seu ritmo. Os dados históricos se apoiam nas fontes abaixo;
        propostas de escuta, comparações e critérios de seleção são leituras
        editoriais, não respostas obrigatórias.
      </p>
      <div className="context-sections">
        {sections.map(({ key, title, label }, index) => {
          const isOpen = expanded.includes(key);
          const panelId = `context-${work.id}-${key}`;
          return (
            <section className="context-section" key={key}>
              <h3>
                <button
                  className="context-heading"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setExpanded((previous) =>
                      previous.includes(key)
                        ? previous.filter((item) => item !== key)
                        : [...previous, key],
                    )
                  }
                >
                  <span className="context-number">0{index + 1}</span>
                  <span>
                    <small>{label}</small>
                    {title}
                  </span>
                  <ChevronDown size={18} className={isOpen ? 'is-open' : ''} />
                </button>
              </h3>
              <div id={panelId} hidden={!isOpen}>
                <p>{dossier[key]}</p>
                {index < 2 && (
                  <div
                    className="context-citations"
                    aria-label="Referências desta camada"
                  >
                    Fontes de consulta:{' '}
                    {dossier.sources.map((source, i) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={source.label}
                      >
                        [{i + 1}]
                        <span className="sr-only">
                          {' '}
                          {source.label} (abre em outra aba)
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <footer className="context-sources">
        <span className="eyebrow">CONTINUE A PESQUISA</span>
        <h3>Fontes e documentação</h3>
        <ol>
          {dossier.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
                <ExternalLink size={14} aria-hidden="true" />
                <span className="sr-only"> (abre em outra aba)</span>
              </a>
            </li>
          ))}
        </ol>
        <p className="source-note">
          Revisão editorial: {editorialRevision}. As fontes permitem conferir
          catálogo e contexto; os textos não substituem uma edição crítica ou
          revisão musicológica independente. Datas podem indicar conclusão,
          revisão ou versão — as distinções aparecem acima. Durações são
          aproximadas e dependem da gravação.
        </p>
      </footer>
    </article>
  );
}
