import React, { createContext, useContext, useState } from 'react';
import objstr from 'obj-str';
import VisuallyHidden from '@reach/visually-hidden';
import './grid.css';
import './month.css';
import { getFirstDayOfMonth, getDaysInMonth } from '../utils';

const mod = (number: number, mod: number) => ((number % mod) + mod) % mod;

function createCtx<A>() {
  const ctx = createContext<A | undefined>(undefined);
  function useCtx() {
    const c = useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const; // make TypeScript infer a tuple, not an array of union types
}

interface DatePickerProviderValue {
  day: number;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  weekStart: number;
  locale: string;
}
export const [useDatePickerContext, DatePickerProvider] = createCtx<
  DatePickerProviderValue
>();

export function Weekdays() {
  let { weekStart, locale } = useDatePickerContext();

  const weekdays = [...Array(7).keys()].map(index =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      timeZone: 'UTC',
      // This date is just a reference to a known weekday that starts on monday
    }).format(Date.UTC(2018, 0, index + weekStart + 1)),
  );

  return (
    <div className="date-picker__weekdays">
      {weekdays.map((day: string) => (
        <span key={day}>{day}</span>
      ))}
    </div>
  );
}

export function MonthPicker() {
  let { month, setMonth, locale } = useDatePickerContext();
  const months = [...Array(12).keys()].map(index =>
    new Intl.DateTimeFormat(locale, {
      month: 'long',
      timeZone: 'UTC',
    }).format(Date.UTC(2018, index)),
  );

  // TODO Change year
  const setMonthLoop = (month: number) => setMonth(mod(month, 12));

  return (
    <div className="date-picker__month">
      <button type="button" onClick={() => setMonthLoop(month - 1)}>
        <VisuallyHidden>Previous month</VisuallyHidden>
        <svg focusable="false" viewBox="0 0 1000 1000" aria-hidden>
          <path d="M336 275L126 485h806c13 0 23 10 23 23s-10 23-23 23H126l210 210c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7L55 524c-11-11-11-21 0-32l249-249c21-22 53 10 32 32z" />
        </svg>
      </button>
      {months[month]}
      <button type="button" onClick={() => setMonthLoop(month + 1)}>
        <VisuallyHidden>Next month</VisuallyHidden>
        <svg focusable="false" viewBox="0 0 1000 1000" aria-hidden>
          <path d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z" />
        </svg>
      </button>
    </div>
  );
}

interface DayGridProps {
  startDay: number;
  length: number;
  dir?: 'ltr' | 'rtl';
}
export function DayGrid({ startDay, dir = 'ltr' }: DayGridProps) {
  let { day, setDay, month, year, weekStart, locale } = useDatePickerContext();

  // NOTE: first day returns 0-6 and and assumes 0 is sunday
  const firstDay =
    mod(mod(getFirstDayOfMonth(year, month) + 6, 7) - weekStart, 7) + 1;
  console.log('mod', mod(6, 7));
  // ((((getFirstDayOfMonth(year, month) - 6 + weekStart) % 7) + 7) % 7) + 1;
  console.log('first day', firstDay);

  const monthLength = getDaysInMonth(year, month + 1);

  // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // var dateTimeFormat = new Intl.DateTimeFormat('sr-RS', options);
  const dayFormat = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div
      className="date-picker__grid"
      style={{ '--start-day': firstDay } as React.CSSProperties}
      dir={dir}
    >
      {Array(monthLength)
        .fill(0)
        .map((_, index) => {
          const itemDay = index + 1;
          return (
            <button
              className={objstr({
                'date-picker__grid__item': true,
                'date-picker__grid__item--selected': day === itemDay,
              })}
              key={index}
              type="button"
              onClick={() => setDay(itemDay)}
            >
              <time>
                {dayFormat.format(new Date(`2020-${month + 1}-${itemDay}`))}
              </time>
            </button>
          );
        })}
    </div>
  );
}

interface DatePickerProps {
  children: React.ReactNode;
  locale?: string;
}
export function DatePicker({ locale = 'en', children }: DatePickerProps) {
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(2020);
  const [weekStart] = useState<number>(0);

  // TODO Set weekStart based on locale
  // Also have an option weekStart if user does not want to include locale information?

  return (
    <DatePickerProvider
      value={{ day, setDay, month, setMonth, year, setYear, weekStart, locale }}
    >
      {children}
    </DatePickerProvider>
  );
}
