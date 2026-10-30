"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseFlag = exports.FilterMouseState = exports.MouseState = exports.FilterKeyState = exports.KeyState = exports.MOUSE = exports.KEYBOARD = exports.MAX_DEVICE = exports.MAX_MOUSE = exports.MAX_KEYBOARD = void 0;
exports.MAX_KEYBOARD = 10;
exports.MAX_MOUSE = 10;
exports.MAX_DEVICE = exports.MAX_KEYBOARD + exports.MAX_MOUSE;
/**
 * Gets the device ID of the `i`th keyboard.
 * @param index The number of the keyboard, 0-based, maximum: `MAX_KEYBOARD - 1`.
 */
const KEYBOARD = (index) => index + 1;
exports.KEYBOARD = KEYBOARD;
/**
 * Gets the device ID of the `i`th mouse.
 * @param index The number of the mouse, 0-based, maximum: `MAX_MOUSE - 1`.
 */
const MOUSE = (index) => exports.MAX_KEYBOARD + index + 1;
exports.MOUSE = MOUSE;
var KeyState;
(function (KeyState) {
    KeyState[KeyState["DOWN"] = 0] = "DOWN";
    KeyState[KeyState["UP"] = 1] = "UP";
    /**
     * Extended E0 scan-code prefix; combine with UP for release.
     */
    KeyState[KeyState["E0"] = 2] = "E0";
    /**
     * Extended E1 scan-code prefix; combine with UP for release.
     */
    KeyState[KeyState["E1"] = 4] = "E1";
    /**
     * Unknown.
     */
    KeyState[KeyState["TERMSRV_SET_LED"] = 8] = "TERMSRV_SET_LED";
    /**
     * Unknown.
     */
    KeyState[KeyState["TERMSRV_SHADOW"] = 16] = "TERMSRV_SHADOW";
    /**
     * Unknown.
     */
    KeyState[KeyState["TERMSRV_VKPACKET"] = 32] = "TERMSRV_VKPACKET";
})(KeyState || (exports.KeyState = KeyState = {}));
/**
 * Filter the keyboard strokes intercepted by key states.
 *
 * The filter works as a bitfield, so combine flags using bitwise operators:
 * ```ts
 * const filter = FilterKeyState.DOWN | FilterKeyState.UP;
 * ```
 */
var FilterKeyState;
(function (FilterKeyState) {
    FilterKeyState[FilterKeyState["NONE"] = 0] = "NONE";
    FilterKeyState[FilterKeyState["ALL"] = 65535] = "ALL";
    FilterKeyState[FilterKeyState["DOWN"] = 1] = "DOWN";
    FilterKeyState[FilterKeyState["UP"] = 2] = "UP";
    /**
     * Special key down, such as `delete` or arrow keys.
     */
    FilterKeyState[FilterKeyState["E0"] = 4] = "E0";
    /**
     * Special key up, such as `delete` or arrow keys.
     */
    FilterKeyState[FilterKeyState["E1"] = 8] = "E1";
    /**
     * Unknown.
     */
    FilterKeyState[FilterKeyState["TERMSRV_SET_LED"] = 16] = "TERMSRV_SET_LED";
    /**
     * Unknown.
     */
    FilterKeyState[FilterKeyState["TERMSRV_SHADOW"] = 32] = "TERMSRV_SHADOW";
    /**
     * Unknown.
     */
    FilterKeyState[FilterKeyState["TERMSRV_VKPACKET"] = 64] = "TERMSRV_VKPACKET";
})(FilterKeyState || (exports.FilterKeyState = FilterKeyState = {}));
var MouseState;
(function (MouseState) {
    MouseState[MouseState["BUTTON_1_DOWN"] = 1] = "BUTTON_1_DOWN";
    MouseState[MouseState["BUTTON_1_UP"] = 2] = "BUTTON_1_UP";
    MouseState[MouseState["BUTTON_2_DOWN"] = 4] = "BUTTON_2_DOWN";
    MouseState[MouseState["BUTTON_2_UP"] = 8] = "BUTTON_2_UP";
    MouseState[MouseState["BUTTON_3_DOWN"] = 16] = "BUTTON_3_DOWN";
    MouseState[MouseState["BUTTON_3_UP"] = 32] = "BUTTON_3_UP";
    MouseState[MouseState["BUTTON_4_DOWN"] = 64] = "BUTTON_4_DOWN";
    MouseState[MouseState["BUTTON_4_UP"] = 128] = "BUTTON_4_UP";
    MouseState[MouseState["BUTTON_5_DOWN"] = 256] = "BUTTON_5_DOWN";
    MouseState[MouseState["BUTTON_5_UP"] = 512] = "BUTTON_5_UP";
    MouseState[MouseState["WHEEL"] = 1024] = "WHEEL";
    MouseState[MouseState["H_WHEEL"] = 2048] = "H_WHEEL";
    MouseState[MouseState["LEFT_BUTTON_DOWN"] = 1] = "LEFT_BUTTON_DOWN";
    MouseState[MouseState["LEFT_BUTTON_UP"] = 2] = "LEFT_BUTTON_UP";
    MouseState[MouseState["RIGHT_BUTTON_DOWN"] = 4] = "RIGHT_BUTTON_DOWN";
    MouseState[MouseState["RIGHT_BUTTON_UP"] = 8] = "RIGHT_BUTTON_UP";
    MouseState[MouseState["MIDDLE_BUTTON_DOWN"] = 16] = "MIDDLE_BUTTON_DOWN";
    MouseState[MouseState["MIDDLE_BUTTON_UP"] = 32] = "MIDDLE_BUTTON_UP";
})(MouseState || (exports.MouseState = MouseState = {}));
/**
 * Filter the mouse strokes intercepted.
 *
 * The filter works as a bitfield, so combine flags using bitwise operators:
 * ```ts
 * const wheelsFilter = FilterMouseState.WHEEL | FilterMouseState.H_WHEEL; // Wheel events only.
 * const filter = FilterMouseState.ALL ^ FilterMouseState.MOVE; // Excludes the movement strokes.
 * ```
 */
