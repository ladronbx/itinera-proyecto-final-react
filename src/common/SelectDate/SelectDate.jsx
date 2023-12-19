import React, { useState } from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const SelectDate = ({ onDateChange }) => {
  const [dates, setDates] = useState(null);
  const [value, setValue] = useState(null);

  const disabledDate = (current) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isBeforeToday = current && current.valueOf() < today.valueOf();
  
    if (!dates || isBeforeToday) {
      return isBeforeToday;
    }
  
    const tooLate = dates[0] && current.diff(dates[0], 'days') >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 7;
    return !!tooEarly || !!tooLate;
  };
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <RangePicker
      value={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => {
        setDates(val);
        if (onDateChange) {
          onDateChange(val);
        }
      }}
      onChange={(val) => {
        setValue(val);
      }}
      onOpenChange={onOpenChange}
      changeOnBlur
    />
  );
};

export default SelectDate;