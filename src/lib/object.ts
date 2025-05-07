export function assignIfTruish<T extends Record<string, unknown>, U extends Partial<T>>(
    target: T,
    source: U
): T {
    for (const key in source) {
        if (source[key]) {
            Reflect.set(target, key, source[key]);
        }
    }
    return target;
}