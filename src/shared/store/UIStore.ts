import { create } from 'zustand'

type State = {
  isBottomTabBarHidden: boolean
  isLeftSideBar: boolean
  isRightSideBar: boolean
}

type Action = {
  hideTabBar: () => void
  showTabBar: () => void
  setLeftSideBar: (isOpen: boolean) => void
  setRightSideBar: (isOpen: boolean) => void
}

export const useUIStore = create<State & Action>((set) => ({
  isBottomTabBarHidden: false,
  hideTabBar: () => set(() => ({ isBottomTabBarHidden: true })),
  showTabBar: () => set(() => ({ isBottomTabBarHidden: false })),

  isLeftSideBar: false,
  setLeftSideBar: (isOpen: boolean) => set(() => ({ isLeftSideBar: isOpen })),

  isRightSideBar: false,
  setRightSideBar: (isOpen: boolean) => set(() => ({ isRightSideBar: isOpen })),
}))
