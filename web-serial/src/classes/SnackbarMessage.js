const SnackbarMessage = Object.freeze({
  Error: {
    NoWebSerial: {
      color: "error",
      content: "Your browser doesn't seem to have the WebSerial API enabled. Please check if your browser supports it. The 'enable' button will lead you to the instructions to activate it on Chrome.",
      buttons: [
        {
          text: "Enable",
          callback: () => {
            window.location.href = "https://codelabs.developers.google.com/codelabs/web-serial/#2";
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
    InvalidRegExp: {
      color: "error",
      content: "There seemed to be something wrong with your RegExp. It's now back to the default.",
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
    },
    NoRegexSlashes: {
      color: "warning",
      content: "Hmm... Did you write your regex with '/' and flags? Those will be treated as actual characters, as you only need to write the regex content. The default flags are 'gms'.",
      timeout: 5000
    }
  }
});

export default SnackbarMessage;
