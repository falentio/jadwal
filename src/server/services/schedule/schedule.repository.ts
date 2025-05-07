import type { Anaid } from "$lib/id.ts";
import type { Schedule } from "./schedule.types.ts";

export type ScheduleRepository = {
    getById: (id: Anaid<"sdl_">) => Promise<Schedule | null>;
    findByOrganizationId: (organizationId: Anaid<"org_">) => Promise<Schedule[]>;
    deleteById: (id: Anaid<"sdl_">) => Promise<void>;
    create: (data: Omit<Schedule, "createdAt">) => Promise<Schedule>;
}