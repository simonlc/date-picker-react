import React, { useState } from 'react';
import { DatePicker, Weekdays } from '../src/datepicker';
import './stories.css';

export default {
  title: 'Weekday',
  component: Weekdays,
  parameters: {
    info: { inline: true },
  },
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
      </div>
    </div>
  );
};
