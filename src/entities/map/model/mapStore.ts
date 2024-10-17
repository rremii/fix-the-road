import { create } from 'zustand'
import { Bounds } from '@modules/map/types'

type State = {
  bounds: Bounds | null
  chosenMarkerId: number | null
}

type Action = {
  setBounds: (bounds: Bounds) => void
  setChosenMarkerId: (id: number | null) => void
}

export const useMapStore = create<State & Action>((set) => ({
  bounds: null,
  setBounds: (bounds: Bounds) => set(() => ({ bounds })),

  chosenMarkerId: null,
  setChosenMarkerId: (id: number | null) => set(() => ({ chosenMarkerId: id })),
}))
