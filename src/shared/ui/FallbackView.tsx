import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
  msg: string
}

export const FallbackView = ({ msg }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{msg}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
})
