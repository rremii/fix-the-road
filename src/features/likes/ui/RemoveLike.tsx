import { Pressable } from 'react-native'
import LikeIcon from '@icons/like.svg'
import React from 'react'
import { useRemoveLike } from 'src/entities/like/model/useRemoveLike'

interface Props {
  userId?: number
  postId?: number
}

export const RemoveLike = ({ userId, postId }: Props) => {
  const { removeLike } = useRemoveLike()

  const remove = () => {
    if ((!userId && userId !== 0) || (!postId && postId !== 0)) return

    removeLike({ userId, postId })
  }

  return (
    <Pressable onPress={remove}>
      <LikeIcon color="red" width={35} height={35} />
    </Pressable>
  )
}
