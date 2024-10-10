import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import {
  Coords,
  IMap,
  MapAdapter,
  MapProps,
  MapReceiveEvents,
  MapSendEvents,
} from './../types'
import { NativeMapAdapter } from './nativeMap/NativeMapAdapter'
import { WebMapAdapter } from './webMap/WebMapAdapter'
import { CenterMap } from './ui/CenterMap'

export const Map = forwardRef<IMap, MapProps>((props, ref) => {
  const {
    initCoords,
    markers,
    onClick,
    onClickMarker,
    onDragMarker,
    onBoundsChange,
    onMapLoaded,
    hideCenterBtn,
  } = props
  const mapAdapter = useRef<MapAdapter>(null)

  const sendMsgToMap = (message: MapSendEvents) => {
    if (mapAdapter.current) {
      mapAdapter.current.sendMessage(message)
    }
  }

  const onMessage = (message: MapReceiveEvents) => {
    switch (message.type) {
      case 'clickMap':
        if (onClick) onClick(message.payload)
        break
      case 'clickMarker':
        if (onClickMarker) onClickMarker(message.payload)
        break
      case 'dragMarker':
        if (onDragMarker) onDragMarker(message.payload)
        break
      case 'boundsChange':
        if (onBoundsChange) onBoundsChange(message.payload)
        break
      case 'mapLoaded':
        if (onMapLoaded) onMapLoaded()
        break
    }
  }

  const centerMap = (coords?: Coords) => {
    sendMsgToMap({
      type: 'centerMap',
      payload: coords || initCoords,
    })
  }

  useEffect(() => {
    centerMap()
  }, [])

  useEffect(() => {
    sendMsgToMap({
      type: 'drawMarkers',
      payload: markers || [],
    })
  }, [markers, mapAdapter])

  useImperativeHandle(
    ref,
    () => ({
      center: centerMap,
    }),
    [centerMap],
  )

  return (
    <View style={styles.container}>
      {!hideCenterBtn && <CenterMap onClick={centerMap} />}
      {Platform.OS === 'web' ? (
        <WebMapAdapter onMessage={onMessage} ref={mapAdapter} />
      ) : (
        <NativeMapAdapter onMessage={onMessage} ref={mapAdapter} />
      )}
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
})
