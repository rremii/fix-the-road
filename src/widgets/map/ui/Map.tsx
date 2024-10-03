import React, { useEffect, useRef, useState } from 'react'
import { Coords, IMap, Marker } from 'modules/map/types'
import { Map as MapModule } from '@modules/map'
import { CenterMap } from '@modules/map/src/ui/CenterMap'
import { useLocation } from '@shared/hooks/useLocation'
import { err } from 'react-native-svg'
import { FallbackView } from '@shared/ui/FallbackView'
import { Location } from '@shared/types'

export const Map = () => {
  const map = useRef<IMap>(null)
  const { errorMsg: locationErr, location } = useLocation()
  const [markers, setMarkers] = useState<Marker[]>([])

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
          icon: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
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

  if (locationErr) return <FallbackView msg={locationErr} />
  if (!location) return <FallbackView msg={'fetching location'} />
  return (
    <>
      <MapModule
        ref={map}
        markers={markers}
        initCoords={initCoors}
        onClickMarker={onClickMarker}
      />
    </>
  )
}
