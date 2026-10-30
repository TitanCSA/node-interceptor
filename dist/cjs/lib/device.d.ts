import { Context, DeviceId, Filter, KeyboardStroke, MouseStroke, Stroke } from './native';
export type Mouse = Device<MouseStroke>;
export type Keyboard = Device<KeyboardStroke>;
export declare class Device<TStroke extends Stroke = Stroke> {
    private readonly _context;
    readonly id: DeviceId;
    constructor(_context: Context, id: DeviceId);
    get context(): object;
    /**
     * Gets the precedence (priority) set for this device.
     */
    getPrecedence(): number;
    /**
     * Sets the precedence (priority) wanted for this device.
     */
    setPrecedence(precedence: number): void;
    getFilter(): Filter;
    send(stroke: TStroke): boolean;
    receive(): TStroke | null;
    getHardwareId(): string | null;
    isMouse(): this is Mouse;
    isKeyboard(): this is Keyboard;
    isInvalid(): boolean;
    toString(): string;
}
