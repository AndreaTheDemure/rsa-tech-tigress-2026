<script>
    import { onMount } from 'svelte';
    import { meals, exercises, addMeal, addExercise, weeklyProgress, points, badges, dailyReminders, scheduleDailyNotifications, hydrationStreak, exerciseStreak, mealStreak } from '$lib/stores/health.js';
    import Hydration from '$lib/components/Hydration.svelte';

    let mealName = '';
    let myPlate = { fruits: false, veggies: false, grains: false, protein: false, dairy: false };
    function submitMeal() { if(mealName){ addMeal(mealName, {...myPlate}); mealName=''; myPlate={fruits:false,veggies:false,grains:false,protein:false,dairy:false}; } }

    let exerciseType = '';
    let duration = '';
    let intensity = 'Medium';
    function submitExercise() { if(exerciseType && duration){ addExercise(exerciseType, duration, intensity); exerciseType=''; duration=''; intensity='Medium'; } }

    const foodEmojis = { fruits: '🍎', veggies: '🥦', grains: '🍞', protein: '🥩', dairy: '🥛' };
    const today = new Date().toISOString().split('T')[0];

    let upcomingReminders = [];
    onMount(()=>{
        if(Notification.permission!=='granted'){ Notification.requestPermission().then(p=>{if(p==='granted') scheduleDailyNotifications();}); } 
        else scheduleDailyNotifications();

        dailyReminders.subscribe(reminders=>{
            const now = new Date();
            upcomingReminders = reminders.filter(r=>{
                const [hours,minutes] = r.time.split(':').map(Number);
                const reminderTime = new Date(); reminderTime.setHours(hours,minutes,0,0);
                return reminderTime >= now;
            });
        });
    });
</script>

<h1>Health & Gamification Tracker 🌟</h1>

<!-- Meal Logging -->
<section>
    <h2>Log a Meal</h2>
    <input placeholder="Meal Name" bind:value={mealName} />
    <div class="myplate">{#each Object.keys(myPlate) as key}<label><input type="checkbox" bind:checked={myPlate[key]} /> {foodEmojis[key]} {key}</label>{/each}</div>
    <button on:click={submitMeal}>Add Meal</button>
</section>

<!-- Exercise Logging -->
<section>
    <h2>Log Exercise</h2>
    <input placeholder="Exercise Type" bind:value={exerciseType} />
    <input type="number" placeholder="Duration (min)" bind:value={duration} />
    <select bind:value={intensity}><option>Low</option><option>Medium</option><option>High</option></select>
    <button on:click={submitExercise}>Add Exercise</button>
</section>

<!-- Hydration -->
<section><Hydration /></section>

<!-- Today's Meals -->
<section>
    <h2>Today's Meals 🍽️</h2>
    <ul>{#each $meals.filter(m=>m.date===today) as meal}<li><strong>{meal.name}</strong> - {#each Object.keys(meal.myPlate) as key}{#if meal.myPlate[key]}{foodEmojis[key]}{/if}{/each}</li>{/each}</ul>
</section>

<!-- Today's Exercises -->
<section>
    <h2>Today's Exercises 🏃‍♂️</h2>
    <ul>{#each $exercises.filter(e=>e.date===today) as ex}<li>{ex.type} - {ex.duration} min ({ex.intensity})</li>{/each}</ul>
</section>

<!-- Weekly Goals -->
<section>
    <h2>Weekly Goals 🎯</h2>
    <ul>{#each $weeklyProgress as goal}<li>{goal.description}: {goal.progress}/{goal.target} <span class="status">{goal.achieved?'✅':'❌'}</span>
    <div class="progress-bar"><div class="fill" style="width:{Math.min(goal.progress/goal.target*100,100)}%"></div></div></li>{/each}</ul>
    <p>Points Earned: {$points}</p>
    {#if $badges.length}<p>Badges: {$badges.join(', ')}</p>{/if}
</section>

<!-- Current Streaks -->
<section>
    <h2>🔥 Current Streaks</h2>
    <ul>
        <li>Hydration Streak: {$hydrationStreak} days 💧</li>
        <li>Exercise Streak: {$exerciseStreak} days 🏃‍♂️</li>
        <li>Nutrition Streak: {$mealStreak} days 🍎🥦</li>
    </ul>
</section>

<!-- Upcoming Reminders -->
<section>
    <h2>Upcoming Reminders ⏰</h2>
    <ul>{#each upcomingReminders as r}<li>{r.type.toUpperCase()}: {r.message} at {r.time}</li>{/each}</ul>
</section>

<style>
section { border:1px solid #ddd; padding:16px; margin-bottom:16px; border-radius:10px; }
.myplate { display:flex; gap:10px; margin:8px 0; }
.myplate label { display:flex; align-items:center; gap:4px; }
button { margin-top:8px; background:#ff9800; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; }
button:hover { background:#fb8c00; }
.progress-bar { background:#eee; height:12px; border-radius:6px; margin:4px 0; }
.fill { background:#4caf50; height:100%; border-radius:6px; }
.status { font-weight:bold; margin-left:4px; }
ul { list-style:none; padding:0; }
li { font-weight:bold; margin:6px 0; font-size:1.1em; }
</style>