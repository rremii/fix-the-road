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

  <link rel="prefetch" href="./marker.png">

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
        const iconData = markerData.icon || {
          iconUrl:  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconAnchor: [15, 30],
          iconSize: [30, 30],
        }
        const marker = L.marker(
          {
            lat: markerData.lat,
            lng: markerData.lng,
          },
          {
            icon: L.icon({
              iconUrl:
               iconData.iconUrl ,
              iconSize: iconData.iconSize,
              iconAnchor: iconData.iconAnchor,
              popupAnchor: iconData.iconAnchor,
              shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              shadowSize: [0,0]
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
      console.log('send msg to iframe', message)

      switch (message.type) {
            case 'drawMarkers':
                drawAllMarkers(message.payload)
                break;
            case 'centerMap':
                centerMap(message.payload.lat, message.payload.lng)
                break;
      }
    }
    
    function getBounds() {
      const bounds = map.getBounds()
      return {
        northEast: bounds._northEast,
        southWest: bounds._southWest,
      }
    }

    map.on('click', function (e) {
      handleMapClick(e.latlng.lat, e.latlng.lng)
    })


    map.on('zoomend', function (e) {
      sendMsgToReact({
        type: 'boundsChange',
        payload: getBounds(),
      })
    })

    map.on('moveend', function (e) {
      sendMsgToReact({
        type: 'boundsChange',
        payload: getBounds(),
      })
    })
    sendMsgToReact({
      type: 'boundsChange',
      payload: getBounds(),
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
