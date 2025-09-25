"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import EventCard, { Event } from '../components/EventCard';
import TimelineDay from '../components/TimelineDay';
import CustomDropdown, { DropdownOption } from '../components/CustomDropdown';
import Modal from '../components/Modal';
import ProfileSection from '../components/ProfileSection';
import { fetchEvents } from '../lib/api';
import { FiSearch, FiUser } from 'react-icons/fi';

const sortChoices: DropdownOption[] = [
    { value: 'time', label: 'Sort by Time' },
    { value: 'title', label: 'Sort by Title' },
];

type EventData = {
    id: string;
    title: string;
    description: string;
    location: string;
    platform: string;
    link: string;
    startTime: string; // This is an ISO date string
    endTime: string;
    source: string;
    sourceId: string;
};

const HomePage = () => {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [search, setSearch] = useState('');
    const [show, setShow] = useState<'upcoming' | 'past'>('upcoming');
    const [sort, setSort] = useState<'time' | 'title'>('time');
    
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isProfileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const response = await fetchEvents();
                const eventData = response.data;

                // Changed 'evt' to 'event' for better readability
                const formattedEvents = eventData.map((event: EventData) => ({
                    ...event,
                    date: event.startTime.split('T')[0],
                    time: new Date(event.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    locationDetail: event.location,
                    locationType: event.platform === 'online' ? 'Online' : 'In-person'
                }));
                
                setAllEvents(formattedEvents);

            } catch (err) {
                console.error("Failed to fetch events:", err);
                setError("Could not load events. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents();
    }, []);

    const displayedEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredEvents = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            const matchesDate = show === 'upcoming' ? eventDate >= today : eventDate < today;
            const matchesSearch = !search || 
                                  event.title.toLowerCase().includes(search.toLowerCase()) || 
                                  event.description.toLowerCase().includes(search.toLowerCase());
            return matchesDate && matchesSearch;
        });

        filteredEvents.sort((a, b) => {
            if (sort === 'title') return a.title.localeCompare(b.title);
            return a.time.localeCompare(b.time);
        });

        return filteredEvents.reduce((acc, event) => {
            const dateKey = event.date;
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(event);
            return acc;
        }, {} as Record<string, Event[]>);
    }, [allEvents, search, show, sort]);

    const handleCancelEvent = (eventId: string) => {
        setAllEvents(prevEvents => prevEvents.filter(e => e.id !== eventId));
    };

    const formatDateDetails = (dateString: string) => {
        const date = new Date(dateString);
        return {
            label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
            isToday: new Date().toDateString() === date.toDateString(),
        };
    };
  
    const renderContent = () => {
        if (isLoading) return <div className="text-center py-20 text-gray-400">Loading events...</div>;
        if (error) return <div className="text-center py-20 text-red-400">{error}</div>;
        if (Object.keys(displayedEvents).length === 0) return <div className="text-center py-20 text-gray-400">No events found.</div>;
        
        return (
            Object.keys(displayedEvents).sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map(dateKey => {
                const dayInfo = formatDateDetails(dateKey);
                return (
                    <div key={dateKey} className="flex gap-6">
                        <TimelineDay date={dayInfo.label} dayOfWeek={dayInfo.weekday} isToday={dayInfo.isToday} />
                        <div className="flex-grow space-y-4 border-l-2 border-gray-700/50 pl-6">
                            {displayedEvents[dateKey].map(event => (
                                <EventCard 
                                    key={event.id}
                                    event={event} 
                                    onCancel={handleCancelEvent}
                                    onOpen={setSelectedEvent} 
                                />
                            ))}
                        </div>
                    </div>
                );
            })
        );
    };
  
    return (
        <div className="min-h-screen text-white p-8 font-sans bg-[#161616]">
            <div className="max-w-5xl mx-auto">
                <Header
                    leftContent={<button className="text-2xl cursor-pointer hover:text-gray-300">←</button>}
                    title="All Events"
                    rightContent={
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setProfileOpen(true)} className="w-10 h-10 rounded-full border-2 border-[#A6A2FF] bg-[#161616] flex items-center justify-center hover:bg-gray-700">
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
                            placeholder="Search events..."
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
                        <CustomDropdown options={sortChoices} value={sort} onChange={(value) => setSort(value as 'time' | 'title')} className="w-48" />
                    </div>
                </div>
                <div className="mt-12 space-y-8">
                    {renderContent()}
                </div>
                <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
                    {selectedEvent && (
                      <div className="text-white p-4">
                        <h2 className="text-xl font-bold mb-4">{selectedEvent.title}</h2>
                        <p className="text-base text-gray-300 mb-2">{formatDateDetails(selectedEvent.date).weekday}, {formatDateDetails(selectedEvent.date).label} at {selectedEvent.time}</p>
                        <p className="text-base my-4">{selectedEvent.description}</p>
                        <p className="text-base"><span className="font-semibold">Location:</span> {selectedEvent.locationType === 'Online' ? 'Online' : selectedEvent.locationDetail}</p>
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