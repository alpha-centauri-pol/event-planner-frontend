"use client";

import React from 'react';
import { MdDescription, MdLocationOn } from "react-icons/md";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  platform: string;
  link:string;
  startTime: string;
  endTime: string;
  source: string;
  sourceId: string;
};

type EventCardProps = {
  event: Event;
  onCancel: (eventId: string) => void;
  onOpen: (event: Event) => void; 
};

const EventCard: React.FC<EventCardProps> = ({ event, onCancel, onOpen }) => {
  const startDate = new Date(event.startTime);

  const eventTime = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const eventDay = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return (
    <div
      onClick={() => onOpen(event)}
      className="bg-[#1D1C2C] hover:bg-[#21202e] hover:border-[#4844A2] rounded-2xl p-3 flex flex-col sm:flex-row justify-between items-start text-white border-2 max-w-full border-[#312E72] cursor-pointer"
    >
      <div className='flex p-2 gap-4 flex-grow min-w-0'>
        <div className="flex flex-col min-w-0">
          <p className="text-[#BBBBC0] text-sm font-semibold">
            {`${eventTime}, ${eventDay}`}
          </p>
          <div>
            <p className="font-semibold text-lg mt-1 truncate">{event.title}</p>
            
            <div className="flex items-center gap-2 text-[#C3BFFF] text-sm font-semibold mt-1">
              <MdDescription className="h-4 w-4 flex-shrink-0" />
              <p className="truncate min-w-0">{event.description}</p>
            </div>
            
            <div className="flex items-center gap-2 text-[#C3BFFF] text-sm font-semibold mt-1">
              <MdLocationOn className="h-4 w-4 flex-shrink-0" />
              <p className="truncate min-w-0">{event.platform === 'Online' ? 'Online' : event.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 w-full sm:w-auto"
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onCancel(event.id); }}
          className="text-center justify-start text-[#C3BFFF] text-base font-semibold border-2 border-[#5D59AD] rounded-md px-4 py-3 hover:text-white hover:border-white w-full"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EventCard;