<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    interface Props extends HTMLInputAttributes {}

    let { value = $bindable(), ...props }: Props = $props();
</script>

<input
    {...props}
    class="border px-4 py-2 rounded-md focus:ring-2 ring-blue-600 outline-none {props.class}"
    bind:value
/>
