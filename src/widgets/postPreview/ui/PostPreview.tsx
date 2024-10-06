import { View, StyleSheet, Text, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Map } from '@modules/map'
import { CreatePostModal } from '../../createPostModal/ui/CreatePostModal'
import { useLocation } from '@shared/hooks/useLocation'
import { FallbackView } from '@shared/ui/FallbackView'
import { Coords, IMap, Marker } from '@modules/map/types'
import GeolocationMarker from '@icons/marker-geolocation.png'
import { Location } from '@shared/types'
import { useAssets } from 'expo-asset'
import { geolocationMarkerSize } from '@shared/constants'
import { useCreatePostStore } from 'src/entities/post/model/createPostStore'

export const PostPreview = () => {
  const setCreatePostLocation = useCreatePostStore(
    (state) => state.setCreatePostLocation,
  )
  const { errorMsg, location } = useLocation()
  const [isMapLoaded, setMapLoaded] = useState(false)
  const [marker, setMarker] = useState<Marker | null>(null)
  const [assets] = useAssets([GeolocationMarker])
  const geolocationMarkerUri = assets?.at(0)?.uri || ''

  const map = useRef<IMap>(null)

  useEffect(() => {
    if (!location || !isMapLoaded) return

    centerMap({
      lat: location?.coords.latitude,
      lng: location?.coords.longitude,
    })
    setMarker({
      draggable: true,
      id: 0,
      lat: location?.coords.latitude || 0,
      lng: location?.coords.longitude || 0,
      icon: {
        iconUrl: geolocationMarkerUri,
        iconSize: [geolocationMarkerSize, geolocationMarkerSize],
        iconAnchor: [geolocationMarkerSize / 2, geolocationMarkerSize],
      },
    })
  }, [location, isMapLoaded])

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

  useEffect(() => {
    if (!location) return
    setCreatePostLocation({
      lat: marker?.lat || location.coords.latitude,
      lng: marker?.lng || location.coords.longitude,
    })
  }, [location, marker])

  if (errorMsg) return <FallbackView msg={errorMsg} />
  if (!location) return <FallbackView msg={'fetching location'} />
  return (
    <>
      <View style={styles.container}>
        <Map
          onMapLoaded={() => setMapLoaded(true)}
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
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
})
