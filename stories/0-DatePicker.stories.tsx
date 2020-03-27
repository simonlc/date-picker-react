import React, { useState } from 'react';
// import { action } from '@storybook/addon-actions';
import { DatePicker, DayGrid, Weekdays, YearMonthNav } from '../src/datepicker';
import { LocaleSelector } from '../src/locale-selector';

export default {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    info: { inline: true },
  },
};

export const Calendar = () => {
  const [firstWeekday, setFirstWeekday] = useState<number>(0);
  return (
    <>
      <LocaleSelector>
        {locale => (
          <DatePicker locale={locale} firstWeekday={firstWeekday}>
            <YearMonthNav />
            <Weekdays />
            <DayGrid />
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
    </>
  );
};

export const WeekdaysLocale = () => (
  <>
    <DatePicker locale="en">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="zh">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="es">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="ar">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="pt">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="id">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="ja">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="ru">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="fr">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="de">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="tr">
      <Weekdays />
    </DatePicker>
    <DatePicker locale="fa">
      <Weekdays />
    </DatePicker>
  </>
);

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
