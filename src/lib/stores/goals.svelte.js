/** @typedef {Object} Subtask
 *  @property {number} id
 *  @property {string} title
 *  @property {boolean} completed
 */

/** @typedef {Object} Goal
 *  @property {Subtask[]} subtasks
 *  @property {number} id
 *  @property {string} title
 *  @property {boolean} completed
 *  @property {GoalCategory} category
 */

/** @typedef {["Academic", "Short Term", "Long Term", "Personal", "Weekly"][number]} GoalCategory */

export const categories = [
	"Academic",
	"Short Term",
	"Long Term",
	"Personal",
	"Weekly",
];

// Store for all goals
/** @type {Goal[]} */
export const goals = $state([
	// Example goal structure
	{
		id: 1,
		title: "Finish project report",
		category: "Academic",
		completed: false,
		subtasks: [
			{ id: 1, title: "Write intro", completed: true },
			{ id: 2, title: "Add references", completed: false },
		],
	},
]);

// Derived store to calculate overall progress
export const overallProgress = $derived.by(() => {
	const allTasks = goals.flatMap((g) =>
		g.subtasks.length ? g.subtasks : [{ completed: g.completed }],
	);
	const completedTasks = allTasks.filter((t) => t.completed).length;
	return allTasks.length
		? Math.round((completedTasks / allTasks.length) * 100)
		: 0;
});
