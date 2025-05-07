import type { Anaid } from "$lib/id.ts";
import type { SnakeCasedProperties } from "type-fest";
import type { ScheduleRepository } from "./schedule.repository.ts";
import type { Schedule } from "./schedule.types.ts";

import { snakeToCamelCaseObject } from "$lib/case.ts";

export class ScheduleRepositoryD1 implements ScheduleRepository {
    constructor(private db: D1Database) { }

    async getById(id: Anaid<"sdl_">): Promise<Schedule | null> {
        const result = await this.db
            .prepare("SELECT * FROM schedules WHERE id = ?")
            .bind(id)
            .first<SnakeCasedProperties<Schedule>>()
        if (!result) {
            return null;
        }
        return snakeToCamelCaseObject(result)
    }

    async findByOrganizationId(organizationId: Anaid<"org_">): Promise<Schedule[]> {
        const result = await this.db
            .prepare("SELECT * FROM schedules WHERE organization_id = ?")
            .bind(organizationId)
            .all<SnakeCasedProperties<Schedule>>()
        if (!result.success) {
            throw new Error("Failed to get schedules");
        }
        return result.results.map((r) => snakeToCamelCaseObject(r));
    }

    async deleteById(id: Anaid<"sdl_">): Promise<void> {
        await this.db
            .prepare("DELETE FROM schedules WHERE id = ?")
            .bind(id)
            .run();
    }

    async create(data: Omit<Schedule, "createdAt">): Promise<Schedule> {
        const {
            day,
            description,
            end,
            id,
            organizationId,
            start,
            subject,
            teacherName,
        } = data
        const result = await this.db
            .prepare(`
                INSERT INTO schedules (id, organization_id, subject, description, day, end, start, teacher_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`)
            .bind(id, organizationId, subject, description, day, end, start, teacherName)
            .first<SnakeCasedProperties<Schedule>>()
        if (!result) {
            throw new Error("Failed to create schedule");
        }
        return snakeToCamelCaseObject(result);
    }
}