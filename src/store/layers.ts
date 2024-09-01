import { atom } from 'jotai';

import type { LayerSpec } from '@/types/layers';

const layersAtom = atom<LayerSpec[]>([]);

export default layersAtom;
