import { PortalProvider } from '@gorhom/portal'
import { useDownloadFonts } from '@shared/hooks/useDownloadFonts'
import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props extends PropsWithChildren {}

export const AppLayout: FC<Props> = ({ children }) => {
  useDownloadFonts()

  return (
    <PortalProvider>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </PortalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
})
