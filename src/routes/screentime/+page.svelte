<script>
	import { onMount } from "svelte";
	import { breakReminder } from "$lib/stores";

	let interval = $state(60); // Default interval for break reminders (minutes)
	let isEnabled = $state(false); // Flag to control whether reminders are enabled or not

	// Request notification permission from the user
	const requestNotificationPermission = () => {
		if (Notification.permission === "default") {
			Notification.requestPermission().then((permission) => {
				if (permission === "granted") {
					console.log("Notification permission granted");
				} else {
					console.log("Notification permission denied");
				}
			});
		}
	};

	// Trigger a reminder (simple notification or alert)
	const triggerBreakReminder = () => {
		console.log("hi");
		if (Notification.permission === "granted") {
			new Notification("Time for a break!");
		} else {
			alert("Time for a break!");
		}
	};

	// Start the break reminder interval
	const startBreakReminder = () => {
		if (isEnabled) {
			setInterval(
				() => {
					triggerBreakReminder();
				},
				interval * 60 * 1000,
			); // Reminder every `interval` minutes
		}
	};

	onMount(() => {
		requestNotificationPermission();
	});

	// Update the break reminder settings
	$effect(() => {
		breakReminder.set({ interval, isEnabled });
	});
	$effect(() => {
		if (isEnabled) {
			startBreakReminder();
		}
	});
</script>

<main>
	<h1>Break Reminder</h1>

	<div>
		<label>
			Break interval (minutes):
			<input type="number" bind:value={interval} min="5" max="120" />
		</label>
		<label>
			Enable reminders
			<input type="checkbox" bind:checked={isEnabled} />
		</label>
	</div>

	<div>
		<p>Reminder every {interval} minutes</p>
		<p>{isEnabled ? "Reminders are enabled" : "Reminders are disabled"}</p>
	</div>
</main>
