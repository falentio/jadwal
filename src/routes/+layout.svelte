<script lang="ts">
	import "@fontsource-variable/montserrat";
	import "../app.css";

	let { children } = $props();
</script>

<div class="min-h-svh w-full flex flex-col antialiased">
	{@render children()}
</div>
