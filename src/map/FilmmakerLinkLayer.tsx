import { memo } from 'react';
import type { AtlasLayout } from './layout';
import type { Selection } from '../state/store';
import { useLang } from '../i18n/lang';
import { useData, FM_LINK_KIND_I18N } from '../i18n/localize';

interface Props {
  layout: AtlasLayout;
  /** Filmmaker.id sélectionné, sinon null. */
  selectedId: string | null;
  onSelect: (sel: Selection) => void;
}

/**
 * Arcs cinéaste ↔ cinéaste : tracés uniquement quand un cinéaste est
 * sélectionné, entre son marqueur et ceux des cinéastes liés, quel que soit
 * leur territoire. Cliquer un arc navigue vers le cinéaste relié.
 */
export const FilmmakerLinkLayer = memo(function FilmmakerLinkLayer({ layout, selectedId, onSelect }: Props) {
  const { t } = useLang();
  const { filmmakerById, filmmakerLinksById } = useData();
  if (!selectedId) return null;
  const origin = layout.childPos.get(selectedId);
  const links = filmmakerLinksById[selectedId] ?? [];
  if (!origin || links.length === 0) return null;
  return (
    <g className="fm-links">
      {links.map((l) => {
        const otherId = l.source === selectedId ? l.target : l.source;
        const target = layout.childPos.get(otherId);
        const fm = filmmakerById[otherId];
        if (!target || !fm || target.kind !== 'filmmaker') return null;
        const dx = target.x - origin.x;
        const dy = target.y - origin.y;
        const d = Math.hypot(dx, dy) || 1;
        const bend = Math.min(0.16 * d, 300);
        const cx = (origin.x + target.x) / 2 - (dy / d) * bend;
        const cy = (origin.y + target.y) / 2 + (dx / d) * bend;
        const path = `M ${origin.x} ${origin.y} Q ${cx} ${cy} ${target.x} ${target.y}`;
        // milieu de la courbe de Bézier quadratique (t = 0,5)
        const midX = 0.25 * origin.x + 0.5 * cx + 0.25 * target.x;
        const midY = 0.25 * origin.y + 0.5 * cy + 0.25 * target.y;
        return (
          <g key={`${l.source}|${l.target}|${l.kind}`} className={`fm-link-group fm-${l.kind}`}>
            <path className="fm-link" d={path} />
            <circle className="fm-link-dot" cx={target.x} cy={target.y} r={4} />
            <text className="fm-link-label" x={midX} y={midY} dy="-0.5em" textAnchor="middle">
              {t(FM_LINK_KIND_I18N[l.kind])} — {fm.name}
            </text>
            <path
              className="link-hit"
              d={path}
              onClick={(e) => {
                e.stopPropagation();
                onSelect({ kind: 'filmmaker', id: otherId });
              }}
            >
              <title>
                {t(FM_LINK_KIND_I18N[l.kind])} — {fm.name} · {l.note}
              </title>
            </path>
          </g>
        );
      })}
    </g>
  );
});