var FilterMouseState;
(function (FilterMouseState) {
    FilterMouseState[FilterMouseState["NONE"] = 0] = "NONE";
    FilterMouseState[FilterMouseState["ALL"] = 65535] = "ALL";
    FilterMouseState[FilterMouseState["BUTTON_1_DOWN"] = 1] = "BUTTON_1_DOWN";
    FilterMouseState[FilterMouseState["BUTTON_1_UP"] = 2] = "BUTTON_1_UP";
    FilterMouseState[FilterMouseState["BUTTON_2_DOWN"] = 4] = "BUTTON_2_DOWN";
    FilterMouseState[FilterMouseState["BUTTON_2_UP"] = 8] = "BUTTON_2_UP";
    FilterMouseState[FilterMouseState["BUTTON_3_DOWN"] = 16] = "BUTTON_3_DOWN";
    FilterMouseState[FilterMouseState["BUTTON_3_UP"] = 32] = "BUTTON_3_UP";
    FilterMouseState[FilterMouseState["BUTTON_4_DOWN"] = 64] = "BUTTON_4_DOWN";
    FilterMouseState[FilterMouseState["BUTTON_4_UP"] = 128] = "BUTTON_4_UP";
    FilterMouseState[FilterMouseState["BUTTON_5_DOWN"] = 256] = "BUTTON_5_DOWN";
    FilterMouseState[FilterMouseState["BUTTON_5_UP"] = 512] = "BUTTON_5_UP";
    /**
     * Vertical wheel movement.
     */
    FilterMouseState[FilterMouseState["WHEEL"] = 1024] = "WHEEL";
    /**
     * Horizontal wheel movement.
     */
    FilterMouseState[FilterMouseState["H_WHEEL"] = 2048] = "H_WHEEL";
    /**
     * Mouse movement.
     */
    FilterMouseState[FilterMouseState["MOVE"] = 4096] = "MOVE";
    FilterMouseState[FilterMouseState["LEFT_BUTTON_DOWN"] = 1] = "LEFT_BUTTON_DOWN";
    FilterMouseState[FilterMouseState["LEFT_BUTTON_UP"] = 2] = "LEFT_BUTTON_UP";
    FilterMouseState[FilterMouseState["RIGHT_BUTTON_DOWN"] = 4] = "RIGHT_BUTTON_DOWN";
    FilterMouseState[FilterMouseState["RIGHT_BUTTON_UP"] = 8] = "RIGHT_BUTTON_UP";
    FilterMouseState[FilterMouseState["MIDDLE_BUTTON_DOWN"] = 16] = "MIDDLE_BUTTON_DOWN";
    FilterMouseState[FilterMouseState["MIDDLE_BUTTON_UP"] = 32] = "MIDDLE_BUTTON_UP";
})(FilterMouseState || (exports.FilterMouseState = FilterMouseState = {}));
/**
 * Mouse flags altering the sent mouse strokes behaviour.
 */
var MouseFlag;
(function (MouseFlag) {
    /**
     * The mouse stroke coordinates sent are relative to the current mouse position.
     */
    MouseFlag[MouseFlag["MOVE_RELATIVE"] = 0] = "MOVE_RELATIVE";
    /**
     * The mouse stroke coordinates send are absolution to the screen space.
     */
    MouseFlag[MouseFlag["MOVE_ABSOLUTE"] = 1] = "MOVE_ABSOLUTE";
    /**
     * Unknown.
     */
    MouseFlag[MouseFlag["VIRTUAL_DESKTOP"] = 2] = "VIRTUAL_DESKTOP";
    /**
     * Unknown.
     */
    MouseFlag[MouseFlag["ATTRIBUTES_CHANGED"] = 4] = "ATTRIBUTES_CHANGED";
    /**
     * Unknown.
     */
    MouseFlag[MouseFlag["MOVE_NOCOALESCE"] = 8] = "MOVE_NOCOALESCE";
    /**
     * Unknown.
     */
    MouseFlag[MouseFlag["TERMSRV_SRC_SHADOW"] = 256] = "TERMSRV_SRC_SHADOW";
})(MouseFlag || (exports.MouseFlag = MouseFlag = {}));
const node_path_1 = require("node:path");
const native = require((0, node_path_1.resolve)(__dirname, '../../../tools/load.cjs'));
exports.default = native;
//# sourceMappingURL=native.js.map