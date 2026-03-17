import { writable, derived } from 'svelte/store';

// Meals & MyPlate

export const meals = writable([]);
export function addMeal(mealName, myPlate) {
    const today = new Date().toISOString().split('T')[0];
    meals.update(log => [...log, { date: today, name: mealName, myPlate }]);
}


// Exercises

export const exercises = writable([]);
export function addExercise(type, duration, intensity) {
    const today = new Date().toISOString().split('T')[0];
    exercises.update(log => [...log, { date: today, type, duration: Number(duration), intensity }]);
}

// Weekly Goals & Gamification

export const weeklyGoals = writable([
    { id: 1, description: "Eat veggies 5 times this week", type: "veggies", target: 5, progress: 0, achieved: false },
    { id: 2, description: "Eat fruits 5 times this week", type: "fruits", target: 5, progress: 0, achieved: false },
    { id: 3, description: "Exercise 150 mins this week", type: "exercise", target: 150, progress: 0, achieved: false }
]);

export const weeklyProgress = derived([weeklyGoals, meals, exercises], ([$weeklyGoals, $meals, $exercises]) => {
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
        }

        return { ...goal, progress, achieved: progress >= goal.target };
    });
});

export const points = derived(weeklyProgress, $weeklyProgress => 
    $weeklyProgress.reduce((sum, g) => sum + (g.achieved ? 10 : 0), 0)
);

export const badges = derived(weeklyProgress, $weeklyProgress => 
    $weeklyProgress.filter(g => g.achieved).map(g => g.description)
);


// Daily Notifications

export const dailyReminders = writable([
    { type: 'meal', time: '08:00', message: 'Log your meals for today!' },
    { type: 'exercise', time: '18:00', message: 'Time for your daily exercise!' }
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
});