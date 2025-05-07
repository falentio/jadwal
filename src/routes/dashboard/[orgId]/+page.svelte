<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import Input from "$lib/components/Input.svelte";
    import Select from "$lib/components/Select/Select.svelte";
    import Table from "$lib/components/Table/Table.svelte";
    import type { Schedule } from "../../../server/services/schedule/schedule.types.ts";
    import type { PageProps } from "./$types";
    import School from "~icons/mdi/school-outline";
    import Website from "~icons/mdi/web";
    import * as v from "$lib/valibot.ts";
    import { SScheduleCreate } from "../../../server/services/schedule/schedule.schema.ts";
    import { enhance } from "$app/forms";
    import { parseAsUtc } from "$lib/date.ts";
    let { data }: PageProps = $props();
    let daySelected = $state(0);

    let schedules: Schedule[] = $derived(data.schedules);

    let currentDaySchedules = $derived(
        schedules.filter((s) => s.day === daySelected),
    );

    let scheduleToCreate: Partial<v.InferOutput<typeof SScheduleCreate>> =
        $state({
            organizationId: data.organization.id,
        });
    let issues = $derived(v.parseState(SScheduleCreate, scheduleToCreate));
    $effect(() => {
        scheduleToCreate.day = daySelected;
    });

    let outF = $state<HTMLInputElement>();
</script>

<div class="px-6 py-3 flex gap-4 font-medium">
    <a href="/dashboard"> Organisasi </a>
    <span> /</span>
    <span> {data.organization.name}</span>
</div>

<div class="px-6 py-3 w-full">
    <div
        class="w-full bg-white shadow-md p-6 flex max-sm:flex-col rounded-lg gap-4"
    >
        <div class="flex items-center">
            <span class="bg-blue-100 text-blue-600 p-4 rounded-md">
                <School class="w-8 h-8"></School>
            </span>
        </div>
        <section class="flex flex-col">
            <h1 class="text-xl sm:text-2xl md:text-3xl font-bold capitalize">
                {data.organization.websiteName}
            </h1>
            <div>
                <span
                    class="rounded-full text-sm bg-blue-100 text-blue-700 font-medium border px-2"
                >
                    {parseAsUtc(
                        data.organization.createdAt.toString(),
                    ).toLocaleString("id-ID")}
                </span>
                <span class="text-sm text-gray-600">
                    {data.organization.name}</span
                >
            </div>
            <span>{data.organization.description}</span>
        </section>
        <span class="flex-auto max-sm:hidden"></span>
        <div class="max-sm:w-full flex-col flex">
            <Button class="flex gap-2" href="/{data.organization.websiteName}">
                <Website class="w-4 h-4"></Website>
                Website
            </Button>
        </div>
    </div>
</div>

