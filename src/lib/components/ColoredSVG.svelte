<script>
	/** @type {{ color: string, svgText: string }} */
	const { color, svgText } = $props();
</script>

<svelte-css-wrapper style:--fill-color={color}>
	{@html svgText}
</svelte-css-wrapper>

<style>
	svelte-css-wrapper :global {
		*[fill="#ff0000"] {
			fill: var(--fill-color);
		}
		*[stroke="#ff0000"] {
			stroke: var(--fill-color);
		}
	}
</style>
