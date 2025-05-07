import { error } from "@sveltejs/kit"

export const load = async ({ locals, params }) => {
    const organization = await locals.app.organization.findByWebsiteName(params.websiteName)
    if (!organization) {
        error(404, `Organization with website name ${params.websiteName} not found`)
    }
    const schedules = await locals.app.schedule.findSchedules(organization.id)
    return { organization, schedules, user: locals.user }
}