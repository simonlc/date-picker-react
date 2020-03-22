import React from 'react';
// import { action } from '@storybook/addon-actions';
import { DatePicker } from '../src/datepicker';

export default {
  title: 'DatePicker',
  component: DatePicker,
  parameters: {
    info: { inline: true },
  },
};

export const Calendar = () => <DatePicker />;
