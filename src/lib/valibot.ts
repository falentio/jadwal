import type { IdPrefix } from '$lib/id.ts';
import {
    parse,
    string,
    pipe,
    startsWith,
    minLength,
    maxLength,
    toLowerCase,
    regex,
    transform,
    type BaseSchema,
    type BaseIssue,
    safeParse,
} from 'valibot';
export * from "valibot"

import type { Time } from '$lib/types.ts';

export function id<Prefix extends IdPrefix>(prefix: Prefix) {
    return pipe(
        string(),
        startsWith(prefix),
        minLength(16),
        maxLength(32),
        toLowerCase(),
        regex(/^[a-z0-9_]+$/),
        transform((value) => value as `${Prefix}${string}`),
    )
}

export type IdSchema<T extends IdPrefix> = ReturnType<typeof id<T>>

/**
 * validates string to matches "HH:mm" format
 */
export function time() {
    return pipe(
        string(),
        regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/, "format waktu salah"),
        transform((value) => value as Time),
    )

}

export type TimeSchema = ReturnType<typeof time>

export function password() {
    return pipe(
        string(),
        minLength(8),
        maxLength(64),
        regex(/[0-9]/, "password must contain at least one number"),
        regex(/[a-z]/, "password must contain at least one lowercase letter"),
        regex(/[A-Z]/, "password must contain at least one uppercase letter"),
    )
}

export function parseState<T extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(
    schema: T,
    state: unknown,
) {

    const result = safeParse(
        schema,
        state,
    )
    if (result.success) {
        return []
    }
    return result.issues
}

export function getIssueByName<T extends BaseIssue<unknown>>(
    issues: () => T[],
    name: string,
): T[] | undefined {
    const issue = issues().filter(i => i.path?.[0].key === name && i.type !== "strict_object")
    if (issue.length > 0) {
        return issue
    }
}

export function getCheckIssue<T extends BaseIssue<unknown>>(
    issues: () => T[],
): T[] | undefined {
    const issue = issues().filter(i => i.type === "check")
    if (issue.length > 0) {
        return issue
    }
}