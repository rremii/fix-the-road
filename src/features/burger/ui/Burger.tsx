import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { useUIStore } from '@shared/store/UIStore'

export const Burger = () => {
  const setLeftSideBar = useUIStore((state) => state.setLeftSideBar)

  const openSideBar = () => setLeftSideBar(true)

  return (
    <>
      <Pressable
        style={[styles.burger, webStyles?.burger]}
        onPress={openSideBar}
      >
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </Pressable>
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
    zIndex: 1,
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
