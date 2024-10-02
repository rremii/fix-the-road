import { create } from 'zustand'

type State = {
  isBottomTabBarHidden: boolean
}

type Action = {
  hideTabBar: () => void
  showTabBar: () => void
}

export const useUIStore = create<State & Action>((set) => ({
  isBottomTabBarHidden: false,
  hideTabBar: () => set(() => ({ isBottomTabBarHidden: true })),
  showTabBar: () => set(() => ({ isBottomTabBarHidden: false })),
}))
