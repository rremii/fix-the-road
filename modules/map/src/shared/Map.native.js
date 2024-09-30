export const MapNativeScripts = `
 <script>
    function handleReactMassage(msg) {
      const msg = JSON.parse(event.data)
      
      alert(msg)
    }
  </script>
  <script>
    function sendMsgToReact(msg) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify(msg)
      );
    };
  </script>
`


