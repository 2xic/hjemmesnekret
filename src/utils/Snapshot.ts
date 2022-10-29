/* eslint-disable @typescript-eslint/ban-types */

/**
 * TODO support inline snapshots
 */
export class Snapshot {
    public construct(value: Object | (new () => unknown)) {
        const parsed = JSON.stringify(value, null, 2);
        return `${value.constructor.name} ${parsed}`
    }
}

