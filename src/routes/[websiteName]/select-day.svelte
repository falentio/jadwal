<script lang="ts">
    export interface Props {
        selected: number;
    }

    let { selected = $bindable() }: Props = $props();

    const days = [
        "minggu",
        "senin",
        "selasa",
        "rabu",
        "kamis",
        "jum`at",
        "sabtu",
    ];
</script>

<div class="flex justify-center text-sm sm:text-base flex-wrap gap-2">
    {#each days as day, index (day)}
        <button
            onclick={() => {
                selected = index;
            }}
            class={{
                "border rounded-md grid px-3 py-1.5 sm:px-4 sm:py-2 *:overflow-hidden gap-0 transition-all duration-300 shadow-sm": true,
                "grid-cols-[auto_1fr] bg-blue-600 text-white border-blue-600 shadow-md transform scale-105":
                    selected === index,
                "grid-cols-[auto_0fr] text-blue-700 bg-white border-blue-100 hover:bg-blue-50 hover:border-blue-200":
                    selected !== index,
            }}
        >
            <div class="flex items-center justify-center">
                <span class="uppercase font-semibold">
                    {day[0]}
                </span>
            </div>
            <div class="overflow-hidden">
                <span class="">{day.slice(1)}</span>
            </div>
        </button>
    {/each}
</div>
