import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ActivityIndicatorProps,
} from 'react-native'

interface Props {
  msg?: string
  withSpinner?: boolean
  spinnerSize?: ActivityIndicatorProps['size']
  isAbsolute?: boolean
  spinnerColor?: string
}

export const PendingView = ({
  msg,
  isAbsolute,
  withSpinner,
  spinnerColor,
  spinnerSize,
}: Props) => {
  let size = spinnerSize
  if (Platform.OS === 'ios') size = size || 'large'
  else size = size || 80

  return (
    <View style={isAbsolute ? styles.absoluteContainer : styles.container}>
      {!!msg && <Text style={styles.message}>{msg}</Text>}
      {withSpinner && <ActivityIndicator size={size} color={spinnerColor} />}
    </View>
  )
}
const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
})
