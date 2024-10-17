import React, { FC } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { BtnParams } from '../../types'

type StyleParams = {
  pending?: boolean
  mainColor?: string
  activeColor?: string
}

export interface SimpleBtnProps extends BtnParams {
  mainColor?: string
  activeColor?: string
}

export const SimpleBtn: FC<SimpleBtnProps> = ({
  pending,
  btnStyles,
  onPress,
  textStyles,
  children,
  ...colors
}) => {
  const styles = getStyles({ pending, ...colors })
  return (
    <TouchableOpacity
      disabled={pending}
      onPress={onPress}
      style={[styles.btn, btnStyles]}
    >
      <Text style={[styles.text, textStyles]}>{children}</Text>
    </TouchableOpacity>
  )
}

const getStyles = ({
  pending,
  activeColor = '#1a1a1a',
  mainColor = '#000',
}: StyleParams) =>
  StyleSheet.create({
    btn: {
      backgroundColor: 'transparent',
      borderRadius: 10,
      justifyContent: 'center',

      padding: 23,
      paddingTop: 6,
      paddingBottom: 6,
      borderColor: pending ? activeColor : mainColor,
      borderWidth: 1,
    },
    text: {
      textAlign: 'center',
      color: pending ? activeColor : mainColor,
      fontSize: 16,
      fontWeight: '500',
    },
  })
