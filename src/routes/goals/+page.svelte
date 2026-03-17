<script>
    import { goals, categories, overallProgress } from '$lib/stores/goals';
    import GoalCard from '$lib/components/GoalCard.svelte';
    import ProgressBar from '$lib/components/ProgressBar.svelte';
    import { dailyWins, achievements, checkAchievements } from '$lib/stores/achievements';

    let newGoalTitle = '';
    let newGoalCategory = 'Weekly';

    function addGoal() {
        if (!newGoalTitle) return;
        goals.update(g => [
            ...g,
            { id: Date.now(), title: newGoalTitle, category: newGoalCategory, completed: false, subtasks: [] }
        ]);
        newGoalTitle = '';
    }

    // Watch for achievements
    $: achievements.set($checkAchievements);
</script>

<script>
    import { onMount } from 'svelte';

    onMount(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    });
</script>

<h1>Goals & To-Do</h1>

<div>
    <input placeholder="New goal..." bind:value={newGoalTitle} />
    <select bind:value={newGoalCategory}>
        {#each categories as cat}
            <option value={cat}>{cat}</option>
        {/each}
    </select>
    <button on:click={addGoal}>Add Goal</button>
</div>

<h2>Overall Progress</h2>
<ProgressBar progress={$overallProgress} />

<h2>Achievements</h2>
<ul>
    {#each $achievements as ach}
        <li>🏆 {ach}</li>
    {/each}
</ul>

<h2>Daily Wins</h2>
<ul>
    {#each $dailyWins as win}
        <li>✨ {win}</li>
    {/each}
</ul>

{#each $goals as goal (goal.id)}
    <GoalCard {goal} />
{/each}