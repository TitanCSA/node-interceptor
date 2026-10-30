"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_1 = require("./native");
const device_1 = require("./device");
class Interception {
    constructor(_context = native_1.default.createContext()) {
        this._context = _context;
    }
    get context() {
        if (native_1.default.isContextDestroyed(this._context))
            throw new Error('The context is destroyed');
        return this._context;
    }
    setFilter(type, filter) {
        native_1.default.setFilter(this.context, type, filter);
    }
    getDevice(id) {
        if (native_1.default.getHardwareId(this.context, id) === null)
            return null;
        return new device_1.Device(this._context, id);
    }
    getDevices() {
        const devices = [];
        const context = this.context; // So the destruction check is only done once.
        for (let id = 1; id <= native_1.MAX_DEVICE; id++) {
            if (native_1.default.getHardwareId(context, id) === null)
                continue;
            devices.push(new device_1.Device(context, id));
        }
        return devices;
    }
    getKeyboards() {
        const keyboards = [];
        const context = this.context; // So the destruction check is only done once.
        for (let id = 1; id <= native_1.MAX_KEYBOARD; id++) {
            if (native_1.default.getHardwareId(context, id) === null)
                continue;
            keyboards.push(new device_1.Device(context, id));
        }
        return keyboards;
    }
    getMice() {
        const mice = [];
        const context = this.context; // So the destruction check is only done once.
        for (let id = native_1.MAX_KEYBOARD + 1; id <= native_1.MAX_KEYBOARD + native_1.MAX_MOUSE; id++) {
            if (native_1.default.getHardwareId(context, id) === null)
                continue;
            mice.push(new device_1.Device(context, id));
        }
        return mice;
    }
    async wait(timeout) {
        let id = null;
        if (timeout === undefined)
            id = await native_1.default.waitAsync(this.context);
        else
            id = await native_1.default.waitWithTimeoutAsync(this.context, timeout);
        return id !== null ? new device_1.Device(this._context, id) : null;
    }
    waitSync(timeout) {
        let id = null;
        if (timeout === undefined)
            id = native_1.default.wait(this.context);
        else
            id = native_1.default.waitWithTimeout(this.context, timeout);
        return id !== null ? new device_1.Device(this._context, id) : null;
    }
    destroy() {
        if (native_1.default.isContextDestroyed(this._context))
            throw new Error('Already destroyed');
        native_1.default.destroyContext(this._context);
    }
    isDestroyed() {
        return native_1.default.isContextDestroyed(this._context);
    }
    toString() {
        return `[Interception: ${this._context}]`;
    }
}
exports.default = Interception;
//# sourceMappingURL=interception.js.map