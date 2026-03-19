import { goals } from "./goals.svelte.js";

// Simple daily wins tracker
/** @type {string[]} */
export const dailyWins = $state([]); // e.g., ["Completed 3 tasks"]

// Achievements unlocked
/** @type {string[]} */
export const achievements = $state([]); // e.g., ["First Goal Completed"]

// Derived store: check if new achievements unlocked
$effect(() => {
	/**
	 * @type {string[]}
	 */
	const unlocked = [];

	goals.forEach((goal) => {
		const totalSubtasks = goal.subtasks.length || 1;
		const completedSubtasks =
			goal.subtasks.filter((s) => s.completed).length ||
			(goal.completed ? 1 : 0);

		// First goal completion
		if (completedSubtasks === totalSubtasks) {
			unlocked.push(`Completed goal: ${goal.title}`);
		}
	});
	achievements.push(...unlocked);
});
