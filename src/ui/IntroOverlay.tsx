import { useStore } from '../state/store';

export function IntroOverlay() {
  const { state, dispatch } = useStore();
  if (state.ui.introSeen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Introduction">
      <div className="glass max-w-lg mx-4 p-8 text-center">
        <h1 className="font-serif text-3xl mb-1">Atlas <em className="font-light">du</em> cinéma</h1>
        <p className="text-[#a39c8c] text-sm mb-5">Cartographie des courants, des styles et des films</p>
        <p className="text-sm leading-relaxed text-left">
          Une carte imaginaire des courants du cinéma. Chaque territoire est un courant : zoomez pour découvrir ses styles,
          ses cinéastes puis ses films. Les lignes qui relient les territoires sont des filiations, des influences, des
          affinités ou des ruptures. Chaque énoncé distingue les faits établis des interprétations.
        </p>
        <button
          className="mt-6 px-6 py-2.5 rounded-xl bg-[#e8d9a8] text-[#0a0910] font-bold hover:bg-[#f2e5bb] transition"
          onClick={() => dispatch({ type: 'intro-seen' })}
        >
          Explorer
        </button>
      </div>
    </div>
  );
}
