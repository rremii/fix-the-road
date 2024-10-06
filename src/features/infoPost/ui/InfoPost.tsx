import { tabBarHeight } from '@shared/constants'
import { sectionStyles } from '@shared/ui/styles/sectionStyles'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { IPost } from 'src/entities/post/types'

interface Props extends IPost {}

export const InfoPost = (post: Props) => {
  const { description, lat, lng } = post
  return (
    <View style={styles.container}>
      <View style={sectionStyles.section}>
        <Text style={sectionStyles.title}>Description</Text>
        <View style={sectionStyles.withPadding}>
          <Text style={sectionStyles.label}>{description}</Text>
        </View>
      </View>

      <View style={sectionStyles.section}>
        <Text style={sectionStyles.title}>Address</Text>
        <View style={sectionStyles.withPadding}>
          <Text style={sectionStyles.label}>
            {lat} , {lng}
          </Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 25,
  },
})
