import React, { useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { createHTMLMap } from '../shared/Map'
import { WebViewMessageEvent } from 'react-native-webview'
import { StyleSheet } from 'react-native'
import { PostMarker } from '../../types'
import { useInteractMap } from './useInteractMap'



export const MapView = () => {

  
  const [markers, setMarkers] = useState<PostMarker[]>([
    {
      lat: 49.21900449387821,
      lng: 16.613385998891214,
    },
  ])


  const addNewMarker = (marker: PostMarker) => {
    setMarkers((prevMarkers) => [...prevMarkers, marker])
  }

  const { handleMessage,sendMsgToIframe,mapRef } = useInteractMap({ onClick: addNewMarker })

  useEffect(() => {
    sendMsgToIframe({
      type: "drawMarkers",
      payload: markers
    })
  }, [markers])


  return (
    <WebView
      ref={mapRef}
      style={styles.map}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onMessage={handleMessage}
      source={{ html: createHTMLMap('native') }}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
