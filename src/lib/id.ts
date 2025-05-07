import { anaidFactory } from "@falentio/anaid";

export const generateId = anaidFactory<IdPrefix>()

export type IdPrefix =
    | "usr_" // user
    | "org_" // organization
    | "orgm_" // organization member
    | "sdl_" // schedule

export type Anaid<T extends IdPrefix> = `${T}${string}`