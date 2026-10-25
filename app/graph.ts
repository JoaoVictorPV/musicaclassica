import { connections, works } from './data';

// Uma vizinhança de cada vez mantém os rótulos legíveis ao ampliar o catálogo.
export function graphNeighborhood(focus: string) {
  const edges = connections.filter(([a, b]) => a === focus || b === focus);
  const ids = new Set(edges.flatMap(([a, b]) => [a, b]));
  const nodes = [
    works.find((w) => w.id === focus)!,
    ...works.filter((w) => w.id !== focus && ids.has(w.id)),
  ];
  return {
    edges,
    nodes,
    position(id: string) {
      const index = nodes.findIndex((w) => w.id === id);
      if (index === 0) return { x: 400, y: 270 };
      const angle =
        ((index - 1) / Math.max(1, nodes.length - 1)) * Math.PI * 2 -
        Math.PI / 2;
      return { x: 400 + Math.cos(angle) * 270, y: 270 + Math.sin(angle) * 180 };
    },
  };
}
