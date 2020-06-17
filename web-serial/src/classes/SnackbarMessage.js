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
      timeout: -1
    },
    NoTextDecoderStream: {
      color: "error",
      content: "Your browser doesn't seem to have the TextDecoderStream class. Maybe check on its documentation?",
      timeout: -1
    },
    NoTextEncoderStream: {
      color: "error",
      content: "Your browser doesn't seem to have the TextEncoderStream class. Maybe check on its documentation?",
      timeout: -1
    },
    NoPortSelected: {
      color: "error",
      content: "No serial port selected. Connection stopped.",
      timeout: 2000
    },
    ConnectionFailed: {
      color: "error",
      content: "Your serial connection failed somehow. Please try again.",
      timeout: 3000
    },
    Custom: (description) => ({
      color: "error",
      content: description,
      timeout: -1
    })
  },
  Success: {
    SerialConnectionOpened: {
      color: "success",
      content: "Successfully opened a serial connection!",
      timeout: 2000
    }
  },
  Warning: {
    SerialConnectionClosed: {
      color: "warning",
      content: "The serial connection was closed.",
      timeout: 5000
    }
  }
});

export default SnackbarMessage;
