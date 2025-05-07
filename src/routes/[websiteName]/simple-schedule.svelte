<script lang="ts">
    import type { Schedule } from "../../server/services/schedule/schedule.types.ts";

    interface Props {
        schedules: Schedule[];
    }

    let { schedules }: Props = $props();
</script>

<div class="flex flex-col gap-2">
    {#each schedules as schedule}
        <div class="odd:bg-blue-50 flex gap-2 px-4 py-2 rounded-md">
            <span class="font-mono">{schedule.start} - {schedule.end}</span>
            <span class="font-semibold">{schedule.subject}</span>
        </div>
    {/each}
</div>
