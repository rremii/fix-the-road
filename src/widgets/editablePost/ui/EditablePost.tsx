import { OpenPhoto } from '@features/openPhoto/ui/OpenPhoto'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native'
import { IPost } from 'src/entities/post/types'

interface Props extends IPost {}

export const EditablePost = (props: Props) => {
  const { title, description, photoUri, id, lat, lng, userId } = props
  return (
    <View style={styles.container}>
      <View style={styles.btnSection}>
        <OpenPhoto />
      </View>
      <Text>Editable post</Text>
      <View style={styles.btnSection}>
        <TouchableOpacity>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
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
