import { create } from 'zustand'
import { Location } from '@shared/types'
import { IPost } from '../types'

//state = nullish IPost
type State = {
  [key in keyof IPost]: IPost[key] | null
}

type Action = {
  setEditPostLocation: (location: Location) => void

  setEditPost: (post: IPost) => void
}

export const useEditPostStore = create<State & Action>((set) => ({
  id: null,
  userId: null,
  description: null,
  photo: null,
  lat: null,
  lng: null,

  setEditPost: (post: IPost) => set(() => ({ ...post })),
  setEditPostLocation: (location: Location) =>
    set(() => ({ lat: location.lat, lng: location.lng })),
}))
