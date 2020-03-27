import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
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
  date: string | null;
  setDate: React.Dispatch<React.SetStateAction<string>>;
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
      // weekday: 'narrow',
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

interface YearMonthNavRenderProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  locale: string;
}
interface YearMonthNavProps {
  children?: (renderProps: YearMonthNavRenderProps) => React.ReactNode;
}
export function YearMonthNav({ children }: YearMonthNavProps) {
  let { month, setMonth, year, setYear, locale } = useDatePickerContext();
  const monthYear = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .formatToParts(Date.UTC(year, month))
    .map(({ type, value }) => {
      switch (type) {
        case 'month':
          return <b key={type}>{value}</b>;
        default:
          return <React.Fragment key={type}>{value}</React.Fragment>;
      }
    })
    .reduce((array, part) => [...array, part], []);

  const setMonthLoop = (month: number) => {
    if (month >= 12) {
      setYear(year => year + 1);
    } else if (month < 0) {
      setYear(year => year - 1);
    }
    setMonth(mod(month, 12));
  };

  return (
    <div className="date-picker__month">
      <button type="button" onClick={() => setMonthLoop(month - 1)}>
        <VisuallyHidden>Previous month</VisuallyHidden>
        <svg focusable="false" viewBox="0 0 1000 1000" aria-hidden>
          <path d="M336 275L126 485h806c13 0 23 10 23 23s-10 23-23 23H126l210 210c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7L55 524c-11-11-11-21 0-32l249-249c21-22 53 10 32 32z" />
        </svg>
      </button>
      <div>
        {children
          ? children({ month, year, setMonth, setYear, locale })
          : monthYear}
      </div>
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
  dir?: 'ltr' | 'rtl';
}
export function DayGrid({ dir = 'ltr' }: DayGridProps) {
  let {
    date,
    setDate,
    month,
    year,
    weekStart,
    locale,
  } = useDatePickerContext();

  // NOTE: first day returns 0-6 and and assumes 0 is sunday, so we convert it to start on monday, then apply the weekstart
  const firstDay =
    mod(mod(getFirstDayOfMonth(year, month) + 6, 7) - weekStart, 7) + 1;

  const monthLength = getDaysInMonth(year, month + 1);

  const dayFormat = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    timeZone: 'UTC',
  });

  // The .replace removes the 日 chinese and japanese locales, which get added by our number formatter. It's not the cleanest solution but for now it requires the least amount of data, and should support every locale (we need to write a test case).
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
                'date-picker__grid__item--selected':
                  date === `${year}-${month}-${itemDay}`,
              })}
              key={index}
              type="button"
              onClick={() => setDate(`${year}-${month}-${itemDay}`)}
            >
              <time>
                {dayFormat
                  .format(new Date(`2020-${month + 1}-${itemDay}`))
                  .replace(/^\d\d?.$/, itemDay.toString())}
              </time>
            </button>
          );
        })}
    </div>
  );
}

export function WeekGrid() {
  // Displays a single row of what DayGrid would show
  return 'TODO';
}

interface DatePickerProps {
  children: React.ReactNode;
  firstWeekday?: number;
  locale?: string;
}
export function DatePicker({
  locale = 'en',
  firstWeekday = 6,
  children,
}: DatePickerProps) {
  const [date, setDate] = useState<string | null>(null);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(2020);
  const [weekStart, setWeekStart] = useState<number>(firstWeekday);
  useLayoutEffect(() => {
    setWeekStart(firstWeekday);
  }, [firstWeekday]);

  // TODO Set weekStart based on locale
  // Also have an option weekStart if user does not want to include locale information?

  return (
    <DatePickerProvider
      value={{
        date,
        setDate,
        month,
        setMonth,
        year,
        setYear,
        weekStart,
        locale,
      }}
    >
      <div className="date-picker">{children}</div>
    </DatePickerProvider>
  );
}
