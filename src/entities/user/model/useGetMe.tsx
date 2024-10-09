import { useMemo } from 'react'
import { IUser } from '../types'

const me = {
  avatar:
    'https://fastly.picsum.photos/id/10/200/300.jpg?hmac=94QiqvBcKJMHpneU69KYg2pky8aZ6iBzKrAuhSUBB9s',
  userName: 'John Doe',
  email: 'johndoe@gmail.com',
  id: 1,
}

export const useGetMe = (): IUser | undefined => {
  return useMemo(() => me, [])
}
