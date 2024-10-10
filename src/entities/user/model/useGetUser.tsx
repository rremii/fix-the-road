import { IUser } from '../types'

export const useGetUser = (id: number): IUser | undefined => {
  return {
    id: 2,
    userName: 'Some cool user',
    email: 'user@email.com',
    avatar: 'https://picsum.photos/200',
  }
}
