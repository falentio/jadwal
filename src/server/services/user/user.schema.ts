import * as v from "$lib/valibot.ts";
export const SUser = v.strictObject({
    authId: v.string(),
    createdAt: v.string(),
    id: v.id("usr_"),
    firstName: v.nullable(v.string()),
    lastName: v.nullable(v.string()),
    email: v.pipe(v.string(), v.email()),
})