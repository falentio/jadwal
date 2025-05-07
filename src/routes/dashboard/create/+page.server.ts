import { redirect } from '@sveltejs/kit'
import { SOrganizationCreate } from '../../../server/services/organization/organization.schema.ts'
import { validateBody } from '../../../server/utils/req.js'

export const actions = {
    default: async ({ request, locals }) => {
        const data = await validateBody(SOrganizationCreate, request, "form")
        const org = await locals.app.organization.create(data, locals.user!.id)
        redirect(307, `/dashboard/${org.id}`)
    }
}