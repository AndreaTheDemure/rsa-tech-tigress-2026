<script>
    import { goals } from '$lib/stores/goals';
    export let goal;

    function toggleSubtask(subtask) {
        goal.subtasks = goal.subtasks.map(s => s.id === subtask.id ? {...s, completed: !s.completed} : s);
        goals.update(g => [...g]);
    }
</script>

<ul>
    {#each goal.subtasks as subtask}
        <li>
            <input type="checkbox" bind:checked={subtask.completed} on:change={() => toggleSubtask(subtask)} />
            {subtask.title}
        </li>
    {/each}
</ul>