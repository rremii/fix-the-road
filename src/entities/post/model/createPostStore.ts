import { create } from 'zustand'
import { Location } from '@shared/types'

type State = {
  location: Location
  photo: string
}

type Action = {
  setCreatePostLocation: (location: Location) => void
  setCreatePostPhoto: (photoUri: string) => void
}

export const useCreatePostStore = create<State & Action>((set) => ({
  location: {
    lat: 0,
    lng: 0,
  },
  description: '',
  photo: '',

  setCreatePostLocation: (location: Location) => set(() => ({ location })),
  setCreatePostPhoto: (photo: string) => set(() => ({ photo })),
}))
