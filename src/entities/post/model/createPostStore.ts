import { create } from 'zustand'
import { Location } from '@shared/types'

type State = {
  location: Location
  photoUri: string
}

type Action = {
  setCreatePostLocation: (location: Location) => void
  setCreatePostPhotoUri: (photoUri: string) => void
}

export const useCreatePostStore = create<State & Action>((set) => ({
  location: {
    lat: 0,
    lng: 0,
  },
  photoUri: '',

  setCreatePostLocation: (location: Location) => set(() => ({ location })),
  setCreatePostPhotoUri: (photoUri: string) => set(() => ({ photoUri })),
}))
