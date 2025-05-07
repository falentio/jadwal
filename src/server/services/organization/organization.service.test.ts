import { beforeEach, describe, expect, it } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended"
import type { OrganizationRepository } from "./organization.repository.ts";
import { OrganizationService } from "./organization.service.ts";

describe("OrganizationService", () => {
    const repo = mockDeep<OrganizationRepository>();
    const service = new OrganizationService(repo);

    beforeEach(() => {
        mockReset(repo)
    })

    describe("create", () => {
        it("should create an organization and add the actor as a member", async () => {
            repo.create.mockResolvedValueOnce({
                id: "org_123",
                name: "Test Org",
                description: "A test organization",
                createdAt: new Date(),
                creatorId: "usr_123",
            })
            repo.member.create.mockResolvedValueOnce({
                id: "orgm_123",
                organizationId: "org_123",
                userId: "usr_123",
                role: "admin",
                createdAt: new Date(),
            })
            const result = service.create({
                name: "Test Org",
                description: "A test organization",
            }, "usr_123");

            await expect(result).resolves.toEqual(expect.objectContaining({
                id: "org_123",
                name: "Test Org",
                description: "A test organization",
                createdAt: expect.any(Date),
                creatorId: "usr_123",
            }))
            expect(repo.create).toHaveBeenCalledWith({
                id: expect.any(String),
                name: "Test Org",
                description: "A test organization",
                creatorId: "usr_123",
            });
            expect(repo.member.create).toHaveBeenCalledWith({
                id: expect.any(String),
                organizationId: "org_123",
                userId: "usr_123",
                role: "admin",
            });
        })
    })
})