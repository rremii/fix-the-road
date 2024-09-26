export const mapHTML = `
<!DOCTYPE html>
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
  <script id="main-script">


     const map = L.map("map").setView([49.2125578, 16.62662018], 14); //starting position
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

     
      let group = L.layerGroup();

      const drawAllMarkers=(markers)=>{
        
        group.clearLayers();

        markers.forEach((markerData) => {
          const marker = L.marker({
            lat: markerData.lat,
            lng: markerData.lng,
          })
            
          marker.addTo(group);
        })

        group.addTo(map);
      }

     

      const handleMapClick = (lat, lng) => {
      
        const msg =  JSON.stringify({
            type: "addMarker",
            payload: {
              lat,
              lng,
            },
          })

        sendMsgToReact(msg)

      };

      const removeMarker = (index) => {
        const marker = markers[index];
        marker.remove();
        markers.splice(markers.indexOf(marker), 1);
      };

      map.on("click", function (e) {
        handleMapClick(e.latlng.lat, e.latlng.lng);
      });
      
  </script>
</html>
`
