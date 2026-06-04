window.habitStorage = (() => {
    const HABIT_KEY = 'HABIT_KEY';
    const HABIT_DEFAULT_VALUE = [
        {
            "id": 1,
            "icon": "Sport",
            "name": "Push-ups",
            "target": 10,
            "days": []
        },
        {
            "id": 2,
            "icon": "Water",
            "name": "Water Balance",
            "target": 10,
            "days": []
        },
        {
            "id": 3,
            "icon": "Food",
            "name": "Diet",
            "target": 10,
            "days": []
        }];

    function seedDefaults() {
        if (!localStorage.getItem(HABIT_KEY)) {
            localStorage.setItem(HABIT_KEY, JSON.stringify(HABIT_DEFAULT_VALUE));
        }
    }

    function loadHabits() {
        const habitsString = localStorage.getItem(HABIT_KEY);
        const habitArray = JSON.parse(habitsString);

        if (Array.isArray(habitArray)) {
            return habitArray;
        }

        return [];
    }

    function saveHabits(habits) {
        localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
    }

    return {
        seedDefaults,
        loadHabits,
        saveHabits,
    };
})();
