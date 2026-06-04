import { useEffect, useState } from 'react';
import { loadHabits, saveHabits, seedDefaults } from '../habitStorage.js';
import { AddDayForm } from './components/AddDayForm.jsx';
import { AddHabitModal } from './components/AddHabitModal.jsx';
import { HabitDetails } from './components/HabitDetails.jsx';
import { HabitList } from './components/HabitList.jsx';

function loadInitialState() {
    seedDefaults();

    const habits = loadHabits();
    const hashId = Number(document.location.hash.replace('#', ''));
    const urlHabit = habits.find(habit => habit.id === hashId);

    return {
        habits,
        activeHabitId: urlHabit?.id ?? habits[0]?.id,
    };
}

function setLocationHash(activeHabitId) {
    if (activeHabitId !== undefined) {
        document.location.replace(document.location.pathname + '#' + activeHabitId);
    }
}

export function App() {
    const [state, setState] = useState(loadInitialState);
    const { habits, activeHabitId } = state;
    const activeHabit = habits.find(habit => habit.id === activeHabitId) ?? null;

    useEffect(() => {
        setLocationHash(activeHabitId);
    }, [activeHabitId]);

    function selectHabit(habitId) {
        const activeHabit = habits.find(habit => habit.id === habitId);

        if (!activeHabit) {
            return;
        }

        setState(current => ({...current, activeHabitId: activeHabit.id}));
    }

    function addHabit({name, target, icon}) {
        if (!name || !target || !icon) {
            return;
        }

        setState(current => {
            const maxId = current.habits.reduce((acc, habit) => acc > habit.id ? acc : habit.id, 0);
            const newHabit = {
                id: maxId + 1,
                name,
                target,
                icon,
                days: []
            };
            const nextHabits = current.habits.concat([newHabit]);

            saveHabits(nextHabits);
            return {
                habits: nextHabits,
                activeHabitId: newHabit.id,
            };
        });
    }

    function deleteHabit() {
        if (activeHabitId === undefined) {
            return;
        }

        setState(current => {
            const nextHabits = current.habits.filter(habit => habit.id !== current.activeHabitId);
            const nextActiveHabitId = nextHabits[0]?.id;

            saveHabits(nextHabits);
            return {
                habits: nextHabits,
                activeHabitId: nextActiveHabitId,
            };
        });
    }

    function addDay({comment}) {
        if (!comment || activeHabitId === undefined) {
            return;
        }

        setState(current => {
            const nextHabits = current.habits.map(habit => {
                if (habit.id === current.activeHabitId) {
                    return {
                        ...habit,
                        days: habit.days.concat([{comment}])
                    };
                }

                return habit;
            });

            saveHabits(nextHabits);

            return {
                ...current,
                habits: nextHabits,
            };
        });
    }

    function deleteDay(dayIndex) {
        if (activeHabitId === undefined) {
            return;
        }

        setState(current => {
            const nextHabits = current.habits.map(habit => {
                if (habit.id === current.activeHabitId) {
                    return {
                        ...habit,
                        days: habit.days.filter((day, index) => index !== dayIndex)
                    };
                }

                return habit;
            });

            saveHabits(nextHabits);

            return {
                ...current,
                habits: nextHabits,
            };
        });
    }

    return (
        <div className="app">
            <div className="panel">
                <img alt="App Logo" className="logo" src="svg/Logo.svg" />
                <nav className="menu">
                    <div className="menu__list">
                        <HabitList
                            activeHabitId={activeHabitId}
                            habits={habits}
                            onSelectHabit={selectHabit}
                        />
                    </div>
                    <AddHabitModal onAddHabit={addHabit} />
                </nav>
            </div>
            <div className="content">
                <HabitDetails
                    habit={activeHabit}
                    onDeleteDay={deleteDay}
                    onDeleteHabit={deleteHabit}
                >
                    <AddDayForm
                        dayNumber={(activeHabit?.days.length ?? 0) + 1}
                        disabled={!activeHabit}
                        onAddDay={addDay}
                    />
                </HabitDetails>
            </div>
        </div>
    );
}
