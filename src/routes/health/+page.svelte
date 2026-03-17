<script>
    import { onMount } from 'svelte';
    import { hydrationHistory, moodHistory, addWater, recordMood, healthReminders } from '$lib/stores/health';

    let waterGoal = 8; 
    let currentWaterIntake = 0;

    $: today = new Date().toISOString().split('T')[0];

    // Load today's hydration
    $: currentWaterIntake = $hydrationHistory.find(h => h.date === today)?.intake || 0;

    function drinkWater() {
        addWater();
    }

    // Mood tracking
    const moods = ['😄 Happy', '😐 Neutral', '😔 Sad', '😰 Anxious', '😡 Angry'];
    let selectedMood = '';

    function saveMood() {
        if (!selectedMood) return;
        recordMood(selectedMood);
        alert('Mood recorded!');
    }

    // Daily reminders
    onMount(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }

        $healthReminders.forEach(reminder => {
            const now = new Date();
            const [hours, minutes] = reminder.time.split(':').map(Number);
            const reminderTime = new Date();
            reminderTime.setHours(hours, minutes, 0, 0);

            const delay = reminderTime.getTime() - now.getTime();
            if (delay > 0) {
                setTimeout(() => {
                    if (Notification.permission === 'granted') {
                        const message = reminder.type === 'water' 
                            ? 'Time to drink a glass of water!' 
                            : 'How are you feeling? Check your mood.';
                        new Notification('Health Reminder', { body: message });
                    }
                }, delay);
            }
        });
    });
</script>

<h1>Health & Well-Being</h1>

<section>
    <h2>Hydration Tracker 💧</h2>
    <p>Glasses consumed: {currentWaterIntake} / {waterGoal}</p>
    <button on:click={drinkWater}>Add a glass</button>
</section>

<section>
    <h2>Mood Tracker 🙂</h2>
    <select bind:value={selectedMood}>
        <option value="" disabled>Select your mood</option>
        {#each moods as mood}
            <option value={mood}>{mood}</option>
        {/each}
    </select>
    <button on:click={saveMood}>Record Mood</button>
    {#if selectedMood}
        <p>Your mood today: {selectedMood}</p>
    {/if}
</section>