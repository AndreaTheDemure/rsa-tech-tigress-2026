import { writable, derived } from 'svelte/store';
import { goals } from './goals.js';

// Simple daily wins tracker
export const dailyWins = writable([]); // e.g., ["Completed 3 tasks"]

// Achievements unlocked
export const achievements = writable([]); // e.g., ["First Goal Completed"]

// Derived store: check if new achievements unlocked
export const checkAchievements = derived(goals, $goals => {
    /**
     * @type {any[]}
     */
    const unlocked = [];

    $goals.forEach(goal => {
        const totalSubtasks = goal.subtasks.length || 1;
        const completedSubtasks = goal.subtasks.filter(s => s.completed).length || (goal.completed ? 1 : 0);

        // First goal completion
        if (completedSubtasks === totalSubtasks) {
            unlocked.push(`Completed goal: ${goal.title}`);
        }
    });

    return unlocked;
});