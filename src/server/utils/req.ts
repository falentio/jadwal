import * as v from "$lib/valibot.ts";

export async function validateBody<T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(schema: T, body: Request, type: "json" | "form" = "json") {
    if (type === "json") {
        const json = await body.json();
        return v.parse(schema, json);
    }
    if (type === "form") {
        const formData = await body.formData();
        const formObject = Object.fromEntries(formData.entries());
        return v.parse(schema, formObject);
    }
    throw new Error("Unsupported body type");
}