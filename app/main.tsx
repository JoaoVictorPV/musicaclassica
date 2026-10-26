import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './page';
import './globals.css';
import './acervo.css';
class Boundary extends React.Component<
  { children: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <main style={{ padding: 40 }}>
        <h1>Não foi possível abrir esta sessão.</h1>
        <p>Suas notas continuam salvas no navegador.</p>
        <button onClick={() => location.reload()}>Tentar novamente</button>
      </main>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById('root')!).render(
  <Boundary>
    <App />
  </Boundary>,
);
