<script>
	import ProgressBar from "./ProgressBar.svelte";
	import SubtaskList from "./SubtaskList.svelte";

	/** @import { Goal, Subtask } from "../stores/goals.svelte" */

	/** @type {{ goal: Goal }} */
	const { goal } = $props();

	let progress = $derived(
		goal.subtasks.length
			? Math.round(
					(goal.subtasks.filter((s) => s.completed).length /
						goal.subtasks.length) *
						100,
				)
			: goal.completed
				? 100
				: 0,
	);
</script>

<div class="goal-card">
	<h3>{goal.title}</h3>
	<SubtaskList {goal} />
	<ProgressBar {progress} />
</div>

<style>
	.goal-card {
		border: 1px solid #ddd;
		padding: 16px;
		border-radius: 10px;
		margin-bottom: 16px;
	}
</style>
