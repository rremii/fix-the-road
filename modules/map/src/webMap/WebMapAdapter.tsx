import {
  IMap,
  MapAdapter,
  MapAdapterProps,
  MapProps,
  MapReceiveEvents,
  MapSendEvents,
} from 'modules/map/types'
import * as React from 'react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { StyleSheet } from 'react-native'
import { createHTMLMap } from '../shared/Map'
import { AppOrigin } from '../constants'

export const WebMapAdapter = forwardRef<MapAdapter, MapAdapterProps>(
  ({ onMessage }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const iframeRef = useRef<HTMLIFrameElement>(null)

    function sendMsgToIframe(msg: MapSendEvents) {
      const iframe = iframeRef.current
      if (!iframe) return
      const window = iframe.contentWindow
      if (!window) return
      window.postMessage(JSON.stringify(msg), AppOrigin)
    }

    const handleMessage = (event: MessageEvent<MapReceiveEvents>) => {
      const message = event.data

      onMessage(message)
    }

    useEffect(() => {
      window.addEventListener('message', handleMessage)
      return () => {
        window.removeEventListener('message', handleMessage)
      }
    }, [handleMessage, isLoaded])

    useImperativeHandle(
      ref,
      () => ({
        sendMessage: sendMsgToIframe,
      }),
      [isLoaded],
    )
    return (
      <iframe
        onLoad={() => setIsLoaded(true)}
        style={styles.map}
        ref={iframeRef}
        srcDoc={createHTMLMap('web')}
      ></iframe>
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
