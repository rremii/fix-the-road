import { useMemo } from 'react'
import { IUser } from '../types'

const me = {
  avatar: 'https://avatars.githubusercontent.com/u/105947051?v=4',
  userName: 'John Doe',
  email: 'johndoe@gmail.com',
  id: 1,
}

export const useGetMe = (): IUser | undefined => {
  return useMemo(() => me, [])
}
