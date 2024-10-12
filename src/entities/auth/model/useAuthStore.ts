import { create } from 'zustand'
import { Location } from '@shared/types'
import { Bounds } from '@modules/map/types'

export type AuthState = 'rejected' | 'success' | null

type State = {
  authState: AuthState
}

type Action = {
  setAuthState: (newState: AuthState) => void
}

export const useAuthStore = create<State & Action>((set) => ({
  authState: null,

  setAuthState: (newState: AuthState) => set(() => ({ authState: newState })),
}))
