import React, { useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { mapHTML } from './Map'
import { WebViewMessageEvent } from 'react-native-webview'
import { StyleSheet } from 'react-native'

interface PostMarker {
  lat: number
  lng: number
}

interface WebViewPayload<P> {
  type: string
  payload: P
}

const drawAllMarkers = (markers: PostMarker[]) => {
  return `(function() {
    
      drawAllMarkers(${JSON.stringify(markers)})

    })();`
}

const MapView = () => {
  const webViewRef = useRef<WebView>(null)

  const [markers, setMarkers] = useState<PostMarker[]>([
    {
      lat: 49.21900449387821,
      lng: 16.613385998891214,
    },
  ])

  useEffect(() => {
    if (!webViewRef.current) return
    webViewRef.current?.injectJavaScript(drawAllMarkers(markers))
  }, [markers])

  const handleNativeMapEvent = (event: WebViewMessageEvent) => {
    const postMarker = JSON.parse(
      event.nativeEvent.data,
    ) as WebViewPayload<PostMarker>

    setMarkers([...markers, postMarker.payload])
  }

  return (
    <WebView
      ref={webViewRef}
      style={styles.map}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      injectedJavaScript={drawAllMarkers(markers)}
      onMessage={handleNativeMapEvent}
      source={{ html: mapHTML }}
    />
  )
}
export default MapView
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
