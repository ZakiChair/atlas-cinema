import { X, RotateCcw } from 'lucide-react';
import { ERAS, REGIONS, TIME_BOUNDS, MOVEMENTS } from '../data';
import type { LinkKind, RegionId } from '../data/types';
import { LINK_LABELS } from '../map/LinkLayer';
import { useStore } from '../state/store';

const KINDS: LinkKind[] = ['filiation', 'influence', 'affinite', 'reaction'];

export function FiltersDrawer({ visibleCount }: { visibleCount: number }) {
  const { state, dispatch } = useStore();
  const { filters, ui } = state;
  if (!ui.filtersOpen) return null;

  const [start, end] = filters.period;

  return (
    <aside className="glass fixed top-20 right-4 w-80 max-h-[calc(100%-7rem)] overflow-auto panel-scroll p-4 z-40" aria-label="Filtres">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-lg">Filtres</h2>
        <button aria-label="Fermer les filtres" className="p-1 hover:bg-white/10 rounded" onClick={() => dispatch({ type: 'toggle-ui', key: 'filtersOpen' })}>
          <X size={16} />
        </button>
      </div>

      <section className="mb-4">
        <h3 className="text-xs uppercase tracking-widest text-[#a39c8c] mb-2">Période · {start} – {end}</h3>
        <div className="flex flex-col gap-1" data-testid="period-filter">
          <label className="text-xs text-[#a39c8c] flex justify-between">
            Début
            <input
              type="range"
              min={TIME_BOUNDS.start}
              max={TIME_BOUNDS.end}
              value={start}
              aria-label="Année de début"
              onChange={(e) => {
                const v = Math.min(Number(e.target.value), end);
                dispatch({ type: 'set-period', period: [v, end] });
              }}
              className="w-40 accent-[#e8d9a8]"
            />
          </label>
          <label className="text-xs text-[#a39c8c] flex justify-between">
            Fin
            <input
              type="range"
              min={TIME_BOUNDS.start}
              max={TIME_BOUNDS.end}
              value={end}
              aria-label="Année de fin"
              onChange={(e) => {
                const v = Math.max(Number(e.target.value), start);
                dispatch({ type: 'set-period', period: [start, v] });
              }}
              className="w-40 accent-[#e8d9a8]"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {ERAS.map((e) => {
            const eraEnd = e.period.end ?? TIME_BOUNDS.end;
            const active = start === e.period.start && end === eraEnd;
            return (
              <button
                key={e.id}
                className={`chip ${active ? 'active' : ''}`}
                onClick={() => dispatch({ type: 'set-period', period: [e.period.start, eraEnd] })}
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-4">
        <h3 className="text-xs uppercase tracking-widest text-[#a39c8c] mb-2">Régions</h3>
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => {
            const active = filters.regions.includes(r.id);
            return (
              <button key={r.id} className={`chip ${active ? 'active' : ''}`} onClick={() => dispatch({ type: 'toggle-region', region: r.id })}>
                {r.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-4">
        <h3 className="text-xs uppercase tracking-widest text-[#a39c8c] mb-2">Types de liens</h3>
        <div className="flex flex-wrap gap-1.5">
          {KINDS.map((k) => (
            <button key={k} className={`chip ${filters.linkKinds[k] ? 'active' : ''}`} onClick={() => dispatch({ type: 'toggle-link-kind', kind: k })}>
              {LINK_LABELS[k]}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer mt-2">
          <input
            type="checkbox"
            checked={filters.transversalOnly}
            onChange={() => dispatch({ type: 'toggle-transversal-only' })}
            className="accent-[#e8d9a8]"
            data-testid="transversal-only"
          />
          Liens transversaux seulement
          <span className="text-xs text-[#a39c8c]">(entre ères)</span>
        </label>
      </section>

      <section className="mb-4">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.factsOnly}
            onChange={() => dispatch({ type: 'toggle-facts-only' })}
            className="accent-[#9ad1a5]"
            data-testid="facts-only"
          />
          N’afficher que les faits
        </label>
      </section>

      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-xs text-[#a39c8c]">{visibleCount} courant{visibleCount > 1 ? 's' : ''} visible{visibleCount > 1 ? 's' : ''}</span>
        <button className="chip" onClick={() => dispatch({ type: 'reset-filters' })}>
          <RotateCcw size={12} /> Réinitialiser
        </button>
      </div>
    </aside>
  );
}

/** Calcule l'ensemble des courants estompés par les filtres. */
export function computeDimmed(filters: { period: [number, number]; regions: RegionId[] }): Set<string> {
  const [start, end] = filters.period;
  const set = new Set<string>();
  for (const m of MOVEMENTS) {
    const mEnd = m.period.end ?? TIME_BOUNDS.end;
    const periodOk = m.period.start <= end && mEnd >= start;
    const regionOk = filters.regions.length === 0 || m.regions.some((r) => filters.regions.includes(r));
    if (!periodOk || !regionOk) set.add(m.id);
  }
  return set;
}
