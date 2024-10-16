import { PortalProvider } from '@gorhom/portal'
import { useDownloadFonts } from '@shared/hooks/useDownloadFonts'
import React, { useEffect, useState } from 'react'
import { FC, PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { useAuth } from 'src/entities/auth/model/useAuth'
import * as Linking from 'expo-linking'
import { useDeepLinking } from '@shared/hooks/useDeepLinking'

interface Props extends PropsWithChildren {}

export const AppLayout: FC<Props> = ({ children }) => {
  useDownloadFonts()
  useAuth()
  useDeepLinking()

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
