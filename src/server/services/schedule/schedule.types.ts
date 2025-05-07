import type { Anaid } from "$lib/id.ts"
import type { Time } from "$lib/types.ts"

export type Schedule = {
    id: Anaid<"sdl_">
    organizationId: Anaid<"org_">
    /**
     * Between 0 and 6, where 0 is Sunday and 6 is Saturday
     */
    day: number
    /**
     * format: "HH:mm"
     * 24-hour format
     */
    start: Time
    /**
     * format: "HH:mm"
     * 24-hour format
     */
    end: Time
    teacherName: string
    subject: string
    description: string
    createdAt: string
}