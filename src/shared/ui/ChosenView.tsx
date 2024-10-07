import React from 'react'
import { PropsWithChildren } from 'react'
import { View, StyleSheet } from 'react-native'

interface Props extends PropsWithChildren {
  isChosen: boolean
}
export const ChosenView = ({ isChosen, children }: Props) => {
  return (
    <View style={isChosen ? styles.activeContainer : null}>{children}</View>
  )
}

const styles = StyleSheet.create({
  activeContainer: {
    backgroundColor: '#c4ffbf3d',
  },
})
