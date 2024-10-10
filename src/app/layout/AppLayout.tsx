import { PortalProvider } from '@gorhom/portal'
import { useDownloadFonts } from '@shared/hooks/useDownloadFonts'
import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'

interface Props extends PropsWithChildren {}

export const AppLayout: FC<Props> = ({ children }) => {
  useDownloadFonts()

  return (
    <PortalProvider>
      <View style={styles.container}>{children}</View>
    </PortalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
})
