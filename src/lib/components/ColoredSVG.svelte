<script>
	/** @type {{ color: string, svgText: string }} */
	const { color, svgText } = $props();
</script>

<svelte-css-wrapper style:--fill-color={color}>
	{@html svgText}
</svelte-css-wrapper>

<style>
	svelte-css-wrapper :global {
		path[fill] {
			fill: var(--fill-color);
		}
		path[stroke] {
			stroke: var(--fill-color);
		}
	}
</style>
