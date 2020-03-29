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

interface WeekdaysFormatOptions {
  weekday: 'short' | 'narrow' | 'long';
}
interface WeekdaysProps {
  options?: WeekdaysFormatOptions;
}
export function Weekdays({ options }: WeekdaysProps) {
  let { weekStart, locale } = useDatePickerContext();

  const weekdays = [...Array(7).keys()].map(index =>
    new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      weekday: 'narrow',
      ...options,
      // This date is just a reference to a known weekday that starts on monday
    }).format(Date.UTC(2018, 0, index + weekStart + 1)),
  );

  return (
    <div className="date-picker__weekdays">
      {weekdays.map((day: string, index: number) => (
        <span key={index}>{day}</span>
      ))}
    </div>
  );
}

interface MonthsFormatOptions {
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
}
interface MonthsProps {
  options?: MonthsFormatOptions;
  onMonthChange?: (month?: number) => void;
}
export function MonthsGrid({ options, onMonthChange }: MonthsProps) {
  let { setMonth, locale } = useDatePickerContext();

  const months = [...Array(12).keys()].map(index =>
    new Intl.DateTimeFormat(locale, {
      timeZone: 'UTC',
      month: 'long',
      ...options,
    }).format(Date.UTC(2020, index + 1, 0)),
  );

  return (
    <div className="date-picker__grid--months">
      {months.map((month: string, index: number) => (
        <button
          type="button"
          key={index}
          onClick={() => {
            setMonth(index);
            onMonthChange && onMonthChange(index);
          }}
        >
          {month}
        </button>
      ))}
    </div>
  );
}

function Arrow(props: any) {
  return (
    <svg focusable="false" viewBox="0 0 32 32" aria-hidden {...props}>
      <g stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M10 6L2 16l8 10M2 16h28" />
      </g>
    </svg>
  );
}

interface YearMonthNavRenderProps {
  nextMonth: () => void;
  prevMonth: () => void;
  formatedDate: React.ReactNode[];
}
interface YearMonthNavProps {
  children?: (renderProps: YearMonthNavRenderProps) => React.ReactNode;
  format?: ({ type, value }: { type: string; value: string }) => any;
  options?: any;
}
export function YearMonthNav({
  children,
  format = ({ value }) => <React.Fragment key={value}>{value}</React.Fragment>,
  options,
}: YearMonthNavProps) {
  let { month, setMonth, year, setYear, locale } = useDatePickerContext();
  const formatedDate = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  })
    .formatToParts(Date.UTC(year, month))
    .map(format)
    .reduce((array, part) => [...array, part], []);

  const setMonthLoop = (month: number) => {
    if (month >= 12) {
      setYear(year => year + 1);
    } else if (month < 0) {
      setYear(year => year - 1);
    }
    setMonth(mod(month, 12));
  };

  const prevMonth = () => setMonthLoop(month - 1);
  const nextMonth = () => setMonthLoop(month + 1);

  return (
    <div className="date-picker__month">
      <button type="button" onClick={prevMonth}>
        <VisuallyHidden>Previous month</VisuallyHidden>
        <Arrow />
      </button>
      <div>
        {children
          ? children({ formatedDate, nextMonth, prevMonth })
          : formatedDate}
      </div>
      <button type="button" onClick={nextMonth}>
        <VisuallyHidden>Next month</VisuallyHidden>
        <Arrow style={{ transform: 'rotate(180deg)' }} />
      </button>
    </div>
  );
}

interface DayProps {
  length: number;
  datePart: string;
  className?: any;
  onClick?: any;
  dayOffset?: number;
}
function Day({
  length,
  className,
  datePart,
  onClick,
  dayOffset = 0,
}: DayProps) {
  let { date: selectedDate, setDate, locale } = useDatePickerContext();

  const dayFormat = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <>
      {Array(length)
        .fill(0)
        .map((_, index) => {
          const day = dayOffset + index + 1;
          const date = datePart + day;
          return (
            <button
              className={objstr({
                'date-picker__grid__item': true,
                'date-picker__grid__item--selected': date === selectedDate,
                ...className,
              })}
              key={index}
              type="button"
              onClick={() => {
                setDate(date);
                onClick && onClick();
              }}
            >
              <time>
                {dayFormat
                  .format(new Date(date))
                  .replace(/^\d\d?.$/, day.toString())}
              </time>
            </button>
          );
        })}
    </>
  );
}

interface DayGridProps {
  dir?: 'ltr' | 'rtl';
  showCompleteWeeks?: boolean;
}
export function DayGrid({ showCompleteWeeks, dir = 'ltr' }: DayGridProps) {
  let { month, setMonth, year, weekStart } = useDatePickerContext();

  // NOTE: first day returns 0-6 and and assumes 0 is sunday, so we convert it to start on monday, then apply the weekstart
  const firstDay =
    mod(mod(getFirstDayOfMonth(year, month) + 6, 7) - weekStart, 7) + 1;

  const lastMonthLength = getDaysInMonth(
    month === 0 ? year - 1 : year,
    mod(month - 1, 12) + 1,
  );
  const monthLength = getDaysInMonth(year, month + 1);
  const restDaysEnd = (7 - ((monthLength + firstDay - 1) % 7)) % 7;

  // The .replace removes the 日 chinese and japanese locales, which get added by our number formatter. It's not the cleanest solution but for now it requires the least amount of data, and should support every locale (we need to write a test case).
  return (
    <div
      className="date-picker__grid"
      style={
        {
          '--start-day': showCompleteWeeks ? 1 : firstDay,
        } as React.CSSProperties
      }
      dir={dir}
    >
      {showCompleteWeeks && (
        <Day
          length={firstDay - 1}
          className={{
            'date-picker__grid__item--rest-day': true,
          }}
          dayOffset={lastMonthLength - firstDay + 1}
          datePart={`${month === 0 ? year - 1 : year}-${mod(month - 1, 12) +
            1}-`}
        />
      )}
      <Day length={monthLength} datePart={`${year}-${month + 1}-`} />
      {showCompleteWeeks && (
        <Day
          length={restDaysEnd}
          className={{
            'date-picker__grid__item--rest-day': true,
          }}
          datePart={`${month === 11 ? year + 1 : year}-${mod(month + 1, 12) +
            1}-`}
          onClick={() => {
            setMonth(mod(month + 1, 12));
          }}
        />
      )}
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
      <div className="date-picker dark">{children}</div>
    </DatePickerProvider>
  );
}
