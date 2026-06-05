import { DEMO_HABITS } from '@/renderer/data/demoHabits.ts'
import type { Habit } from '@/renderer/types.ts'

const HABIT_KEY = 'HABIT_KEY'

export function seedDefaults(): void {
  if (!localStorage.getItem(HABIT_KEY)) {
    localStorage.setItem(HABIT_KEY, JSON.stringify(DEMO_HABITS))
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
