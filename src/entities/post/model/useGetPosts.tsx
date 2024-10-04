import { useMemo } from 'react'
import { IPost } from '../types'

const posts: IPost[] = [
  {
    id: 1,
    title: 'post 1',
    description: 'post 1 description',
    photoUri: 'https://picsum.photos/id/10/200/300',
    userId: 1,
    lat: 55.19332320619906,
    lng: 30.200815200805668,
  },
  {
    id: 2,
    title: 'post 2',
    description: 'post 2 description',
    photoUri: 'https://picsum.photos/id/10/200/300',
    userId: 2,
    lat: 55.191126940908376,
    lng: 30.201210975283175,
  },
]

export const useGetPosts = (): IPost[] => {
  return useMemo(() => posts, [])
}
