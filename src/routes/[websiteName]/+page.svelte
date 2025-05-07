<script lang="ts">
    import { timeDiff, timeGt, timeLt, timeToSecond } from "$lib/time.ts";
    import type { Time } from "$lib/types.ts";
    import type { PageProps } from "./$types";
    import SchoolIcon from "~icons/mdi/school-outline";
    import CalendarIcon from "~icons/mdi/calendar";
    import SelectDay from "./select-day.svelte";
    import DetailedSchedule from "./detailed-schedule.svelte";
    import SimpleSchedule from "./simple-schedule.svelte";

    let props: PageProps = $props();
    let selected = $state(new Date().getDay());
    let viewMode = $state<"detail" | "simple">("detail");

    let currentDaySchedules = $derived.by(() => {
        return props.data.schedules
            .filter((schedule) => {
                return schedule.day === selected;
            })
            .sort((a, b) => {
                const aStart = timeToSecond(a.start);
                const bStart = timeToSecond(b.start);
                // First sort by start time
                if (aStart !== bStart) {
                    return aStart - bStart;
                }
                // If start times are equal, sort by end time
                return timeToSecond(a.end) - timeToSecond(b.end);
            });
    });

    let emptyHours = $derived.by(() => {
        const emptyHours: Time[] = [];
        for (let i = 0; i < 24; i++) {
            const time = `${i}:00`.padStart(5, "0") as Time;
            const hasSchedule = currentDaySchedules.some((schedule) => {
                return (
                    !timeGt(schedule.start, time) && timeGt(schedule.end, time)
                );
            });
            if (!hasSchedule) {
                emptyHours.push(time);
            }
        }
        return emptyHours;
    });
</script>

<div
    class="flex flex-col gap-6 bg-gradient-to-br from-blue-50 to-indigo-50 *:max-w-4xl items-center *:w-full min-h-svh py-8"
>
    <div class="px-6">
        <section
            class="border border-blue-100 shadow-lg rounded-xl bg-white p-8 flex-col flex transition-all duration-300 hover:shadow-xl"
        >
            <div class="flex max-sm:flex-col max-sm:items-center gap-5">
                <div
                    class="bg-blue-100 text-blue-600 rounded-lg p-3 transition-all duration-300 hover:bg-blue-200 hover:text-blue-700"
                >
                    <SchoolIcon class="h-12 w-12" />
                </div>
                <div>
                    <h1
                        class="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900"
                    >
                        {props.data.organization.name}
                    </h1>
                    <span class="text-blue-600 font-medium"
                        >{props.data.organization.websiteName}</span
                    >
                </div>
            </div>
            <div class="mt-4 text-gray-700">
                <p>{props.data.organization.description}</p>
            </div>
        </section>
    </div>

    <div class="sm:px-6 flex-auto flex flex-col w-full">
        <div
            class="sm:rounded-xl shadow-lg bg-white flex-auto flex flex-col overflow-hidden border border-blue-100 transition-all duration-300"
        >
            <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex flex-col gap-4"
            >
                <div class="flex items-center gap-2 text-blue-800 mb-2">
                    <CalendarIcon class="h-5 w-5" />
                    <h2 class="font-semibold text-lg">Pilih Hari</h2>
                </div>
                <SelectDay bind:selected />
            </div>

            <div class="flex justify-center py-4 border-b border-blue-100">
                <div class="flex bg-blue-50 mx-auto p-1.5 rounded-lg shadow-sm">
                    <button
                        class="px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm {viewMode ===
                        'detail'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-blue-700 hover:bg-blue-100'}"
                        onclick={() => (viewMode = "detail")}
                    >
                        Detail
                    </button>
                    <button
                        class="px-6 py-2 rounded-md font-medium transition-all duration-200 text-sm {viewMode ===
                        'simple'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-blue-700 hover:bg-blue-100'}"
                        onclick={() => (viewMode = "simple")}
                    >
                        Simple
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto overflow-y-hidden m-4">
                {#if currentDaySchedules.length === 0}
                    <div class="py-16 text-center">
                        <div
                            class="inline-flex justify-center items-center p-4 bg-blue-50 rounded-full mb-4"
                        >
                            <CalendarIcon class="h-8 w-8 text-blue-500" />
                        </div>
                        <h2 class="text-xl font-bold text-gray-700">
                            Tidak ada jadwal untuk hari ini
                        </h2>
                        <p class="text-gray-500 mt-2">
                            Silakan pilih hari lain
                        </p>
                    </div>
                {:else if viewMode === "detail"}
                    <DetailedSchedule
                        schedules={currentDaySchedules}
                        {emptyHours}
                    />
                {:else if viewMode === "simple"}
                    <SimpleSchedule schedules={currentDaySchedules} />
                {/if}
            </div>
        </div>
    </div>
</div>
