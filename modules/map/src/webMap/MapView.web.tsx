import { PostMarker } from 'modules/map/types'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { createHTMLMap } from '../shared/Map'
import { useInteractMap } from './useInteractMap'


export const MapViewWeb =() =>{
  
  const [isLoaded, setIsLoaded] = useState(false)

  const [markers, setMarkers] = useState<PostMarker[]>([
    {
      lat: 49.21900449387821,
      lng: 16.613385998891214,
    },
  ])


  const addNewMarker = (marker: PostMarker) => {
      setMarkers((prevMarkers) => [...prevMarkers, marker])
  }


  const { sendMsgToIframe, iframeRef } = useInteractMap({ onClick: addNewMarker })
  

  useEffect(() => {

    sendMsgToIframe({
      type: "drawMarkers",
      payload: markers
    })

   },[markers,isLoaded])
  



  return (
    <iframe
      onLoad={() => setIsLoaded(true)}
      style={styles.map}
      ref={iframeRef}
      srcDoc={createHTMLMap('web')}
    ></iframe>
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
