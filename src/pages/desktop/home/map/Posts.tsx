import { EditablePost } from '@widgets/editablePost/ui/EditablePost'
import { Post } from '@widgets/post/ui/Post'
import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useGetPosts } from 'src/entities/post/model/useGetPosts'
import { useGetMe } from 'src/entities/user/model/useGetMe'

export const Posts = () => {
  const posts = useGetPosts()
  const me = useGetMe()

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={posts}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isMyPost = item.userId === me?.id

        if (isMyPost) return <EditablePost {...item} />
        else return <Post {...item} />
      }}
    />
  )
}
const styles = StyleSheet.create({
  container: {},
  separator: {
    height: 2,
    backgroundColor: '#d0bfff51',

    width: '100%',
  },
})
