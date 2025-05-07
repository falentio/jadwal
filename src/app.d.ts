import 'unplugin-icons/types/svelte'
import { Worker } from "@cloudflare/workers-types"
import type { PlatformProxy } from "wrangler";
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	type Env = {
		DB: D1Database;
	}
	namespace App {
		// interface Error {}
		interface Locals {
			workos: import('@workos-inc/node').WorkOS;
			app: import("./server/applications/index.ts").Application
			user: import("./server/services/user/user.types.ts").User | null;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform extends PlatformProxy<Env> {
		}
	}
}

export { };
