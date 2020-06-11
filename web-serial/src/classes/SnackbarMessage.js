const SnackbarMessage = Object.freeze({
  Error: {
    NoWebSerial: {
      color: "error",
      content: "Your browser doesn't seem to have the WebSerial API enabled.",
      buttons: [
        {
          text: "Enable it here!",
          callback: () => {
            window.location.href = "https://duckduckgo.com";
          }
        }
      ],
      timeout: 0
    }
  }
});

export default SnackbarMessage;
