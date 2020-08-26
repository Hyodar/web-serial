
import iconv from "iconv-lite";

if (!window.TransformStream) {
    const TransformStreamPlaceholder = function() {};
    window.TransformStream = TransformStreamPlaceholder;
}

class IconvEncoderStream extends window.TransformStream {
    constructor(options) {
        super({
            start() {
                this.options = options;
            },
            transform(chunk, controller) {
                controller.enqueue(iconv.encode(chunk, this.options.encoding));
            },
        });
    }
}

class IconvDecoderStream extends window.TransformStream {
    constructor(options) {
        super({
            start() {
                this.options = options;
            },
            transform(chunk, controller) {
                controller.enqueue(iconv.decode(chunk, this.options.encoding));
            },
        });
    }
}

class BrowserSerial {

    static Error = {
        NoWebSerial: new Error(
            "This browser doesn't support or hasn't enabled the WebSerialAPI."
        ),
        NoTransformStream: new Error(
            "This browser doesn't support the Streams API "
        ),
        NoPortLoaded: new Error(
            "There was not port loaded."
        ),
        NoStreams: new Error(
            "Invalid serial port streams."
        ),
        AlreadyActive: new Error(
            "This serial connection is already active."
        ),
    };

    constructor(options) {
        BrowserSerial.checkCompatibility();

        this.setDefaultCallbacks();

        this.active = false;

        this.serialWriter = null;
        this.serialReader = null;

        this.serialWriterClosed = null;
        this.serialReaderClosed = null;

        this.encoder = null;
        this.decoder = null;

        this.serialPort = null;

        this.defaultOptions = {
            decodeFrom: "ascii",
            encodeTo: "ascii",
            readLoopCallback: null,
        };

        this.loadOptions(options);
    }

    loadOptions(options) {
        this.options = options;

        Object.entries(this.defaultOptions).forEach(([key, val]) => {
            if (this.options[key] === undefined) {
                this.options[key] = val;
            }
        });
    }

    setDecodeFrom(encoding) {
        this.options.decodeFrom = encoding;
    }

    setReadLoopCallback(callback) {
        let shouldStartLoop = false;

        if (this.active && !this.options.readLoopCallback) {
            shouldStartLoop = true;
        }

        this.options.readLoopCallback = callback;

        if (shouldStartLoop) {
            this.readLoop();
        }
    }

    static checkCompatibility() {
        if (!("serial" in navigator)) {
            throw BrowserSerial.Error.NoWebSerial;
        }
        if (!window.TransformStream) {
            throw BrowserSerial.Error.NoTransformStream;
        }
    }

    async requestPort(options) {
        if (this.active) {
            throw BrowserSerial.Error.AlreadyActive;
        }

        this.serialPort = await navigator.serial.requestPort(options);
    }

    async openConnection(options) {
        if (!this.serialPort) {
            throw BrowserSerial.Error.NoPortLoaded;
        }

        await this.serialPort.open(options);

        if (!this.serialPort.readable || !this.serialPort.writable) {
            throw BrowserSerial.Error.NoStreams;
        }

        this.active = true;

        this.initializeReader();
        this.initializeWriter();
    }

    initializeReader() {
        const options = this.options;
        this.decoder = new IconvDecoderStream({
            get encoding() {
                return options.decodeFrom;
            }
        });

        this.serialReaderClosed = this.serialPort.readable
            .pipeTo(this.decoder.writable);

        this.serialReader = this.decoder.readable.getReader();
        
        if (this.options.readLoopCallback) {
            this.readLoop();
        }
    }

    initializeWriter() {
        const options = this.options;
        this.encoder = new IconvEncoderStream({
            get encoding() {
                return options.encodeTo;
            }
        });

        this.serialWriterClosed = this.encoder.readable
            .pipeTo(this.serialPort.writable);

        this.serialWriter = this.encoder.writable.getWriter();
    }

    write(str) {
        this.serialWriter.write(str);
    }

    async read() {
        return await this.serialReader.read();
    }

    async readLoop() {
        let value;
        let done;

        for (;;) {
            try {
                ({ value, done } = await this.serialReader.read());
            }
            catch (e) {
                if (e instanceof DOMException) {
                    // forced disconnection
                    break;
                }

                this.serialReader.releaseLock();
                this.serialReader = this.decoder.readable.getReader();
            }

            if (done) {
                break;
            }
            
            this.options.readLoopCallback(value);
        }
    }

    async close(disconnect=false) {
        this.active = false;

        if (this.serialWriter) {
            this.serialWriter.close();
            await this.writableStreamClosed;
        }

        if (this.serialReader) {
            try {
                await this.serialReader.cancel();
            }
            catch (e) {
                // Forced disconnection triggers a reader exception,
                // so even though it doesn't look good to do a try
                // catch here, I did it

                if (!(disconnect && e instanceof DOMException)) {
                    throw e;
                }
            }

            await this.serialReaderClosed.catch(() => {});
        }

        if (this.serialPort) {
            await this.serialPort.close();
        }

        this.serialReader = null;
        this.serialWriter = null;
        this.serialReaderClosed = null;
        this.serialWriterClosed = null;
        this.serialPort = null;
        this.encoder = null;
        this.decoder = null;
    }

    addEventListener(event, callback) {
        navigator.serial.addEventListener(event, callback);
    }

    setDefaultCallbacks() {
        this.addEventListener("disconnect", this.close.bind(this, true));
    }
}

export default BrowserSerial;
