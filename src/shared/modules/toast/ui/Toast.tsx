import React, { FC, ReactNode, useEffect, useState } from 'react'
import { LayoutChangeEvent, StyleSheet, Text } from 'react-native'
import { IToast, ToastType } from '../types'

import WarnIcon from '@icons/warn.svg'
import CheckMarkIcon from '@icons/check-mark.svg'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOut,
  FadeOutRight,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useToast } from '../model/useToast'

interface Props extends IToast {}

export const Toast: FC<Props> = ({ content, id, duration, type }) => {
  const styles = getStyles(type)

  const { closeToast } = useToast()

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        closeToast(id)
        clearTimeout(timer)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [closeToast, duration, id])

  return (
    <Animated.View
      layout={LinearTransition}
      entering={FadeInDown}
      exiting={FadeOutRight}
      style={[styles.toast]}
    >
      {type === 'error' ? (
        <WarnIcon color={'#fff'} width={30} height={30} />
      ) : (
        <CheckMarkIcon fill={'#fff'} width={25} height={25} />
      )}
      <Text style={styles.text}>{content}</Text>
    </Animated.View>
  )
}

const getStyles = (type: ToastType) =>
  StyleSheet.create({
    toast: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 20,
      backgroundColor: type === 'error' ? '#ed1245' : '#000',
    },

    text: {
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 16,
      color: '#fff',
    },
  })
