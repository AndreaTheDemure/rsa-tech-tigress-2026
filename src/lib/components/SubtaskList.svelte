<script>
	import { goals } from "$lib/stores/goals.svelte";
	/** @import { Goal, Subtask } from "../stores/goals.svelte" */
	/** @type {{ goal: Goal }} */
	const { goal } = $props();

	/** @param {Subtask} subtask */
	function toggleSubtask(subtask) {
		goal.subtasks = goal.subtasks.map((s) =>
			s.id === subtask.id ? { ...s, completed: !s.completed } : s,
		);
	}
</script>

<ul>
	{#each goal.subtasks as subtask}
		<li>
			<input
				type="checkbox"
				bind:checked={subtask.completed}
				onchange={() => toggleSubtask(subtask)}
			/>
			{subtask.title}
		</li>
	{/each}
</ul>
