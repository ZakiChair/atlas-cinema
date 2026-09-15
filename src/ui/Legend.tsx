import { X } from 'lucide-react';
import { useStore } from '../state/store';
import { LEVEL_NAMES } from '../map/controller';

const SAMPLES = [
  { cls: 'link-filiation', label: 'Filiation', dash: undefined },
  { cls: 'link-influence', label: 'Influence (orientée)', dash: '8 5' },
  { cls: 'link-affinite', label: 'Affinité (non orientée)', dash: '2 5' },
  { cls: 'link-reaction', label: 'Rupture', dash: undefined },
] as const;

const COLORS = { filiation: '#e8d9a8', influence: '#8fd3ff', affinite: '#c9a0ff', reaction: '#ff6b5a' };

export function Legend() {
  const { state, dispatch } = useStore();
  if (!state.ui.legendOpen) return null;
  return (
    <div className="glass fixed bottom-24 left-4 w-72 p-4 z-40" role="dialog" aria-label="Légende">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-serif text-lg">Légende</h2>
        <button aria-label="Fermer la légende" className="p-1 hover:bg-white/10 rounded" onClick={() => dispatch({ type: 'toggle-ui', key: 'legendOpen' })}>
          <X size={16} />
        </button>
      </div>
      <h3 className="text-xs uppercase tracking-widest text-[#a39c8c] mb-1.5">Liens entre courants</h3>
      <ul className="space-y-1.5 mb-3">
        {SAMPLES.map((s) => (
          <li key={s.cls} className="flex items-center gap-2 text-sm">
            <svg width="44" height="10" aria-hidden="true">
              <line x1="2" y1="5" x2="42" y2="5" stroke={COLORS[s.cls.replace('link-', '') as keyof typeof COLORS]} strokeWidth={2} strokeDasharray={s.dash} />
            </svg>
            {s.label}
          </li>
        ))}
      </ul>
      <p className="text-xs text-[#a39c8c] mb-3">
        Les liens sont discrets par défaut et s’allument au survol ou à la sélection d’un courant ; les liens
        transversaux (entre deux ères) restent un peu plus visibles.
      </p>
      <h3 className="text-xs uppercase tracking-widest text-[#a39c8c] mb-1.5">Niveaux de zoom</h3>
      <p className="text-sm mb-3">{LEVEL_NAMES.join(' · ')}</p>
      <h3 className="text-xs uppercase tracking-widest text-[#a39c8c] mb-1.5">Énoncés</h3>
      <p className="text-sm mb-3">
        <span className="badge-fait">Fait</span> <span className="badge-interp">Interprétation</span>
      </p>
      <p className="text-xs italic text-[#a39c8c]">Les bandes d’ères et de régions sont des repères indicatifs.</p>
    </div>
  );
}
