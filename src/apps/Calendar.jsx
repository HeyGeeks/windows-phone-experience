import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Calendar.css';

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

const SAMPLE_EVENTS = [
    { id: 1, title: 'team meeting', time: '10:00 am', color: '#0078D7' },
    { id: 2, title: 'lunch with alex', time: '12:30 pm', color: '#107C10' },
    { id: 3, title: 'project review', time: '3:00 pm', color: '#D83B01' },
];

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pivot, setPivot] = useState('day');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    const isSelected = (day) => {
        return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
    };

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="wp-cal-day empty" />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(
            <div
                key={day}
                className={`wp-cal-day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
                onClick={() => setSelectedDate(new Date(year, month, day))}
            >
                {day}
            </div>
        );
    }

    return (
        <AppShell title="calendar" hideTitle>
            <div className="wp-calendar">
                <h1 className="wp-calendar-title">Calendar</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'day' ? 'active' : ''}`} onClick={() => setPivot('day')}>day</button>
                    <button className={`wp-pivot ${pivot === 'month' ? 'active' : ''}`} onClick={() => setPivot('month')}>month</button>
                    <button className={`wp-pivot ${pivot === 'agenda' ? 'active' : ''}`} onClick={() => setPivot('agenda')}>agenda</button>
                </div>

                {pivot === 'day' && (
                    <div className="wp-day-view">
                        <div className="wp-day-header">
                            <span className="wp-day-date">{selectedDate.getDate()}</span>
                            <div className="wp-day-info">
                                <span className="wp-day-name">{selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()}</span>
                                <span className="wp-day-month">{MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span>
                            </div>
                        </div>
                        <div className="wp-events-list">
                            {SAMPLE_EVENTS.map(event => (
                                <div key={event.id} className="wp-event-item">
                                    <div className="wp-event-indicator" style={{ background: event.color }} />
                                    <div className="wp-event-info">
                                        <span className="wp-event-title">{event.title}</span>
                                        <span className="wp-event-time">{event.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {pivot === 'month' && (
                    <div className="wp-month-view">
                        <div className="wp-month-header">
                            <button className="wp-nav-btn" onClick={prevMonth}><Icon name="back" size={20} /></button>
                            <span className="wp-month-title">{MONTHS[month]} {year}</span>
                            <button className="wp-nav-btn" onClick={nextMonth}><Icon name="forward" size={20} /></button>
                        </div>
                        <div className="wp-weekdays">
                            {DAYS.map(day => <div key={day} className="wp-weekday">{day}</div>)}
                        </div>
                        <div className="wp-cal-grid">{days}</div>
                    </div>
                )}

                {pivot === 'agenda' && (
                    <div className="wp-agenda-view">
                        <div className="wp-agenda-day">
                            <div className="wp-agenda-date">
                                <span className="wp-agenda-day-num">{new Date().getDate()}</span>
                                <span className="wp-agenda-day-name">today</span>
                            </div>
                            <div className="wp-agenda-events">
                                {SAMPLE_EVENTS.map(event => (
                                    <div key={event.id} className="wp-agenda-event">
                                        <span className="wp-agenda-time">{event.time}</span>
                                        <span className="wp-agenda-title">{event.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
