import { create } from 'zustand'
import { Location } from '@shared/types'
import { Bounds } from '@modules/map/types'

export type LoginState = 'rejected' | 'success' | null

type State = {
  loginState: LoginState
}

type Action = {
  setLoginState: (newState: LoginState) => void
}

export const useAuthStore = create<State & Action>((set) => ({
  loginState: null,

  setLoginState: (newState: LoginState) =>
    set(() => ({ loginState: newState })),
}))
