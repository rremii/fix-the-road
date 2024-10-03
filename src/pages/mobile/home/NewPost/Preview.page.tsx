import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { PostPreview } from '@widgets/postPreview/ui/PostPreview'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { NewPostNavigationParam } from 'src/app/navigation/mobile/types'

export const PreviewPage = () => {
  const route = useRoute<RouteProp<NewPostNavigationParam, 'preview'>>()
  const navigation =
    useNavigation<BottomTabNavigationProp<NewPostNavigationParam>>()

  navigation.addListener('blur', () => {
    navigation.dispatch(CommonActions.goBack())
  })

  return (
    <View style={styles.pageContainer}>
      <PostPreview postPhotoUri={route.params.postPhotoUri} />
    </View>
  )
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
})
