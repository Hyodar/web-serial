
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
            decodeFrom: "iso88591",
            encodeTo: "iso88591",
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
    }

    write(str) {
        this.serialWriter = this.encoder.writable.getWriter();
        this.serialWriter.write(str);
        this.serialWriter.releaseLock();
    }

    async read() {
        return await this.serialReader.read();
    }

    async readLoop() {
        while (this.active) {   
            this.serialReader = this.decoder.readable.getReader();

            try {
                for (;;) {
                    const { value, done } = await this.serialReader.read();
                    
                    if (done) {
                        this.serialReader.releaseLock();
                        break;
                    }
                    
                    this.options.readLoopCallback(value);
                }
            }
            catch (e) {
                this.serialReader.releaseLock();
            }
        }
    }

    async close() {
        if (!this.active) return;

        this.active = false;

        this.serialReader = (this.decoder.readable.locked)? this.serialReader : this.decoder.readable.getReader();
        this.serialWriter = (this.encoder.writable.locked)? this.serialWriter : this.encoder.writable.getWriter();

        this.serialReader.cancel();
        await this.serialReaderClosed.catch(() => {});

        this.serialWriter.close();
        await this.serialWriterClosed.catch(() => {});

        await this.serialPort.close();

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
        this.addEventListener("disconnect", this.close.bind(this));
    }
}

export default BrowserSerial;
