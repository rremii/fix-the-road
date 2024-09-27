import React  from 'react'
import { Platform } from 'react-native'
import { MapView, MapViewWeb } from 'modules/map'

export const Map = () => {
  return Platform.OS === 'web' ? <MapViewWeb /> : <MapView />
}
