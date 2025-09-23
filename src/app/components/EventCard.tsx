"use client";

import React from 'react';
import { MdDescription, MdLocationOn } from "react-icons/md";

export type Event = {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  locationType: 'Online' | 'In-person';
  locationDetail: string;
};

type EventCardProps = {
  event: Event;
  onCancel: (eventId: string) => void;
  onOpen: (event: Event) => void; // callback for opening modal
};

const EventCard: React.FC<EventCardProps> = ({ event, onCancel, onOpen }) => {
  const eventTime = new Date(`${event.date} ${event.time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const eventDay = new Date(`${event.date}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return (
    <div
      onClick={() => onOpen(event)}
      className=" bg-[#1D1C2C] hover:bg-[#21202e] hover:border-[#4844A2] rounded-2xl p-3 flex justify-between items-start text-white border-2 border-[#312E72]"
    >
      <div className='flex p-2 gap-4'>
        <div className="h-25 aspect-square bg-[#43424F] relative rounded-lg" />
        <div className="flex flex-col">
          <p className="text-[#BBBBC0] text-sm font-semibold">
            {`${eventTime}, ${eventDay}`}
          </p>
          <div>
            <p className="font-semibold text-lg mt-1">{event.title}</p>
            <div className="flex items-center gap-2 text-[#C3BFFF] text-sm font-semibold mt-1">
              <MdDescription className="h-4 w-4" />
              <p>{event.description}</p>
            </div>
            <div className="flex items-center gap-2 text-[#C3BFFF] text-sm font-semibold mt-1">
              <MdLocationOn className="h-4 w-4" />
              <p>{event.locationType === 'Online' ? 'Online Link' : event.locationDetail}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="ml-6 flex-shrink-0"
        onClick={(e) => { e.stopPropagation(); onCancel(event.id); }} // prevent modal when removing
      >
        <button
          className="text-center justify-start text-[#C3BFFF] text-base font-semibold border-2 border-[#5D59AD] rounded-md px-2 py-1 hover:text-white hover:border-white"
        >
          Remove from calendar
        </button>
      </div>
    </div>
  );
};

export default EventCard;
