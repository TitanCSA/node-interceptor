"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const native_1 = require("./native");
class Device {
    constructor(_context, id) {
        this._context = _context;
        this.id = id;
    }
    get context() {
        if (native_1.default.isContextDestroyed(this._context))
            throw new Error('The context is destroyed');
        return this._context;
    }
    /**
     * Gets the precedence (priority) set for this device.
     */
    getPrecedence() {
        return native_1.default.getPrecedence(this.context, this.id);
    }
    /**
     * Sets the precedence (priority) wanted for this device.
     */
    setPrecedence(precedence) {
        native_1.default.setPrecedence(this.context, this.id, precedence);
    }
    getFilter() {
        return native_1.default.getFilter(this.context, this.id);
    }
    send(stroke) {
        return native_1.default.send(this.context, this.id, stroke);
    }
    receive() {
        return native_1.default.receive(this.context, this.id);
    }
    getHardwareId() {
        return native_1.default.getHardwareId(this.context, this.id)
            ?.replace(/\x00\x00$/, '')?.replace(/\x00/gi, ', ')
            ?? null;
    }
    isMouse() {
        return this.id > native_1.MAX_KEYBOARD && this.id <= native_1.MAX_KEYBOARD + native_1.MAX_MOUSE;
    }
    isKeyboard() {
        return this.id > 0 && this.id <= native_1.MAX_KEYBOARD;
    }
    isInvalid() {
        return !this.isMouse() && !this.isKeyboard();
    }
    toString() {
        let type = 'Invalid';
        if (this.isMouse())
            type = 'Mouse';
        else if (this.isKeyboard())
            type = 'Keyboard';
        return `[${type} ${this.id}]: ${this.getHardwareId()}`;
    }
}
exports.Device = Device;
//# sourceMappingURL=device.js.map