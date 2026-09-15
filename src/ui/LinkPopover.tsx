import { X } from 'lucide-react';
import type { Link } from '../data/types';
import { MOVEMENT_BY_ID, SOURCE_BY_ID } from '../data';
import { LINK_LABELS } from '../map/LinkLayer';

export interface LinkPopoverData {
  link: Link;
  x: number;
  y: number;
}

export function LinkPopover({ data, onClose, onGo }: { data: LinkPopoverData; onClose: () => void; onGo: (id: string) => void }) {
  const { link, x, y } = data;
  const src = MOVEMENT_BY_ID[link.source];
  const tgt = MOVEMENT_BY_ID[link.target];
  const left = Math.min(Math.max(12, x - 160), window.innerWidth - 340);
  const top = Math.min(Math.max(70, y - 80), window.innerHeight - 280);
  return (
    <div className="glass fixed w-80 p-4 z-50" style={{ left, top }} role="dialog" aria-label="Détail du lien" data-testid="link-popover">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#a39c8c]">{LINK_LABELS[link.kind]}</span>
          <h3 className="font-serif text-lg leading-snug">{link.label}</h3>
        </div>
        <button aria-label="Fermer" className="p-1 hover:bg-white/10 rounded shrink-0" onClick={onClose}>
          <X size={15} />
        </button>
      </div>
      <p className="mb-2">
        <span className={link.epistemic === 'fait' ? 'badge-fait' : 'badge-interp'}>
          {link.epistemic === 'fait' ? 'Fait' : 'Interprétation'}
        </span>
      </p>
      <p className="text-sm text-[#cfc8b8] mb-3">{link.note}</p>
      {(link.sources ?? []).length > 0 && (
        <p className="text-xs text-[#a39c8c] mb-3">
          Sources : {(link.sources ?? []).map((s) => SOURCE_BY_ID[s]?.title ?? s).join(' · ')}
        </p>
      )}
      <div className="flex gap-2">
        {src && (
          <button className="chip" onClick={() => onGo(src.id)}>
            Aller à {src.name}
          </button>
        )}
        {tgt && (
          <button className="chip" onClick={() => onGo(tgt.id)}>
            Aller à {tgt.name}
          </button>
        )}
      </div>
    </div>
  );
}
