import { X } from 'lucide-react';
import { useStore } from '../state/store';

export function MethodModal() {
  const { state, dispatch } = useStore();
  if (!state.ui.methodOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Méthode" onClick={() => dispatch({ type: 'toggle-ui', key: 'methodOpen' })}>
      <div className="glass max-w-xl mx-4 p-7" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl">Méthode</h2>
          <button aria-label="Fermer" className="p-1 hover:bg-white/10 rounded" onClick={() => dispatch({ type: 'toggle-ui', key: 'methodOpen' })}>
            <X size={18} />
          </button>
        </div>
        <p className="text-sm leading-relaxed">
          Cet atlas distingue systématiquement deux régimes d’énoncés. Les faits (dates, personnes, dispositifs techniques,
          procédés observables à l’écran) sont datés et documentés dans les sources citées. Les interprétations (lectures
          critiques, attributions d’influence, jugements esthétiques) sont signées par une tradition critique et restent
          discutables ; elles sont signalées par un badge ambre. Les liens entre courants suivent la même règle : une
          filiation documentée n’a pas le même statut qu’une affinité esthétique. Les frontières des territoires et leur
          position sur la carte sont des conventions de représentation : l’axe horizontal suit approximativement la
          chronologie, l’axe vertical regroupe les aires géographiques. Les bornes chronologiques des courants sont
          indicatives (« ca. » lorsqu’elles sont particulièrement débattues).
        </p>
      </div>
    </div>
  );
}
