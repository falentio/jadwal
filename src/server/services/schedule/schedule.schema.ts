import { timeLt } from "$lib/time.ts";
import * as v from "$lib/valibot.ts";

export const SSchedule = v.strictObject({
    id: v.id("sdl_"),
    description: v.pipe(
        v.string(),
        v.maxLength(255, "maximal 255 karakter")
    ),
    start: v.time(),
    end: v.time(),
    teacherName: v.pipe(
        v.string(),
        v.maxLength(32, "maximal 32 karakter"),
    ),
    day: v.pipe(
        v.union([v.string(), v.number()]),
        v.transform(v => parseInt(v.toString(), 10)),
        v.minValue(0),
        v.maxValue(6)
    ),
    organizationId: v.id("org_"),
    createdAt: v.string(),
    subject: v.pipe(
        v.string(),
        v.maxLength(32, "maximal 32 karakter"),
    ),
})

export const SScheduleCreate = v.pipe(
    v.omit(SSchedule, ["id", "createdAt"]),
    v.check(({ start, end }) => timeLt(start, end), "mulai harus lebih awal dari selesai"),
)
export const SScheduleDelete = v.pick(SSchedule, ["id", "organizationId"]);