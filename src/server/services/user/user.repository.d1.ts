import type { SnakeCase } from "type-fest";
import type { UserRepository } from "./user.repository.ts";
import type { User } from "./user.types.ts";
import { snakeToCamelCaseObject } from "$lib/case.ts";

export class UserRepositoryD1 implements UserRepository {
    constructor(private readonly d1: D1Database) { }

    async getById(id: string): Promise<User | null> {
        const result = await this.d1.prepare("SELECT * FROM users WHERE id = ?")
            .bind(id)
            .first<SnakeCase<User>>();
        if (!result) return null;
        return snakeToCamelCaseObject(result);
    }

    async getByEmail(email: string): Promise<User | null> {
        const result = await this.d1.prepare("SELECT * FROM users WHERE email = ?")
            .bind(email)
            .first<SnakeCase<User>>();
        if (!result) return null;
        return snakeToCamelCaseObject(result);
    }

    async create(user: Omit<User, "createdAt">): Promise<User> {
        const result = await this.d1
            .prepare("INSERT INTO users (id, auth_id, first_name, last_name, email) VALUES (?, ?, ?, ?, ?) RETURNING *")
            .bind(user.id, user.authId, user.firstName, user.lastName, user.email)
            .first<SnakeCase<User>>();
        if (!result) {
            throw new Error("Failed to create user");
        }
        return snakeToCamelCaseObject(result);
    }
}