import { writable } from "svelte/store";

// Store to track break reminder settings
export const breakReminder = writable({
	interval: 60, // default interval in minutes
	isEnabled: true, // flag to enable or disable reminders
});
