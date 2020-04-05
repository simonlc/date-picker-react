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
        {(locale, renderSelect) => (
          <div style={{ display: 'flex' }}>
            <DatePicker locale={locale} firstWeekday={firstWeekday}>
              <div className="date-picker__content">
                <YearMonthNav />
                <Weekdays />
                <DayGrid showCompleteWeeks={showCompleteWeeks} />
              </div>
            </DatePicker>
            <div style={{ marginLeft: 20 }}>
              {renderSelect()}
              <div>
                <div style={{ marginBottom: 10, marginTop: 20 }}>
                  <b>First weekday</b>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value={0}
                      checked={firstWeekday === 0}
                      onChange={event =>
                        setFirstWeekday(Number(event.target.value))
                      }
                    />
                    Monday
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value={4}
                      checked={firstWeekday === 4}
                      onChange={event =>
                        setFirstWeekday(Number(event.target.value))
                      }
                    />
                    Friday
                  </label>
                  <div></div>
                  <label>
                    <input
                      type="radio"
                      value={5}
                      checked={firstWeekday === 5}
                      onChange={event =>
                        setFirstWeekday(Number(event.target.value))
                      }
                    />
                    Saturday
                  </label>
                  <div></div>
                  <label>
                    <input
                      type="radio"
                      value={6}
                      checked={firstWeekday === 6}
                      onChange={event =>
                        setFirstWeekday(Number(event.target.value))
                      }
                    />
                    Sunday
                  </label>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <label>
                  <input
                    checked={showCompleteWeeks}
                    onChange={() => setShowCompleteWeeks(state => !state)}
                    type="checkbox"
                  />
                  Show complete weeks
                </label>
              </div>
            </div>
          </div>
        )}
      </LocaleSelector>
    </>
  );
};

// Click on month to show month picker
export const ShowMonthsToggle = () => {
  const [showMonths, setShowMonths] = useState(false);
  return (
    <DatePicker locale="en" firstWeekday={6}>
      <div className="date-picker__content">
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
      </div>
    </DatePicker>
  );
};

export const MonthPicker = () => {
  return (
    <DatePicker locale="en" firstWeekday={6}>
      <div className="date-picker__content">
        <YearMonthNav options={{ year: undefined }} />
        <MonthsGrid />
      </div>
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
          placeholder="Date"
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
