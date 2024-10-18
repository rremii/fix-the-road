import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useGetUser } from 'src/entities/user/model/useGetUser'
import { sectionStyles } from '@shared/ui/styles/sectionStyles'
import { Avatar } from '@shared/ui/Avatar'

interface Props {
  userId: number
}

export const AuthorInfo = ({ userId }: Props) => {
  const { user } = useGetUser(userId)

  return (
    <View style={styles.container}>
      <View>
        <Text style={sectionStyles.title}>Posted by</Text>
      </View>
      <View style={[sectionStyles.sectionRow, sectionStyles.withPadding]}>
        <View style={sectionStyles.image}>
          <Avatar avatar={user?.avatar} size={50} />
        </View>
        <Text style={sectionStyles.label}>{user?.userName}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 15,
    marginBottom: 10,
  },
})
