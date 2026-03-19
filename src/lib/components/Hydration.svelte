<script>
	import { hydration, addWater } from "$lib/stores/health.svelte.js";
	const today = new Date();

	const todayHydration = $derived.by(() => {
		const todayEntry = hydration.find(
			(h) =>
				h.date.getDate() === today.getDate() &&
				h.date.getMonth() === today.getMonth(),
		);
		return todayEntry ? todayEntry.glasses : 0;
	});

	const goal = 8;
</script>

<h3>Hydration 💧</h3>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bottle-container" onclick={() => addWater(1)}>
	<div class="bottle">
		<div
			class="water"
			style="height: {Math.min((todayHydration / goal) * 100, 100)}%"
		></div>
	</div>
	<p>{todayHydration} / {goal} glasses</p>
</div>
<p>Click the bottle to add a glass!</p>

<style>
	.bottle-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}
	.bottle {
		width: 60px;
		height: 150px;
		border: 2px solid #4caf50;
		border-radius: 10px;
		background: #eee;
		position: relative;
		overflow: hidden;
		margin-bottom: 8px;
	}
	.water {
		background: #4fc3f7;
		width: 100%;
		position: absolute;
		bottom: 0;
		transition: height 0.3s ease;
	}
	p {
		margin: 0;
		font-weight: bold;
	}
</style>
