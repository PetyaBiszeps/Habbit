import type { Habit } from '../types'

type HabitListProps = {
  habits: Habit[];
  activeHabitId?: number;
  onSelectHabit: (habitId: number) => void;
}

export function HabitList({ habits, activeHabitId, onSelectHabit }: HabitListProps) {
  return habits.map(habit => (
    <button
      className={`menu__item${activeHabitId === habit.id ? ' menu__item_active' : ''}`}
      key={habit.id}
      menu-habit-id={habit.id}
      onClick={() => onSelectHabit(habit.id)}
    >
      <img alt={habit.name} src={`svg/${habit.icon}.svg`} />
    </button>
  ))
}
