import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

import Avatar from '@icons/profile.svg'
import { useGetUser } from 'src/entities/user/model/useGetUser'
import { sectionStyles } from '@shared/ui/styles/sectionStyles'

interface Props {
  userId: number
}

export const AuthorInfo = ({ userId }: Props) => {
  const user = useGetUser(userId)

  return (
    <View style={styles.container}>
      <View>
        <Text style={sectionStyles.title}>Posted by</Text>
      </View>
      <View style={[sectionStyles.sectionRow, sectionStyles.withPadding]}>
        <View style={sectionStyles.image}>
          <Avatar width={50} height={50} />
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
