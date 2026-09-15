import { LEVEL_NAMES, type MapController } from '../map/controller';

export function LevelIndicator({ level, controller }: { level: number; controller: MapController | null }) {
  return (
    <div className="glass px-3 py-2 text-xs text-[#a39c8c]" role="navigation" aria-label="Niveau de zoom">
      {LEVEL_NAMES.map((n, i) => (
        <span key={n}>
          {i > 0 && <span className="mx-1 opacity-50">·</span>}
          <button
            className={i === level ? 'text-[#e8d9a8] font-bold' : 'hover:text-[#ece6d8]'}
            onClick={() => controller?.zoomToLevel(i)}
          >
            {n}
          </button>
        </span>
      ))}
    </div>
  );
}
