import { memo, useMemo, type CSSProperties } from 'react';
import type { Movement, Period } from '../data/types';
import { organicPath, type TerritoryLayout } from './layout';
import { LITE } from './lite';
import { levelFor, useViewTransform } from './viewStore';
import { useLang, type Lang } from '../i18n/lang';
import { UI } from '../i18n/ui';

export function formatPeriod(p: Period | undefined, lang: Lang): string {
  if (!p) return '';
  const ca = p.approx ? UI[lang]['period.ca'] : '';
  const end = p.end === null ? UI[lang]['period.today'] : String(p.end);
  return `${ca}${p.start} – ${end}`;
}

const MAX_LINE = 15;
const MAX_LINES = 3;

/** Coupe un texte en lignes ≤ maxLine caractères (aux espaces), maxLines max. */
export function wrapWords(text: string, maxLine: number, maxLines: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= maxLine) {
      cur = next;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const head = lines.slice(0, maxLines - 1);
    head.push(lines.slice(maxLines - 1).join(' '));
    return head;
  }
  return lines;
}

/** Coupe le nom en lignes ≤ ~15 caractères (aux espaces), 3 lignes max. */
export function wrapName(name: string): string[] {
  return wrapWords(name.toUpperCase(), MAX_LINE, MAX_LINES);
}

/** Nom court d'un style pour la carte : la partie avant « : » (le détail reste dans le panneau). */
export function shortStyleName(name: string): string {
  return name.split(' : ')[0].replace(/\s*\([^)]*\)\s*$/, '').trim();
}

interface Props {
  movement: Movement;
  layout: TerritoryLayout;
  selected: boolean;
  selectedChildId?: string;
  dimmed: boolean;
  related: boolean;
  onSelect: (kind: 'movement' | 'style' | 'filmmaker' | 'film', id: string, territory: TerritoryLayout) => void;
  onHover?: (id: string | null) => void;
}

