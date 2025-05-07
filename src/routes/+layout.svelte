<script lang="ts">
	import "@fontsource-variable/montserrat";
	import "../app.css";
	import { browser } from "$app/environment";
	import posthog from "posthog-js";
	let { children } = $props();

	if (browser) {
		posthog.init("phc_MJpPOOZR09qGcZ5cnDojw1Kf3zycOdBjeQBsWNDSoO2", {
			api_host: "https://eu.i.posthog.com",
			person_profiles: "always", // or 'always' to create profiles for anonymous users as well
		});
	}
</script>

<div class="min-h-svh w-full flex flex-col antialiased">
	{@render children()}
</div>
