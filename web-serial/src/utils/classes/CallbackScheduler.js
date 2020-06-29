class CallbackScheduler {
    constructor(callback) {
        this.callback = callback;
        this.timeoutHandle = null;
    }

    schedule(newTimeout) {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }

        if (newTimeout >= 0) {
            this.timeoutHandle = setTimeout(this.callback, newTimeout);
        }
    }
}

export default CallbackScheduler;
