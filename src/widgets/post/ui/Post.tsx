import { Like } from '@features/like/ui/Like'
import { OpenPhoto } from '@features/openPhoto/ui/OpenPhoto'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IPost } from 'src/entities/post/types'

interface Props extends IPost {}

export const Post = (props: Props) => {
  const { title, description, photoUri, id, lat, lng, userId } = props

  return (
    <View style={styles.container}>
      <View style={styles.btnSection}>
        <OpenPhoto />
        <Like />
      </View>
      <Text>Post</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {},
  btnSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
})
