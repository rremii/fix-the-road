import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Map } from '@modules/map'
import { Portal } from '@gorhom/portal'
import { CreatePostModal } from './CreatePostModal'

interface Props {
  postPhotoUri: string
}

export const PostPreview = ({ postPhotoUri }: Props) => {
  return (
    <>
      <View style={styles.container}>
        <Map initCoords={{ lat: 49.212, lng: 16.6266 }} />
      </View>
      <Portal>
        <CreatePostModal postPhotoUri={''} isOpen={false} />
      </Portal>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
