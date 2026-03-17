<script>
    import ProgressBar from './ProgressBar.svelte';
    import SubtaskList from './SubtaskList.svelte';
    import { addReminder } from '$lib/stores/reminders';
    export let goal;

    let progress = goal.subtasks.length 
        ? Math.round(goal.subtasks.filter(s => s.completed).length / goal.subtasks.length * 100)
        : goal.completed ? 100 : 0;

    // Reminder UI
    let reminderTime = '';
    let reminderMessage = '';

    function setGoalReminder() {
        if (!reminderTime) return;
        addReminder({
            goalId: goal.id,
            message: reminderMessage || `Reminder for goal: ${goal.title}`,
            time: reminderTime
        });
        // Reset inputs
        reminderTime = '';
        reminderMessage = '';
        alert('Reminder set! Make sure notifications are allowed in your browser.');
    }
</script>

<div class="goal-card">
    <h3>{goal.title}</h3>
    <SubtaskList {goal} />
    <ProgressBar {progress} />

    <!-- Reminder UI -->
    <div class="reminder-section">
        <input type="datetime-local" bind:value={reminderTime} />
        <input type="text" placeholder="Optional message" bind:value={reminderMessage} />
        <button on:click={setGoalReminder}>Set Reminder</button>
    </div>
</div>

<style>
.goal-card {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 10px;
    margin-bottom: 16px;
}
.reminder-section {
    margin-top: 12px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}
.reminder-section input {
    padding: 4px;
}
.reminder-section button {
    padding: 6px 12px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
.reminder-section button:hover {
    background: #45a049;
}
</style>