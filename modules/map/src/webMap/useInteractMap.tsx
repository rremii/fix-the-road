import { MapMessageReceive, MapMessageSend, PostMarker,  } from "modules/map/types"
import { useEffect, useRef } from "react"


interface InteractMapProps {
   onClick?: (marker: PostMarker) => void
}


export const useInteractMap = ({onClick}: InteractMapProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    
    
    function sendMsgToIframe<P> (msg: MapMessageSend<P>) {
        const iframe = iframeRef.current
        if (!iframe) return
        const window = iframe.contentWindow
        if (!window) return
        window.postMessage(JSON.stringify(msg), '*')
    }
    
    const handleMessage = (event: { data: string }) => {
        const message =  JSON.parse(event.data) as MapMessageReceive<unknown>

        switch (message.type) {
            case 'click':
                if (onClick) return onClick(message.payload as PostMarker)
        }
    };
    
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
    
    
    return {
        iframeRef,
        sendMsgToIframe
    }
    
}