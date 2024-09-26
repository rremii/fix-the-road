import * as React from 'react'
import { mapHTML } from './Map.web'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

interface PostMarker {
  lat: number
  lng: number
}

export default function MapViewWeb() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)

  const [isLoaded, setIsLoaded] = useState(false)

  const [markers, setMarkers] = useState<PostMarker[]>([
    {
      lat: 49.21900449387821,
      lng: 16.613385998891214,
    },
  ])

  const handleMassage = () => {
    alert('qwe')
  }

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const document = iframe.contentDocument
    if (!document) return

    const mainScript = document.getElementById('main-script')

    console.log('mainScript', mainScript)
    if (!mainScript) return

    mainScript.onload = () => {
      console.log('mainScript', mainScript)
    }

    const prevScript = document.getElementById('executable-script')
    if (prevScript) document.removeChild(prevScript)

    const executableScript = document.createElement('script')
    executableScript.id = 'executable-script'

    executableScript.innerHTML = `

      // const sendMsgToReact=${JSON.stringify(handleMassage)}

      drawAllMarkers(${JSON.stringify(markers)})

    `

    document.body.appendChild(executableScript)
  }, [isLoaded])

  return (
    <iframe
      onLoad={() => setIsLoaded(true)}
      style={styles.map}
      ref={iframeRef}
      srcDoc={mapHTML}
    ></iframe>
  )
  // return <div dangerouslySetInnerHTML={{ __html: mapHTML }} />
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
