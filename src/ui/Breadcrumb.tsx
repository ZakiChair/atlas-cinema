import type { Selection } from '../state/store';
import { movementOf } from '../map/bounds';
import { useLang } from '../i18n/lang';
import { useData } from '../i18n/localize';

interface Props {
  selection: Selection;
  onNavigate: (sel: Selection | null) => void;
}

export function Breadcrumb({ selection, onNavigate }: Props) {
  const { t } = useLang();
  const { movementById } = useData();
  const mid = movementOf(selection);
  const m = mid ? movementById[mid] : undefined;
  const items: { label: string; sel: Selection | null }[] = [{ label: t('app.title.a'), sel: null }];
  if (m) items.push({ label: m.name, sel: { kind: 'movement', id: m.id } });
  const trail: { label: string; sel: Selection }[] = [];
  if (m) {
    if (selection.kind === 'style') {
      const s = m.styles.find((x) => x.id === selection.id);
      if (s) trail.push({ label: s.name, sel: selection });
    } else if (selection.kind === 'filmmaker') {
      const f = m.filmmakers.find((x) => x.id === selection.id);
      if (f?.styleId) {
        const s = m.styles.find((x) => x.id === f.styleId);
        if (s) trail.push({ label: s.name, sel: { kind: 'style', id: s.id } });
      }
      trail.push({ label: f?.name ?? selection.id, sel: selection });
    } else if (selection.kind === 'film') {
      const f = m.films.find((x) => x.id === selection.id);
      if (f?.styleId) {
        const s = m.styles.find((x) => x.id === f.styleId);
        if (s) trail.push({ label: s.name, sel: { kind: 'style', id: s.id } });
      }
      if (f?.filmmakerId) {
        const fm = m.filmmakers.find((x) => x.id === f.filmmakerId);
        if (fm) trail.push({ label: fm.name, sel: { kind: 'filmmaker', id: fm.id } });
      }
      trail.push({ label: f?.title ?? selection.id, sel: selection });
    }
  }
  items.push(...trail);

  return (
    <nav aria-label={t('panel.breadcrumb')} className="text-xs text-[#a39c8c] mb-3 flex flex-wrap items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          {i > 0 && <span className="mx-1.5 opacity-60">›</span>}
          <button
            className={i === items.length - 1 ? 'text-[#ece6d8] font-medium' : 'hover:text-[#e8d9a8]'}
            onClick={() => onNavigate(it.sel)}
          >
            {it.label}
          </button>
        </span>
      ))}
    </nav>
  );
}
