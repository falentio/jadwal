<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { Organization } from "../../server/services/organization/organization.types";

    import Plus from "~icons/mdi/plus";
    import School from "~icons/mdi/school-outline";
    import type { PageProps } from "./$types";
    const props: PageProps = $props();

    const organizations: Organization[] = $derived(props.data.organizations);

    let org;
</script>

<section class="flex justify-between max-sm:flex-col mx-6 gap-4 py-6 border-b">
    <div class="space-y-2">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-bold">Organisasiku</h1>
        <p class="text-sm">Kelola jadwal organisasi/kelas mu</p>
    </div>
    <div class="flex max-sm:flex-col sm:items-center">
        <Button href="/dashboard/create" class="flex items-center gap-2">
            <Plus class="w-6 h-6"></Plus>
            Buat organisasi baru
        </Button>
    </div>
</section>

<div class="px-6 py-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each organizations as o (o.id)}
            <section
                class="bg-white border rounded-lg p-6 shadow-md flex flex-col gap-2"
            >
                <div class="flex flex-wrap items-center gap-2">
                    <div class="p-2 bg-blue-100 text-blue-600 w-min rounded-md">
                        <School class="w-6 h-6"></School>
                    </div>
                    <div class="flex flex-col gap-0">
                        <h2
                            class="flex-auto text-lg sm:text-xl md:text-2xl font-bold"
                        >
                            {o.websiteName}
                        </h2>
                        <span class="-mt-2 text-sm text-gray-600">{o.name}</span
                        >
                    </div>
                </div>
                <p class="text-sm text-gray-600">{o.description}</p>
                <div class="flex justify-between">
                    <span></span>
                    <Button href="/dashboard/{o.id}">Edit Jadwal</Button>
                </div>
            </section>
        {/each}
    </div>
</div>
