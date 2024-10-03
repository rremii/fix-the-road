import { View, StyleSheet, Text, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Map } from '@modules/map'
import { CreatePostModal } from './CreatePostModal/CreatePostModal'
import { useLocation } from '@shared/hooks/useLocation'
import { FallbackView } from '@shared/ui/FallbackView'
import { Coords, IMap, Marker } from '@modules/map/types'

import { Location } from '@shared/types'
import { CenterMap } from '@modules/map/src/ui/CenterMap'

interface Props {
  postPhotoUri: string
}

export const PostPreview = ({ postPhotoUri }: Props) => {
  const { errorMsg, location } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [marker, setMarker] = useState<Marker | null>(null)

  const map = useRef<IMap>(null)

  useEffect(() => {
    if (location) {
      centerMap({
        lat: location?.coords.latitude,
        lng: location?.coords.longitude,
      })
      setMarker({
        draggable: true,
        id: 0,
        lat: location?.coords.latitude || 0,
        lng: location?.coords.longitude || 0,
        icon: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      })
    }
  }, [location])

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const centerMap = (coords?: Location) => {
    if (map && map.current) map.current.center(coords)
  }
  const onMapClick = ({ lat, lng }: Location) => {
    setMarker((marker) => {
      if (!marker) return null
      return {
        ...marker,
        lat,
        lng,
      }
    })
    centerMap({ lat, lng })
  }
  const onDragMarker = (marker: Marker) => {
    setMarker(marker)
  }

  if (errorMsg) return <FallbackView msg={errorMsg} />
  if (!location) return <FallbackView msg={'fetching location'} />

  const postLocation = {
    lat: marker?.lat || location.coords.latitude,
    lng: marker?.lng || location.coords.longitude,
  }
  return (
    <>
      <View style={styles.container}>
        <Map
          ref={map}
          markers={marker ? [marker] : []}
          onDragMarker={onDragMarker}
          onClick={onMapClick}
          initCoords={{
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }}
        />
      </View>
      <CreatePostModal
        location={postLocation}
        postPhotoUri={postPhotoUri}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
})
