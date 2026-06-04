import { loadHabits, saveHabits, seedDefaults } from './habitStorage.js';

let habits = [];
let globalActiveHabitId;

const page = {
    menu: document.querySelector('.menu__list'),
    menuAdd: document.querySelector('.menu__add'),
    header: {
        h1: document.querySelector('.h1'),
        progressPercent: document.querySelector('.progress__percent'),
        progressCoverBar: document.querySelector('.progress__cover_bar'),
    },
    content: {
        daysContainer: document.getElementById('days'),
        nextDay: document.querySelector('.habit__day'),
        addDayForm: document.querySelector('.habit__form'),
    },
    footer: {
        deleteHabitButton: document.querySelector('.del-button'),
    },
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

    rerenderNav(activeHabit);
    rerenderHead(activeHabit);
    rerenderContent(activeHabit);
}

function rerenderNav(activeHabit) {
    for (const habit of habits) {
        const existed = document.querySelector(`[menu-habit-id="${habit.id}"]`);

        if (!existed) {
            const element = document.createElement('button');

            element.setAttribute('menu-habit-id', habit.id);
            element.classList.add('menu__item');
            element.addEventListener('click', () => rerender(habit.id));
            element.innerHTML = `<img alt="${habit.name}" src="../src/assets/svg/${habit.icon}.svg">`;

            if (activeHabit.id === habit.id) {
                element.classList.add('menu__item_active');
            }

            page.menu.appendChild(element);
            continue;
        }

        if (activeHabit.id === habit.id) {
            existed.classList.add('menu__item_active');
        } else {
            existed.classList.remove('menu__item_active');
        }
    }
}

function rerenderHead(activeHabit) {
    // Section Name
    page.header.h1.innerText = activeHabit.name;

    // Progress Bar
    const progress = activeHabit.days.length / activeHabit.target > 1
        ? 100
        : activeHabit.days.length / activeHabit.target * 100;
    page.header.progressPercent.innerText = progress.toFixed(0) + '%';
    page.header.progressCoverBar.setAttribute('style', `width: ${progress}%`)
}

function rerenderContent(activeHabit) {
    page.content.daysContainer.innerHTML = '';

    for (const index in activeHabit.days) {
        const element = document.createElement('div');
        element.classList.add('habit');
        element.innerHTML = `
                                <div class="habit__day">Day ${Number(index) + 1}</div>
                                <div class="habit__comment">${activeHabit.days[index].comment}</div>
                                <button class="habit__delete" data-day-index="${index}">
                                    <img alt="Delete Day ${index + 1}" src="../src/assets/svg/Delete.svg">
                                </button>`;
        page.content.daysContainer.appendChild(element);
    }

    page.content.nextDay.innerHTML = `Day ${activeHabit.days.length + 1}`;
}

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

/* Days API */

function addDays(event) {
    event.preventDefault();

    const data = validateAndGetFormData(event.target, ['comment']);

    if (!data) {
        return;
    }


    habits = habits.map(habit => {
        if (habit.id === globalActiveHabitId) {
            return {
                ...habit,
                days: habit.days.concat([{comment: data.comment}])
            }
        }

        return habit;
    });

    resetForm(event.target, ['comment']);

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
    
    const menuItem = document.querySelector(`[menu-habit-id="${globalActiveHabitId}"]`);

    if (menuItem) {
        menuItem.remove();
    }

    if (habits.length > 0) {
        rerender(habits[0].id);
    } else {
        page.header.h1.innerText = '';
        page.header.progressPercent.innerText = '';
        page.header.progressCoverBar.setAttribute('style', 'width: 0%');
        page.content.daysContainer.innerHTML = '';
        page.content.nextDay.innerHTML = '';
    }

    saveHabits(habits);
}

/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------- */

/* Events */

function bindEvents() {
    page.menuAdd.addEventListener('click', togglePopup);
    page.content.addDayForm.addEventListener('submit', addDays);
    page.footer.deleteHabitButton.addEventListener('click', deleteHabit);
    page.popup.form.addEventListener('submit', addHabit);
    page.popup.close.addEventListener('click', togglePopup);

    page.popup.iconSelect.addEventListener('click', event => {
        const button = event.target.closest('.icon');

        if (!button) {
            return;
        }

        setIcon(button, button.dataset.icon);
    });

    page.content.daysContainer.addEventListener('click', event => {
        const button = event.target.closest('.habit__delete');

        if (!button) {
            return;
        }

        deleteDays(Number(button.dataset.dayIndex));
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
