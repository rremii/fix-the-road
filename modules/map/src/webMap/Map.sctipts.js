import { AppOrigin } from './../constants'

export const MapWebScripts = `
  <script>
      window.addEventListener('message', (event) => {
        const msg = JSON.parse(event.data)

        onReactMessage(msg)

      });
  </script>
  <script>
    function sendMsgToReact(msg) {
      window.parent.postMessage(msg, "${AppOrigin}");
    };
  </script>
`
