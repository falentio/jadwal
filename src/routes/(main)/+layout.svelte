<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import type { Snippet } from "svelte";
    import type { LayoutProps } from "./$types.d.ts";

    interface Props extends LayoutProps {
        children: Snippet<[]>;
    }
    let props: Props = $props();
</script>

<header
    class="px-4 lg:px-6 h-16 flex items-center justify-between bg-white border-b"
>
    <a class="font-bold text-xl sm:text-2xl lg:text-3xl" href="/">Jadwal</a>
    {#if props.data.user}
        <Button class="hidden sm:block" href="/dashboard">Dashboard</Button>
    {:else}
        <Button class="max-sm:hidden" href="/auth/login">Login</Button>
    {/if}
</header>
{@render props.children()}
<footer class="bg-white px-6 py-6 text-center">
    <div class="font-bold">Jadwal</div>
    <div class="text-sm text-gray-700">2025 &copy; All rights reserved</div>
</footer>
