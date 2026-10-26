import { useEffect, useRef, useState } from 'react';
import { Play, Square, ArrowUpRight } from 'lucide-react';

export const experiments = [
  { id: 'scales', title: 'Escalas', a: 'Escala maior', b: 'Tons inteiros', question: 'Qual sequência parece pedir uma chegada mais definida?', detail: 'Compare os intervalos: a escala maior combina tons e semitons; a escala de tons inteiros divide a oitava em seis passos iguais. Isto não resume a linguagem de Debussy.', works: ['debussy', 'messiaen'] },
  { id: 'chords', title: 'Acordes', a: 'Tríades diatônicas', b: 'Tríades paralelas', question: 'A cor parece mudar internamente ou deslocar-se como um bloco?', detail: 'Em A, as notas ficam na coleção de dó maior. Em B, a mesma estrutura de tríade maior é transposta. O paralelismo é uma possibilidade, não uma definição de música francesa.', works: ['ravel', 'debussy'] },
  { id: 'meter', title: 'Agrupamentos rítmicos', a: 'Grupos de 4', b: 'Grupos de 7: 2+3+2', question: 'O padrão irregular se torna previsível depois de algumas voltas?', detail: 'A pulsação tem a mesma velocidade. Só o agrupamento muda. Use o ataque mais forte como referência e observe os acentos internos de 2+3+2.', works: ['prokofiev', 'sacre'] },
  { id: 'density', title: 'Densidade sonora', a: 'Uma camada', b: 'Quatro camadas', question: 'Você ainda acompanha cada entrada quando a textura se adensa?', detail: 'Linhas sintéticas entram deslocadas no tempo e no registro. É uma demonstração de densidade, não uma reprodução da micropolifonia de Ligeti ou de uma partitura específica.', works: ['ligeti', 'saariaho'] },
  { id: 'envelope', title: 'Envelope sonoro', a: 'Ataque curto', b: 'Entrada gradual', question: 'O mesmo tom parece ter outra presença quando seu início muda?', detail: 'A frequência e a forma de onda são iguais. A curva de volume muda. Um instrumento real combina muitos outros fatores: ruído, ressonâncias, articulação e espaço.', works: ['boulanger', 'ustvolskaya'] },
  { id: 'return', title: 'Inversão de motivos', a: 'Motivo original', b: 'Motivo invertido', question: 'Você reconhece uma ideia quando a direção dos intervalos se inverte?', detail: 'Um pequeno desenho inventado é repetido. Em B, os intervalos ascendentes tornam-se descendentes e vice-versa. Não é uma citação das obras relacionadas.', works: ['quarteto8', 'offertorium'] },
];

export type SoundEvent = { midi: number; beat: number; length: number; level: number; swell?: boolean };
export function makeSequence(id: string, variant: 'a' | 'b'): SoundEvent[] {
  const events: SoundEvent[] = [];
  const add = (midi: number, beat: number, length = .7, level = .5, swell = false) => events.push({ midi, beat, length, level, swell });
  if (id === 'scales') {
    const notes = variant === 'a' ? [0, 2, 4, 5, 7, 9, 11, 12] : [0, 2, 4, 6, 8, 10, 12];
    notes.forEach((n, i) => add(60 + n, i));
  } else if (id === 'chords') {
    const chords = variant === 'a' ? [[60,64,67],[62,65,69],[64,67,71],[65,69,72]] : [[60,64,67],[62,66,69],[64,68,71],[65,69,72]];
    chords.forEach((c, i) => c.forEach(n => add(n, i * 2, 1.7, .25)));
  } else if (id === 'meter') {
    const count = variant === 'a' ? 4 : 7;
    for (let i = 0; i < count * 3; i++) add(i % count === 0 ? 76 : 64, i * .5, .14, i % count === 0 ? .75 : variant === 'b' && [2,5].includes(i % count) ? .55 : .3);
  } else if (id === 'density') {
    for (let layer = 0; layer < (variant === 'a' ? 1 : 4); layer++)
      [0, 2, 7, 5, 4, 2, 0, 7].forEach((n, i) => add(48 + layer * 7 + n, i + layer * .25, 1.2, variant === 'a' ? .5 : .18));
  } else if (id === 'envelope') {
    [0, 3, 6].forEach(beat => add(60, beat, 2.4, .5, variant === 'b'));
  } else if (id === 'return') {
    [0, 4, 2, 7, 0, 4, 2, 7].forEach((n, i) => add(64 + (variant === 'a' ? n : -n), i, .7));
  }
  return events;
}

