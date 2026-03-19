<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	/** @type {Omit<import("svelte/elements").HTMLInputAttributes, "type"> & { type?: "text" | "password" }}*/
	let { value = $bindable(""), type = "text", ...rest } = $props();

	let validityMessage = $state("");
</script>

<div class="relative">
	<input
		{type}
		{...rest}
		bind:value
		data-show-invalid={validityMessage !== ""}
		oninvalid={(e) => {
			validityMessage = e.currentTarget.validationMessage;
		}}
		onblur={(e) => {
			e.currentTarget.checkValidity();
			if (e.currentTarget.validationMessage === "") {
				validityMessage = "";
			}
		}}
		onkeypress={(e) => {
			if (e.key === "Enter" && !e.ctrlKey && !e.altKey) {
				e.currentTarget.checkValidity();
			}
		}}
		oninput={(e) => {
			if (e.currentTarget.value === "") {
				validityMessage = "";
				return;
			}
			if (validityMessage !== "") {
				e.currentTarget.checkValidity();
				validityMessage = e.currentTarget.validationMessage;
			}
		}}
	/>
	{#if validityMessage}
		<div transition:fade={{ duration: 200 }}>{validityMessage}</div>
	{/if}
</div>

<style lang="postcss">
	@reference "../global.css";
	input {
		@apply p-2 bg-none text-body-text outline-none border-2
    		border-body-text placeholder:text-gray-500 marked-invalid:light:border-rose-600
      		dark:marked-invalid:border-rose-400 dark:marked-invalid:text-rose-400 rounded-full
			w-full text-sm;
	}
	div > div {
		@apply absolute bottom-[-2.3lh] left-0 right-0 text-center leading-1 text-tiny
			light:text-rose-600 dark:text-rose-400;
	}
</style>
