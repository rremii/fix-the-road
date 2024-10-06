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
  {
    id: 3,
    title: 'post 3',
    description: 'post 3 description',
    photoUri: 'https://picsum.photos/id/10/200/300',
    userId: 1,
    lat: 54.2835,
    lng: 30.9825,
  },
  {
    id: 4,
    title: 'post 4',
    description: 'post 4 description',
    photoUri: 'https://picsum.photos/id/10/200/300',
    userId: 2,
    lat: 54.2836,
    lng: 30.9828,
  },
]

export const useGetPost = (postId?: IPost['id']): IPost | undefined => {
  const post = posts.find((post) => post.id === postId)

  return useMemo(() => post, [postId])
}
