import type { Anaid } from "$lib/id.ts";
import type { Updateable } from "$lib/types.ts";

export type Organization = {
    id: Anaid<"org_">;
    creatorId: Anaid<"usr_">;
    websiteName: string;
    name: string;
    description: string;
    createdAt: string;
}

export type OrganizationUpdatable = Updateable<Organization, "description" | "name">;

export type OrganizationMemberRole = "admin" | "member";

export type OrganizationMember = {
    id: Anaid<"orgm_">;
    organizationId: Anaid<"org_">;
    userId: Anaid<"usr_">;
    role: OrganizationMemberRole
    createdAt: string;
}