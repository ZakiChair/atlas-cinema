import { useEffect, type ReactNode } from 'react';
import { useIsDesktop } from './useIsDesktop';
import { X, ArrowRight, ArrowLeft, ArrowLeftRight } from 'lucide-react';
import type { Filmmaker, Movement, Source, Style, Film } from '../data/types';
import { useStore, type Selection } from '../state/store';
import { formatPeriod } from '../map/Territory';
import { StatementList } from './Statement';
import { FilmCard, Poster } from './FilmCard';
import { Breadcrumb } from './Breadcrumb';
import { Sheet } from './Sheet';
import { resolveSelection, sourceOrderFor, type Resolved } from './resolve';
import { useLang } from '../i18n/lang';
import { useData, LINK_KIND_I18N, FM_LINK_KIND_I18N, type AtlasData } from '../i18n/localize';

type Nav = (sel: Selection | null) => void;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="font-serif text-lg border-b border-white/10 pb-1 mb-2">{title}</h3>
      {children}
    </section>
  );
}

function SourceList({ order, data }: { order: string[]; data: AtlasData }) {
  const { t } = useLang();
  return (
    <ol className="list-decimal pl-5 space-y-1.5 text-sm">
      {order.map((sid) => {
        const s: Source | undefined = data.sourceById[sid];
        if (!s) return <li key={sid} className="text-[#a39c8c]">{sid}</li>;
        return (
          <li key={sid}>
            {s.author}, <em>{s.title}</em>
            {s.year ? `, ${s.year}` : ''}
            {s.publisher ? `, ${s.publisher}` : ''}
            {s.note ? ` — ${s.note}` : ''}
            {s.url ? (
              <>
                {' '}
                <a href={s.url} target="_blank" rel="noreferrer" className="text-[#8fd3ff] underline">
                  {t('panel.sourceLink')}
                </a>
              </>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function MovementView({ m, nav }: { m: Movement; nav: Nav }) {
  const { state } = useStore();
  const { t, lang } = useLang();
  const data = useData();
  const factsOnly = state.filters.factsOnly;
  const order = sourceOrderFor(m);
  const links = data.links.filter((l) => l.source === m.id || l.target === m.id);

  return (
    <>
      <div className="h-1.5 rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${m.map.palette.fill}, ${m.map.palette.accent})` }} />
      <h2 className="font-serif text-3xl leading-tight">{m.name}</h2>
      {m.altNames && m.altNames.length > 0 && <p className="text-xs text-[#a39c8c] mt-0.5">{t('panel.also')} {m.altNames.join(' · ')}</p>}
      <p className="font-serif italic text-[#cfc8b8] mt-1">{m.tagline}</p>
      <p className="text-sm text-[#a39c8c] mt-1">
        {formatPeriod(m.period, lang)} · {m.countries.join(', ')} ·{' '}
        {m.regions.map((r) => data.regions.find((x) => x.id === r)?.name ?? r).join(', ')}
      </p>

      <Section title={t('panel.brief')}>
        <p className="text-sm leading-relaxed">{m.summary}</p>
      </Section>
      <Section title={t('panel.visualTraits')}>
        <StatementList statements={m.visualTraits} sourceOrder={order} factsOnly={factsOnly} />
      </Section>
      <Section title={t('panel.context')}>
        <StatementList statements={m.context} sourceOrder={order} factsOnly={factsOnly} />
      </Section>
      <Section title={t('panel.debates')}>
        <StatementList statements={m.debates} sourceOrder={order} factsOnly={factsOnly} />
      </Section>
      <Section title={t('panel.keyDates')}>
        <ol className="border-l border-white/15 pl-4 space-y-1.5">
          {m.keyDates.map((k, i) => (
            <li key={i} className="text-sm">
              <span className="font-serif text-[#e8d9a8] mr-2">{k.year}</span>
              {k.text}
            </li>
          ))}
        </ol>
      </Section>
      <Section title={t('panel.styles')}>
        <div className="grid gap-2">
          {m.styles.map((s) => (
            <button key={s.id} className="text-left glass p-3 hover:border-white/30 transition" onClick={() => nav({ kind: 'style', id: s.id })}>
              <div className="font-serif text-base">{s.name} <span className="text-xs text-[#a39c8c]">{s.period ? formatPeriod(s.period, lang) : ''}</span></div>
              <p className="text-xs text-[#a39c8c] mt-0.5">{s.summary}</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {s.traits.slice(0, 4).map((tr) => (
                  <span key={tr} className="chip !text-[0.65rem] !py-0">{tr}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </Section>
      <Section title={t('panel.filmmakers')}>
        <ul className="space-y-1">
          {m.filmmakers.map((f) => (
            <li key={f.id}>
              <button className="w-full text-left text-sm px-2 py-1.5 rounded-lg hover:bg-white/5 flex justify-between gap-2" onClick={() => nav({ kind: 'filmmaker', id: f.id })}>
                <span>{f.name}</span>
                <span className="text-xs text-[#a39c8c]">
                  {f.years[0]} – {f.years[1] ?? '…'} · {f.nationality}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Section>
      <Section title={t('panel.filmsRecommended')}>
        <ul className="space-y-2">
          {m.films.map((f) => (
            <li key={f.id}>
              <FilmCard film={f} onClick={() => nav({ kind: 'film', id: f.id })} />
            </li>
          ))}
        </ul>
      </Section>
      {links.length > 0 && (
        <Section title={t('panel.links')}>
          <ul className="space-y-2">
            {links.map((l, i) => {
              const otherId = l.source === m.id ? l.target : l.source;
              const other = data.movementById[otherId];
              const Icon = l.kind === 'affinite' ? ArrowLeftRight : l.source === m.id ? ArrowRight : ArrowLeft;
              return (
                <li key={i} className="text-sm">
                  <div className="flex items-center gap-1.5">
                    <Icon size={14} className="text-[#a39c8c] shrink-0" />
                    <span className="text-xs uppercase tracking-wider text-[#a39c8c]">{t(LINK_KIND_I18N[l.kind])}</span>
                    {other && (
                      <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'movement', id: other.id })}>
                        {other.name}
                      </button>
                    )}
                    <span className={l.epistemic === 'fait' ? 'badge-fait' : 'badge-interp'}>
                      {l.epistemic === 'fait' ? t('statement.fact') : t('statement.interp')}
                    </span>
                  </div>
                  <div className="pl-5 text-[#cfc8b8]">{l.label}</div>
                  <div className="pl-5 text-xs text-[#a39c8c]">{l.note}</div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
      <Section title={t('panel.sources')}>
        <SourceList order={order} data={data} />
      </Section>
    </>
  );
}

function StyleView({ s, m, nav }: { s: Style; m: Movement; nav: Nav }) {
  const { t, lang } = useLang();
  const filmmakers = m.filmmakers.filter((f) => f.styleId === s.id);
  const films = m.films.filter((f) => f.styleId === s.id);
  return (
    <>
      <h2 className="font-serif text-2xl">{s.name}</h2>
      {s.period && <p className="text-sm text-[#a39c8c]">{formatPeriod(s.period, lang)}</p>}
      <p className="text-sm mt-2">{s.summary}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {s.traits.map((tr) => (
          <span key={tr} className="chip">{tr}</span>
        ))}
      </div>
      {filmmakers.length > 0 && (
        <Section title={t('panel.filmmakers')}>
          <ul className="space-y-1">
            {filmmakers.map((f) => (
              <li key={f.id}>
                <button className="text-sm text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'filmmaker', id: f.id })}>
                  {f.name}
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}
      {films.length > 0 && (
        <Section title={t('panel.films')}>
          <ul className="space-y-1">
            {films.map((f) => (
              <li key={f.id}>
                <button className="text-sm text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'film', id: f.id })}>
                  {f.title} <span className="text-[#a39c8c]">({f.year})</span>
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <button className="chip mt-2" onClick={() => nav({ kind: 'movement', id: m.id })}>
        {t('panel.backTo', { name: m.name })}
      </button>
    </>
  );
}

function FilmmakerView({ f, r, nav }: { f: Filmmaker; r: Resolved; nav: Nav }) {
  const { t } = useLang();
  const data = useData();
  const home = r.filmmakerHome ?? r.movement!;
  const style = f.styleId ? home.styles.find((s) => s.id === f.styleId) : undefined;
  const also = data.movements.filter((m) => m.id !== home.id && m.relatedFilmmakerIds?.includes(f.id));
  const network = (data.filmmakerLinksById[f.id] ?? []).map((l) => {
    const otherId = l.source === f.id ? l.target : l.source;
    return { link: l, other: data.filmmakerById[otherId], home: data.movementOfFilmmaker[otherId], outgoing: l.source === f.id };
  });
  // films dans tous les courants, groupés par courant
  const filmsByMovement = data.movements.map((m) => ({ m, films: m.films.filter((x) => x.filmmakerId === f.id) })).filter(
    (g) => g.films.length > 0,
  );
  return (
    <>
      <h2 className="font-serif text-2xl">{f.name}</h2>
      <p className="text-sm text-[#a39c8c]">
        {f.years[1] === null ? t('panel.born', { year: f.years[0] }) : `${f.years[0]} – ${f.years[1]}`} · {f.nationality}
      </p>
      <p className="text-sm mt-2">{f.bio}</p>
      {style && (
        <p className="text-sm mt-2">
          {t('panel.style')}{' '}
          <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'style', id: style.id })}>
            {style.name}
          </button>
        </p>
      )}
      {filmsByMovement.length > 0 && (
        <Section title={t('panel.films')}>
          {filmsByMovement.map(({ m: gm, films }) => (
            <div key={gm.id} className="mb-2">
              <div className="text-xs uppercase tracking-wider text-[#a39c8c] mb-0.5">
                <button className="hover:text-[#e8d9a8]" onClick={() => nav({ kind: 'movement', id: gm.id })}>
                  {gm.name}
                </button>
              </div>
              <ul className="space-y-1 pl-2">
                {films.map((x) => (
                  <li key={x.id}>
                    <button className="text-sm text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'film', id: x.id })}>
                      {x.title} <span className="text-[#a39c8c]">({x.year})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}
      {network.length > 0 && (
        <Section title={t('panel.network')}>
          <ul className="space-y-1.5">
            {network.map(({ link, other, home: oh, outgoing }) =>
              other ? (
                <li key={`${link.source}|${link.target}|${link.kind}`} className="text-sm">
                  <span className="text-xs uppercase tracking-wider text-[#a39c8c] mr-2">{t(FM_LINK_KIND_I18N[link.kind])}</span>
                  <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'filmmaker', id: other.id })}>
                    {other.name}
                  </button>
                  {link.epistemic && (
                    <span className={`ml-2 ${link.epistemic === 'fait' ? 'badge-fait' : 'badge-interp'}`}>
                      {link.epistemic === 'fait' ? t('statement.fact') : t('statement.interp')}
                    </span>
                  )}
                  {oh && oh.id !== home.id && (
                    <>
                      {' '}
                      <span className="text-[#a39c8c]">
                        (
                        <button className="hover:text-[#e8d9a8]" onClick={() => nav({ kind: 'movement', id: oh.id })}>
                          {oh.name}
                        </button>
                        )
                      </span>
                    </>
                  )}
                  <span className="block text-[#cfc8b8] pl-2 border-l border-white/10 mt-0.5">
                    {!outgoing && link.kind !== 'collaboration' && link.kind !== 'affinite' ? `${other.name} → ${f.name} : ` : ''}
                    {link.note}
                  </span>
                </li>
              ) : null,
            )}
          </ul>
        </Section>
      )}
      <p className="text-sm">
        {t('panel.movement')}{' '}
        <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'movement', id: home.id })}>
          {home.name}
        </button>
      </p>
      {also.length > 0 && (
        <p className="text-sm mt-1">
          {t('panel.alsoActive')}{' '}
          {also.map((a, i) => (
            <span key={a.id}>
              {i > 0 && ', '}
              <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'movement', id: a.id })}>
                {a.name}
              </button>
            </span>
          ))}
        </p>
      )}
    </>
  );
}

function FilmView({ f, r, nav }: { f: Film; r: Resolved; nav: Nav }) {
  const { t } = useLang();
  const data = useData();
  const m = r.movement!;
  const director = f.filmmakerId ? m.filmmakers.find((x) => x.id === f.filmmakerId) : undefined;
  const style = f.styleId ? m.styles.find((s) => s.id === f.styleId) : undefined;
  const also = m.films.filter((x) => x.id !== f.id && (f.styleId ? x.styleId === f.styleId : true)).slice(0, 3);
  const extra = data.filmExtra(f.id);
  return (
    <>
      <div className="flex gap-4 items-start">
        {extra?.poster && (
          <Poster film={f} className="w-28 shrink-0 rounded-md bg-white/5 shadow-lg" />
        )}
        <div className="min-w-0">
          <h2 className="font-serif text-2xl leading-tight">{f.title}</h2>
          {f.originalTitle && <p className="font-serif italic text-[#a39c8c]">{f.originalTitle}</p>}
          <p className="text-sm text-[#a39c8c] mt-1">
            {f.year} ·{' '}
            {director ? (
              <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'filmmaker', id: director.id })}>
                {f.director}
              </button>
            ) : (
              f.director
            )}{' '}
            · {f.country}
          </p>
          {extra?.cast && extra.cast.length > 0 && (
            <p className="text-xs text-[#8b8574] mt-1">{t('panel.with', { cast: extra.cast.join(', ') })}</p>
          )}
          {style && (
            <p className="text-sm mt-1">
              {t('panel.style')}{' '}
              <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'style', id: style.id })}>
                {style.name}
              </button>
            </p>
          )}
        </div>
      </div>
      {extra?.synopsis && (
        <Section title={t('panel.synopsis')}>
          <p className="text-sm leading-relaxed text-[#cfc8b8]">{extra.synopsis}</p>
        </Section>
      )}
      <Section title={t('panel.place')}>
        <p className="text-sm leading-relaxed">{f.comment}</p>
      </Section>
      <p className="text-sm mt-2">
        {t('panel.movement')}{' '}
        <button className="text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'movement', id: m.id })}>
          {m.name}
        </button>
      </p>
      {extra?.wikiUrl && (
        <p className="text-xs mt-2">
          <a href={extra.wikiUrl} target="_blank" rel="noreferrer" className="text-[#8fd3ff] underline">
            {t('panel.wikipedia')}
          </a>
        </p>
      )}
      {also.length > 0 && (
        <Section title={t('panel.seeAlso')}>
          <ul className="space-y-1">
            {also.map((x) => (
              <li key={x.id}>
                <button className="text-sm text-[#e8d9a8] hover:underline" onClick={() => nav({ kind: 'film', id: x.id })}>
                  {x.title} <span className="text-[#a39c8c]">({x.year})</span>
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}



export function Panel({ nav }: { nav: Nav }) {
  const { state, dispatch } = useStore();
  const { t } = useLang();
  const data = useData();
  const sel = state.selection;
  const desktop = useIsDesktop();

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch({ type: 'select', selection: null });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel, dispatch]);

  if (!sel) return null;
  const r = resolveSelection(sel, data);
  if (!r?.movement) return null;

  const close = () => dispatch({ type: 'select', selection: null });

  const content = (
    <div className="p-5">
      <div className="flex items-start justify-between gap-2">
        <Breadcrumb selection={sel} onNavigate={nav} />
        <button aria-label={t('panel.close')} className="p-1 hover:bg-white/10 rounded shrink-0" onClick={close}>
          <X size={16} />
        </button>
      </div>
      {sel.kind === 'movement' && <MovementView m={r.movement} nav={nav} />}
      {sel.kind === 'style' && r.style && <StyleView s={r.style} m={r.movement} nav={nav} />}
      {sel.kind === 'filmmaker' && r.filmmaker && <FilmmakerView f={r.filmmaker} r={r} nav={nav} />}
      {sel.kind === 'film' && r.film && <FilmView f={r.film} r={r} nav={nav} />}
    </div>
  );

  if (!desktop) {
    return <Sheet onClose={close}>{content}</Sheet>;
  }
  return (
    <aside data-testid="panel" className="glass fixed top-20 right-4 bottom-4 w-[440px] overflow-auto panel-scroll z-40" role="complementary" aria-label={t('panel.aria')}>
      {content}
    </aside>
  );
}
