import { writable, derived } from 'svelte/store';

// Define default categories
export const categories = ['Academic', 'Short Term', 'Long Term', 'Personal', 'Weekly'];

// Store for all goals
export const goals = writable([
    // Example goal structure
    {
        id: 1,
        title: 'Finish project report',
        category: 'Academic',
        completed: false,
        subtasks: [
            { id: 1, title: 'Write intro', completed: true },
            { id: 2, title: 'Add references', completed: false }
        ]
    },
]);

// Derived store to calculate overall progress
export const overallProgress = derived(goals, $goals => {
    const allTasks = $goals.flatMap(g => g.subtasks.length ? g.subtasks : [{completed: g.completed}]);
    const completedTasks = allTasks.filter(t => t.completed).length;
    return allTasks.length ? Math.round((completedTasks / allTasks.length) * 100) : 0;
});