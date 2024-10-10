import React from 'react'
import { PropsWithChildren } from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'

interface Props extends PropsWithChildren {}

export const ToastBox = ({ children }: PropsWithChildren) => {
  const { height: windowHeight } = useWindowDimensions()

  const styles = getStyles(windowHeight)
  return <View style={styles.toastsContainer}>{children}</View>
}

const getStyles = (windowHeight: number) =>
  StyleSheet.create({
    toastsContainer: {
      paddingBottom: 20,
      overflow: 'hidden',
      gap: 10,
      position: 'absolute',
      height: windowHeight * 0.4,
      maxHeight: 300,
      bottom: 0,
      left: 0,
      zIndex: 1000,
      width: '100%',
      pointerEvents: 'none',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  })
