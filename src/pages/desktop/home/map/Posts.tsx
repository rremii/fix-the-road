import { Route, RouteProp, useRoute } from '@react-navigation/native'
import { ChosenView } from '@shared/ui/ChosenView'
import { TransitionedView } from '@shared/ui/TransitionedView'
import { EditablePost } from '@widgets/editablePost/ui/EditablePost'
import { Post } from '@widgets/post/ui/Post'
import React, { PropsWithChildren } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'
import { useMapStore } from 'src/entities/map/model/mapStore'
import { useGetPosts } from 'src/entities/post/model/useGetPosts'
import { filterPostsByBounds } from 'src/entities/post/utils/filterPostsByBounds'
import { sortPostsByIdOnTop } from 'src/entities/post/utils/sortPostsByIdOnTop'
import { useGetMe } from 'src/entities/user/model/useGetMe'

export const Posts = () => {
  const chosenMarkerId = useMapStore((state) => state.chosenMarkerId)
  const bounds = useMapStore((state) => state.bounds)
  const posts = useGetPosts()
  const { me } = useGetMe()

  const inBoundsPosts = bounds ? filterPostsByBounds(posts, bounds) : posts
  const sortedPosts = chosenMarkerId
    ? sortPostsByIdOnTop(inBoundsPosts, chosenMarkerId)
    : inBoundsPosts

  return (
    <FlatList
      data={sortedPosts}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isMyPost = item.userId === me?.id
        const isChosen = item.id === chosenMarkerId
        return (
          <TransitionedView
            enteringAnim={FadeInLeft}
            exitingAnim={FadeOutRight}
          >
            <ChosenView isChosen={isChosen}>
              {isMyPost ? <EditablePost {...item} /> : <Post {...item} />}
            </ChosenView>
          </TransitionedView>
        )
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