export default function SonicLab({ open }: { open: (id: string) => void }) {
  const [selected, setSelected] = useState(experiments[0].id);
  const [tempo, setTempo] = useState(96);
  const [volume, setVolume] = useState(20);
  const [playing, setPlaying] = useState('');
  const [error, setError] = useState('');
  const audio = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generation = useRef(0);
  const experiment = experiments.find(x => x.id === selected)!;
  const stop = () => {
    generation.current++;
    if (timer.current) clearTimeout(timer.current);
    const current = audio.current;
    audio.current = null;
    if (current && current.state !== 'closed') void current.close().catch(() => {});
    setPlaying('');
  };
  useEffect(() => () => {
    generation.current++;
    if (timer.current) clearTimeout(timer.current);
    if (audio.current && audio.current.state !== 'closed') void audio.current.close().catch(() => {});
  }, []);
  const play = async (variant: 'a' | 'b') => {
    window.dispatchEvent(new Event('acervo:audio-start'));
    stop(); setError('');
    const token = generation.current;
    try {
      const ctx = new AudioContext(); audio.current = ctx;
      await ctx.resume();
      if (generation.current !== token) return;
      const master = ctx.createGain(); master.gain.value = volume / 100 * .35; master.connect(ctx.destination);
      const events = makeSequence(selected, variant), beat = 60 / tempo, start = ctx.currentTime + .04;
      for (const event of events) {
        const oscillator = ctx.createOscillator(), envelope = ctx.createGain();
        oscillator.type = 'triangle'; oscillator.frequency.value = 440 * 2 ** ((event.midi - 69) / 12);
        oscillator.connect(envelope); envelope.connect(master);
        const t = start + event.beat * beat, duration = event.length * beat;
        envelope.gain.setValueAtTime(0, t);
        envelope.gain.linearRampToValueAtTime(event.level, t + (event.swell ? duration * .65 : .012));
        envelope.gain.linearRampToValueAtTime(0, t + duration);
        oscillator.start(t); oscillator.stop(t + duration + .02);
      }
      setPlaying(variant);
      const seconds = Math.max(...events.map(e => (e.beat + e.length) * beat));
      timer.current = setTimeout(stop, (seconds + .15) * 1000);
    } catch {
      stop(); setError('Não foi possível iniciar o áudio. Tente novamente em um navegador com suporte a Web Audio.');
    }
  };
  useEffect(() => {
    window.addEventListener('acervo:audio-start', stop);
    return () => window.removeEventListener('acervo:audio-start', stop);
  }, []);
  return <section className="sonic-studio" aria-label="Bancada de experimentos sonoros">
    <div className="studio-intro"><h2>Experimentos A/B</h2><p>Comece com volume baixo. Áudio gerado aqui, somente quando você toca em reproduzir.</p></div>
    <div className="experiment-tabs" role="group" aria-label="Escolher experimento">{experiments.map((x, i) => <button key={x.id} aria-pressed={selected === x.id} onClick={() => { stop(); setSelected(x.id); }}><span>0{i + 1}</span>{x.title}</button>)}</div>
    <div className="experiment-body">
      <div><span className="eyebrow">{playing ? `REPRODUZINDO ${playing.toUpperCase()}` : 'COMPARE A / B'}</span><h3>{experiment.title}</h3><p>{experiment.detail}</p>
        <div className="sound-visual" aria-hidden="true">{Array.from({length: 32}, (_, i) => <i key={i} className={playing ? 'sounding' : ''} style={{height: `${15 + Math.abs(Math.sin(i * .6)) * 65}%`, animationDelay: `${i * 30}ms`}} />)}</div>
        <div className="experiment-actions"><button className="primary" onClick={() => void play('a')}><Play size={16}/> A · {experiment.a}</button><button className="secondary" onClick={() => void play('b')}><Play size={16}/> B · {experiment.b}</button><button className="secondary" disabled={!playing} onClick={stop}><Square size={15}/> Parar</button></div>
        <p className="lab-status" role="status">{error || (playing ? `Ouvindo ${playing === 'a' ? experiment.a : experiment.b}.` : 'Pronto. Os exemplos não são gravações das obras.')}</p>
      </div>
      <aside className="experiment-controls"><label>Velocidade · {tempo} BPM<input aria-label="Velocidade do experimento" type="range" min="48" max="160" value={tempo} onChange={e => { stop(); setTempo(Number(e.target.value)); }}/></label><label>Volume · {volume}%<input aria-label="Volume do experimento" type="range" min="0" max="50" value={volume} onChange={e => { stop(); setVolume(Number(e.target.value)); }}/></label><small>Ao ajustar, a reprodução para. Toque A ou B para ouvir a nova configuração.</small><blockquote>{experiment.question}</blockquote><span className="eyebrow">OBRAS RELACIONADAS</span>{experiment.works.map(id => <button className="link-button" key={id} onClick={() => open(id)}>{({quarteto8: 'Shostakovich', offertorium: 'Gubaidulina', sacre: 'Stravinsky', part: 'Pärt'} as Record<string,string>)[id] || id.charAt(0).toUpperCase() + id.slice(1)} <ArrowUpRight size={15}/></button>)}</aside>
    </div>
  </section>;
}
