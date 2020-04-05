import React, { useState, useRef } from 'react';
import { useRect } from '@reach/rect';
// import { action } from '@storybook/addon-actions';
import {
  DatePicker,
  DatePickerPopup,
  DayGrid,
  Weekdays,
  MonthsGrid,
  YearMonthNav,
  DateInput,
} from '../src/datepicker';
import { LocaleSelector } from '../src/locale-selector';
import './stories.css';

export default {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    info: { inline: true },
  },
};

export const Calendar = () => {
  const [firstWeekday, setFirstWeekday] = useState<number>(0);
  const [showCompleteWeeks, setShowCompleteWeeks] = useState<boolean>(true);
  return (
    <>
      <LocaleSelector>
        {locale => (
          <DatePicker locale={locale} firstWeekday={firstWeekday}>
            <YearMonthNav />
            <Weekdays />
            <DayGrid showCompleteWeeks={showCompleteWeeks} />
          </DatePicker>
        )}
      </LocaleSelector>
      <div>
        <label>
          First weekday
          <br />
          <input
            type="range"
            min="0"
            max="6"
            value={firstWeekday}
            onChange={event => setFirstWeekday(Number(event.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Show complete weeks
          <input
            checked={showCompleteWeeks}
            onChange={() => setShowCompleteWeeks(state => !state)}
            type="checkbox"
          />
        </label>
      </div>
    </>
  );
};

// Click on month to show month picker
export const ShowMonthsToggle = () => {
  const [showMonths, setShowMonths] = useState(false);
  return (
    <DatePicker locale="en" firstWeekday={6}>
      <YearMonthNav
        format={({ type, value }) => {
          switch (type) {
            case 'month':
              return (
                <button
                  onClick={() => setShowMonths(state => !state)}
                  key={value}
                >
                  {value}{' '}
                  <svg
                    aria-hidden
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentcolor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    style={{ width: '15px' }}
                  >
                    {showMonths ? (
                      <path d="M30 20 L16 8 2 20" />
                    ) : (
                      <path d="M30 12 L16 24 2 12" />
                    )}
                  </svg>
                </button>
              );
            default:
              return <React.Fragment key={value}>{value}</React.Fragment>;
          }
        }}
      >
        {({ formatedDate }) => {
          return formatedDate;
        }}
      </YearMonthNav>
      {showMonths ? (
        <MonthsGrid onMonthChange={() => setShowMonths(state => !state)} />
      ) : (
        <>
          <Weekdays />
          <DayGrid showCompleteWeeks={true} />
        </>
      )}
    </DatePicker>
  );
};

export const MonthPicker = () => {
  return (
    <DatePicker locale="en" firstWeekday={6}>
      <YearMonthNav options={{ year: undefined }} />
      <MonthsGrid />
    </DatePicker>
  );
};

export const WeekdaysLocale = () => {
  const [weekday, setWeekday] = useState<'narrow' | 'short' | 'long'>('narrow');
  const onChange = (event: any) => setWeekday(event.target.value);
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <DatePicker locale="en">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="zh">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="es">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="ar">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="pt">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="id">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="ja">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="ru">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="fr">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="de">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="tr">
          <Weekdays options={{ weekday }} />
        </DatePicker>
        <DatePicker locale="fa">
          <Weekdays options={{ weekday }} />
        </DatePicker>
      </div>
      <div>
        Weekday format
        <div>
          <label>
            <input
              value="narrow"
              checked={weekday === 'narrow'}
              onChange={onChange}
              type="radio"
            />
            Narrow
          </label>
        </div>
        <div>
          <label>
            <input
              value="short"
              checked={weekday === 'short'}
              onChange={onChange}
              type="radio"
            />
            Short
          </label>
        </div>
        {/* <div> */}
        {/*   <label> */}
        {/*     <input */}
        {/*       value="long" */}
        {/*       checked={weekday === 'long'} */}
        {/*       onChange={onChange} */}
        {/*       type="radio" */}
        {/*     /> */}
        {/*     long */}
        {/*   </label> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export const Grid = () => {
  return (
    <DatePicker>
      <DayGrid />
    </DatePicker>
  );
};

export const RtlGrid = () => {
  return (
    <DatePicker>
      <DayGrid dir="rtl" />
    </DatePicker>
  );
};

const StoryInput = React.forwardRef((props: any, ref: any) => {
  return (
    <label ref={ref} className="story-input">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M2 6v24h28V6zm0 9h28M7 3v6m6-6v6m6-6v6m6-6v6" />
        </g>
      </svg>
      <DateInput {...props} />
    </label>
  );
});

export const CalendarInput = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState<string | null | undefined>(null);

  const ref = useRef(null);
  const rect = useRect(ref);

  return (
    <>
      <DatePicker locale="en" firstWeekday={6} selectedDate={date}>
        <StoryInput
          ref={ref}
          onFocus={() => setShowDatePicker(true)}
          onSubmit={setDate}
        />
        {showDatePicker && (
          <DatePickerPopup rect={rect}>
            <YearMonthNav />
            <Weekdays />
            <DayGrid showCompleteWeeks={true} />
          </DatePickerPopup>
        )}
      </DatePicker>
      Other content...
    </>
  );
};
