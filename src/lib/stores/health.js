import { writable, derived } from 'svelte/store';

// Meals & MyPlate

export const meals = writable([]);
export function addMeal(mealName, myPlate) {
    const today = new Date().toISOString().split('T')[0];
    meals.update(log => [...log, { date: today, name: mealName, myPlate }]);
}

// Exercise Logging

export const exercises = writable([]);
export function addExercise(type, duration, intensity) {
    const today = new Date().toISOString().split('T')[0];
    exercises.update(log => [...log, { date: today, type, duration: Number(duration), intensity }]);
}

// Hydration

export const hydration = writable([]);
export function addWater(glasses = 1) {
    const today = new Date().toISOString().split('T')[0];
    hydration.update(log => {
        const existing = log.find(h => h.date === today);
        if (existing) {
            existing.glasses += glasses;
            return [...log];
        } else {
            return [...log, { date: today, glasses }];
        }
    });
}

// Weekly Goals

export const weeklyGoals = writable([
    { id: 1, description: "Eat veggies 5 times this week", type: "veggies", target: 5, progress: 0, achieved: false },
    { id: 2, description: "Eat fruits 5 times this week", type: "fruits", target: 5, progress: 0, achieved: false },
    { id: 3, description: "Exercise 150 mins this week", type: "exercise", target: 150, progress: 0, achieved: false },
    { id: 4, description: "Drink 8 glasses of water daily this week", type: "hydration", target: 8, progress: 0, achieved: false }
]);

export const weeklyProgress = derived([weeklyGoals, meals, exercises, hydration], ([$weeklyGoals, $meals, $exercises, $hydration]) => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return $weeklyGoals.map(goal => {
        let progress = 0;

        if (goal.type === "veggies" || goal.type === "fruits") {
            progress = $meals.filter(meal => {
                const mealDate = new Date(meal.date);
                return mealDate >= weekStart && mealDate <= weekEnd && meal.myPlate[goal.type];
            }).length;
        } else if (goal.type === "exercise") {
            progress = $exercises.filter(ex => {
                const exDate = new Date(ex.date);
                return exDate >= weekStart && exDate <= weekEnd;
            }).reduce((sum, ex) => sum + ex.duration, 0);
        } else if (goal.type === "hydration") {
            // Count days where hydration goal was met
            progress = $hydration.filter(h => {
                const hDate = new Date(h.date);
                return hDate >= weekStart && hDate <= weekEnd && h.glasses >= goal.target;
            }).length;
        }

        return { ...goal, progress, achieved: progress >= goal.target };
    });
});


// Points & Badges

export const points = derived(weeklyProgress, $weeklyProgress => 
    $weeklyProgress.reduce((sum, g) => sum + (g.achieved ? 10 : 0), 0)
);

export const badges = derived(weeklyProgress, $weeklyProgress => 
    $weeklyProgress.filter(g => g.achieved).map(g => g.description)
);

// Streaks

const goalHydration = 8;
const goalExercise = 30;

export const hydrationStreak = derived(hydration, $hydration => {
    if (!$hydration.length) return 0;
    const today = new Date();
    let streak = 0;

    for (let i = 0; i < 365; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const dayEntry = $hydration.find(h => h.date === dateStr);
        if (dayEntry && dayEntry.glasses >= goalHydration) streak++;
        else break;
    }
    return streak;
});

export const exerciseStreak = derived(exercises, $exercises => {
    if (!$exercises.length) return 0;
    const today = new Date();
    let streak = 0;

    for (let i = 0; i < 365; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const dayExercise = $exercises.filter(e => e.date === dateStr)
            .reduce((sum, ex) => sum + ex.duration, 0);

        if (dayExercise >= goalExercise) streak++;
        else break;
    }
    return streak;
});

export const mealStreak = derived(meals, $meals => {
    if (!$meals.length) return 0;
    const today = new Date();
    let streak = 0;

    for (let i = 0; i < 365; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const dayMeals = $meals.filter(m => m.date === dateStr);
        const dayCompleted = dayMeals.some(m => Object.values(m.myPlate).some(v => v));
        if (dayCompleted) streak++;
        else break;
    }
    return streak;
});

// Notifications / Reminders

export const dailyReminders = writable([
    { type: 'meal', time: '08:00', message: 'Log your meals for today!' },
    { type: 'exercise', time: '18:00', message: 'Time for your daily exercise!' },
    { type: 'water', time: '10:00', message: 'Drink a glass of water!' }
]);

export function scheduleDailyNotifications() {
    dailyReminders.subscribe(reminders => {
        reminders.forEach(reminder => {
            const [hours, minutes] = reminder.time.split(':').map(Number);
            const now = new Date();
            const reminderTime = new Date();
            reminderTime.setHours(hours, minutes, 0, 0);
            let delay = reminderTime.getTime() - now.getTime();
            if (delay < 0) delay += 24 * 60 * 60 * 1000;

            setTimeout(() => {
                if (Notification.permission === 'granted') {
                    new Notification('Reminder', { body: reminder.message });
                }
                scheduleDailyNotifications();
            }, delay);
        });
    });
}