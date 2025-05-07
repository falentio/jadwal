<script lang="ts" generics="Item extends object">
    import type { Snippet } from "svelte";

    interface Props {
        items: Item[];
        pick: (keyof Item)[];
        headers: Record<keyof Item, string>;
        actions?: Snippet<[Item]>;
        children?: Snippet<[]>;
    }

    let props: Props = $props();
</script>

<div class="overflow-x-auto w-full border shadow-xs rounded-md">
    <table class="w-full">
        <thead>
            <tr>
                {#each props.pick as key}
                    <th class="px-4 py-2 text-left"
                        >{Reflect.get(props.headers, key)}</th
                    >
                {/each}
                {#if props.actions}
                    <th class="px-4 py-2 text-left">Aksi</th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each props.items as item}
                <tr class="odd:bg-blue-50 hover:bg-blue-100">
                    {#each props.pick as key}
                        <td class="px-4 py-2">{Reflect.get(item, key)}</td>
                    {/each}
                    {#if props.actions}
                        <td class="px-4 py-2">
                            {@render props.actions(item)}
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
