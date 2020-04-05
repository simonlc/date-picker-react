import React from 'react';
import { DatePicker, DayGrid } from '../src/datepicker';
import './stories.css';

export default {
  title: 'DayGrid',
  component: DayGrid,
  parameters: {
    info: { inline: true },
  },
};

export const Grid = () => {
  return (
    <DatePicker>
      <div className="date-picker__content">
        <DayGrid />
      </div>
    </DatePicker>
  );
};

export const RtlGrid = () => {
  return (
    <DatePicker>
      <div className="date-picker__content">
        <DayGrid dir="rtl" />
      </div>
    </DatePicker>
  );
};
