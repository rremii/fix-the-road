import { MapType } from '../../types'
import { MapNativeScripts } from '../nativeMap/Map.scripts'
import { MapWebScripts } from '../webMap/Map.sctipts'

export const createHTMLMap = (type: MapType) => `
<!doctype html>
<html>
  <head>
    <meta
      name="viewport"
      content="initial-scale=1,maximum-scale=1,user-scalable=no"
    />
    <title>Display a map</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
      #map {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
  </body>
  ${type === 'web' ? MapWebScripts : MapNativeScripts}

  <script>
    const map = L.map('map').setView([49.2125578, 16.62662018], 18)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 14,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    function centerMap(lat, lng) {

      const curZoom = map.getZoom()

      map.setView([lat, lng],curZoom)
    }

    let group = L.layerGroup()

    function drawAllMarkers(markers) {
      group.clearLayers()

      markers.forEach((markerData) => {
        const marker = L.marker(
          {
            lat: markerData.lat,
            lng: markerData.lng,
          },
          {
            icon: L.icon({
              iconUrl: markerData.icon || 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            }),
            draggable: markerData.draggable || false,
          },
        )

        marker.on('dragend', function (e) {

          const newMarkerData = {
            ...markerData,
            lat: e.target._latlng.lat,
            lng: e.target._latlng.lng,
          }
          sendMsgToReact({
            type: 'dragMarker',
            payload: newMarkerData,
          })
        })
        marker.on('click', function (e) {
          sendMsgToReact({
            type: 'clickMarker',
            payload: markerData,
          })
        })

        marker.addTo(group)
      })

      group.addTo(map)
    }

    function handleMapClick(lat, lng) {
      sendMsgToReact({
        type: 'clickMap',
        payload: {
          lat,
          lng,
        },
      })
    }



    function onReactMessage(message) {
      switch (message.type) {
            case 'drawMarkers':
                drawAllMarkers(message.payload)
                break;
            case 'centerMap':
                centerMap(message.payload.lat, message.payload.lng)
                break;
      }
    }

    map.on('click', function (e) {
      handleMapClick(e.latlng.lat, e.latlng.lng)
    })
  </script>
  <script>

    const extraMapLabel = document.querySelector('.leaflet-control-attribution')
    extraMapLabel.style.display = 'none'
  
    const controls = document.querySelector('.leaflet-control-zoom')
    controls.style.transform= "translateY(70px)"

    

  </script>
</html>
`
