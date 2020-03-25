import React, { useState } from 'react';
// import { action } from '@storybook/addon-actions';
import { DatePicker, DayGrid, Weekdays, MonthPicker } from '../src/datepicker';
import { LocaleSelector } from '../src/locale-selector';

export default {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    info: { inline: true },
  },
};

export const Calendar = () => (
  <LocaleSelector>
    {locale => (
      <DatePicker locale={locale}>
        <MonthPicker />
        <Weekdays />
        <DayGrid startDay={1} length={28} />
      </DatePicker>
    )}
  </LocaleSelector>
);

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
  const [startDay, setStartDay] = useState<number>(1);
  const [length, setLength] = useState<number>(30);
  return (
    <DatePicker>
      <DayGrid startDay={startDay} length={length} />
      <div>
        <label>
          Month length
          <br />
          <input
            type="range"
            min="28"
            max="31"
            value={length}
            onChange={event => setLength(Number(event.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Start day
          <br />
          <input
            type="range"
            min="1"
            max="7"
            value={startDay}
            onChange={event => setStartDay(Number(event.target.value))}
          />
        </label>
      </div>
    </DatePicker>
  );
};

export const RtlGrid = () => {
  return (
    <DatePicker>
      <DayGrid startDay={3} length={31} dir="rtl" />
    </DatePicker>
  );
};
