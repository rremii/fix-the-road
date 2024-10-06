import React from 'react'
import { FC } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native'
import { BtnParams } from '../../types'

export interface FilledBtnProps extends BtnParams {
  withSpinner?: boolean
  mainColor?: string
  activeColor?: string
  subColor?: string
}

type StyleParams = {
  pending?: boolean
  mainColor?: string
  activeColor?: string
  subColor?: string
}

export const FilledBtn: FC<FilledBtnProps> = ({
  pending,
  btnStyles,
  onPress,
  textStyles,
  children,
  withSpinner = false,
  ...colors
}) => {
  const styles = getStyles({ pending, ...colors })

  return (
    <TouchableOpacity
      disabled={pending}
      onPress={onPress}
      style={[styles.btn, btnStyles]}
    >
      {withSpinner && pending ? (
        <ActivityIndicator
          size="small"
          animating={true}
          color={colors.subColor}
        />
      ) : (
        <Text style={[styles.text, textStyles]}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

const getStyles = ({
  pending,
  activeColor = '#14833b',
  mainColor = '#1a9f49',
  subColor = '#fff',
}: StyleParams) =>
  StyleSheet.create({
    btn: {
      backgroundColor: pending ? activeColor : mainColor,
      borderRadius: 10,
      padding: 25,
      paddingTop: 7,
      justifyContent: 'center',
      paddingBottom: 7,
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: subColor,
    },
  })
