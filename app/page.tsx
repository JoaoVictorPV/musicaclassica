import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Headphones,
  Search,
  Compass,
  BookOpen,
  Orbit,
  Route,
  SlidersHorizontal,
  ChevronLeft,
  Play,
  Pause,
  Heart,
  Plus,
  Download,
  Upload,
  Check,
  Music2,
  X,
  ExternalLink,
  Volume2,
  Bookmark,
  Clock,
  ArrowDown,
  Radio,
  Settings2,
  Trash2,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { works, paths, concepts, connections, type Work } from './data';
import WorkContext from './WorkContext';
import { graphNeighborhood } from './graph';
import SonicLab from './SonicLab';
import { pathwayQuestions } from './journeys';
import ResonanceArt from './ResonanceArt';
type Note = {
  id: string;
  workId: string;
  text: string;
  date: string;
  time?: number;
  videoId?: string;
};
type Progress = {
  heard?: boolean;
  understood?: boolean;
  liked?: boolean;
  review?: string;
};
type Store = {
  version: 1;
  notes: Note[];
  progress: Record<string, Progress>;
  bookmarks: Record<string, boolean>;
  videos: Record<string, string>;
  last: string;
  name: string;
};
const empty: Store = {
  version: 1,
  notes: [],
  progress: {},
  bookmarks: {},
  videos: {},
  last: 'sacre',
  name: '',
};
const KEY = 'constelacao:v1';
const find = (id: string) => works.find((w) => w.id === id) || works[0];
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
function load(): Store {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (validBackup(s)) return { ...empty, ...s };
    if (s) localStorage.setItem(KEY + ':recovery', JSON.stringify(s));
    return empty;
  } catch {
    return empty;
  }
}
function download(data: unknown, name: string) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
  );
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function validBackup(x: unknown): x is Store {
  if (!x || typeof x !== 'object') return false;
  const s = x as Store;
  const ids = new Set(works.map((w) => w.id));
  return (
    s.version === 1 &&
    Array.isArray(s.notes) &&
    s.notes.length < 10000 &&
    s.notes.every(
      (n) =>
        !!n &&
        typeof n.id === 'string' &&
        ids.has(n.workId) &&
        typeof n.text === 'string' &&
        n.text.length <= 12000 &&
        typeof n.date === 'string' &&
        Number.isFinite(Date.parse(n.date)) &&
        (n.time === undefined ||
          (typeof n.time === 'number' &&
            Number.isFinite(n.time) &&
            n.time >= 0)) &&
        (n.videoId === undefined ||
          (typeof n.videoId === 'string' && /^[\w-]{11}$/.test(n.videoId))),
    ) &&
    !!s.progress &&
    typeof s.progress === 'object' &&
    Object.entries(s.progress).every(
      ([id, p]) =>
        ids.has(id) &&
        p &&
        typeof p === 'object' &&
        ['heard', 'understood', 'liked'].every(
          (k) =>
            p[k as keyof Progress] === undefined ||
            typeof p[k as keyof Progress] === 'boolean',
        ) &&
        (p.review === undefined ||
          (typeof p.review === 'string' &&
            Number.isFinite(Date.parse(p.review)))),
    ) &&
    !!s.bookmarks &&
    typeof s.bookmarks === 'object' &&
    !Array.isArray(s.bookmarks) &&
    Object.entries(s.bookmarks).every(
      ([id, v]) => ids.has(id) && typeof v === 'boolean',
    ) &&
    !!s.videos &&
    typeof s.videos === 'object' &&
    !Array.isArray(s.videos) &&
    Object.values(s.videos).every(
      (v) => typeof v === 'string' && /^[\w-]{11}$/.test(v),
    ) &&
    ids.has(s.last) &&
    typeof s.name === 'string'
  );
}
function Choice({
  value,
  onChange,
  items,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  items: string[];
  label: string;
}) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger aria-label={label} className="choice">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((i) => (
          <SelectItem key={i} value={i}>
            {i}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
function Mark({ small = false }: { small?: boolean }) {
  return (
    <svg
      width={small ? 28 : 38}
      height={small ? 28 : 38}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 35V21a16 16 0 0 1 32 0v14M12 35V21a10 10 0 0 1 20 0v14M18 35V21a4 4 0 0 1 8 0v14M4 39h36" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function SoundLines({
  color = '#ff783b',
  large = false,
}: {
  color?: string;
  large?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={large ? 'soundlines large' : 'soundlines'}
      viewBox="0 0 560 250"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 78 }, (_, i) => {
        const height =
          10 + Math.abs(Math.sin(i * 0.39) * Math.cos(i * 0.087)) * 190;
        return (
          <line
            key={i}
            x1={i * 7 + 8}
            x2={i * 7 + 8}
            y1={125 - height / 2}
            y2={125 + height / 2}
            stroke={color}
            strokeWidth="2"
            opacity={0.25 + (i % 5) / 8}
          />
        );
      })}
    </svg>
  );
}
function Card({
  w,
  open,
  saved,
  toggle,
}: {
  w: Work;
  open: () => void;
  saved: boolean;
  toggle: () => void;
}) {
  return (
    <article className="work-card">
      <button
        className="art"
        onClick={open}
        aria-label={`Explorar ${w.title}`}
        style={{ '--work-color': w.color } as React.CSSProperties}
      >
        <span className="art-year">{w.year}</span>
        <SoundLines color={w.color} />
        <span className="art-name">{w.composer.split(' ').slice(-1)}</span>
        <span className="round art-arrow">
          <ArrowUpRight size={19} />
        </span>
      </button>
      <div className="card-meta">
        <span>
          {w.tags[0]} · {w.duration} min aprox.
        </span>
        <button
          className={`icon ${saved ? 'selected' : ''}`}
          aria-label={saved ? 'Remover dos salvos' : 'Salvar obra'}
          aria-pressed={saved}
          onClick={toggle}
        >
          <Bookmark size={17} />
        </button>
      </div>
      <button className="text-button card-title" onClick={open}>
        {w.title}
      </button>
      <p>{w.composer}</p>
    </article>
  );
}
type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (t: number, allow: boolean) => void;
  destroy: () => void;
};
declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, config: object) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
  }
}
function Player({
  w,
  video,
  onClose,
  onMark,
}: {
  w: Work;
  video: string;
  onClose: () => void;
  onMark: (time: number) => void;
}) {
  const container = useRef<HTMLDivElement>(null),
    player = useRef<YTPlayer | null>(null);
  const [time, setTime] = useState(0),
    [duration, setDuration] = useState(0),
    [playing, setPlaying] = useState(false),
    [error, setError] = useState('');
  useEffect(() => {
    let alive = true;
    setTime(0);
    setDuration(0);
    setError('');
    const init = () => {
      if (!alive || !container.current || !window.YT) return;
      const div = document.createElement('div');
      container.current.replaceChildren(div);
      player.current = new window.YT.Player(div, {
        videoId: video,
        width: '100%',
        height: '100%',
        playerVars: { origin: location.origin, playsinline: 1, rel: 0 },
        events: {
          onStateChange: (e: { data: number }) => setPlaying(e.data === 1),
          onError: () =>
            setError(
              'Esta gravação não permite reprodução aqui. Abra no YouTube ou escolha outra.',
            ),
        },
      });
    };
    if (window.YT?.Player) init();
    else {
      window.onYouTubeIframeAPIReady = init;
      if (!document.querySelector('script[data-youtube]')) {
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        s.dataset.youtube = '1';
        s.onerror = () =>
          setError(
            'Sem conexão com o YouTube. Seu diário continua disponível.',
          );
        document.head.append(s);
      }
    }
    const timer = setInterval(() => {
      try {
        setTime(player.current?.getCurrentTime() || 0);
        setDuration(player.current?.getDuration() || 0);
      } catch {}
    }, 750);
    return () => {
      alive = false;
      clearInterval(timer);
      player.current?.destroy();
      player.current = null;
    };
  }, [video]);
  return (
    <aside className="player-dock" aria-label="Reprodutor">
      <div className="player-heading">
        <span>
          <Radio size={14} /> SALA DE ESCUTA
        </span>
        <button
          className="icon"
          onClick={onClose}
          aria-label="Fechar reprodução"
        >
          <X size={18} />
        </button>
      </div>
      <div className="video-container" ref={container} />
      {error && <p className="error">{error}</p>}
      <strong>{w.title}</strong>
      <p>{w.composer}</p>
      <div className="player-buttons">
        <button
          className="round"
          aria-label={playing ? 'Pausar' : 'Reproduzir'}
          onClick={() =>
            playing ? player.current?.pauseVideo() : player.current?.playVideo()
          }
        >
          {playing ? <Pause size={17} /> : <Play size={17} />}
        </button>
        <span>
          {formatTime(time)} / {formatTime(duration)}
        </span>
        <button
          className="icon"
          onClick={() => onMark(time)}
          title="Anotar neste instante"
          aria-label="Anotar neste instante"
        >
          <Plus size={20} />
        </button>
        <a
          href={`https://www.youtube.com/watch?v=${video}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir gravação no YouTube"
        >
          <ExternalLink size={17} />
        </a>
      </div>
      <input
        className="seek"
        type="range"
        min="0"
        max={duration || 1}
        value={time}
        aria-label="Posição na gravação"
        onChange={(e) => {
          player.current?.seekTo(Number(e.target.value), true);
          setTime(Number(e.target.value));
        }}
      />
      <small>Marcações pertencem a esta gravação.</small>
    </aside>
  );
}
export default function App() {
  const [store, setStore] = useState<Store>(load),
    [view, setView] = useState('agora'),
    [current, setCurrent] = useState<Work>(find(load().last)),
    [query, setQuery] = useState(''),
    [filter, setFilter] = useState('Todas as linguagens'),
    [region, setRegion] = useState('Toda a Europa'),
    [activePath, setActivePath] = useState<string | null>(null),
    [playerWork, setPlayerWork] = useState<Work | null>(null),
    [dialog, setDialog] = useState(''),
    [draft, setDraft] = useState(''),
    [noteWork, setNoteWork] = useState('sacre'),
    [noteTime, setNoteTime] = useState<number | undefined>(),
    [message, setMessage] = useState(''),
    [videoInput, setVideoInput] = useState(''),
    [lab, setLab] = useState(''),
    [compare, setCompare] = useState<string[]>([]),
    [graphFocus, setGraphFocus] = useState('sacre'),
    [guideAnswer, setGuideAnswer] = useState(''),
    [guideStep, setGuideStep] = useState(0);
  const inputFile = useRef<HTMLInputElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const graph = graphNeighborhood(graphFocus);
  useEffect(() => {
    if (!['127.0.0.1', 'localhost'].includes(location.hostname)) return;
    const timer = setInterval(() => {
      void fetch('/health').catch(() => {});
    }, 60000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: object,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: object) => {
      try {
        void Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {}
    };
    register({
      name: 'list_musical_works',
      description: 'List all works available in this musical atlas.',
      inputSchema: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: () =>
        works.map(({ id, title, composer }) => ({ id, title, composer })),
    });
    register({
      name: 'open_musical_work',
      description:
        'Navigate to a work and start its guided-listening page. Does not start audio.',
      inputSchema: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false },
      execute: async (input: unknown) => {
        const id = (input as { id?: unknown })?.id;
        const w = works.find((x) => x.id === id);
        if (!w) throw new Error('Unknown work');
        setCurrent(w);
        setView('obra');
        setStore((s) => ({ ...s, last: w.id }));
        location.hash = 'obra/' + w.id;
        await new Promise(requestAnimationFrame);
        return { opened: w.id };
      },
    });
    return () => lifecycle.abort();
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {
      setMessage('Não foi possível salvar. Exporte seu diário antes de sair.');
    }
  }, [store]);
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(''), 5500);
    return () => clearTimeout(t);
  }, [message]);
  useEffect(() => {
    const nav = () => {
      const value = location.hash.slice(1);
      if (value.startsWith('obra/')) {
        const w = works.find((x) => x.id === value.slice(5));
        if (w) {
          setCurrent(w);
          setView('obra');
        }
      } else if (
        [
          'agora',
          'explorar',
          'percursos',
          'atlas',
          'diario',
          'laboratorio',
          'minha',
        ].includes(value)
      )
        setView(value);
    };
    nav();
    window.addEventListener('hashchange', nav);
    return () => window.removeEventListener('hashchange', nav);
  }, []);
  const go = (v: string) => {
    setView(v);
    location.hash = v;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const open = (w: Work) => {
    setCurrent(w);
    setStore((s) => ({ ...s, last: w.id }));
    setGuideStep(0);
    setGuideAnswer('');
    go(`obra/${w.id}`);
    setView('obra');
  };
  const bookmark = (id: string) =>
    setStore((s) => ({
      ...s,
      bookmarks: { ...s.bookmarks, [id]: !s.bookmarks[id] },
    }));
  const updateProgress = (id: string, p: Partial<Progress>) =>
    setStore((s) => ({
      ...s,
      progress: { ...s.progress, [id]: { ...s.progress[id], ...p } },
    }));
  const note = (id: string, time?: number) => {
    setNoteWork(id);
    setNoteTime(time);
    setDraft('');
    setDialog('note');
  };
  const saveNote = () => {
    if (!draft.trim()) return;
    setStore((s) => ({
      ...s,
      notes: [
        {
          id: crypto.randomUUID(),
          workId: noteWork,
          text: draft.trim(),
          date: new Date().toISOString(),
          time: noteTime,
          videoId:
            noteTime !== undefined
              ? s.videos[noteWork] || find(noteWork).video
              : undefined,
        },
        ...s.notes,
      ],
    }));
    setDialog('');
    setMessage('Percepção guardada no seu diário.');
  };
  const play = (w: Work) => {
    const video = store.videos[w.id] || w.video;
    if (video) setPlayerWork(w);
    else {
      setCurrent(w);
      setVideoInput('');
      setDialog('video');
    }
  };
  const heard = Object.values(store.progress).filter((p) => p.heard).length;
  const collection = works.filter((w) => store.bookmarks[w.id]);
  const results = works.filter(
    (w) =>
      normalize(
        `${w.title} ${w.composer} ${w.original} ${w.tags.join(' ')}`,
      ).includes(normalize(query)) &&
      (filter === 'Todas as linguagens' || w.tags.includes(filter)) &&
      (region === 'Toda a Europa' || (region === 'França e conexões' ? /França/.test(w.region) : /Rússia|Russo|Soviética/.test(w.region))),
  );
  const recommendation =
    works.find((w) => !store.progress[w.id]?.heard) || works[0];
  const reviews = works.filter(
    (w) =>
      store.progress[w.id]?.review &&
      new Date(store.progress[w.id].review!).getTime() <= Date.now(),
  );
  const card = (w: Work) => (
    <Card
      key={w.id}
      w={w}
      open={() => open(w)}
      saved={!!store.bookmarks[w.id]}
      toggle={() => bookmark(w.id)}
    />
  );
  const synth = async (kind: string) => {
    window.dispatchEvent(new Event('acervo:audio-start'));
    await audioRef.current?.close();
    const ctx = new AudioContext();
    audioRef.current = ctx;
    await ctx.resume();
    setLab(kind);
    const tone = (
      f: number,
      t: number,
      d: number,
      type: OscillatorType = 'sine',
      gain = 0.07,
    ) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.type = type;
      o.frequency.value = f;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0, ctx.currentTime + t);
      g.gain.linearRampToValueAtTime(gain, ctx.currentTime + t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);
      o.start(ctx.currentTime + t);
      o.stop(ctx.currentTime + t + d + 0.02);
    };
    if (kind === 'polirritmia') {
      for (let k = 0; k < 4; k++) {
        for (let i = 0; i < 3; i++) tone(700, k * 1.5 + i * 0.5, 0.13);
        for (let i = 0; i < 2; i++) tone(220, k * 1.5 + i * 0.75, 0.2);
      }
    } else if (kind === 'timbre') {
      (['sine', 'triangle', 'sawtooth'] as OscillatorType[]).forEach((t, i) =>
        tone(261.63, i * 1.8, 1.3, t, 0.04),
      );
    } else {
      const notes =
        kind === 'motivo'
          ? [293.66, 311.13, 261.63, 246.94]
          : [220, 261.63, 329.63, 261.63];
      for (let k = 0; k < 3; k++)
        notes.forEach((f, i) =>
          tone(
            f * (kind === 'motivo' && k === 2 ? 1.5 : 1),
            k * 2 + i * 0.4,
            0.3,
          ),
        );
    }
    setTimeout(() => {
      if (audioRef.current === ctx) {
        setLab('');
        void ctx.close();
        audioRef.current = null;
      }
    }, 6500);
  };
  useEffect(() => {
    const stop = () => {
      const ctx = audioRef.current;
      audioRef.current = null;
      if (ctx && ctx.state !== 'closed') void ctx.close().catch(() => {});
      setLab('');
    };
    window.addEventListener('acervo:audio-start', stop);
    return () => { window.removeEventListener('acervo:audio-start', stop); stop(); };
  }, [view]);
  return (
    <div className="app-shell">
      <a className="skip" href="#content">
        Ir para o conteúdo
      </a>
      <header className="topbar">
        <a className="brand" href="#agora" onClick={() => go('agora')}>
          <Mark />
          <span>
            Acervo Clássico<span className="brand-caption">OUVIR. DESCOBRIR. APROFUNDAR.</span>
          </span>
        </a>
        <nav aria-label="Navegação principal">
          {[
            ['agora', 'Agora'],
            ['explorar', 'Explorar'],
            ['percursos', 'Percursos'],
            ['atlas', 'Atlas'],
            ['laboratorio', 'Laboratório'],
            ['diario', 'Diário'],
          ].map(([v, label]) => (
            <button
              key={v}
              className={view === v ? 'active' : ''}
              aria-current={view === v ? 'page' : undefined}
              onClick={() => go(v)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon"
            aria-label="Buscar obras"
            onClick={() => {
              go('explorar');
              setTimeout(() => document.getElementById('search')?.focus(), 50);
            }}
          >
            <Search size={20} />
          </button>
          <button
            className="avatar"
            onClick={() => setDialog('settings')}
            aria-label="Preferências e backup"
          >
            {store.name ? store.name[0].toUpperCase() : <Settings2 size={18} />}
          </button>
        </div>
      </header>
      <main id="content" className="content">
        {view === 'agora' && (
          <>
            <div className="eyebrow intro-line">
              <span>
                <span className="status-dot" /> SEU ESPAÇO DE EXPLORAÇÃO MUSICAL
              </span>
              <span>EUROPA & DIÁSPORAS · SÉCULOS XIX–XXI</span>
            </div>
            <div className="welcome">
              <div>
                <h1>
                  A música permanece.
                  <br />
                  <em>Seu ouvido se transforma.</em>
                </h1>
                <p>
                  Da Rússia à França, um acervo de encontros.
                  <br />
                  Escute de perto. Descubra o que ainda não ouviu.
                </p>
              </div>
              <ResonanceArt />
            </div>
            <div className="acervo-strip"><span><strong>{works.length}</strong> obras · {works.length} autores</span><span><strong>{paths.length}</strong> percursos de descoberta</span><span><strong>06</strong> experiências A/B</span><button className="link-button" onClick={() => go('minha')}>Meu acervo <ArrowUpRight size={17}/></button></div>
            {(store.notes.length > 0 || heard > 0) && (
              <div className="return-strip">
                <button
                  className="link-button"
                  onClick={() => open(find(store.last))}
                >
                  <Headphones size={17} /> Retomar: {find(store.last).title}{' '}
                  <ArrowRight size={17} />
                </button>
                {reviews.length > 0 && (
                  <button
                    className="link-button"
                    onClick={() => open(reviews[0])}
                  >
                    <Clock size={17} /> {reviews.length} obra(s) para revisitar
                  </button>
                )}
              </div>
            )}
            <div className="home-feature">
              <section
                className="featured"
                style={
                  {
                    '--work-color': recommendation.color,
                  } as React.CSSProperties
                }
              >
                <div className="feature-top">
                  <span className="pill">
                    {heard ? 'PRÓXIMA DESCOBERTA' : 'SEU PRIMEIRO ENCONTRO'}
                  </span>
                  <span>
                    {String(works.indexOf(recommendation) + 1).padStart(2, '0')}{' '}
                    / {works.length}
                  </span>
                </div>
                <div className="feature-copy">
                  <span className="eyebrow">
                    {recommendation.composer.toUpperCase()} ·{' '}
                    {recommendation.year}
                  </span>
                  <h2>{recommendation.title}</h2>
                  <p>{recommendation.invitation}</p>
                  <div className="feature-actions">
                    <button
                      className="primary"
                      onClick={() => open(recommendation)}
                    >
                      <Headphones size={18} /> Iniciar escuta guiada{' '}
                      <ArrowUpRight size={18} />
                    </button>
                    <span>
                      <Clock size={14} /> {recommendation.duration} min aprox.
                    </span>
                  </div>
                </div>
                <div className="feature-wave">
                  <SoundLines color={recommendation.color} large />
                  <span>OUVIR · PERCEBER · DESCOBRIR</span>
                </div>
              </section>
              <aside className="path-teaser">
                <span className="eyebrow">PERCURSO EM DESTAQUE</span>
                <span className="path-number">
                  01<span> / {String(paths.length).padStart(2, '0')}</span>
                </span>
                <h2>
                  A França em
                  <br />
                  <em>muitas cores.</em>
                </h2>
                <p>
                  Uma nova ala do seu acervo.
                  <br />
                  De Berlioz às invenções do século XX.
                </p>
                <div className="mini-timeline">
                  <i />
                  <span />
                  <i />
                  <span />
                  <i />
                  <span />
                  <i />
                </div>
                <div className="between">
                  <span>{paths[0].ids.length} obras · escuta orientada</span>
                  <button
                    className="round"
                    aria-label="Abrir percurso A França em muitas cores"
                    onClick={() => {
                      setActivePath('frances');
                      go('percursos');
                    }}
                  >
                    <ArrowUpRight size={21} />
                  </button>
                </div>
              </aside>
            </div>
            <div className="section-heading">
              <div>
                <span className="eyebrow">NOVAS ENTRADAS · EDIÇÃO FRANCESA</span>
                <h2>Outras cores. Novas perguntas.</h2>
              </div>
              <button className="link-button" onClick={() => go('explorar')}>
                Explorar o repertório <ArrowRight size={18} />
              </button>
            </div>
            <div className="work-grid">
              {['ravel', 'boulanger', 'poulenc', 'tailleferre'].map(id => card(find(id)))}
            </div>
            <div className="question-strip">
              <span className="round">
                <Orbit size={24} />
              </span>
              <div>
                <span className="eyebrow">
                  UMA PERGUNTA PARA LEVAR À ESCUTA
                </span>
                <h3>Você não gostou — ou ainda não encontrou o que ouvir?</h3>
              </div>
              <button className="link-button" onClick={() => note(store.last)}>
                Anotar uma impressão <Plus size={18} />
              </button>
            </div>
          </>
        )}
        {view === 'explorar' && (
          <>
            <PageTitle
              kicker="O CORPUS VIVO"
              title="Encontre sua próxima escuta."
              text={`${works.length} obras · ${new Set(works.map((w) => w.composer)).size} compositores e compositoras. Europa e diásporas, com núcleos russos e franceses: trajetórias distintas, escutas em diálogo.`}
            />
            <div className="filters">
              <label className="search-box">
                <Search size={19} />
                <input
                  id="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Obra, compositor, conceito ou nome em cirílico…"
                />
              </label>
              <Choice
                label="Filtrar por linguagem"
                value={filter}
                onChange={setFilter}
                items={[
                  'Todas as linguagens',
                  ...new Set(works.flatMap((w) => w.tags)),
                ]}
              />
              <Choice
                label="Filtrar região"
                value={region}
                onChange={setRegion}
                items={['Toda a Europa', 'Circuitos russos e soviéticos', 'França e conexões']}
              />
            </div>
            <div className="between muted">
              <span>{results.length} obras encontradas</span>
              <button
                className="text-button"
                onClick={() => {
                  setQuery('');
                  setFilter('Todas as linguagens');
                  setRegion('Toda a Europa');
                }}
              >
                Limpar filtros
              </button>
            </div>
            <div className="work-grid catalogue">{results.map(card)}</div>
            {!results.length && (
              <Empty
                title="Nenhuma obra encontrada"
                text="Tente outro nome ou remova um dos filtros."
              />
            )}
            <div className="notice">
              Acervo curado dos séculos XIX a XXI, com núcleos russos e
              franceses. Cada entrada oferece contexto, perguntas e fontes;
              a seleção não pretende esgotar essas tradições.
            </div>
          </>
        )}
        {view === 'obra' && (
          <>
            <button className="link-button back" onClick={() => go('explorar')}>
              <ChevronLeft size={17} /> Repertório
            </button>
            <div className="work-header">
              <div>
                <span className="eyebrow">
                  {current.region.toUpperCase()} · {current.year}
                </span>
                <h1>{current.title}</h1>
                <p>
                  {current.composer}{' '}
                  <span className="original">{current.original}</span>
                </p>
              </div>
              <button
                className={`round ${store.bookmarks[current.id] ? 'selected' : ''}`}
                aria-label="Salvar esta obra"
                onClick={() => bookmark(current.id)}
              >
                <Bookmark size={22} />
              </button>
            </div>
            <div className="tags">
              {current.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
              <span>{current.duration} min aprox.</span>
            </div>
            <div className="work-layout">
              <div>
                <div
                  className="listen-banner"
                  style={
                    { '--work-color': current.color } as React.CSSProperties
                  }
                >
                  <SoundLines color={current.color} />
                  <h2>{current.invitation}</h2>
                  <button className="primary" onClick={() => play(current)}>
                    <Play size={18} /> Ouvir uma gravação
                  </button>
                  <button
                    className="link-button"
                    onClick={() => {
                      setVideoInput('');
                      setDialog('video');
                    }}
                  >
                    Escolher outra gravação <ExternalLink size={15} />
                  </button>
                </div>
                <Tabs
                  defaultValue="orientacao"
                  className="work-tabs"
                  key={current.id}
                >
                  <TabsList variant="line">
                    <TabsTrigger value="encontro">
                      Primeiro encontro
                    </TabsTrigger>
                    <TabsTrigger value="orientacao">Escuta guiada</TabsTrigger>
                    <TabsTrigger value="contexto">Contexto</TabsTrigger>
                    <TabsTrigger value="conexoes">Conexões</TabsTrigger>
                  </TabsList>
                  <TabsContent value="encontro">
                    <div className="essay">
                      <span className="eyebrow">01 · EXPERIÊNCIA</span>
                      <h2>Primeiro, apenas ouça.</h2>
                      <p>
                        Permita-se não reconhecer tudo. Escolha um trecho ou um
                        movimento e mantenha a atenção no som. Não é necessário
                        gostar, entender ou explicar.
                      </p>
                      <blockquote>{current.question}</blockquote>
                      <button
                        className="secondary"
                        onClick={() => note(current.id)}
                      >
                        <Plus size={16} /> Registrar minha primeira impressão
                      </button>
                    </div>
                  </TabsContent>
                  <TabsContent value="orientacao">
                    <div className="essay">
                      <span className="eyebrow">02 · ORIENTAÇÃO</span>
                      <h2>Três coisas para perceber.</h2>
                      <div className="prompts">
                        {current.listen.map((s, i) => (
                          <div key={s}>
                            <span>0{i + 1}</span>
                            <p>{s}</p>
                          </div>
                        ))}
                      </div>
                      <p className="muted">
                        Ouça uma vez para cada pergunta. As sugestões são lentes
                        editoriais, não respostas obrigatórias.
                      </p>
                      <button
                        className="secondary"
                        onClick={() => note(current.id)}
                      >
                        <Plus size={16} /> Anotar uma descoberta
                      </button>
                    </div>
                  </TabsContent>
                  <TabsContent value="contexto">
                    <WorkContext key={current.id} work={current} />
                  </TabsContent>
                  <TabsContent value="conexoes">
                    <div className="essay">
                      <span className="eyebrow">04 · COMPARAÇÃO</span>
                      <h2>Continue por outra pergunta.</h2>
                      {connections
                        .filter(
                          (c) => c[0] === current.id || c[1] === current.id,
                        )
                        .map((c) => {
                          const other = find(c[0] === current.id ? c[1] : c[0]);
                          return (
                            <button
                              key={c.join()}
                              className="connection-row"
                              onClick={() => open(other)}
                            >
                              <div>
                                <small>{c[2]}</small>
                                <h3>{other.title}</h3>
                                <p>{c[3]}</p>
                              </div>
                              <ArrowUpRight size={20} />
                            </button>
                          );
                        })}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <aside className="study-panel">
                <span className="eyebrow">SUA RELAÇÃO COM A OBRA</span>
                <h3>
                  Gosto e compreensão
                  <br />
                  seguem caminhos próprios.
                </h3>
                {[
                  ['heard', 'Já ouvi'],
                  ['understood', 'Consigo explicar o que ouvi'],
                  ['liked', 'Gostei desta obra'],
                ].map(([k, label]) => (
                  <button
                    className={`progress-choice ${store.progress[current.id]?.[k as keyof Progress] ? 'is-on' : ''}`}
                    key={k}
                    aria-pressed={
                      !!store.progress[current.id]?.[k as keyof Progress]
                    }
                    onClick={() =>
                      updateProgress(current.id, {
                        [k]: !store.progress[current.id]?.[k as keyof Progress],
                      })
                    }
                  >
                    <span>
                      {store.progress[current.id]?.[k as keyof Progress] ? (
                        <Check size={14} />
                      ) : (
                        <Plus size={14} />
                      )}
                    </span>
                    {label}
                  </button>
                ))}
                <button
                  className="link-button"
                  onClick={() => {
                    updateProgress(current.id, {
                      review: new Date(Date.now() + 7 * 86400000).toISOString(),
                    });
                    setMessage('Obra marcada para revisão em sete dias.');
                  }}
                >
                  <Clock size={16} /> Revisitar em uma semana
                </button>
                <hr />
                <span className="eyebrow">GUIA SOCRÁTICO · SEM IA</span>
                <p>
                  {
                    [
                      current.question,
                      'Que momento concreto sustenta essa impressão?',
                      'O que você ouviria de novo para testar sua hipótese?',
                    ][guideStep]
                  }
                </p>
                <textarea
                  aria-label="Sua resposta ao guia"
                  placeholder="Tente descrever com suas palavras…"
                  value={guideAnswer}
                  onChange={(e) => setGuideAnswer(e.target.value)}
                />
                <button
                  className="secondary"
                  disabled={!guideAnswer.trim()}
                  onClick={() => {
                    setStore((s) => ({
                      ...s,
                      notes: [
                        {
                          id: crypto.randomUUID(),
                          workId: current.id,
                          text: guideAnswer,
                          date: new Date().toISOString(),
                        },
                        ...s.notes,
                      ],
                    }));
                    setGuideAnswer('');
                    setGuideStep((guideStep + 1) % 3);
                    setMessage(
                      'Resposta guardada. Vamos aprofundar a observação.',
                    );
                  }}
                >
                  Guardar e continuar <ArrowRight size={16} />
                </button>
                <small>
                  Sequência editorial de perguntas. Não avalia automaticamente
                  sua resposta.
                </small>
              </aside>
            </div>
          </>
        )}
        {view === 'percursos' && (
          <>
            <PageTitle
              kicker="CAMINHOS POSSÍVEIS"
              title="Deixe uma pergunta conduzir."
              text="Percursos curados, com liberdade para sair do caminho e voltar quando quiser."
            />
            {!activePath ? (
              <div className="paths-grid">
                {paths.map((p, i) => (
                  <button
                    className="path-card"
                    key={p.id}
                    style={{ '--work-color': p.color } as React.CSSProperties}
                    onClick={() => setActivePath(p.id)}
                  >
                    <div className="between">
                      <span className="eyebrow">PERCURSO 0{i + 1}</span>
                      <ArrowUpRight size={25} />
                    </div>
                    <h2>{p.title}</h2>
                    <h3>{p.subtitle}</h3>
                    <p>{p.description}</p>
                    <div className="path-progress">
                      {p.ids.map((id) => (
                        <span
                          className={store.progress[id]?.heard ? 'done' : ''}
                          key={id}
                        />
                      ))}
                    </div>
                    <small>
                      {p.ids.filter((id) => store.progress[id]?.heard).length}{' '}
                      de {p.ids.length} obras ouvidas
                    </small>
                  </button>
                ))}
              </div>
            ) : (
              <>
                <button
                  className="link-button back"
                  onClick={() => setActivePath(null)}
                >
                  <ChevronLeft size={17} /> Todos os percursos
                </button>
                {paths
                  .filter((p) => p.id === activePath)
                  .map((p) => (
                    <section className="path-detail" key={p.id}>
                      <h2>{p.title}</h2>
                      <p>{p.description}</p>
                      <div className="path-practice"><h3>Um roteiro para escutar melhor</h3><p>Não é preciso terminar em uma sessão. Escolha uma obra, ouça sem ler e depois retorne ao contexto. As durações são aproximadas.</p><ol>{(pathwayQuestions[p.id] || []).map(q => <li key={q}>{q}</li>)}</ol><small>{p.ids.reduce((total, id) => total + find(id).duration, 0)} min de repertório · {p.ids.filter(id => store.progress[id]?.heard).length}/{p.ids.length} obras ouvidas</small><br/><button className="link-button" onClick={() => open(find(p.ids.find(id => !store.progress[id]?.heard) || p.ids[0]))}>Continuar na próxima obra <ArrowRight size={16}/></button></div>
                      {p.ids.map((id, i) => {
                        const w = find(id);
                        return (
                          <button
                            className="path-step"
                            key={id}
                            onClick={() => open(w)}
                          >
                            <span className="step-number">
                              {store.progress[id]?.heard ? (
                                <Check size={22} />
                              ) : (
                                String(i + 1).padStart(2, '0')
                              )}
                            </span>
                            <div>
                              <small>
                                {w.composer} · {w.year}
                              </small>
                              <h3>{w.title}</h3>
                              <p>{w.invitation}</p>
                            </div>
                            <span>{w.duration} min</span>
                            <ArrowUpRight size={22} />
                          </button>
                        );
                      })}
                    </section>
                  ))}
              </>
            )}
          </>
        )}
        {(view === 'atlas' || view === 'minha') && (
          <>
            <PageTitle
              kicker={
                view === 'atlas'
                  ? 'IDEIAS EM RELAÇÃO'
                  : 'SUA FORMAÇÃO, EM MOVIMENTO'
              }
              title={
                view === 'atlas'
                  ? 'A música não anda em linha reta.'
                  : 'Seu acervo, suas descobertas.'
              }
              text={
                view === 'atlas'
                  ? 'Escolha uma obra e explore sua vizinhança. As linhas representam relações editoriais explicadas, não necessariamente influências históricas.'
                  : `${heard} obras ouvidas · ${store.notes.length} percepções registradas · ${collection.length} obras salvas`
              }
            />
            <Tabs defaultValue="rede">
              <TabsList variant="line">
                <TabsTrigger value="rede">Relações</TabsTrigger>
                <TabsTrigger value="tempo">Linha do tempo</TabsTrigger>
                <TabsTrigger value="comparar">Comparar obras</TabsTrigger>
              </TabsList>
              <TabsContent value="rede">
                <div className="atlas-orientation" aria-label="Pontos de partida no atlas"><button onClick={() => setGraphFocus('ravel')}>França · cor e movimento</button><button onClick={() => setGraphFocus('sacre')}>Rússia · ritmo e ruptura</button><button onClick={() => setGraphFocus('boulanger')}>Trajetórias de compositoras</button><button onClick={() => setGraphFocus('satie')}>Repetição e escuta atenta</button></div>
                <p className="atlas-note">{works.length} obras · {connections.length} relações. As conexões indicam perguntas de escuta; apenas as identificadas como históricas descrevem um contexto documentado.</p>
                <label className="graph-picker">
                  <span>Obra em foco · catálogo completo ({works.length})</span>
                  <select
                    value={graphFocus}
                    onChange={(e) => setGraphFocus(e.target.value)}
                  >
                    {works.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.composer} — {w.title}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="atlas-layout">
                  <div
                    className="graph"
                    role="group"
                    aria-label="Rede de relações musicais"
                  >
                    <svg
                      viewBox="0 0 800 550"
                      preserveAspectRatio="none"
                      className="graph-lines"
                      aria-hidden="true"
                    >
                      {graph.edges.map((c) => {
                        const a = graph.position(c[0]),
                          b = graph.position(c[1]);
                        return (
                          <line
                            key={c.join()}
                            x1={a.x}
                            y1={a.y}
                            x2={b.x}
                            y2={b.y}
                            stroke={
                              c.includes(graphFocus) ? '#ff783b' : '#45454b'
                            }
                            strokeWidth={c.includes(graphFocus) ? 1.5 : 1}
                          />
                        );
                      })}
                    </svg>
                    {graph.nodes.map((w) => {
                      const position = graph.position(w.id);
                      const x = position.x / 8,
                        y = position.y / 5.5;
                      return (
                        <button
                          className={`graph-node ${graphFocus === w.id ? 'focused' : ''} ${view === 'minha' && !store.progress[w.id]?.heard ? 'dim' : ''}`}
                          style={
                            {
                              left: `${x}%`,
                              top: `${y}%`,
                              '--work-color': w.color,
                            } as React.CSSProperties
                          }
                          key={w.id}
                          aria-label={`${w.composer} — ${w.title}: mostrar relações`}
                          onClick={() => setGraphFocus(w.id)}
                        >
                          <i />
                          <span>{w.composer.split(' ').slice(-1)}</span>
                          <small>{w.year}</small>
                        </button>
                      );
                    })}
                    <span className="graph-caption">
                      {view === 'minha'
                        ? 'BRILHO = FAMILIARIDADE DECLARADA'
                        : `VIZINHANÇA EM FOCO · ${graph.nodes.length} DE ${works.length} OBRAS`}
                    </span>
                  </div>
                  <div className="graph-detail">
                    <span className="eyebrow">EM FOCO</span>
                    <h2>{find(graphFocus).title}</h2>
                    <p>{find(graphFocus).composer}</p>
                    {connections
                      .filter((c) => c[0] === graphFocus || c[1] === graphFocus)
                      .map((c) => (
                        <div className="graph-relation" key={c.join()}>
                          <small>{c[2]}</small>
                          <p>{c[3]}</p>
                          <button
                            className="link-button"
                            onClick={() =>
                              setGraphFocus(c[0] === graphFocus ? c[1] : c[0])
                            }
                          >
                            {find(c[0] === graphFocus ? c[1] : c[0])
                              .composer.split(' ')
                              .slice(-1)}{' '}
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      ))}
                    <button
                      className="primary"
                      onClick={() => open(find(graphFocus))}
                    >
                      Explorar obra <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tempo">
                <div className="chronology">
                  {[...works]
                    .sort((a, b) => a.year - b.year)
                    .map((w) => (
                      <button key={w.id} onClick={() => open(w)}>
                        <span>{w.year}</span>
                        <i style={{ background: w.color }} />
                        <div>
                          <h3>{w.title}</h3>
                          <p>
                            {w.composer} · {w.region}
                          </p>
                        </div>
                        <ArrowUpRight size={20} />
                      </button>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="comparar">
                <div className="compare">
                  <p>Escolha duas obras para ouvir com a mesma pergunta.</p>
                  <div className="tags">
                    {works.map((w) => (
                      <button
                        key={w.id}
                        className={compare.includes(w.id) ? 'selected' : ''}
                        aria-pressed={compare.includes(w.id)}
                        onClick={() =>
                          setCompare((s) =>
                            s.includes(w.id)
                              ? s.filter((id) => id !== w.id)
                              : [...s.slice(-1), w.id],
                          )
                        }
                      >
                        {w.composer.split(' ').slice(-1)}
                      </button>
                    ))}
                  </div>
                  <div className="compare-grid">
                    {compare.map((id) => {
                      const w = find(id);
                      return (
                        <section className="essay" key={id}>
                          <small>
                            {w.year} · {w.region}
                          </small>
                          <h2>{w.title}</h2>
                          <p>{w.invitation}</p>
                          <div className="tags">
                            {w.tags.map((t) => (
                              <span key={t}>{t}</span>
                            ))}
                          </div>
                          <blockquote>{w.question}</blockquote>
                          <button className="primary" onClick={() => play(w)}>
                            <Play size={16} /> Ouvir
                          </button>
                        </section>
                      );
                    })}
                  </div>
                  {compare.length === 2 && (
                    <div className="question-strip">
                      <p>
                        Compare o papel da repetição, a sensação de tempo e o
                        contraste entre camadas.
                      </p>
                      <button
                        className="secondary"
                        onClick={() => {
                          note(compare[0]);
                          setDraft(
                            `Comparação: ${find(compare[0]).title} / ${find(compare[1]).title}\n\n`,
                          );
                        }}
                      >
                        Registrar comparação
                      </button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            {view === 'minha' && (
              <>
                <div className="section-heading">
                  <h2>Obras que você guardou.</h2>
                </div>
                {collection.length ? (
                  <div className="work-grid">{collection.map(card)}</div>
                ) : (
                  <Empty
                    title="Sua coleção começa com curiosidade."
                    text="Use o marcador em uma obra para guardá-la aqui."
                  />
                )}
              </>
            )}
          </>
        )}
        {view === 'diario' && (
          <>
            <PageTitle
              kicker="A MEMÓRIA DO SEU OUVIDO"
              title="Diário de escuta."
              text="Impressões, dúvidas e descobertas. Seu gosto pode mudar; suas perguntas também."
            />
            <div className="filters">
              <label className="search-box">
                <Search size={19} />
                <input
                  aria-label="Pesquisar diário"
                  placeholder="Pesquisar suas percepções…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <button className="primary" onClick={() => note(store.last)}>
                <Plus size={17} /> Nova percepção
              </button>
              <button
                className="secondary"
                onClick={() =>
                  download(
                    store,
                    `acervo-classico-backup-${new Date().toISOString().slice(0, 10)}.json`,
                  )
                }
              >
                <Download size={17} /> Exportar
              </button>
            </div>
            {store.notes
              .filter((n) =>
                normalize(n.text + find(n.workId).title).includes(
                  normalize(query),
                ),
              )
              .map((n) => (
                <article className="journal-entry" key={n.id}>
                  <div>
                    <time>
                      {new Date(n.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    {n.time !== undefined &&
                      (n.videoId ? (
                        <a
                          className="link-button"
                          href={`https://www.youtube.com/watch?v=${n.videoId}&t=${Math.floor(n.time)}s`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          · {formatTime(n.time)} <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span> · {formatTime(n.time)}</span>
                      ))}
                  </div>
                  <button
                    className="text-button"
                    onClick={() => open(find(n.workId))}
                  >
                    <h3>
                      {find(n.workId).title} <ArrowUpRight size={17} />
                    </h3>
                  </button>
                  <p>{n.text}</p>
                  <button
                    className="link-button"
                    onClick={() => {
                      setDraft(n.text);
                      setNoteWork(n.workId);
                      setNoteTime(n.time);
                      setDialog(`edit:${n.id}`);
                    }}
                  >
                    Editar percepção
                  </button>
                </article>
              ))}
            {!store.notes.length && (
              <Empty
                title="O que você ouviu hoje?"
                text="Uma sensação, uma mudança de textura, uma pergunta. Não precisa ser uma análise para merecer registro."
              />
            )}
          </>
        )}
        {view === 'laboratorio' && (
          <>
            <PageTitle
              kicker="PEQUENOS EXPERIMENTOS, NOVAS PERCEPÇÕES"
              title="Ouça uma ideia acontecer."
              text="Exemplos sonoros sintetizados para tornar conceitos concretos. Não são trechos das obras."
            />
            <SonicLab open={id => open(find(id))} />
            <div className="section-heading"><div><span className="eyebrow">VOCABULÁRIO DE ESCUTA</span><h2>Ideias para levar ao repertório.</h2></div></div>
            <div className="concept-grid">
              {concepts.map((c, i) => (
                <article className="concept" key={c.name}>
                  <span className="eyebrow">CONCEITO {String(i + 1).padStart(2, '0')}</span>
                  <h2>{c.name}</h2>
                  <p>{c.text}</p>
                  {c.example && (
                    <button
                      className="secondary"
                      disabled={lab === c.example}
                      onClick={() => void synth(c.example).catch(() => setMessage('Não foi possível iniciar este exemplo sonoro. Tente novamente.'))}
                    >
                      <Volume2 size={18} />
                      {lab === c.example ? 'Exemplo tocando…' : 'Ouvir exemplo'}
                    </button>
                  )}
                  <div className="concept-works">
                    {c.ids.map((id) => (
                      <button
                        className="link-button"
                        key={id}
                        onClick={() => open(find(id))}
                      >
                        {find(id).composer.split(' ').slice(-1)}
                        <ArrowUpRight size={14} />
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
        <footer>
          <div>
            <Mark small />
            <span>Um atlas para construir seu ouvido.</span>
          </div>
          <button className="text-button" onClick={() => go('laboratorio')}>
            Laboratório sonoro <ArrowUpRight size={15} />
          </button>
          <button className="text-button" onClick={() => setDialog('about')}>
            Sobre esta edição
          </button>
          <span className="local-status">
            <span className="status-dot" /> Memória local
          </span>
        </footer>
      </main>
      <nav className="mobile-nav" aria-label="Navegação móvel">
        {[
          ['agora', Headphones, 'Agora'],
          ['explorar', Compass, 'Explorar'],
          ['percursos', Route, 'Percursos'],
          ['atlas', Orbit, 'Atlas'],
          ['laboratorio', SlidersHorizontal, 'Lab'],
          ['diario', BookOpen, 'Diário'],
        ].map(([v, Icon, label]) => {
          const I = Icon as typeof Compass;
          return (
            <button
              key={v as string}
              className={view === v ? 'active' : ''}
              onClick={() => go(v as string)}
            >
              <I size={20} />
              <span>{label as string}</span>
            </button>
          );
        })}
      </nav>
      {playerWork && (
        <Player
          w={playerWork}
          video={store.videos[playerWork.id] || playerWork.video!}
          onClose={() => setPlayerWork(null)}
          onMark={(t) => note(playerWork.id, t)}
        />
      )}
      <Dialog open={!!dialog} onOpenChange={(v) => !v && setDialog('')}>
        <DialogContent className="app-dialog">
          <DialogTitle>
            {dialog === 'note' || dialog.startsWith('edit:')
              ? 'Uma percepção para guardar'
              : dialog === 'video'
                ? 'Escolha sua gravação'
                : dialog === 'settings'
                  ? 'Seu espaço, suas preferências'
                  : 'Sobre o Acervo Clássico'}
          </DialogTitle>
          <DialogDescription>
            {dialog === 'note' || dialog.startsWith('edit:')
              ? 'Descreva o que percebeu, sem precisar encontrar a resposta certa.'
              : dialog === 'video'
                ? 'Cada interpretação tem seu próprio tempo e sua própria voz.'
                : dialog === 'settings'
                  ? 'Dados desta edição ficam neste navegador e neste endereço local.'
                  : 'Atlas de escuta · Edição local 1.0'}
          </DialogDescription>
          {(dialog === 'note' || dialog.startsWith('edit:')) && (
            <>
              <Choice
                label="Obra da anotação"
                value={find(noteWork).title}
                items={works.map((w) => w.title)}
                onChange={(v) => {
                  setNoteWork(works.find((w) => w.title === v)!.id);
                  setNoteTime(undefined);
                }}
              />
              {noteTime !== undefined && (
                <p className="muted">
                  Instante da gravação: {formatTime(noteTime)}
                </p>
              )}
              <textarea
                autoFocus
                maxLength={12000}
                rows={7}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="O que chamou sua atenção?"
                aria-label="Texto da percepção"
              />
              <div className="between">
                <span className="muted">{draft.length} caracteres</span>
                <button
                  className="primary"
                  disabled={!draft.trim()}
                  onClick={() => {
                    if (dialog.startsWith('edit:')) {
                      const id = dialog.slice(5);
                      setStore((s) => ({
                        ...s,
                        notes: s.notes.map((n) =>
                          n.id === id
                            ? {
                                ...n,
                                text: draft.trim(),
                                workId: noteWork,
                                time: noteTime,
                                videoId:
                                  noteTime === undefined
                                    ? undefined
                                    : n.videoId,
                              }
                            : n,
                        ),
                      }));
                      setDialog('');
                      setMessage('Percepção atualizada.');
                    } else saveNote();
                  }}
                >
                  <Check size={17} /> Guardar percepção
                </button>
              </div>
            </>
          )}
          {dialog === 'video' && (
            <>
              <p>
                Escolha uma gravação de <strong>{current.title}</strong> e cole
                o endereço do YouTube abaixo.
              </p>
              <a
                className="secondary"
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(current.composer + ' ' + current.title + ' full')}`}
                target="_blank"
                rel="noreferrer"
              >
                Procurar gravações <ExternalLink size={17} />
              </a>
              <label>
                Link ou identificador do vídeo
                <input
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=…"
                />
              </label>
              <button
                className="primary"
                disabled={!videoInput.trim()}
                onClick={() => {
                  let id = videoInput.trim();
                  try {
                    const u = new URL(id);
                    if (u.hostname === 'youtu.be') id = u.pathname.slice(1);
                    else if (
                      [
                        'www.youtube.com',
                        'youtube.com',
                        'm.youtube.com',
                        'www.youtube-nocookie.com',
                      ].includes(u.hostname)
                    )
                      id =
                        u.searchParams.get('v') ||
                        u.pathname.split('/').pop() ||
                        '';
                    else id = '';
                  } catch {}
                  if (!/^[\w-]{11}$/.test(id)) {
                    setMessage('Cole um endereço válido do YouTube.');
                    return;
                  }
                  setStore((s) => ({
                    ...s,
                    videos: { ...s.videos, [current.id]: id },
                  }));
                  setPlayerWork(current);
                  setDialog('');
                }}
              >
                Abrir gravação <Play size={17} />
              </button>
              <small>
                Alguns vídeos bloqueiam incorporação ou não estão disponíveis na
                sua região. Você sempre pode ouvi-los no provedor.
              </small>
            </>
          )}
          {dialog === 'settings' && (
            <>
              <label>
                Como deseja ser chamado?
                <input
                  maxLength={60}
                  value={store.name}
                  onChange={(e) =>
                    setStore((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="Seu nome"
                />
              </label>
              <h3>Seu diário pertence a você.</h3>
              <p>
                Exporte regularmente. O OneDrive guarda os arquivos do site, mas
                não sincroniza os dados do navegador.
              </p>
              <button
                className="secondary"
                onClick={() =>
                  download(store, `acervo-classico-backup-${Date.now()}.json`)
                }
              >
                <Download size={17} /> Exportar backup completo
              </button>
              <button
                className="secondary"
                onClick={() => inputFile.current?.click()}
              >
                <Upload size={17} /> Importar backup (mesclar notas)
              </button>
              <input
                ref={inputFile}
                type="file"
                accept="application/json,.json"
                hidden
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    if (file.size > 10 * 1024 * 1024) throw Error();
                    const data = JSON.parse(await file.text());
                    if (!validBackup(data)) throw Error();
                    setStore((s) => ({
                      ...s,
                      notes: [
                        ...new Map(
                          [...data.notes, ...s.notes].map((n) => [n.id, n]),
                        ).values(),
                      ].sort((a, b) => b.date.localeCompare(a.date)),
                      progress: { ...data.progress, ...s.progress },
                      bookmarks: { ...data.bookmarks, ...s.bookmarks },
                      videos: { ...data.videos, ...s.videos },
                    }));
                    setMessage(
                      'Backup importado e mesclado. Notas existentes foram preservadas.',
                    );
                  } catch {
                    setMessage(
                      'Arquivo inválido. Escolha um backup JSON do Acervo Clássico ou da versão anterior, Constelação.',
                    );
                  }
                  e.target.value = '';
                }}
              />
              <div className="notice">
                Sem login obrigatório. Esta edição não está conectada ao
                Supabase nem a um modelo de IA. O guia socrático usa perguntas
                editoriais.
              </div>
            </>
          )}
          {dialog === 'about' && (
            <>
              <p>
                Um espaço pessoal para explorar música europeia dos séculos XX e
                XXI, com atenção especial às tradições russas, ao contexto
                soviético e às diásporas.
              </p>
              <p>
                Esta edição reúne {works.length} obras de{' '}
                {new Set(works.map((w) => w.composer)).size} compositores e
                compositoras dos séculos XIX a XXI, {paths.length} percursos e{' '}
                {concepts.length} conceitos. Todas as obras possuem um caderno
                de contexto com fontes e propostas de escuta. O catálogo
                permanece aberto à expansão.
              </p>
              <p>
                As relações do atlas distinguem comparações editoriais e
                contextos históricos. Não equivalem automaticamente a
                influências diretas.
              </p>
              <p>
                Gravações são reproduzidas pelos próprios provedores; a
                disponibilidade depende deles. Os exemplos do laboratório são
                síntese sonora original.
              </p>
              <small>
                Desenvolvido para escutar, questionar e voltar a ouvir.
              </small>
            </>
          )}
        </DialogContent>
      </Dialog>
      {message && (
        <div className="toast" role="status">
          <Check size={17} />
          {message}
          <button
            className="icon"
            onClick={() => setMessage('')}
            aria-label="Fechar aviso"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
function PageTitle({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <div className="page-title">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}
function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty">
      <Orbit size={38} />
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
