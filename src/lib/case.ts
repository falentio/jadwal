import type { CamelCasedProperties } from "type-fest"

export function snakeToCamelCaseObject<T>(obj: T): CamelCasedProperties<T> {
    const newObj = {} as CamelCasedProperties<T>;
    for (const key in obj) {
        const newKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        Reflect.set(newObj, newKey, obj[key])
    }
    return newObj;
}