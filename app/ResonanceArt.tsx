export default function ResonanceArt() {
  return <div className="resonance-art" aria-hidden="true"><svg viewBox="0 0 600 420" fill="none">
    <defs><linearGradient id="resonance-ink" x1="80" y1="80" x2="510" y2="365" gradientUnits="userSpaceOnUse"><stop stopColor="#ffe2c6"/><stop offset=".35" stopColor="#ff783b"/><stop offset=".7" stopColor="#f74612"/><stop offset="1" stopColor="#756276"/></linearGradient><radialGradient id="resonance-glow"><stop stopColor="#ff5a1a" stopOpacity=".24"/><stop offset="1" stopColor="#ff5a1a" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="300" cy="220" rx="280" ry="200" fill="url(#resonance-glow)"/>
    <g transform="translate(300 204) rotate(-27)">{Array.from({length: 30}, (_, i) => <ellipse key={i} rx={57+i*5} ry={146-i*2.9} stroke="url(#resonance-ink)" strokeWidth={i%5===0 ? 1.8 : .8} opacity={.35+i*.02}/>)}</g>
    <circle cx="300" cy="204" r="47" fill="#111113" stroke="#f6c8ab" strokeOpacity=".3"/><circle cx="300" cy="204" r="6" fill="#ff783b"/>
    <path d="M46 365h116M438 55h116" stroke="#a99a91" strokeOpacity=".35"/><text x="46" y="391" fill="#b7ada7" fontSize="9" letterSpacing="3">ESTUDOS DE RESSONÂNCIA / 001</text><text x="438" y="43" fill="#ff9b6d" fontSize="9" letterSpacing="2">SOM EM MOVIMENTO</text>
  </svg></div>;
}
