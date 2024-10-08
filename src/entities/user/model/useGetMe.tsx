import { useMemo } from 'react'
import { IUser } from '../types'

const me = {
  avatar: '1__224d8836-a210-4f53-a5c7-f553de849540.jpg',
  userName: 'John Doe',
  email: 'johndoe@gmail.com',
  id: 1,
}

export const useGetMe = (): IUser | undefined => {
  return useMemo(() => me, [])
}
