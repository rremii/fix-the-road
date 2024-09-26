import React, { useEffect, useRef } from 'react'
import { Text, StyleSheet, Platform, View } from 'react-native'
import { MapView, MapViewWeb } from 'modules/map'

export const Map = () => {
  return Platform.OS === 'web' ? <MapViewWeb /> : <MapView />
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
  },
})
