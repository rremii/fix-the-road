import { Pressable } from 'react-native'
import LikeIcon from '@icons/like.svg'
import React from 'react'
import { useAddLike } from 'src/entities/like/model/useAddLike'

interface Props {
  userId?: number
  postId?: number
}

export const AddLike = ({ postId, userId }: Props) => {
  const { addLike } = useAddLike()

  const add = () => {
    if ((!userId && userId !== 0) || (!postId && postId !== 0)) return
    addLike({ userId, postId })
  }

  return (
    <Pressable onPress={add}>
      <LikeIcon color="transparent" width={35} height={35} />
    </Pressable>
  )
}
