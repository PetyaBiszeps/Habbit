export type HabitDay = {
  comment: string;
}

export type Habit = {
  id: number;
  icon: string;
  name: string;
  target: number | string;
  days: HabitDay[];
}

export type AddDayPayload = {
  comment: string;
}

export type AddHabitPayload = {
  name: string;
  target: string;
  icon: string;
}
