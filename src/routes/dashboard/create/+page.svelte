<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import * as v from "$lib/valibot.ts";
    import { SOrganizationCreate } from "../../../server/services/organization/organization.schema.ts";
    import { enhance } from "$app/forms";
    import Input from "$lib/components/Input.svelte";
    import { resource } from "runed";

    let org = $state<v.InferInput<typeof SOrganizationCreate>>({
        description: "",
        name: "",
        websiteName: "",
    });
    let err = $derived(v.parseState(SOrganizationCreate, org));
    let fresh = $derived(Object.values(org).every((v) => !v));
    let websiteNameAvailable = resource(
        () => org.websiteName,
        async (name) => {
            if (v.getIssueByName(() => err, "websiteName")) {
                return false;
            }
            const res = await fetch(
                "/api/organization/findByWebsiteName/" + name,
            );
            if (res.status === 200) {
                return false;
            }
            if (res.status === 404) {
                return true;
            }
            throw new Error("Error checking website name availability");
        },
        {
            lazy: true,
            debounce: 300,
        },
    );

    $effect(() => console.log(websiteNameAvailable.current));
</script>

<div class="px-6 py-3">
    <Button color="transparent">Kembali</Button>
</div>
<div class="flex justify-center items-center w-full flex-auto">
    <form
        method="POST"
        use:enhance
        class="p-6 bg-white shadow-md rounded-lg max-w-md gap-4 flex flex-col"
    >
        <h1 class="font-bold text-xl sm:text-2xl md:text-3xl">
            Buat organisasi baru
        </h1>
        <label class="flex flex-col">
            <span class="font-medium">Nama</span>
            <Input
                placeholder="Nama organisasi"
                name="name"
                bind:value={org.name}
            />
            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white": !v.getIssueByName(() => err, "name") || fresh,
                }}
            >
                {v.getIssueByName(() => err, "name")?.[0].message}
            </span>
        </label>
        <label class="flex flex-col">
            <span class="font-medium">Nama Website</span>
            <Input
                placeholder="sekolahku"
                name="websiteName"
                bind:value={org.websiteName}
            />
            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white":
                        (!v.getIssueByName(() => err, "websiteName") &&
                            websiteNameAvailable.current) ||
                        fresh,
                }}
            >
                {v.getIssueByName(() => err, "websiteName")?.[0]?.message ||
                    "Nama website tidak tersedia"}
            </span>
        </label>
        <label class="flex flex-col">
            <span class="font-medium">Deskripsi</span>
            <Input
                placeholder="Deskripsi organisasi"
                name="description"
                bind:value={org.description}
            />

            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white":
                        !v.getIssueByName(() => err, "description") || fresh,
                }}
            >
                {v.getIssueByName(() => err, "description")?.[0].message}
            </span>
        </label>
        <div class="flex justify-end">
            <Button
                type="submit"
                disabled={err.length !== 0 ||
                    websiteNameAvailable.loading === true ||
                    websiteNameAvailable.error !== undefined ||
                    websiteNameAvailable.current !== true}>Buat</Button
            >
        </div>
    </form>
</div>
