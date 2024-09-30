import { PortalProvider } from '@gorhom/portal'
import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props extends PropsWithChildren {}

export const AppLayout: FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <PortalProvider>{children}</PortalProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
})
