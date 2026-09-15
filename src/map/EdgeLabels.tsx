import { memo } from 'react';
import { useViewTransform } from './viewStore';
import { eraLabels, regionLabels } from './edgeLabelsLayout';

/** Marges de la carte : noms de régions à gauche, ères en bas, en espace écran. */
export const EdgeLabels = memo(function EdgeLabels() {
  const v = useViewTransform();
  const regions = regionLabels(v);
  const eras = eraLabels(v);
  return (
    <div className="edge-labels" aria-hidden="true">
      {regions.map((l) => (
        <span key={l.id} className="edge-region" style={{ top: l.pos }}>
          {l.lines[0]}
        </span>
      ))}
      {eras.map((l) => (
        <span key={l.id} className="edge-era" style={{ left: l.pos }}>
          <span className="edge-era-name">{l.lines[0]}</span>
          <span className="edge-era-range">{l.lines[1]}</span>
        </span>
      ))}
    </div>
  );
});