<div class="px-6 py-3 w-full">
    <section class="bg-white shadow-md p-6 rounded-lg flex flex-col gap-4">
        <div class="">
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold">Jadwal</h2>
            <span class=" text-sm text-gray-600">
                Seluruh jadwal organisasi mu
            </span>
        </div>

        <Select
            name="day"
            title="Hari"
            values={[
                "minggu",
                "senin",
                "selasa",
                "rabu",
                "kamis",
                "jumat",
                "sabtu",
            ]}
            bind:selected={daySelected}
        ></Select>

        <div
            class="[&_:is(tr,_thead)>*:is(:nth-child(1),:nth-child(2))]:font-mono"
        >
            <Table
                pick={["start", "end", "subject", "teacherName", "description"]}
                items={currentDaySchedules}
                headers={{
                    subject: "Mata Pelajaran",
                    description: "Deskripsi",
                    start: "Mulai",
                    end: "Selesai",
                    teacherName: "Pengajar",
                    createdAt: "Dibuat pada",
                    day: "Hari",
                    id: "ID",
                    organizationId: "ID Organisasi",
                }}
            >
                {#snippet actions(item)}
                    <label for="out-{item.id}">
                        <Button class="pointer-events-none" color="danger"
                            >Hapus</Button
                        >
                    </label>
                    <div
                        class="absolute inset-0 pointer-events-none *:pointer-events-auto flex items-center justify-center p-6"
                    >
                        <input
                            type="checkbox"
                            id="out-{item.id}"
                            checked
                            class="hidden peer"
                        />
                        <label
                            class="absolute inset-0 bg-blue-50/50 peer-checked:hidden"
                            for="out-{item.id}"
                        ></label>
                        <div
                            class="p-6 bg-white rounded-lg shadow-md flex flex-col gap-4 z-10 peer-checked:hidden"
                        >
                            <span>
                                Apakah anda yakin menghapus Jadwal {item.subject}</span
                            >
                            <div class="flex justify-end">
                                <label for="out-{item.id}">
                                    <Button
                                        class="pointer-events-none"
                                        color="transparent">Tidak</Button
                                    >
                                </label>
                                <form
                                    class=""
                                    use:enhance
                                    method="POST"
                                    action="?/delete"
                                >
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={item.id}
                                    />
                                    <input
                                        type="hidden"
                                        name="organizationId"
                                        value={item.organizationId}
                                    />
                                    <Button
                                        onclick={() => {
                                            schedules = schedules.filter(
                                                (s) => s.id !== item.id,
                                            );
                                        }}
                                        color="danger"
                                        type="submit">Hapus</Button
                                    >
                                </form>
                            </div>
                        </div>
                    </div>
                {/snippet}
            </Table>
        </div>
        <label for="out-f" class="flex flex-col">
            <Button class="pointer-events-none">Tambah</Button>
        </label>
    </section>
</div>

<div
    class="fixed pointer-events-none inset-0 min-h-[32rem] flex-col justify-center items-center [&:has(input:checked)]:flex hidden p-6"
>
    <input
        onchange={(e) =>
            document.body.classList.toggle(
                "overflow-hidden",
                e.currentTarget.checked,
            )}
        type="checkbox"
        id="out-f"
        class="hidden"
        bind:this={outF}
    />
    <label
        class="absolute bg-blue-50/50 inset-0 pointer-events-auto"
        for="out-f"
    ></label>
    <form
        onreset={() => {
            if (outF) {
                outF.checked = false;
            }
        }}
        use:enhance
        action="?/create"
        method="POST"
        class="bg-white flex flex-col z-10 p-6 border rounded-lg gap-4 shadow-md pointer-events-auto w-full max-w-xl"
    >
        <h2 class="font-bold text-lg sm:text-xl md:text-2xl">
            Tambahkan Jadwal
        </h2>

        <input
            type="hidden"
            name="organizationId"
            onreset={(e) =>
                (e.currentTarget.value = scheduleToCreate.organizationId || "")}
            value={scheduleToCreate.organizationId}
        />
        <input
            type="number"
            class="hidden"
            name="day"
            value={scheduleToCreate.day}
            onreset={(e) =>
                (e.currentTarget.value = (
                    scheduleToCreate.day || 0
                ).toString())}
        />
        <label class="flex flex-col">
            <span> Mata Pelajaran </span>
            <Input
                name="subject"
                placeholder="Matematika"
                bind:value={scheduleToCreate.subject}
            />
            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white": !v.getIssueByName(() => issues, "subject"),
                }}
            >
                {v.getIssueByName(() => issues, "subject")?.[0].message}
            </span>
        </label>
        <label class="flex flex-col">
            <span> Pengjar </span>
            <Input
                name="teacherName"
                placeholder="Bapak "
                bind:value={scheduleToCreate.teacherName}
            />
            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white": !v.getIssueByName(
                        () => issues,
                        "teacherName",
                    ),
                }}
            >
                {v.getIssueByName(() => issues, "teacherName")?.[0].message}
            </span>
        </label>
        <label class="flex flex-col">
            <span> deskripsi </span>
            <textarea
                name="description"
                class="border px-4 py-2 rounded-md focus:ring-2 ring-blue-600 outline-none h-32"
                bind:value={scheduleToCreate.description}
            ></textarea>
            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white": !v.getIssueByName(
                        () => issues,
                        "description",
                    ),
                }}
            >
                {v.getIssueByName(() => issues, "description")?.[0].message}
            </span>
        </label>
        <label class="flex flex-col">
            <span> Mulai </span>
            <Input
                name="start"
                placeholder="07:00"
                bind:value={scheduleToCreate.start}
            />
            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white": !v.getIssueByName(() => issues, "start"),
                }}
            >
                {v.getIssueByName(() => issues, "start")?.[0].message}
            </span>
        </label>
        <label class="flex flex-col">
            <span> Selesai </span>
            <Input
                name="end"
                placeholder="08:00"
                bind:value={scheduleToCreate.end}
            />
            <span
                class={{
                    "text-red-500 text-sm h-[1ch]": true,
                    "text-white": !v.getIssueByName(() => issues, "end"),
                }}
            >
                {v.getIssueByName(() => issues, "end")?.[0].message}
            </span>
        </label>

        {#if v.getCheckIssue(() => issues)}
            <span class="text-red-500 text-sm h-[1ch]">
                {v.getCheckIssue(() => issues)?.[0].message}
            </span>
        {/if}

        <Button type="submit" disabled={issues.length !== 0}>Buat</Button>
    </form>
</div>
