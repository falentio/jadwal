import { env } from "$env/dynamic/private"
import { WorkOS } from "@workos-inc/node"
import { createApplication } from "./server/applications/index.ts"
import { dev } from "$app/environment"
import { COOKIE } from "./server/utils/contants.ts"
import { redirect } from "@sveltejs/kit"


export const handle = async ({ event, resolve }) => {
    if (dev) {
        const { getPlatformProxy } = await import("wrangler")
        event.platform = await getPlatformProxy()
    }
    if (!event.platform) {
        throw new Error("Platform not found")
    }
    event.locals.workos = new WorkOS(env.WORKOS_SECRET_KEY, {
        clientId: env.WORKOS_CLIENT_ID,
    })
    event.locals.app = createApplication({
        db: event.platform.env.DB,
        workos: event.locals.workos,
        sessionSecret: env.WORKOS_COOKIE_SECRET
    })
    const session = event.cookies.get(COOKIE.SESSION)
    if (session) {
        event.locals.user = await event.locals.app.user.getBySession(session)
    }
    if (event.route.id?.includes("/dashboard")) {
        if (!event.locals.user) {
            redirect(307, "/auth/login")
        }
    }

    return resolve(event)
}