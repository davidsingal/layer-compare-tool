import { atom } from 'jotai';

import type { LayerSpec } from '@/types/layers';

export const leftLayersAtom = atom<LayerSpec[]>([]);

export const rightLayersAtom = atom<LayerSpec[]>([]);
