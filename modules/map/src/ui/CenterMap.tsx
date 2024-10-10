import React from 'react'
import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  onClick: () => void
}

export const CenterMap = ({ onClick }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.centerMapBtn}
      onPress={() => onClick()}
    >
      <Text style={styles.centerText}>center</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  centerMapBtn: {
    zIndex: 1,
    position: 'absolute',
    top: 80,
    right: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
