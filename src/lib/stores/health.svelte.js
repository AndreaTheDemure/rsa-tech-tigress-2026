import { writable, derived } from "svelte/store";

// Exercise Logging
/**
 * @typedef {Object} ExcerciseData
 * @property {Date} date
 * @property {number} duration
 */
/** @type {ExcerciseData[]} */
export const exercises = $state([]);
/** @param {number} duration */
export function addExercise(duration) {
	exercises.push({
		date: new Date(),
		duration,
	});
}

/**
 * @typedef {Object} HydrationData
 * @property {Date} date
 * @property {number} glasses
 */
// Hydration
/** @type {HydrationData[]} */
export const hydration = $state([]);
export function addWater(glasses = 1) {
	/*const today = new Date().toISOString().split('T')[0];
    hydration.update(log => {
        const existing = log.find(h => h.date === today);
        if (existing) {
            existing.glasses += glasses;
            return [...log];
        } else {
            return [...log, { date: today, glasses }];
        }
    });*/
	const today = new Date();
	const existing = hydration.find(
		(h) =>
			h.date.getDate() === today.getDate() &&
			h.date.getMonth() === today.getMonth(),
	);
	if (!existing) {
		hydration.push({ date: today, glasses });
		return;
	}
	existing.glasses += glasses;
}
// Points & Badges

// Streaks

const goalHydration = 8;
const goalExercise = 30;

export let hydrationStreak = $state(0);

export let exerciseStreak = $state(0);
