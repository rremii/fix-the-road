import { create } from 'zustand'

type State = {
  bottomTabBar: boolean
  leftSideBar: boolean
  rightSideBar: boolean
  createPostModal: boolean
  postModal: boolean
}

type MenuType = keyof State

type Action = {
  openMenu: (menu: MenuType) => void
  closeMenu: (menu: MenuType) => void
}

export const useUIStore = create<State & Action>((set) => ({
  bottomTabBar: true,
  leftSideBar: false,
  rightSideBar: false,
  createPostModal: false,
  postModal: false,

  closeMenu: (menu) => set(() => ({ [menu]: false })),
  openMenu: (menu) => set(() => ({ [menu]: true })),
}))
