import { describe, expect, it } from "vitest";
import { validateBody } from "./req.ts";
import * as v from "$lib/valibot.ts";

describe("request utils", () => {
    it('should able to parse json', async () => {
        const req = new Request("https://example.com", {
            method: "POST",
            body: JSON.stringify({ name: "test" }),
            headers: { "Content-Type": "application/json" }
        });
        const result = await validateBody(v.object({ name: v.string() }), req);
        expect(result).toEqual({ name: "test" });
    })

    it('should able to parse form', async () => {
        const req = new Request("https://example.com", {
            method: "POST",
            body: new URLSearchParams({ name: "test" }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        const result = await validateBody(v.object({ name: v.string() }), req, "form");
        expect(result).toEqual({ name: "test" });
    })

    it('should throw error for invalid json', async () => {
        const req = new Request("https://example.com", {
            method: "POST",
            body: JSON.stringify({ name: 123 }),
            headers: { "Content-Type": "application/json" }
        });
        await expect(validateBody(v.object({ name: v.string() }), req)).rejects.toThrow();
    })

    it('should throw error for invalid form', async () => {
        const req = new Request("https://example.com", {
            method: "POST",
            body: new URLSearchParams({ name: "123" }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        await expect(validateBody(v.object({ name: v.number() }), req, "form")).rejects.toThrow();
    })
})