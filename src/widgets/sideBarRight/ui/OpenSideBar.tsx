import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { SideBarRight } from './SideBarRight'
import Arrow from '@icons/arrow.svg'

export const OpenSideBar = () => {
  const [isOpen, setOpen] = useState(false)

  const open = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  return (
    <>
      <Pressable style={[styles.btn, webStyles?.burger]} onPress={open}>
        <Arrow width={25} height={25} />
      </Pressable>
      <SideBarRight close={close} isOpen={isOpen}>
        <Text>qwe</Text>
      </SideBarRight>
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
  btn: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 13,
    gap: 5,
    transform: [{ rotate: '180deg' }],
  },

  bar: {
    width: 25,
    height: 2,
    backgroundColor: 'black',
    borderRadius: 3,
  },
})
