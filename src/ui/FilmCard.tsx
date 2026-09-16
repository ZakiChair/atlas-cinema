import { useState } from 'react';
import { FILM_EXTRAS } from '../data';
import type { Film } from '../data/types';

/** Affiche d'un film : masquée si absente ou en erreur de chargement. */
export function Poster({ film, className }: { film: Film; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = FILM_EXTRAS[film.id]?.poster;
  if (!src || failed) return null;
  return (
    <img
      src={src}
      alt={`Affiche de ${film.title}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/** Ligne « avec… » de la distribution. */
export function CastLine({ film, className }: { film: Film; className?: string }) {
  const cast = FILM_EXTRAS[film.id]?.cast;
  if (!cast?.length) return null;
  return <div className={className}>avec {cast.slice(0, 5).join(', ')}{cast.length > 5 ? '…' : ''}</div>;
}

/** Carte de film recommandé : affiche + titre + réalisateur + commentaire. */
export function FilmCard({ film, onClick }: { film: Film; onClick: () => void }) {
  const extra = FILM_EXTRAS[film.id];
  return (
    <button className="w-full text-left glass p-2.5 hover:border-white/30 transition flex gap-3" onClick={onClick}>
      {extra?.poster && (
        <Poster film={film} className="w-14 shrink-0 aspect-[2/3] object-cover rounded bg-white/5" />
      )}
      <div className="min-w-0">
        <div className="text-sm font-medium leading-snug">
          {film.title} <span className="text-[#a39c8c]">({film.year})</span>
        </div>
        {film.originalTitle && <div className="text-xs italic text-[#a39c8c] truncate">{film.originalTitle}</div>}
        <div className="text-xs text-[#a39c8c]">
          {film.director} · {film.country}
        </div>
        <CastLine film={film} className="text-xs text-[#8b8574] mt-0.5" />
        <p className="text-xs text-[#cfc8b8] mt-1">{film.comment}</p>
      </div>
    </button>
  );
}
