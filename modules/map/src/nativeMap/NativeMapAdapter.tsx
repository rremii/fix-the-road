import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { createHTMLMap } from '../shared/Map'
import { WebViewMessageEvent } from 'react-native-webview'
import { StyleSheet } from 'react-native'
import {
  MapAdapter,
  MapAdapterProps,
  MapReceiveEvents,
  MapSendEvents,
} from 'modules/map/types'

export const NativeMapAdapter = forwardRef<MapAdapter, MapAdapterProps>(
  ({ onMessage }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const mapRef = useRef<WebView>(null)

    function sendMsgToIframe(msg: MapSendEvents) {
      if (!mapRef.current) return

      mapRef.current.injectJavaScript(
        `(function() {

          if (handleReactMassage)
              handleReactMassage(${JSON.stringify(msg)})

        })();`,
      )
    }

    const handleMessage = (event: WebViewMessageEvent) => {
      const message = JSON.parse(event.nativeEvent.data) as MapReceiveEvents

      onMessage(message)
    }

    useImperativeHandle(
      ref,
      () => ({
        sendMessage: sendMsgToIframe,
      }),
      [isLoaded],
    )
    return (
      <>
        <WebView
          onLoad={() => setIsLoaded(true)}
          ref={mapRef}
          style={styles.map}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={handleMessage}
          source={{ html: createHTMLMap('native') }}
        />
      </>
    )
  },
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
