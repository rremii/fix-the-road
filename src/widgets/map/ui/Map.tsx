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

export const Map = () => {
  const map = useRef<IMap>(null)
  const { errorMsg: locationErr, location } = useLocation()
  const [markers, setMarkers] = useState<Marker[]>([])
  const [assets] = useAssets([MarkerBlueIcon, MarkerRedIcon])

  const redMarkerUri = assets?.at(0)?.uri || ''
  const blueMarkerUri = assets?.at(1)?.uri || ''

  useEffect(() => {
    if (location) {
      map.current?.center({
        lat: location?.coords.latitude,
        lng: location?.coords.longitude,
      })
      setMarkers([
        {
          draggable: false,
          id: 1,
          lat: location?.coords.latitude || 0,
          lng: location?.coords.longitude || 0,
          icon: {
            iconUrl: redMarkerUri,
            iconAnchor: [markerSize / 2, markerSize / 2],
            iconSize: [markerSize, markerSize],
          },
        },
      ])
    }
  }, [location])

  const initCoors: Location = {
    lat: location?.coords.latitude || 0,
    lng: location?.coords.longitude || 0,
  }

  const onClickMarker = (marker: Marker) => {
    console.log('click marker', marker)
  }

  const onClickMap = (coords: Coords) => {
    const marker: Marker = {
      draggable: false,
      id: 1,
      lat: coords.lat || 0,
      lng: coords.lng || 0,
      icon: {
        iconUrl: blueMarkerUri,
        iconAnchor: [markerSize / 2, markerSize / 2],
        iconSize: [markerSize, markerSize],
      },
    }
    setMarkers([marker])
  }

  const onBoundsChange = (bounds: Bounds) => {
    console.log('bounds change', bounds.southWest, bounds.northEast)
  }
  if (locationErr) return <FallbackView msg={locationErr} />
  if (!location) return <FallbackView msg={'fetching location'} />
  return (
    <>
      <MapModule
        ref={map}
        onClick={onClickMap}
        onBoundsChange={onBoundsChange}
        markers={markers}
        initCoords={initCoors}
        onClickMarker={onClickMarker}
      />
    </>
  )
}
