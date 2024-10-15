import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LikeIcon from '@icons/like.svg'
import { useGetLikesInfo } from 'src/entities/like/model/useGetLikesInfo'
import { useGetMe } from 'src/entities/user/model/useGetMe'
import { RemoveLike } from './RemoveLike'
import { AddLike } from './AddLike'

interface Props {
  postId?: number
}

export const Likes = ({ postId }: Props) => {
  const { me } = useGetMe()

  const { likesInfo } = useGetLikesInfo(me?.id, postId)

  return (
    <View style={styles.container}>
      {likesInfo?.isLiked ? (
        <RemoveLike userId={me?.id} postId={postId} />
      ) : (
        <AddLike userId={me?.id} postId={postId} />
      )}
      <Text style={styles.label}>{likesInfo?.likesCount || 0}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
  },
})
