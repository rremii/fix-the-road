import { OpenPhoto } from '@features/openPhoto/ui/OpenPhoto'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native'
import { IPost } from 'src/entities/post/types'
import { AuthorInfo } from '../../../features/authorInfo/ui/AuthorInfo'
import { Button } from '@shared/ui/button'
import { EditPostForm } from '@features/editPostForm/ui/EditPostForm'
import { InfoPost } from '@features/infoPost/ui/InfoPost'
import { useEditPostStore } from 'src/entities/post/model/editPostStore'

interface Props extends IPost {}

export const EditablePost = ({ ...post }: Props) => {
  const setEditPost = useEditPostStore((state) => state.setEditPost)

  console.log('render modal')

  const [isEditing, setIsEditing] = useState(false)

  const onSubmit = () => {
    setIsEditing(false)
  }

  const startEditing = () => {
    setEditPost(post)
    setIsEditing(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnSection}>
        <OpenPhoto />
      </View>
      <AuthorInfo userId={post.userId} />
      {isEditing ? (
        <EditPostForm onSubmit={onSubmit} />
      ) : (
        <InfoPost {...post} />
      )}
      {!isEditing && (
        <View style={styles.btnSection}>
          <Button type="danger">Remove</Button>
          <Button onPress={startEditing} type="filled">
            Edit
          </Button>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  btnSection: {
    alignItems: 'center',

    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
})
