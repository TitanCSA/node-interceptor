import { DeviceId, FilterKeyState, FilterMouseState } from './native';
import { Device, Keyboard, Mouse } from './device';
export default class Interception {
    private readonly _context;
    constructor(_context?: object);
    get context(): object;
    setFilter(type: 'mouse', filter: FilterMouseState): void;
    setFilter(type: 'keyboard', filter: FilterKeyState): void;
    getDevice(id: DeviceId): Device | null;
    getDevices(): Device[];
    getKeyboards(): Keyboard[];
    getMice(): Mouse[];
    wait(timeout?: number): Promise<Device | null>;
    waitSync(timeout?: number): Device | null;
    destroy(): void;
    isDestroyed(): boolean;
    toString(): string;
}
