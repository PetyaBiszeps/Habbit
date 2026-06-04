import { AddDayForm } from './components/AddDayForm.jsx';
import { AddHabitModal } from './components/AddHabitModal.jsx';
import { HabitDetails } from './components/HabitDetails.jsx';
import { HabitList } from './components/HabitList.jsx';

export function App({ habits = [], activeHabitId, onSelectHabit, onDeleteHabit, onDeleteDay, onAddDay, onAddHabit }) {
    const activeHabit = habits.find(habit => habit.id === activeHabitId) ?? null;

    return (
        <div className="app">
            <div className="panel">
                <img alt="App Logo" className="logo" src="svg/Logo.svg" />
                <nav className="menu">
                    <div className="menu__list">
                        <HabitList
                            activeHabitId={activeHabitId}
                            habits={habits}
                            onSelectHabit={onSelectHabit}
                        />
                    </div>
                    <AddHabitModal onAddHabit={onAddHabit} />
                </nav>
            </div>
            <div className="content">
                <HabitDetails
                    habit={activeHabit}
                    onDeleteDay={onDeleteDay}
                    onDeleteHabit={onDeleteHabit}
                >
                    <AddDayForm
                        dayNumber={(activeHabit?.days.length ?? 0) + 1}
                        disabled={!activeHabit}
                        onAddDay={onAddDay}
                    />
                </HabitDetails>
            </div>
        </div>
    );
}
