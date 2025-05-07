import { describe, it, expect } from "vitest";
import type { UserRepository } from "./user.repository.ts";
import { UserRepositoryD1 } from "./user.repository.d1.ts";
import { proxy } from "$lib/testing.ts";
import type { User } from "./user.types.ts";
import { generateId } from "$lib/id.ts";

function testUserRepository(name: string, repo: UserRepository) {
    describe(name, () => {
        describe("create", () => {
            it("should create a user", async () => {
                const user: Omit<User, "createdAt"> = {
                    id: generateId("usr_"),
                    email: crypto.randomUUID() + "@example.com",
                    firstName: "Test",
                    lastName: "User",
                    authId: crypto.randomUUID()
                };
                const result = await repo.create(user);
                expect(result).toEqual(expect.objectContaining(user));
            });

            it("should create a partial user", async () => {
                const user: Omit<User, "createdAt"> = {
                    id: generateId("usr_"),
                    email: crypto.randomUUID() + "@example.com",
                    firstName: null,
                    lastName: null,
                    authId: crypto.randomUUID(),
                };
                const result = await repo.create(user);
                expect(result).toEqual(expect.objectContaining(user));
            });
        });

        describe("getById", () => {
            it("should find a user by id", async () => {
                const user: Omit<User, "createdAt"> = {
                    id: generateId("usr_"),
                    email: crypto.randomUUID() + "@example.com",
                    firstName: "Test",
                    lastName: "User",
                    authId: crypto.randomUUID()
                };
                await repo.create(user);
                const result = await repo.getById(user.id);
                expect(result).toEqual(expect.objectContaining(user));
            });

            it("should return null if user not found", async () => {
                const result = await repo.getById("non_existent_user_id");
                expect(result).toBeNull();
            });
        });
    })
}

describe("UserRepository", () => {
    const d1 = new UserRepositoryD1(proxy.env.DB)
    testUserRepository("D1", d1);
})