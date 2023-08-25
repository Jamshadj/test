import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';

export default function Calendar() {
  // Get the current date
  const currentDate = dayjs();
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar date={currentDate.toDate()} />
        </LocalizationProvider>
      </div>
    </div>
  );
}
