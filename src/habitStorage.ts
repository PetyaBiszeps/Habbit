import type { Habit } from '@/react/types.ts'

const HABIT_KEY = 'HABIT_KEY'
const HABIT_DEFAULT_VALUE: Habit[] = [
  {
    id: 1,
    icon: 'Sport',
    name: 'Push-ups',
    target: 10,
    days: []
  },
  {
    id: 2,
    icon: 'Water',
    name: 'Water Balance',
    target: 10,
    days: []
  },
  {
    id: 3,
    icon: 'Food',
    name: 'Diet',
    target: 10,
    days: []
  }]

export function seedDefaults(): void {
  if (!localStorage.getItem(HABIT_KEY)) {
    localStorage.setItem(HABIT_KEY, JSON.stringify(HABIT_DEFAULT_VALUE))
  }
}

export function loadHabits(): Habit[] {
  const habitsString = localStorage.getItem(HABIT_KEY)

  if (!habitsString) {
    return []
  }

  const habitArray = JSON.parse(habitsString)

  if (Array.isArray(habitArray)) {
    return habitArray
  }

  return []
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem(HABIT_KEY, JSON.stringify(habits))
}
