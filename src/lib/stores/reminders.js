import { writable } from 'svelte/store';

export const reminders = writable([]); 
// Example: {id, goalId, subtaskId?, message, time: Date, triggered: false}

export function addReminder({ goalId, subtaskId = null, message, time }) {
    const id = Date.now();
    const newReminder = { id, goalId, subtaskId, message, time: new Date(time), triggered: false };
    reminders.update(r => [...r, newReminder]);

    const delay = new Date(time).getTime() - Date.now();
    if (delay > 0) {
        setTimeout(() => {
            // Ask for notification permission if not granted
            if (Notification.permission === 'granted') {
                new Notification("Reminder", { body: message });
            }
            reminders.update(r => r.map(rem => rem.id === id ? { ...rem, triggered: true } : rem));
        }, delay);
    }
}