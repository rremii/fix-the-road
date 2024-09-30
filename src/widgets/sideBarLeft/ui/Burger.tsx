import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { SideBarLeft } from './SideBarLeft'

export const Burger = () => {
  const [isOpen, setOpen] = useState(false)

  const open = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  return (
    <>
      <Pressable style={[styles.burger, webStyles?.burger]} onPress={open}>
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </Pressable>
      <SideBarLeft close={close} isOpen={isOpen}>
        <Text>qwe</Text>
      </SideBarLeft>
    </>
  )
}
const webStyles =
  Platform.OS === 'web'
    ? StyleSheet.create({
        burger: {
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // only for web
        },
      })
    : null
const styles = StyleSheet.create({
  burger: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    gap: 5,
  },

  bar: {
    width: 25,
    height: 2,
    backgroundColor: 'black',
    borderRadius: 3,
  },
})
