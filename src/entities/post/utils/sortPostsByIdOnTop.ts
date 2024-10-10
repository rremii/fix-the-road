import { IPost } from '../types'

//sets post with id to be the first in the array
export const sortPostsByIdOnTop = (posts: IPost[], id: number): IPost[] => {
  const postToMove = posts.find((post) => post.id === id)
  if (!postToMove) return posts

  const postsWithoutId = posts.filter((post) => post.id !== id)

  return [postToMove, ...postsWithoutId]
}
