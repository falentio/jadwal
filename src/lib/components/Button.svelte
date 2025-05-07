<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    interface Props extends HTMLButtonAttributes {
        children: Snippet<[]>;
        class?: string;
        color?: "primary" | "secondary" | "inverse" | "transparent" | "danger";
        href?: string;
    }
    let props: Props = $props();
</script>

<svelte:element
    this={props.href ? "a" : "button"}
    {...props}
    class={{
        // TODO add size
        "px-6 py-3 rounded-md text-sm font-medium transition-colors duration-300 gap-2 items-center text-center": true,
        "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-600":
            props.color === "primary" || !props.color,
        "text-black hover:bg-blue-200/70 focus:bg-blue-200/70 underline":
            props.color === "secondary",
        "bg-white text-black hover:bg-blue-100": props.color === "inverse",
        "bg-red-500 text-white": props.color === "danger",
        "bg-transparent text-black hover:bg-blue-100/70 active:bg-blue-100/70":
            props.color === "transparent",
        [props.class + ""]: !!props.class,
    }}
>
    {@render props.children()}
</svelte:element>
