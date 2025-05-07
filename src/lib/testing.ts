import { getPlatformProxy } from "wrangler"

export const proxy = await getPlatformProxy<Env>()