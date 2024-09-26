import * as React from 'react'
import { mapHTML } from './Map.web'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
interface PostMarker {
  lat: number
  lng: number
}

export default function MapViewWeb() {
  useEffect(() => {
    document.head.innerHTML += `
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
     <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
    `

    document.body.innerHTML += `
     <div id="map"></div>
    `
  }, [])

  return (
    <>
      <div>qwe</div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
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
