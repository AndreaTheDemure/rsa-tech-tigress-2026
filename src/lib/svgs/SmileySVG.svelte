<script>
	import text from "./smiley.svg?raw";
	import ColoredSVG from "$lib/components/ColoredSVG.svelte";

	/** @type {{ color?: string }} */
	const { color = "#000000" } = $props();
</script>

<ColoredSVG svgText={text} {color} />
