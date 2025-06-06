import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('calendarEvents');
    return saved ? JSON.parse(saved) : {};
  });
  const [newEventText, setNewEventText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const dateKey = date.toDateString();

  const addEvent = () => {
    if (!newEventText.trim()) return;
    const updatedEvents = { ...events };
    if (!updatedEvents[dateKey]) updatedEvents[dateKey] = [];
    updatedEvents[dateKey].push(newEventText.trim());
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setNewEventText('');
    setShowInput(false);
  };

  const deleteEvent = (idx) => {
    const updatedEvents = { ...events };
    updatedEvents[dateKey].splice(idx, 1);
    if (updatedEvents[dateKey].length === 0) delete updatedEvents[dateKey];
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Calendar</h2>
      <Calendar onChange={setDate} value={date} className="dark:text-white" />
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 dark:text-white">{dateKey}</h3>
        {events[dateKey]?.length ? (
          <ul className="list-disc list-inside">
            {events[dateKey].map((ev, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{ev}</span>
                <button
                  onClick={() => deleteEvent(idx)}
                  className="text-red-600 hover:text-red-800 ml-4"
                  aria-label="Delete event"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-300">No events for this day.</p>
        )}

        {showInput ? (
          <div className="mt-2 flex">
            <input
              type="text"
              autoFocus
              value={newEventText}
              onChange={(e) => setNewEventText(e.target.value)}
              className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              placeholder="Event description"
            />
            <button
              onClick={addEvent}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => setShowInput(false)}
              className="ml-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Event
          </button>
        )}
      </div>
    </div>
  );
}
