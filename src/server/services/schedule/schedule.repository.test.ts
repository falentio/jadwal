import { describe, it, expect } from "vitest";
import type { ScheduleRepository } from "./schedule.repository.ts";
import { generateId, type Anaid } from "$lib/id.ts";
import { UserRepositoryD1 } from "../user/user.repository.d1.ts";
import { OrganizationRepositoryD1 } from "../organization/organization.repository.d1.ts";
import { proxy } from "$lib/testing.ts";
import { ScheduleRepositoryD1 } from "./schedule.repository.d1.ts";
import type { Schedule } from "./schedule.types.ts";

function testScheduleRepository(repo: ScheduleRepository, orgId: Anaid<"org_">, userId: Anaid<"usr_">) {
    describe("create", () => {
        it("should create a schedule", async () => {
            const schedule = {
                id: generateId("sdl_"),
                organizationId: orgId,
                start: "10:00",
                end: "11:00",
                day: 1,
                description: "Math Class",
                subject: "Math",
                teacherName: "John Doe",
            } as Omit<Schedule, "createdAt">;
            const result = repo.create(schedule);
            await expect(result).resolves.toEqual(expect.objectContaining(schedule));
        });
    })

    describe("findByOrganizationId", () => {
        it("should find schedules by organization id", async () => {
            const schedule = {
                id: generateId("sdl_"),
                organizationId: orgId,
                start: "10:00",
                end: "11:00",
                day: 1,
                description: "Math Class",
                subject: "Math",
                teacherName: "John Doe",
            } as Omit<Schedule, "createdAt">;
            await repo.create(schedule);
            const result = await repo.findByOrganizationId(orgId);
            expect(result).toEqual(expect.arrayContaining([expect.objectContaining(schedule)]));
        });
    });

    describe("getById", () => {
        it("should find schedules by organization id", async () => {
            const schedule = {
                id: generateId("sdl_"),
                organizationId: orgId,
                start: "10:00",
                end: "11:00",
                day: 1,
                description: "Math Class",
                subject: "Math",
                teacherName: "John Doe",
            } as Omit<Schedule, "createdAt">;
            await repo.create(schedule);
            const result = await repo.getById(schedule.id);
            expect(result).toEqual(expect.objectContaining(schedule));
        });
    });

    describe("deleteById", () => {
        it("should delete a schedule by id", async () => {
            const schedule = {
                id: generateId("sdl_"),
                organizationId: orgId,
                start: "10:00",
                end: "11:00",
                day: 1,
                description: "Math Class",
                subject: "Math",
                teacherName: "John Doe",
            } as Omit<Schedule, "createdAt">;
            await repo.create(schedule);
            await repo.deleteById(schedule.id);
            const result = await repo.findByOrganizationId(orgId);
            expect(result).not.toEqual(expect.arrayContaining([expect.objectContaining(schedule)]));
        });
    })
}

describe("ScheduleRepository", () => {
    describe("D1", async () => {
        const user = await new UserRepositoryD1(proxy.env.DB).create({
            id: generateId("usr_"),
            email: crypto.randomUUID() + "@example.com",
            firstName: "Test",
            lastName: "User",
            authId: crypto.randomUUID()
        });
        const org = await new OrganizationRepositoryD1(proxy.env.DB).create({
            id: generateId("org_"),
            name: "Test Org",
            description: "A test organization",
            creatorId: user.id,
            websiteName: crypto.randomUUID(),
        });
        const repo = new ScheduleRepositoryD1(proxy.env.DB);
        testScheduleRepository(repo, org.id, user.id);
    });
});