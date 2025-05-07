import { vi, describe, it, expect } from 'vitest';
import type { User } from '../user/user.types.ts';
import type { OrganizationMemberRepository, OrganizationRepository } from './organization.repository';
import { OrganizationRepositoryD1 } from './organization.repository.d1';
import { generateId } from '$lib/id.ts';
import { proxy } from '$lib/testing.ts';
import type { OrganizationMember, OrganizationUpdatable } from './organization.types.ts';
import { UserRepositoryD1 } from '../user/user.repository.d1.ts';

function testOrganizationRepository(repo: OrganizationRepository, user: User) {
    describe("memberRepository", () => {
        describe("create", () => {
            it("should create an organization member", async () => {
                const org = await repo.create({
                    creatorId: user.id,
                    id: generateId("org_"),
                    name: "Test Org",
                    description: "A test organization",
                    websiteName: crypto.randomUUID(),
                });
                const member: Omit<OrganizationMember, "createdAt"> = {
                    id: generateId("orgm_"),
                    organizationId: org.id,
                    userId: user.id,
                    role: "admin",
                }
                const result = await repo.member.create(member);
                expect(result).toEqual(expect.objectContaining(member));
            });
        });

        describe("findByOrganizationId", () => {
            it("should find organization members by organization id", async () => {
                const org = await repo.create({
                    creatorId: user.id,
                    id: generateId("org_"),
                    name: "Test Org",
                    description: "A test organization",
                    websiteName: crypto.randomUUID(),
                });
                const member: Omit<OrganizationMember, "createdAt"> = {
                    id: generateId("orgm_"),
                    organizationId: org.id,
                    userId: user.id,
                    role: "admin",
                } as const
                await repo.member.create(member);
                const result = await repo.member.findByOrganizationId(member.organizationId);
                expect(result).toEqual(expect.arrayContaining([expect.objectContaining(member)]));
            });
        });

        describe("findByUserIdAndOrganizationId", () => {
            it("should find organization member by user id and organization id", async () => {
                const org = await repo.create({
                    creatorId: user.id,
                    id: generateId("org_"),
                    name: "Test Org",
                    description: "A test organization",
                    websiteName: crypto.randomUUID(),
                });
                const member: Omit<OrganizationMember, "createdAt"> = {
                    id: generateId("orgm_"),
                    organizationId: org.id,
                    userId: user.id,
                    role: "admin",
                } as const
                await repo.member.create(member);
                const result = await repo.member.findByUserIdAndOrganizationId(member.userId, member.organizationId);
                expect(result).toEqual(expect.objectContaining(member));
            });
        });
    })

    describe("create", () => {
        it("should create an organization", async () => {
            const org = {
                creatorId: user.id,
                id: generateId("org_"),
                name: "Test Org",
                description: "A test organization",
                websiteName: crypto.randomUUID(),
            };
            const result = await repo.create(org);
            expect(result).toEqual(expect.objectContaining(org));
        });
    })

    describe("findById", () => {
        it("should find an organization by id", async () => {
            const org = {
                creatorId: user.id,
                id: generateId("org_"),
                name: "Test Org",
                description: "A test organization",
                websiteName: crypto.randomUUID(),
            };
            await repo.create(org);
            const result = await repo.findById(org.id);
            expect(result).toEqual(expect.objectContaining(org));
        });

        it("should return null if organization not found", async () => {
            const result = await repo.findById(generateId("org_"));
            expect(result).toBeNull();
        });
    });

    describe("findByWebsiteName", () => {
        it("should find an organization by website name", async () => {
            const org = {
                creatorId: user.id,
                id: generateId("org_"),
                name: "Test Org",
                description: "A test organization",
                websiteName: crypto.randomUUID(),
            };
            await repo.create(org);
            const result = await repo.findByWebsiteName(org.websiteName);
            expect(result).toEqual(expect.objectContaining(org));
        });
    })

    describe("findByMemberId", () => {
        it("should find organizations by member id", async () => {
            const org = {
                creatorId: user.id,
                id: generateId("org_"),
                name: "Test Org",
                description: "A test organization",
                websiteName: crypto.randomUUID(),
            };
            await repo.create(org);
            const member: Omit<OrganizationMember, "createdAt"> = {
                id: generateId("orgm_"),
                organizationId: org.id,
                userId: user.id,
                role: "admin",
            } as const
            await repo.member.create(member);
            const result = await repo.findByUserId(member.userId);
            expect(result).toEqual(expect.arrayContaining([expect.objectContaining(org)]));
        });
    });

    describe("update", () => {
        it("should update an organization", async () => {
            const org = {
                creatorId: user.id,
                id: generateId("org_"),
                name: "Test Org",
                description: "A test organization",
                websiteName: crypto.randomUUID(),
            };
            await repo.create(org);
            const updatedOrg: OrganizationUpdatable = {
                id: org.id,
                name: "Updated Org",
                description: undefined
            };
            const result = await repo.update(updatedOrg);
            expect(result).toEqual(expect.objectContaining({ ...updatedOrg, description: org.description }));
        });

        it("should return null if organization not found", async () => {
            const result = await repo.update({
                id: generateId("org_"),
                name: "Updated Org",
                description: "An updated organization",
            });
            expect(result).toBeNull();
        });
    });
}

describe("OrganizationRepository", () => {
    describe("D1", async () => {
        const orgRepo = new OrganizationRepositoryD1(
            proxy.env.DB,
        )
        const userRepo = new UserRepositoryD1(
            proxy.env.DB,
        )
        const user = await userRepo.create({
            id: generateId("usr_"),
            email: crypto.randomUUID() + "@example.com",
            firstName: "Test",
            lastName: "User",
            authId: crypto.randomUUID()
        });
        testOrganizationRepository(orgRepo, user);
    })
})
