import { generateId } from "$lib/id.ts";
import type { WorkOS } from "@workos-inc/node";
import type { UserRepository } from "./user.repository.ts";
import type { User } from "./user.types.ts";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly workos: WorkOS,
        private readonly secretKey: string,
    ) { }

    async createUser(user: Omit<User, "createdAt" | "id">) {
        const id = generateId("usr_");
        const [u, _] = await Promise.all([
            this.userRepository.create({ ...user, id }),
            this.workos.userManagement.updateUser({
                userId: user.authId,
                externalId: id,
            })
        ])
        return u
    }

    getById(id: string) {
        return this.userRepository.getById(id);
    }

    getByEmail(id: string) {
        return this.userRepository.getByEmail(id);
    }

    async getBySession(token: string) {
        const result = await this.workos.userManagement.loadSealedSession({
            sessionData: token,
            cookiePassword: this.secretKey,
        }).authenticate()
        if (!result.authenticated) {
            return null
        }
        const user = result.user
        const existingUser = await this.getByEmail(user.email)
        return existingUser
    }

    async exchangeCodeForSession(code: string, userAgent?: string, ipAddress?: string) {
        const { user, sealedSession } = await this.workos.userManagement.authenticateWithCode({
            clientId: this.workos.clientId!,
            code,
            userAgent,
            ipAddress,
            session: {
                sealSession: true,
                cookiePassword: this.secretKey,
            }
        })

        if (!sealedSession) {
            throw new Error("Missing session");
        }

        const existingUser = await this.getByEmail(user.email)
        if (!existingUser) {
            await this.createUser({
                email: user.email,
                authId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            })
        }

        return sealedSession
    }
}