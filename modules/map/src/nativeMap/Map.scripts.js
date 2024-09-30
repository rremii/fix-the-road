export const MapNativeScripts = `
 <script>
    function handleReactMassage(msg) {
    
      onReactMessage(msg)

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
