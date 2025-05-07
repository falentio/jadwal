import { env } from '$env/dynamic/private';
import { error, redirect } from '@sveltejs/kit';
import { COOKIE } from '../../../server/utils/contants.js';

export const GET = async ({ locals, request, getClientAddress, cookies }) => {
    const code = new URL(request.url).searchParams.get("code");
    if (!code) {
        error(400, "Missing code");
    }

    const sealedSession = await locals.app.user.exchangeCodeForSession(
        code,
        request.headers.get("user-agent") || undefined,
        getClientAddress(),
    )

    cookies.set(COOKIE.SESSION, sealedSession, {
        path: "/",
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
    })

    return redirect(307, "/")
}

