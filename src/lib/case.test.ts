import { snakeToCamelCaseObject } from "$lib/case.ts";
import { describe, expect, it } from "vitest";

describe("Case", () => {
    it("should ok", () => {
        const obj = {
            foo: 1,
            foo_bar: 2,
            foo_bar_baz: 3,
        }

        const result = snakeToCamelCaseObject(obj);
        expect(result).toEqual({
            foo: 1,
            fooBar: 2,
            fooBarBaz: 3,
        })
    })
})