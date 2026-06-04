import { renderHabbitApp } from './react/main.jsx';
import { loadHabits, saveHabits, seedDefaults } from './habitStorage.js';

let habits = [];
let globalActiveHabitId;

renderReactApp();

const page = {
    menu: document.querySelector('.menu__list'),
    menuAdd: document.querySelector('.menu__add'),
    popup: {
        index: document.getElementById('add-habit-popup'),
        iconField: document.querySelector('.popup__form input[name="icon"]'),
        iconSelect: document.querySelector('.icon-select'),
        form: document.querySelector('.popup__form'),
        close: document.querySelector('.popup__close'),
    }
}

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

/* Utils */

function resetForm(form, fields) {
    for (const field of fields) {
        form[field].value = '';
    }
}

function validateAndGetFormData(form, fields) {
    const formData = new FormData(form);
    const res = {};

    for (const field of fields) {
        const fieldValue = formData.get(field);

        form[field].classList.remove('error');

        if (!fieldValue) {
            form[field].classList.add('error');
        }

        res[field] = fieldValue;
    }

    let isValid = true;

    for (const field of fields) {
        if (!res[field]) {
            isValid = false;
        }
    }

    if (!isValid) {
        return;
    }

    return res;
}

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

/* Popup Window */

function togglePopup() {
    if (page.popup.index.classList.contains('cover_hidden')) {
        page.popup.index.classList.remove('cover_hidden');
    } else {
        page.popup.index.classList.add('cover_hidden');
    }
}

function setIcon(context, icon) {
    page.popup.iconField.value = icon;

    const activeIcon = document.querySelector('.icon.icon_active');
    activeIcon.classList.remove('icon_active');
    context.classList.add('icon_active');
}

function addHabit(event) {
    event.preventDefault();

    const data = validateAndGetFormData(event.target, ['name', 'icon', 'target']);

    if (!data) {
        return;
    }

    const maxId = habits.reduce((acc, habit) => acc > habit.id ? acc : habit.id, 0);

    habits.push({
        id: maxId + 1,
        name: data.name,
        target: data.target,
        icon: data.icon,
        days: []
    });

    resetForm(event.target, ['name', 'target']);
    togglePopup();
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

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

/* Events */

function bindEvents() {
    page.menuAdd.addEventListener('click', togglePopup);
    page.popup.form.addEventListener('submit', addHabit);
    page.popup.close.addEventListener('click', togglePopup);

    page.popup.iconSelect.addEventListener('click', event => {
        const button = event.target.closest('.icon');

        if (!button) {
            return;
        }

        setIcon(button, button.dataset.icon);
    });

}

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

/* Init */

(() => {
    bindEvents();
    seedDefaults();
    habits = loadHabits();

    const hashId = Number(document.location.hash.replace('#', ''));
    const urlHabit = habits.find(habit => habit.id === hashId);

    if (urlHabit) {
        rerender(urlHabit.id);
    } else {
        rerender(habits[0].id);
    }
})();
