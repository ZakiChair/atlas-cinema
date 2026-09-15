import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from 'react';
import type { LinkKind, NodeKind, RegionId } from '../data/types';
import { TIME_BOUNDS } from '../data/eras';

export interface Selection {
  kind: NodeKind;
  id: string;
}

export interface Filters {
  period: [number, number];
  regions: RegionId[];
  linkKinds: Record<LinkKind, boolean>;
  factsOnly: boolean;
  /** Ne conserver que les liens entre ères différentes. */
  transversalOnly: boolean;
}

export interface UiState {
  filtersOpen: boolean;
  legendOpen: boolean;
  methodOpen: boolean;
  introSeen: boolean;
}

export interface AtlasState {
  selection: Selection | null;
  filters: Filters;
  ui: UiState;
}

export type Action =
  | { type: 'select'; selection: Selection | null }
  | { type: 'set-period'; period: [number, number] }
  | { type: 'toggle-region'; region: RegionId }
  | { type: 'set-regions'; regions: RegionId[] }
  | { type: 'toggle-link-kind'; kind: LinkKind }
  | { type: 'toggle-facts-only' }
  | { type: 'toggle-transversal-only' }
  | { type: 'reset-filters' }
  | { type: 'toggle-ui'; key: 'filtersOpen' | 'legendOpen' | 'methodOpen' }
  | { type: 'close-ui' }
  | { type: 'intro-seen' };

const INTRO_KEY = 'atlas.intro.v1';

export function initialState(): AtlasState {
  const introSeen = typeof localStorage !== 'undefined' && localStorage.getItem(INTRO_KEY) === '1';
  return {
    selection: null,
    filters: {
      period: [TIME_BOUNDS.start, TIME_BOUNDS.end],
      regions: [],
      linkKinds: { filiation: true, influence: true, affinite: true, reaction: true },
      factsOnly: false,
      transversalOnly: false,
    },
    ui: { filtersOpen: false, legendOpen: false, methodOpen: false, introSeen },
  };
}

export function reducer(state: AtlasState, action: Action): AtlasState {
  switch (action.type) {
    case 'select':
      return { ...state, selection: action.selection };
    case 'set-period':
      return { ...state, filters: { ...state.filters, period: action.period } };
    case 'toggle-region': {
      const has = state.filters.regions.includes(action.region);
      const regions = has
        ? state.filters.regions.filter((r) => r !== action.region)
        : [...state.filters.regions, action.region];
      return { ...state, filters: { ...state.filters, regions } };
    }
    case 'set-regions':
      return { ...state, filters: { ...state.filters, regions: action.regions } };
    case 'toggle-link-kind':
      return {
        ...state,
        filters: {
          ...state.filters,
          linkKinds: { ...state.filters.linkKinds, [action.kind]: !state.filters.linkKinds[action.kind] },
        },
      };
    case 'toggle-facts-only':
      return { ...state, filters: { ...state.filters, factsOnly: !state.filters.factsOnly } };
    case 'toggle-transversal-only':
      return { ...state, filters: { ...state.filters, transversalOnly: !state.filters.transversalOnly } };
    case 'reset-filters':
      return {
        ...state,
        filters: {
          period: [TIME_BOUNDS.start, TIME_BOUNDS.end],
          regions: [],
          linkKinds: { filiation: true, influence: true, affinite: true, reaction: true },
          factsOnly: false,
          transversalOnly: false,
        },
      };
    case 'toggle-ui':
      return { ...state, ui: { ...state.ui, [action.key]: !state.ui[action.key] } };
    case 'close-ui':
      return { ...state, ui: { ...state.ui, filtersOpen: false, legendOpen: false, methodOpen: false } };
    case 'intro-seen': {
      try {
        localStorage.setItem(INTRO_KEY, '1');
      } catch {
        /* ignore */
      }
      return { ...state, ui: { ...state.ui, introSeen: true } };
    }
    default:
      return state;
  }
}

interface Store {
  state: AtlasState;
  dispatch: Dispatch<Action>;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const s = useContext(StoreContext);
  if (!s) throw new Error('useStore hors de StoreProvider');
  return s;
}
