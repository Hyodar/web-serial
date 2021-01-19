const SnackbarMessage = {
  Error: {
    NoTextDecoderStream: {
      content: "Your browser doesn't seem to have the TextDecoderStream class. Maybe check on its documentation?",
      timeout: -1,
    },
    NoTextEncoderStream: {
      content: "Your browser doesn't seem to have the TextEncoderStream class. Maybe check on its documentation?",
      timeout: -1,
    },
    NoPortSelected: {
      content: "No serial port selected. Connection stopped.",
      timeout: 2000,
    },
    ConnectionFailed: {
      content: "Your serial connection failed somehow. Please try again.",
      timeout: 3000,
    },
    InvalidRegExp: {
      content: "There seemed to be something wrong with your RegExp. It's now back to the default.",
      timeout: 3000,
    },
    CommandSave: {
      content: "There was an error saving this command. Please try again.",
      timeout: 3000,
    },
    ExpressionSave: {
      content: "There was an error saving this expression. Please try again.",
      timeout: 3000,
    },
    Custom: (description) => ({
      color: "error",
      content: description,
      timeout: -1,
    }),
  },
  Success: {
    SerialConnectionOpened: {
      content: "Successfully opened a serial connection!",
      timeout: 2000,
    },
    SerialConnectionClosed: {
      content: "Successfully closed a serial connection!",
      timeout: 2000,
    },
    CommandTriggered: (commandName) => ({
      color: "success",
      content: `The command '${commandName}' was triggered!`,
      timeout: 1000,
    }),
    LoadUserConfiguration: (loadCallback) => ({
      color: "success",
      content: "Previous session configuration found!",
      timeout: 6000,
      buttons: [
        { text: "Load", callback: loadCallback },
      ],
    }),
  },
  Warning: {
    DeviceDisconnected: {
      content: "A previously paired device was disconnected.",
      timeout: 5000,
    },
    NoRegexSlashes: {
      content: "Hmm... Did you write your regex with '/' and flags? Those will be treated as actual characters, as you only need to write the regex content. The default flags are 'gms'.",
      timeout: 7000,
    },
    DidntSaveCommand: (saveCallback) => ({
      color: "warning",
      content: "Your command changes weren't saved.",
      timeout: 4000,
      buttons: [
        { text: "Save", callback: saveCallback },
      ],
    }),
    DidntSaveExpression: (saveCallback) => ({
      color: "warning",
      content: "Your expression changes weren't saved.",
      timeout: 4000,
      buttons: [
        { text: "Save", callback: saveCallback }
      ],
    }),
  }
};

const SnackbarMessageColors = {
  Error: "error",
  Success: "success",
  Warning: "warning",
};

Object.keys(SnackbarMessage).forEach(msgType => {
  Object.values(SnackbarMessage[msgType]).forEach(msg => {
    if (msg instanceof Object) {
      msg.color = SnackbarMessageColors[msgType];
    }
  });
});

export default SnackbarMessage;
