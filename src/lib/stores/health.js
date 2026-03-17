import { writable } from 'svelte/store';

// Hydration history: array of { date: 'YYYY-MM-DD', intake: number }
export const hydrationHistory = writable([]);

// Mood history: array of { date: 'YYYY-MM-DD', mood: string }
export const moodHistory = writable([]);

// Daily reminder settings (can expand to time-of-day)
export const healthReminders = writable([
    { type: 'water', time: '09:00' },
    { type: 'mood', time: '12:00' }
]);

// Function to add hydration intake
export function addWater() {
    const today = new Date().toISOString().split('T')[0];
    hydrationHistory.update(history => {
        const todayEntry = history.find(h => h.date === today);
        if (todayEntry) {
            todayEntry.intake += 1;
        } else {
            history.push({ date: today, intake: 1 });
        }
        return [...history];
    });
}

// Function to record mood
export function recordMood(mood) {
    const today = new Date().toISOString().split('T')[0];
    moodHistory.update(history => {
        const todayEntry = history.find(h => h.date === today);
        if (todayEntry) {
            todayEntry.mood = mood;
        } else {
            history.push({ date: today, mood });
        }
        return [...history];
    });
}