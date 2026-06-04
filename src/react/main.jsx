import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';

let habbitAppRoot;

export function renderHabbitApp({ habits, activeHabitId, onSelectHabit, onDeleteHabit, onDeleteDay, onAddDay }) {
    const reactRoot = document.getElementById('react-root');

    if (!reactRoot) {
        return;
    }

    if (!habbitAppRoot) {
        habbitAppRoot = createRoot(reactRoot);
    }

    flushSync(() => {
        habbitAppRoot.render(
            <App
                activeHabitId={activeHabitId}
                habits={habits}
                onDeleteDay={onDeleteDay}
                onDeleteHabit={onDeleteHabit}
                onAddDay={onAddDay}
                onSelectHabit={onSelectHabit}
            />
        );
    });
}
