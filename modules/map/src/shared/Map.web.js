export const MapWebScripts = `
  <script>
      window.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data)

        const markers = msg.payload

        drawAllMarkers(markers);
      });
  </script>
  <script>
    function sendMsgToReact(msg) {
      window.parent.postMessage(JSON.stringify(msg), "*");
    };
  </script>
`
