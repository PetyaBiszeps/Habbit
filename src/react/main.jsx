import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { HabitDetails } from './components/HabitDetails.jsx';
import { HabitList } from './components/HabitList.jsx';

let habitListRoot;
let habitDetailsRoot;

export function mountReactShell() {
    const reactRoot = document.getElementById('react-root');

    if (reactRoot) {
        flushSync(() => {
            createRoot(reactRoot).render(<App />);
        });
    }
}

export function renderHabitList({ habits, activeHabitId, onSelectHabit }) {
    const habitListElement = document.querySelector('.menu__list');

    if (!habitListElement) {
        return;
    }

    if (!habitListRoot) {
        habitListRoot = createRoot(habitListElement);
    }

    habitListRoot.render(
        <HabitList
            activeHabitId={activeHabitId}
            habits={habits}
            onSelectHabit={onSelectHabit}
        />
    );
}

export function renderHabitDetails({ habit, onDeleteHabit, onDeleteDay }) {
    const habitDetailsElement = document.getElementById('habit-details-react-root');

    if (!habitDetailsElement) {
        return;
    }

    if (!habitDetailsRoot) {
        habitDetailsRoot = createRoot(habitDetailsElement);
    }

    habitDetailsRoot.render(
        <HabitDetails
            habit={habit}
            onDeleteDay={onDeleteDay}
            onDeleteHabit={onDeleteHabit}
        />
    );
}
