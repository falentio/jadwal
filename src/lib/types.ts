import type {
    Simplify,
    IntRange,
    LessThan,
} from "type-fest"

type PaddedTime<T extends number> = T extends number ?
    LessThan<T, 10> extends true ? `0${T}` : `${T}`
    : never

export type Updateable<T extends { id: string }, U extends keyof T> = Simplify<Pick<T, "id"> & Partial<Pick<T, U>>>
export type Hour = PaddedTime<IntRange<0, 23>>
export type Minute = PaddedTime<IntRange<0, 59>>
export type Time = `${Hour}:${Minute}`