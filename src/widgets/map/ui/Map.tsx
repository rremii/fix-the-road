import React, { useEffect, useRef, useState } from 'react'
import { Bounds, Coords, IMap, Marker } from 'modules/map/types'
import { Map as MapModule } from '@modules/map'
import { useLocation } from '@shared/hooks/useLocation'
import { FallbackView } from '@shared/ui/FallbackView'
import { Location } from '@shared/types'
import MarkerRedIcon from '@icons/marker-red.png'
import MarkerBlueIcon from '@icons/marker-blue.png'
import MarkerGreenIcon from '@icons/marker-green.png'
import { useAssets } from 'expo-asset'
import { markerSize } from '@shared/constants'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeNavigationParam } from 'src/app/navigation/mobile/types'
import { useGetPosts } from 'src/entities/post/model/useGetPosts'
import { useGetMe } from 'src/entities/user/model/useGetMe'
import { useMapStore } from 'src/entities/map/model/mapStore'

export const Map = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeNavigationParam>>()
  const setChosenMarker = useMapStore((state) => state.setChosenMarkerId)
  const chosenMarkerId = useMapStore((state) => state.chosenMarkerId)
  const setBounds = useMapStore((state) => state.setBounds)
  const [assets] = useAssets([MarkerRedIcon, MarkerBlueIcon, MarkerGreenIcon])
  const map = useRef<IMap>(null)
  const [isMapLoaded, setMapLoaded] = useState(false)
  const [markers, setMarkers] = useState<Marker[]>([])
  const { errorMsg: locationErr, location } = useLocation()

  const redMarkerUri = assets?.at(0)?.uri || ''
  const blueMarkerUri = assets?.at(1)?.uri || ''
  const greenMarkerUri = assets?.at(2)?.uri || ''

  const posts = useGetPosts()
  const { me } = useGetMe()

  const getMarkerFromPosts = (): Marker[] => {
    if (!me) return []
    return posts.map((post) => {
      const isMyMarker = post.userId === me.id
      const isChosen = post.id === chosenMarkerId

      let iconUrl
      if (isChosen) iconUrl = greenMarkerUri
      else iconUrl = isMyMarker ? blueMarkerUri : redMarkerUri
      return {
        draggable: false,
        id: post.id,
        lat: post.lat,
        lng: post.lng,
        icon: {
          iconUrl,
          iconAnchor: [markerSize / 2, markerSize / 2],
          iconSize: [markerSize, markerSize],
        },
      }
    })
  }

  useEffect(() => {
    const markers = getMarkerFromPosts()
    setMarkers(markers)
  }, [chosenMarkerId])

  useEffect(() => {
    if (!location || !posts.length || !me || !isMapLoaded) return

    map.current?.center({
      lat: location?.coords.latitude,
      lng: location?.coords.longitude,
    })

    const markers = getMarkerFromPosts()
    setMarkers(markers)
  }, [isMapLoaded, location, posts, me])

  const onClickMarker = (marker: Marker) => {
    setChosenMarker(marker.id)
    navigation.setParams({
      postId: marker.id,
    })
  }

  const clearChosenMarker = () => {
    setChosenMarker(null)
    navigation.setParams({
      postId: undefined,
    })
  }

  const onBoundsChange = (bounds: Bounds) => {
    setBounds(bounds)
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
        onClick={clearChosenMarker}
        onBoundsChange={onBoundsChange}
        markers={markers}
        initCoords={initCoors}
        onClickMarker={onClickMarker}
      />
    </>
  )
}
