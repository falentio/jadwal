import type { WorkOS } from "@workos-inc/node";
import { OrganizationRepositoryD1 } from "../services/organization/organization.repository.d1.ts";
import { OrganizationService } from "../services/organization/organization.service.ts";
import { ScheduleRepositoryD1 } from "../services/schedule/schedule.repository.d1.ts";
import { ScheduleService } from "../services/schedule/schedule.service.ts";
import { UserRepositoryD1 } from "../services/user/user.repository.d1.ts"
import { UserService } from "../services/user/user.service.ts";


export type CreateApplicationOptions = {
    db: D1Database;
    workos: WorkOS;
    sessionSecret: string;
}

export function createApplication({
    db,
    workos,
    sessionSecret,
}: CreateApplicationOptions) {
    const userRepository = new UserRepositoryD1(db)
    const userService = new UserService(userRepository, workos, sessionSecret)

    const organizationRepository = new OrganizationRepositoryD1(db)
    const organizationService = new OrganizationService(organizationRepository)

    const scheduleRepository = new ScheduleRepositoryD1(db)
    const scheduleService = new ScheduleService(scheduleRepository, organizationService)

    return {
        user: userService,
        organization: organizationService,
        schedule: scheduleService,
    }
}

export type Application = ReturnType<typeof createApplication>