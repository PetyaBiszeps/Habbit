import { renderHabbitApp } from './react/main.jsx';
import { loadHabits, saveHabits, seedDefaults } from './habitStorage.js';

let habits = [];
let globalActiveHabitId;

renderReactApp();

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

/* Render */

function rerender(activeHabitId) {
    globalActiveHabitId = activeHabitId;
    const activeHabit = habits.find(habit => habit.id === activeHabitId);

    if (!activeHabit) {
        return;
    }

    document.location.replace(document.location.pathname + '#' + activeHabitId);

    renderReactApp(activeHabit.id);
}

function renderReactApp(activeHabitId = globalActiveHabitId) {
    renderHabbitApp({
        habits,
        activeHabitId,
        onSelectHabit: rerender,
        onDeleteHabit: deleteHabit,
        onDeleteDay: deleteDays,
        onAddDay: addDays,
        onAddHabit: addHabit,
    });
}

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

/* Days API */

function addDays({comment}) {
    if (!comment || globalActiveHabitId === undefined) {
        return;
    }

    habits = habits.map(habit => {
        if (habit.id === globalActiveHabitId) {
            return {
                ...habit,
                days: habit.days.concat([{comment}])
            }
        }

        return habit;
    });

    rerender(globalActiveHabitId);

    saveHabits(habits);
}

function deleteDays(index) {
    habits = habits.map(habit => {
        if (habit.id === globalActiveHabitId) {
            habit.days.splice(index, 1);

            return {
                ...habit,
                days: habit.days
            };
        }

        return habit;
    });

    rerender(globalActiveHabitId);
    saveHabits(habits);
}

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

function addHabit({name, target, icon}) {
    if (!name || !target || !icon) {
        return;
    }

    const maxId = habits.reduce((acc, habit) => acc > habit.id ? acc : habit.id, 0);

    habits.push({
        id: maxId + 1,
        name,
        target,
        icon,
        days: []
    });

    saveHabits(habits);
    rerender(maxId + 1);
}

function deleteHabit() {
    if (globalActiveHabitId === undefined) {
        return;
    }

    habits = habits.filter(habit => habit.id !== globalActiveHabitId);
    
    if (habits.length > 0) {
        rerender(habits[0].id);
    } else {
        globalActiveHabitId = undefined;
        renderReactApp(undefined);
    }

    saveHabits(habits);
}

/* Init */

(() => {
    seedDefaults();
    habits = loadHabits();

    const hashId = Number(document.location.hash.replace('#', ''));
    const urlHabit = habits.find(habit => habit.id === hashId);

    if (urlHabit) {
        rerender(urlHabit.id);
    } else if (habits.length > 0) {
        rerender(habits[0].id);
    } else {
        renderReactApp(undefined);
    }
})();
