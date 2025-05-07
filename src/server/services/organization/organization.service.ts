import type { OrganizationRepository } from "./organization.repository.ts";
import type { Organization, OrganizationMember } from "./organization.types.ts";
import type { SOrganizationCreate, SOrganizationUpdate } from "./organization.schema.ts";

import * as v from "$lib/valibot.ts";
import { generateId, type Anaid } from "$lib/id.ts";

export class OrganizationService {
    /**
     * not really a cache, but a way to avoid multiple calls to the database on single request
     */
    private checkCache: Map<string, string | null> = new Map();
    constructor(
        private readonly organizationRepository: OrganizationRepository,
    ) { }

    async #check(organizationId: Anaid<"org_">, actorId: Anaid<"usr_">, permission: "read" | "write"): Promise<string | null> {
        const m = await this.organizationRepository.member.findByUserIdAndOrganizationId(actorId, organizationId);
        if (!m) {
            return "You are not a member of this organization"
        }
        if (permission === "write" && m.role !== "admin") {
            return "You are not allowed to update this organization"
        }
        return null;
    }

    async findByWebsiteName(name: string) {
        return this.organizationRepository.findByWebsiteName(name)
    }

    async findByUserId(userId: Anaid<"usr_">): Promise<Organization[]> {
        return this.organizationRepository.findByUserId(userId);
    }

    async check(organizationId: Anaid<"org_">, actorId: Anaid<"usr_">, permission: "read" | "write"): Promise<void> {
        // on cloudflare workers, the cache will be cleared after each request(because the cache is in memory)
        // on other runtime, the cache will be cleared after 1 minute
        // TODO: use lru-cache if hosted outside of cloudflare workers
        const cacheKey = `${organizationId}-${actorId}-${permission}-${Date.now() / 60_000 | 0}`;
        const cached = this.checkCache.get(cacheKey);
        if (cached === null) {
            return
        }
        if (typeof cached === "string") {
            throw new Error(cached);
        }
        const result = await this.#check(organizationId, actorId, permission);
        this.checkCache.set(cacheKey, result);
    }

    async create(org: v.InferOutput<typeof SOrganizationCreate>, actorId: Anaid<"usr_">): Promise<Organization> {
        const orgWithId = {
            ...org,
            id: generateId("org_"),
            creatorId: actorId,
        }
        const created = await this.organizationRepository.create(orgWithId);
        await this.organizationRepository.member.create({
            id: generateId("orgm_"),
            organizationId: created.id,
            userId: actorId,
            role: "admin",
        });
        return created;
    }

    findById(id: Anaid<"org_">): Promise<Organization | null> {
        this.organizationRepository.findById(id).then(console.log)
        return this.organizationRepository.findById(id);
    }

    async update(data: v.InferOutput<typeof SOrganizationUpdate>, actorId: Anaid<"usr_">): Promise<Organization | null> {
        await this.check(data.id, actorId, "write");
        return this.organizationRepository.update(data);
    }
}