export const Territory = memo(function Territory({ movement, layout, selected, selectedChildId, dimmed, related, onSelect, onHover }: Props) {
  const { lang } = useLang();
  const { x, y, r } = layout;
  const palette = movement.map.palette;

  // Re-rendu à chaque frame de zoom/pan (léger : tests booléens seulement) pour
  // ne monter dans le DOM que les enfants du niveau courant ET visibles à
  // l'écran — sans ça, ~5 000 nœuds masqués (opacity:0) pèsent sur le mobile.
  const v = useViewTransform();
  const lvl = levelFor(v.k);
  const PAD = 220; // px écran : les libellés débordent sans apparaître brutalement
  const inView = (cx: number, cy: number) => {
    const sx = v.x + cx * v.k;
    const sy = v.y + cy * v.k;
    return sx > -PAD && sx < v.width + PAD && sy > -PAD && sy < v.height + PAD;
  };
  const showStyles = lvl >= 1;
  const showFilmmakers = lvl >= 2;
  const showFilms = lvl >= 3;

  const styleById = useMemo(() => new Map(movement.styles.map((s) => [s.id, s])), [movement]);
  const fmById = useMemo(() => new Map(movement.filmmakers.map((f) => [f.id, f])), [movement]);
  const filmById = useMemo(() => new Map(movement.films.map((f) => [f.id, f])), [movement]);

  const cls = `territory${selected ? ' selected' : ''}${dimmed ? ' dimmed' : ''}${related ? ' related' : ''}`;

  // nom : lignes + taille en unités carte pour tenir dans ≈1.55 r
  const lines = wrapName(movement.name);
  const longest = Math.max(...lines.map((l) => l.length), 1);
  const fs = Math.min(0.19 * r, (1.55 * r) / (longest * 0.62));
  // interligne en em : suit la taille effective (réduite par CSS aux niveaux ≥ 1)
  const lineH = fs * 1.05;
  const nameTop = y - ((lines.length - 1) * lineH) / 2 - (lines.length > 0 ? fs * 0.1 : 0);

  const vars = {
    '--fs': String(fs),
    '--r': String(r),
    '--accent': palette.accent,
  } as CSSProperties;

  return (
    <g
      className={cls}
      data-testid="territory"
      data-id={movement.id}
      style={vars}
      tabIndex={0}
      role="button"
      aria-label={movement.name}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onSelect('movement', movement.id, layout);
        }
      }}
      onMouseDown={(e) => e.preventDefault()}
      onMouseEnter={() => onHover?.(movement.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(movement.id)}
      onBlur={() => onHover?.(null)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect('movement', movement.id, layout);
      }}
    >
      {/* halo de sélection — flou coûteux : réservé au desktop ; sur mobile,
          monté seulement à la sélection et sans flou */}
      {(selected || !LITE) && (
        <path
          className="halo"
          d={layout.path}
          fill="none"
          stroke={palette.accent}
          strokeWidth={10}
          filter={LITE ? undefined : 'url(#halo-blur)'}
        />
      )}
      {/* aplat + grain papier (feTurbulence : desktop seulement) */}
      <path className="fill" d={layout.path} fill={palette.fill} fillOpacity={0.55} filter={LITE ? undefined : 'url(#paper-grain)'} />
      <path className="edge" d={layout.path} fill="none" stroke={palette.stroke} strokeWidth={selected ? 3.4 : 1.8} strokeOpacity={0.9} />
      {/* isoligne pointillée (même forme, r + 18) */}
      <path d={layout.isoPath} fill="none" stroke={palette.stroke} strokeWidth={1} strokeOpacity={0.4} strokeDasharray="5 7" />
      <title>{movement.name}</title>

      <g className="territory-labels">
        <text className="territory-name" x={x} y={nameTop} textAnchor="middle">
          {lines.map((l, i) => (
            <tspan key={i} x={x} dy={i === 0 ? 0 : '1.05em'}>
              {l}
            </tspan>
          ))}
        </text>
        <text className="territory-period" x={x} y={nameTop + lines.length * lineH - fs * 0.1}>
          {formatPeriod(movement.period, lang)}
        </text>
      </g>

      {/* styles — niveau 1 */}
      <g className="layer layer-1">
        {showStyles &&
          layout.children
          .filter((c) => c.kind === 'style' && inView(c.x, c.y))
          .map((c) => {
            const s = styleById.get(c.id);
            if (!s) return null;
            const blob = organicPath(c.x, c.y, r * 0.16, `style:${c.id}`, 0.22);
            return (
              <g key={c.id}>
                <path d={blob} fill={palette.accent} fillOpacity={0.16} stroke={palette.accent} strokeOpacity={0.5} strokeWidth={1.2} />
                <text className="child-label style-label" x={c.x} y={c.y} fill={palette.stroke}>
                  {wrapWords(shortStyleName(s.name), 18, 2).map((l, i, arr) => (
                    <tspan key={i} x={c.x} dy={i === 0 ? `${-(arr.length - 1) * 0.55}em` : '1.1em'}>
                      {l}
                    </tspan>
                  ))}
                </text>
                <circle
                  className="child-hit"
                  cx={c.x}
                  cy={c.y}
                  r={r * 0.18}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect('style', s.id, layout);
                  }}
                >
                  <title>
                    {s.name}
                    {s.period ? ` · ${formatPeriod(s.period, lang)}` : ''}
                  </title>
                </circle>
              </g>
            );
          })}
      </g>

      {/* cinéastes — niveau 2 */}
      <g className="layer layer-2">
        {showFilmmakers &&
          layout.children
          .filter((c) => c.kind === 'filmmaker' && inView(c.x, c.y))
          .map((c) => {
            const f = fmById.get(c.id);
            if (!f) return null;
            const isSel = selectedChildId === f.id;
            return (
              <g key={c.id}>
                <circle
                  className="marker-filmmaker"
                  cx={c.x}
                  cy={c.y}
                  fill={isSel ? palette.accent : '#ece6d8'}
                  fillOpacity={isSel ? 1 : 0.85}
                  stroke={isSel ? '#fff' : palette.stroke}
                  style={{ r: isSel ? 'calc(7px / var(--k))' : 'calc(5px / var(--k))' }}
                />
                <text className="child-label filmmaker-label" x={c.x} y={c.y} fill="#ece6d8" dy={c.vside === 'below' ? '1.7em' : '-0.9em'}>
                  {f.name}
                </text>
                <circle
                  className="child-hit"
                  cx={c.x}
                  cy={c.y}
                  r={Math.max(14, r * 0.08)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect('filmmaker', f.id, layout);
                  }}
                >
                  <title>
                    {f.name} ({f.years[0]} – {f.years[1] ?? '…'})
                  </title>
                </circle>
              </g>
            );
          })}
      </g>

      {/* films — niveau 3 */}
      <g className="layer layer-3">
        {showFilms &&
          layout.children
          .filter((c) => c.kind === 'film' && inView(c.x, c.y))
          .map((c) => {
            const f = filmById.get(c.id);
            if (!f) return null;
            const isSel = selectedChildId === f.id;
            const s = 14;
            const d = `M ${c.x} ${c.y - s} L ${c.x + s} ${c.y} L ${c.x} ${c.y + s} L ${c.x - s} ${c.y} Z`;
            return (
              <g key={c.id}>
                <path
                  className="film-diamond"
                  d={d}
                  fill={isSel ? palette.accent : '#ece6d8'}
                  fillOpacity={0.9}
                  stroke={palette.stroke}
                  style={{ transform: 'scale(calc(0.55 / var(--k)))', transformBox: 'fill-box', transformOrigin: 'center' }}
                />
                <text
                  className="child-label film-label"
                  x={c.x}
                  y={c.y}
                  textAnchor={c.anchor ?? 'middle'}
                  dx={c.anchor === 'start' ? '0.9em' : c.anchor === 'end' ? '-0.9em' : 0}
                  dy={c.anchor && c.anchor !== 'middle' ? '0.35em' : '1.6em'}
                >
                  {f.title} ({f.year})
                </text>
                <circle
                  className="child-hit"
                  cx={c.x}
                  cy={c.y}
                  r={Math.max(10, r * 0.05)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect('film', f.id, layout);
                  }}
                >
                  <title>
                    {f.title} ({f.year})
                  </title>
                </circle>
              </g>
            );
          })}
      </g>
    </g>
  );
});
