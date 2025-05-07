import type { Anaid } from "$lib/id.ts";
import type { Updateable } from "$lib/types.ts";

export type User = {
    id: Anaid<"usr_">;
    firstName: string | null;
    lastName: string | null;
    email: string;
    authId: string;
    createdAt: string;
}

export type UserUpdateable = Updateable<User, "id">;
