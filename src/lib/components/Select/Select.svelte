<script lang="ts" generics="Value extends unknown">
    import { untrack } from "svelte";
    import IconChevronDown from "~icons/mdi/chevron-down";

    interface Props {
        title: string;
        name: string;
        values: [Value, ...Value[]];
        selected: number;
        class?: string;
    }

    let { selected = $bindable(0), ...props }: Props = $props();
    let open = $state(false);

    $effect(() => {
        untrack(() => open);
        selected;
        open = false;
    });
</script>

<div class="flex flex-col {props.class}">
    <span class="font-lg sm:text-xl lg:text-2xl font-semibold">
        {props.title}
    </span>
    <div class="relative border rounded-md flex">
        <label
            class="px-6 py-3 bg-white rounded-md w-full flex justify-between"
        >
            <span>{props.values[selected]}</span>
            <span><IconChevronDown /></span>
            <input
                id="out-{props.name}"
                type="checkbox"
                class="hidden"
                bind:checked={open}
            />
        </label>
        <div
            class={{
                "absolute flex-col bg-white top-full border rounded-md w-full left-0 z-10": true,
                "opacity-0 pointer-events-none": !open,
                "opacity-100 pointer-events-auto": open,
            }}
        >
            {#each props.values as v, i}
                <label class="flex" for="{props.name}-{i}">
                    <input
                        class="hidden"
                        type="radio"
                        bind:group={selected}
                        value={i}
                        name={props.name}
                        id="{props.name}-{i}"
                    />
                    <span
                        class={{
                            " transition-colors px-6 py-3 w-full rounded-md": true,
                            "bg-blue-600 text-white": selected === v,
                        }}
                    >
                        {[
                            "senin",
                            "selasa",
                            "rabu",
                            "kamis",
                            "jumat",
                            "sabtu",
                            "minggu",
                        ][i]}
                    </span>
                </label>
            {/each}
        </div>
    </div>
</div>

<label
    for="out-{props.name}"
    class={{
        "pointer-events-auto bg-blue-50/70 inset-0": open,
        "bg-transparent pointer-events-none": !open,
        " absolute inset-0": true,
    }}
></label>
