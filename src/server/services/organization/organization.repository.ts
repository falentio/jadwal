import type { Anaid } from "$lib/id.ts";
import type { Organization, OrganizationMember, OrganizationUpdatable } from "./organization.types.ts";

export type OrganizationRepository = {
    readonly member: OrganizationMemberRepository;
    create(org: Omit<Organization, "createdAt">): Promise<Organization>;
    findByWebsiteName(websiteName: string): Promise<Organization | null>;
    findById(id: Anaid<"org_">): Promise<Organization | null>;
    findByUserId(userId: Anaid<"usr_">): Promise<Organization[]>;
    update(data: OrganizationUpdatable): Promise<Organization | null>;
}

export type OrganizationMemberRepository = {
    create(data: Omit<OrganizationMember, "createdAt">): Promise<OrganizationMember>;
    findByOrganizationId(organizationId: Anaid<"org_">): Promise<OrganizationMember[]>;
    findByUserIdAndOrganizationId(
        userId: Anaid<"usr_">,
        organizationId: Anaid<"org_">,
    ): Promise<OrganizationMember | null>;
}