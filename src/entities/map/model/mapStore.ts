import { create } from 'zustand'
import { Location } from '@shared/types'
import { Bounds } from '@modules/map/types'

type State = {
  bounds: Bounds | null
}

type Action = {
  setBounds: (bounds: Bounds) => void
}

export const useMapStore = create<State & Action>((set) => ({
  bounds: null,
  setBounds: (bounds: Bounds) => set(() => ({ bounds })),
}))
