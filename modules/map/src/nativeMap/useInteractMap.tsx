import { MapMessageReceive, MapMessageSend, PostMarker,  } from "modules/map/types"
import { useEffect, useRef } from "react"
import  WebView, { WebViewMessageEvent } from "react-native-webview"


interface InteractMapProps {
   onClick?: (marker: PostMarker) => void
}


export const useInteractMap = ({onClick}: InteractMapProps) => {

  const webViewRef = useRef<WebView>(null)
  

  function sendMsgToIframe<P>(msg: MapMessageSend<P>) {
    if (!webViewRef.current) return
        webViewRef.current.injectJavaScript(
        `(function() {

          handleReactMassage(${JSON.stringify(msg)})

        })();`)
    }
 
    const handleMessage = (event: WebViewMessageEvent) => {
      const message = JSON.parse(
        event.nativeEvent.data,
      ) as MapMessageReceive<unknown>
        switch (message.type) {
            case 'click':
                if (onClick) return onClick(message.payload as PostMarker)
        }
    };
    
      
    return {
        sendMsgToIframe,
        handleMessage,
        mapRef: webViewRef
    }
    
}