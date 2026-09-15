import { Minus, Plus, LocateFixed } from 'lucide-react';
import type { MapController } from '../map/controller';

export function ZoomControls({ controller }: { controller: MapController | null }) {
  return (
    <div className="glass flex flex-col gap-1 p-1.5" role="group" aria-label="Contrôles de zoom">
      <button className="p-2 hover:bg-white/10 rounded-lg" aria-label="Zoomer" onClick={() => controller?.zoomToLevel(Math.min(3, controller.getLevel() + 1))}>
        <Plus size={18} />
      </button>
      <button className="p-2 hover:bg-white/10 rounded-lg" aria-label="Dézoomer" onClick={() => controller?.zoomToLevel(Math.max(0, controller.getLevel() - 1))}>
        <Minus size={18} />
      </button>
      <button className="p-2 hover:bg-white/10 rounded-lg" aria-label="Recentrer" onClick={() => controller?.reset()}>
        <LocateFixed size={18} />
      </button>
    </div>
  );
}
