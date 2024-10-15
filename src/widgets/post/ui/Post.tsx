import { InfoPost } from '@features/infoPost/ui/InfoPost'
import { Likes } from '@features/likes/ui/Likes'
import { OpenPhoto } from '@features/openPhoto/ui/OpenPhoto'
import { AuthorInfo } from '@features/authorInfo/ui/AuthorInfo'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IPost } from 'src/entities/post/types'

interface Props extends IPost {}

export const Post = (post: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnSection}>
        <OpenPhoto photoUri={post.photoUri} />
        <Likes postId={post.id} />
      </View>
      <AuthorInfo userId={post.userId} />
      <InfoPost {...post} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  btnSection: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
})
