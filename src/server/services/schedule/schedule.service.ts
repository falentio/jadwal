import { generateId, type Anaid } from "$lib/id.ts";
import * as v from "$lib/valibot.ts";
import type { OrganizationService } from "../organization/organization.service.ts";
import type { ScheduleRepository } from "./schedule.repository.ts";
import type { SScheduleCreate, SScheduleDelete } from "./schedule.schema.ts";
import type { Schedule } from "./schedule.types.ts";

export class ScheduleService {
    constructor(
        private scheduleRepository: ScheduleRepository,
        private organizationService: OrganizationService,
    ) { }

    async findSchedules(organizationId: Anaid<"org_">): Promise<Schedule[]> {
        return this.scheduleRepository.findByOrganizationId(organizationId);
    }

    async deleteSchedule(data: v.InferOutput<typeof SScheduleDelete>, actorId: Anaid<"usr_">): Promise<void> {
        await this.organizationService.check(data.organizationId, actorId, "write");
        return this.scheduleRepository.deleteById(data.id);
    }

    async createSchedule(data: v.InferOutput<typeof SScheduleCreate>, actorId: Anaid<"usr_">): Promise<Schedule> {
        await this.organizationService.check(data.organizationId, actorId, "write");
        return this.scheduleRepository.create({
            ...data,
            id: generateId("sdl_"),
        });
    }
}