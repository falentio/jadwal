import * as v from "$lib/valibot.ts";

//  TODO: use i18n
export const SOrganization = v.strictObject({
    id: v.id("org_"),
    creatorId: v.id("usr_"),
    name: v.pipe(
        v.string("nama wajib diisi"),
        v.minLength(3, "minimum 3 karakter"),
    ),
    websiteName: v.pipe(
        v.string("nama website wajib diisi"),
        v.minLength(6, "minimum 6 karakter"),
        v.maxLength(32, "maksimal 32 karakter"),
        v.regex(/^[a-z0-9]+$/, "hanya boleh huruf kecil dan angka"),
    ),
    description: v.pipe(
        v.string("deskripsi wajib diisi"),
        v.minLength(3, "minimum 3 karakter"),
    ),
    createdAt: v.string(),
})

export const SOrganizationMember = v.strictObject({
    id: v.id("orgm_"),
    organizationId: v.id("org_"),
    userId: v.id("usr_"),
    role: v.picklist(["admin", "member"]),
    createdAt: v.string(),
})

export const SOrganizationUpdate = v.intersect([
    v.pick(SOrganization, ["id"]),
    v.partial(
        v.pick(SOrganization, ["name", "description"])
    )
]);

export const SOrganizationCreate = v.omit(SOrganization, ["id", "createdAt", "creatorId"]);