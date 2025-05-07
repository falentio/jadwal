export const GET = async ({ locals, request }) => {
    const data = await locals.workos.userManagement.getAuthorizationUrl({
        clientId: locals.workos.clientId!,
        redirectUri: new URL("/auth/callback", request.url).href,
        provider: "authkit"
    })
    return Response.redirect(data, 307)
}