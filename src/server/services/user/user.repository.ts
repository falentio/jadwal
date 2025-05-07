import type { User } from "./user.types.ts";

export type UserRepository = {
    getById: (id: string) => Promise<User | null>;
    getByEmail: (email: string) => Promise<User | null>;
    create: (user: Omit<User, "createdAt">) => Promise<User>;
}