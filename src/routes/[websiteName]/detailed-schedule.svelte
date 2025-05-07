<script lang="ts">
    import { timeDiff, timeToSecond } from "$lib/time.ts";
    import type { Time } from "$lib/types.ts";
    import type { Schedule } from "../../server/services/schedule/schedule.types.ts";
    import ClockIcon from "~icons/mdi/clock-time-eleven-outline";
    import AccountTieIcon from "~icons/mdi/account-tie-woman";

    interface Props {
        schedules: Schedule[];
        emptyHours: Time[];
    }

    let { emptyHours, schedules }: Props = $props();

    // Helper function to determine if this is the first visible hour
    function isFirstVisibleHour(hour: number, emptyHours: Time[]): boolean {
        for (let i = 0; i < hour; i++) {
            const time = `${i}:00`.padStart(5, "0") as Time;
            if (!emptyHours.includes(time)) {
                return false;
            }
        }
        return true;
    }

    // Helper function to determine if this is the last visible hour
    function isLastVisibleHour(hour: number, emptyHours: Time[]): boolean {
        for (let i = hour + 1; i < 24; i++) {
            const time = `${i}:00`.padStart(5, "0") as Time;
            if (!emptyHours.includes(time)) {
                return false;
            }
        }
        return true;
    }
</script>

<div class="grid *:border auto-rows-auto auto-cols-[min-content] gap-[2px]">
    {#each Array.from({ length: 24 }) as _, hour}
        {@const time = `${hour}:00`.padStart(5, "0") as Time}
        {@const timePlusOne = `${hour + 1}:00`.padStart(5, "0") as Time}
        {@const isFirst = isFirstVisibleHour(hour, emptyHours)}
        {@const isLast = isLastVisibleHour(hour, emptyHours)}
        <div
            class={{
                "bg-blue-50 border-blue-100 w-32 sm:w-48": true,
                "rounded-t-lg": isFirst && !emptyHours.includes(time as Time),
                "rounded-b-lg": isLast && !emptyHours.includes(time as Time),
                hidden: emptyHours.includes(time as Time),
                "px-4 py-2 min-h-24": !emptyHours.includes(time as Time),
            }}
            style:grid-row-start={hour + 1}
        >
            <div class="text-sm sm:text-base text-blue-800">
                <span class="font-medium">{time} </span>
                <span class="font-medium">-</span>
                <span class="font-medium">{timePlusOne}</span>
            </div>
        </div>
    {/each}
    {#each schedules as schedule, i}
        {@const rowStart = Math.floor(timeToSecond(schedule.start) / 3600 + 1)}
        {@const rowEnd = Math.ceil(timeToSecond(schedule.end) / 3600 + 1)}
        {@const hueRotate = 120 + 47}
        {@const borderColor = `oklch(from var(--color-blue-200) l c calc(h + ${i * hueRotate}))`}
        {@const backgroundColor = `oklch(from var(--color-blue-100) l calc(c + 0.03) calc(h + ${i * hueRotate}))`}
        {@const textColor = `oklch(from var(--color-blue-800) l c calc(h + ${i * hueRotate}))`}

        <div
            class="border shadow-xs rounded-lg m-1 hover:shadow-md w-52"
            style:background-color={backgroundColor}
            style:border-color={borderColor}
            style:color={textColor}
            style:grid-row-start={rowStart}
            style:grid-row-end={rowEnd}
            style:transition-delay="{i * 50}ms"
        >
            <div class="flex flex-col gap-2 p-3">
                <span class="font-semibold text-base">
                    {schedule.subject}
                </span>
                <div class="text-xs sm:text-sm antialiased">
                    <span class="flex gap-1.5 items-center mb-1">
                        <ClockIcon class="h-4 w-4 flex-shrink-0" />
                        <span>{schedule.start} - {schedule.end}</span>
                    </span>
                    <span class="flex gap-1.5 items-center">
                        <AccountTieIcon class="h-4 w-4 flex-shrink-0" />
                        <span>{schedule.teacherName}</span>
                    </span>
                </div>
                <div class="flex max-w-full mt-1">
                    <p
                        class="break-words text-ellipsis overflow-hidden text-sm"
                        style:max-height="{((timeDiff(
                            schedule.start,
                            schedule.end,
                        ) /
                            3600) *
                            6) |
                            0}rem"
                    >
                        {schedule.description}
                    </p>
                </div>
            </div>
        </div>
    {/each}
</div>
