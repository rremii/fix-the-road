import { useState } from 'react'
import { Text, Pressable, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { SideBarRight } from '../../../widgets/sideBarRight/ui/SideBarRight'
import Arrow from '@icons/arrow.svg'
import { useUIStore } from '@shared/store/UIStore'

export const OpenRightSideBar = () => {
  const setRightSideBar = useUIStore((state) => state.setRightSideBar)

  const openSideBar = () => setRightSideBar(true)

  return (
    <>
      <Pressable style={[styles.btn, webStyles?.burger]} onPress={openSideBar}>
        <Arrow width={25} height={25} />
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
  btn: {
    zIndex: 1,
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
