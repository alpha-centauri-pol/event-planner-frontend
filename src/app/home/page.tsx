"use client";

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import EventCard, { Event } from '../components/EventCard';
import TimelineDay from '../components/TimelineDay';
import CustomDropdown, { DropdownOption } from '../components/CustomDropdown';
import Modal from '../components/Modal';
import ProfileSection from '../components/ProfileSection';
import { FiSearch, FiUser } from 'react-icons/fi';

const startingEvents: Event[] = [
    { id: '1', date: '2025-09-24', time: '10:00 AM', title: 'Daily Standup', description: 'Team sync for project Alpha', locationType: 'Online', locationDetail: 'meet.google.com/abc' },
    { id: '2', date: '2025-09-24', time: '02:00 PM', title: 'Design Review', description: 'Review the new dashboard design', locationType: 'Online', locationDetail: 'zoom.us/xyz' },
    { id: '3', date: '2025-09-25', time: '11:30 AM', title: 'Client Meeting', description: 'Discuss Q4 goals with Acme Corp', locationType: 'In-person', locationDetail: 'Conference Room 4' },
    { id: '4', date: '2025-09-22', time: '04:00 PM', title: 'Product Sprint Planning (Past)', description: 'Plan the upcoming sprint', locationType: 'Online', locationDetail: 'meet.google.com/def' },
];
  
const sortChoices: DropdownOption[] = [
    { value: 'time', label: 'Sort by Time' },
    { value: 'title', label: 'Sort by Title' },
];

const filterAndSortEvents = (
    events: Event[], 
    show: 'upcoming' | 'past', 
    search: string, 
    sort: 'time' | 'title'
): Event[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredByDate = events.filter(event => {
        const eventDate = new Date(event.date);
        return show === 'upcoming' ? eventDate >= today : eventDate < today;
    });

    const filteredBySearch = filteredByDate.filter(event => {
        const searchTerm = search.toLowerCase();
        return !searchTerm || 
               event.title.toLowerCase().includes(searchTerm) ||
               event.description.toLowerCase().includes(searchTerm);
    });

    const sortedEvents = [...filteredBySearch].sort((a, b) => {
        if (sort === 'title') {
            return a.title.localeCompare(b.title);
        }
        return a.time.localeCompare(b.time);
    });

    return sortedEvents;
};

const groupEventsByDate = (events: Event[]): Record<string, Event[]> => {
    const grouped: Record<string, Event[]> = {};
    for (const event of events) {
        const dateKey = event.date;
        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }
        grouped[dateKey].push(event);
    }
    return grouped;
};

const formatDateDetails = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate();

    return {
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
        isToday: isToday,
    };
};
  
const HomePage = () => {
    const [events, setEvents] = useState<Event[]>(startingEvents);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState<'upcoming' | 'past'>('upcoming');
    const [sort, setSort] = useState<'time' | 'title'>('time');
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isProfileOpen, setProfileOpen] = useState(false);
  
    const handleCancelEvent = (eventId: string) => {
        const updatedEvents = events.filter(e => e.id !== eventId);
        setEvents(updatedEvents);
    };
  
    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };
  
    const displayedEvents = useMemo(() => {
        const processedEvents = filterAndSortEvents(events, show, search, sort);
        return groupEventsByDate(processedEvents);
    }, [events, search, show, sort]);
  
    return (
        <div className="min-h-screen text-white p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <Header
                    leftContent={
                        <button className="text-2xl cursor-pointer hover:text-gray-300">←</button>
                    }
                    title="All Events"
                    rightContent={
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setProfileOpen(true)}
                                className="w-10 h-10 rounded-full border-2 border-[#A6A2FF] bg-[#161616] flex items-center justify-center hover:bg-gray-700">
                                <FiUser className="w-5 h-5 text-[#A6A2FF]" />
                            </button>
                        </div>
                    }
                />

                <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between w-full">
                    <div className="relative w-full md:w-1/2">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search events by title or description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#1D1C2C] border-2 border-[#312E72] rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-white"
                        />
                    </div>
                    <div className="flex items-center gap-4 h-full">
                        <div className="flex flex-grow h-full bg-[#1D1C2C] rounded-lg items-stretch border-[#312E72] border-2">
                            <button onClick={() => setShow('upcoming')} className={`px-4 py-3.5 text-sm font-semibold rounded-md ${show === 'upcoming' ? 'bg-[#5D59AD]' : ''}`}>Upcoming</button>
                            <button onClick={() => setShow('past')} className={`px-4 py-3 text-sm font-semibold rounded-md ${show === 'past' ? 'bg-[#5D59AD]' : ''}`}>Past</button>
                        </div>
                        <CustomDropdown
                            options={sortChoices}
                            value={sort}
                            onChange={(value) => setSort(value as 'time' | 'title')}
                            className="w-48"
                        />
                    </div>
                </div>

                <div className="mt-12 space-y-8">
                    {Object.keys(displayedEvents).length > 0 ? (
                        Object.keys(displayedEvents).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map(dateKey => {
                            const dayInfo = formatDateDetails(dateKey);
                            const dayEvents = displayedEvents[dateKey];
                            return (
                                <div key={dateKey} className="flex gap-6">
                                    <TimelineDay date={dayInfo.label} dayOfWeek={dayInfo.weekday} isToday={dayInfo.isToday} />
                                    <div className="flex-grow space-y-4 border-l-2 border-gray-700/50 pl-6">
                                        {dayEvents.map(event => (
                                            <div key={event.id} className="cursor-pointer" onClick={() => handleEventClick(event)}>
                                                <EventCard 
                                                    event={event} 
                                                    onCancel={handleCancelEvent}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400">No events found for the selected criteria.</p>
                        </div>
                    )}
                </div>
                
                <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
                    {selectedEvent && (
                      <div className="text-white p-4">
                        <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
                        <p className="text-base text-gray-300 mb-2">
                            {formatDateDetails(selectedEvent.date).weekday}, {formatDateDetails(selectedEvent.date).label} at {selectedEvent.time}
                        </p>
                        <p className="text-base my-4">{selectedEvent.description}</p>
                        <p className="text-base">
                          <span className="font-semibold">Location:</span> {selectedEvent.locationType === 'Online' ? 'Online' : selectedEvent.locationDetail}
                        </p>
                         {selectedEvent.locationType === 'Online' && <p className="text-sm text-blue-400">{selectedEvent.locationDetail}</p>}
                      </div>
                    )}
                </Modal>
                
                <Modal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)}>
                    <ProfileSection />
                </Modal>
            </div>
        </div>
    );
};

export default HomePage;
