import React, { FC } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  activeColor = '#14833b',
  mainColor = '#1a9f49',
  subColor = '#fff',
}) => {
  const styles = getStyles({ pending, activeColor, mainColor, subColor })

  return (
    <TouchableOpacity
      disabled={pending}
      onPress={onPress}
      style={[styles.btn, btnStyles]}
    >
      {withSpinner && pending ? (
        <ActivityIndicator size="small" animating={true} color={subColor} />
      ) : (
        <Text style={[styles.text, textStyles]}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

const getStyles = ({
  pending,
  activeColor,
  mainColor,
  subColor,
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
