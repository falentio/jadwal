export const load = async ({ locals }) => {
    const organizations = await locals.app.organization.findByUserId(locals.user!.id)
    return { organizations }
}