import React, { useEffect, useRef, useState } from 'react'
import { Coords, IMap, Marker } from 'modules/map/types'
import { Map } from '../../../modules/map'

interface IMarker extends Marker {}

const MapPage = () => {
  const ref = useRef<IMap>(null)

  const centerMap = (coords: Coords) => {
    if (!ref.current) return
    ref.current?.center(coords)
  }

  const [markers, setMarkers] = useState<IMarker[]>([
    {
      id: 1,
      lat: 49.2125578,
      lng: 16.62662018,
      draggable: false,
      icon: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    },
  ])

  const initCoors: Coords = {
    lat: 49.212,
    lng: 16.6266,
  }

  const onDragMarker = (dragMarker: IMarker) => {
    const newMarkers = markers.map((marker) => {
      if (marker.id === dragMarker.id) {
        return {
          ...marker,
          lat: dragMarker.lat,
          lng: dragMarker.lng,
        }
      }
      return marker
    })
    setMarkers(newMarkers)
  }
  const onClickMarker = (marker: IMarker) => {
    console.log('click marker', marker)
  }

  const onMapClick = (coords: Coords) => {
    const marker: Marker = {
      lat: coords.lat,
      lng: coords.lng,
      draggable: true,
      icon: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      id: markers.length + 1,
    }
    setMarkers((prevMarkers) => [...prevMarkers, marker])
    centerMap(coords)
  }
  return (
    <Map
      ref={ref}
      markers={markers}
      initCoords={initCoors}
      onClick={onMapClick}
      onClickMarker={onClickMarker}
      onDragMarker={onDragMarker}
    />
  )
}
export default MapPage
