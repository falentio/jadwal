import { snakeToCamelCaseObject } from "$lib/case.ts";
import type { Anaid } from "$lib/id.ts";
import { assignIfTruish } from "$lib/object.ts";
import type { OrganizationMemberRepository, OrganizationRepository } from "./organization.repository.ts";
import type { Organization, OrganizationMember, OrganizationUpdatable } from "./organization.types.ts";
import type { SnakeCasedProperties } from "type-fest";

export class OrganizationRepositoryD1 implements OrganizationRepository {
    member: OrganizationMemberRepository
    constructor(private db: D1Database) {
        this.member = new OrganizationMemberRepositoryD1(db);
    }

    async create(org: Omit<Organization, "createdAt">): Promise<Organization> {
        const result = await this.db
            .prepare(`INSERT INTO organizations (id, name, description, creator_id, website_name) VALUES (?, ?, ?, ?, ?) RETURNING *`)
            .bind(org.id, org.name, org.description, org.creatorId, org.websiteName)
            .first<SnakeCasedProperties<Organization>>();
        if (!result) {
            throw new Error("Failed to create organization");
        }
        return snakeToCamelCaseObject(result);
    }

    async findByWebsiteName(websiteName: string): Promise<Organization | null> {
        const result = await this.db
            .prepare("SELECT * FROM organizations WHERE website_name = ?")
            .bind(websiteName)
            .first<SnakeCasedProperties<Organization>>()
        if (result) {
            return snakeToCamelCaseObject(result);
        }
        return result
    }
    async findByUserId(userId: Anaid<"usr_">): Promise<Organization[]> {
        const result = await this.db
            .prepare("select o.* from organizations o join organization_members om on o.id = om.organization_id where om.user_id = ?")
            .bind(userId)
            .all<SnakeCasedProperties<Organization>>()
        if (!result.success) {
            return []
        }
        return result.results.map(snakeToCamelCaseObject)
    }

    async findById(id: Anaid<"org_">): Promise<Organization | null> {
        const result = await this.db
            .prepare("SELECT * FROM organizations WHERE id = ?")
            .bind(id)
            .first<SnakeCasedProperties<Organization>>()
        if (result) {
            return snakeToCamelCaseObject(result);
        }
        return result
    }

    async update(data: OrganizationUpdatable): Promise<Organization | null> {
        const org = await this.findById(data.id);
        if (!org) {
            return null;
        }
        assignIfTruish(org, data);
        const result = await this.db
            .prepare(`UPDATE organizations SET name = ?, description = ? WHERE id = ? RETURNING *`)
            .bind(org.name, org.description, org.id)
            .first<SnakeCasedProperties<Organization>>();
        if (!result) {
            return result
        }
        return snakeToCamelCaseObject(result);
    }
}

export class OrganizationMemberRepositoryD1 implements OrganizationMemberRepository {
    constructor(private db: D1Database) { }

    async create(data: Omit<OrganizationMember, "createdAt">): Promise<OrganizationMember> {
        const result = await this.db
            .prepare(`INSERT INTO organization_members (id, organization_id, user_id, role) VALUES (?, ?, ?, ?) RETURNING *`)
            .bind(data.id, data.organizationId, data.userId, data.role)
            .first<SnakeCasedProperties<OrganizationMember>>();
        if (!result) {
            throw new Error("Failed to create organization member");
        }
        return snakeToCamelCaseObject(result);
    }

    async findByOrganizationId(organizationId: Anaid<"org_">): Promise<OrganizationMember[]> {
        const result = await this.db
            .prepare("SELECT * FROM organization_members WHERE organization_id = ?")
            .bind(organizationId)
            .all<SnakeCasedProperties<OrganizationMember>>()
        if (!result.success) {
            throw new Error("Failed to find organization members, " + result.error);
        }
        return result.results.map(snakeToCamelCaseObject);
    }

    async findByUserIdAndOrganizationId(
        userId: Anaid<"usr_">,
        organizationId: Anaid<"org_">,
    ): Promise<OrganizationMember | null> {
        const result = await this.db
            .prepare("SELECT * FROM organization_members WHERE organization_id = ? AND user_id = ?")
            .bind(organizationId, userId)
            .first<SnakeCasedProperties<OrganizationMember>>()
        if (result) {
            return snakeToCamelCaseObject(result);
        }
        return result
    }
}