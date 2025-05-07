import { error, json } from '@sveltejs/kit'

export const GET = async ({ locals, params }) => {
    console.log("params", params)
    const org = await locals.app.organization.findByWebsiteName(params.name)
    if (!org) {
        return error(404)
    }
    return json(org)
}