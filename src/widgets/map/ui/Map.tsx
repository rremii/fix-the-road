import React, { useEffect, useRef, useState } from 'react'
import { Bounds, Coords, IMap, Marker } from 'modules/map/types'
import { Map as MapModule } from '@modules/map'
import { CenterMap } from '@modules/map/src/ui/CenterMap'
import { useLocation } from '@shared/hooks/useLocation'
import { err } from 'react-native-svg'
import { FallbackView } from '@shared/ui/FallbackView'
import { Location } from '@shared/types'
import MarkerRedIcon from '@icons/marker-red.png'
import MarkerBlueIcon from '@icons/marker-blue.png'
import { useAssets } from 'expo-asset'
import { markerSize } from '@shared/constants'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'
import { useGetPosts } from 'src/entities/post/model/useGetPosts'
import { useGetMe } from 'src/entities/user/model/useGetMe'

export const Map = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeNavigationParam>>()
  const map = useRef<IMap>(null)
  const [isMapLoaded, setMapLoaded] = useState(false)
  const { errorMsg: locationErr, location } = useLocation()
  const [markers, setMarkers] = useState<Marker[]>([])
  const [assets] = useAssets([MarkerBlueIcon, MarkerRedIcon])

  const redMarkerUri = assets?.at(0)?.uri || ''
  const blueMarkerUri = assets?.at(1)?.uri || ''

  const posts = useGetPosts()
  const me = useGetMe()

  useEffect(() => {
    if (!location || !posts.length || !me || !isMapLoaded) return

    map.current?.center({
      lat: location?.coords.latitude,
      lng: location?.coords.longitude,
    })

    const markers: Marker[] = posts.map((post) => {
      const isMyMarker = post.userId === me.id
      return {
        draggable: false,
        id: post.id,
        lat: post.lat,
        lng: post.lng,
        icon: {
          iconUrl: isMyMarker ? blueMarkerUri : redMarkerUri,
          iconAnchor: [markerSize / 2, markerSize / 2],
          iconSize: [markerSize, markerSize],
        },
      }
    })

    setMarkers(markers)
  }, [isMapLoaded, location, posts, me])

  const onClickMarker = (marker: Marker) => {
    navigation.setParams({
      postId: marker.id,
    })
  }

  const onBoundsChange = (bounds: Bounds) => {
    console.log('bounds change', bounds.southWest, bounds.northEast)
  }

  const initCoors: Location = {
    lat: location?.coords.latitude || 0,
    lng: location?.coords.longitude || 0,
  }

  if (locationErr) return <FallbackView msg={locationErr} />
  if (!location) return <FallbackView msg={'fetching location'} />
  return (
    <>
      <MapModule
        onMapLoaded={() => setMapLoaded(true)}
        ref={map}
        onBoundsChange={onBoundsChange}
        markers={markers}
        initCoords={initCoors}
        onClickMarker={onClickMarker}
      />
    </>
  )
}
