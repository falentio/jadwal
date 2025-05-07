import * as v from "$lib/valibot"
import { error } from "@sveltejs/kit"
import { validateBody } from "../../../server/utils/req.js"
import { SScheduleCreate, SScheduleDelete } from "../../../server/services/schedule/schedule.schema.js"
export const load = async ({ locals, params }) => {
    const orgId = v.parse(v.id("org_"), params.orgId)
    const organization = await locals.app.organization.findById(orgId)
    if (!organization) {
        error(404, `Organization with id ${orgId} not found`)
    }
    const schedules = await locals.app.schedule.findSchedules(orgId)
    return { organization, schedules }
}

export const actions = {
    create: async ({ request, locals }) => {
        const scheduleToCreate = await validateBody(SScheduleCreate, request, "form")
        return locals.app.schedule.createSchedule(scheduleToCreate, locals.user!.id)
    },
    delete: async ({ request, locals }) => {
        const scheduleToDelete = await validateBody(SScheduleDelete, request, "form")
        return locals.app.schedule.deleteSchedule(scheduleToDelete, locals.user!.id)
    }
}