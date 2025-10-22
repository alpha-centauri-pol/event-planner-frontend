"use client";

import React from 'react';

type TimelineDayProps = {
  date: string;
  dayOfWeek: string;
  isToday?: boolean;
};

const TimelineDay: React.FC<TimelineDayProps> = ({ date, dayOfWeek, isToday }) => {
  return (
    <div className="w-full text-left py-2 px-2 md:w-24 md:text-right flex-shrink-0">
      <p className={`font-bold text-base md:text-lg ${isToday ? 'text-violet-400' : 'text-white'}`}>{date}</p>
      <p className={`text-xs md:text-sm ${isToday ? 'text-violet-300' : 'text-gray-400'}`}>{dayOfWeek}</p>
    </div>
  );
};

export default TimelineDay;