import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Map } from '@modules/map'

interface Props {
  postPhotoUri: string
}

export const PostPreview = ({ postPhotoUri }: Props) => {
  return (
    <View style={styles.container}>
      <Map initCoords={{ lat: 49.212, lng: 16.6266 }} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
