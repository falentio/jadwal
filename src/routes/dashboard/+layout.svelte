<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet<[]>;
    }

    let props: Props = $props();
</script>

<header
    class="px-4 lg:px-6 h-16 flex items-center justify-between bg-white border-b"
>
    <a class="font-bold text-xl sm:text-2xl lg:text-3xl" href="/dashboard">
        Jadwal
    </a>
</header>

<div class="flex flex-col bg-blue-50 flex-auto">
    {@render props.children()}
</div>

<footer class="bg-white px-6 py-6 text-center">
    <div class="font-bold">Jadwal</div>
    <div class="text-sm text-gray-700">2025 &copy; All rights reserved</div>
</footer>
