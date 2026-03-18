<script>
	/** @type {Omit<import("svelte/elements").HTMLInputAttributes, "type">}*/
	const { value = $bindable(""), ...rest } = $props();
</script>

<input type="text" {...rest} />

<style lang="postcss">
	@reference "../global.css";
	input {
		@apply p-2 bg-none color-body-text outline-none border-2
        border-body-text placeholder:text-gray-500 user-invalid:light:border-rose-600
        dark:invalid:border-rose-400 dark:invalid:text-rose-400;
	}
</style>
