import React from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface Props {
  msg?: string
  withSpinner?: boolean
  spinnerSize?: ActivityIndicatorProps['size']
  absolute?: boolean
  spinnerColor?: string
  zIndex?: number
  background?: string
}

export const PendingView = ({
  msg,
  absolute,
  withSpinner,
  spinnerColor,
  spinnerSize,
  zIndex = 1,
  background = 'transparent',
}: Props) => {
  let size = spinnerSize
  if (Platform.OS === 'ios') size = size || 'large'
  else size = size || 80

  return (
    <View
      style={[
        absolute ? styles.absoluteContainer : styles.container,
        { zIndex, backgroundColor: background },
      ]}
    >
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
