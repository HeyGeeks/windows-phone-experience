import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import './Calendar.css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
    };

    const isSelected = (day) => {
        return day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear();
    };

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(
            <div
                key={day}
                className={`calendar-day ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
                onClick={() => setSelectedDate(new Date(year, month, day))}
            >
                {day}
            </div>
        );
    }

    return (
        <AppShell title="calendar">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button className="nav-arrow" onClick={prevMonth}>‹</button>
                    <span className="calendar-month">{MONTHS[month]} {year}</span>
                    <button className="nav-arrow" onClick={nextMonth}>›</button>
                </div>

                <div className="calendar-weekdays">
                    {DAYS.map(day => (
                        <div key={day} className="weekday">{day}</div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {days}
                </div>

                <div className="selected-date-info">
                    <h2 className="section-title">
                        {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h2>
                    <p className="no-events">No events scheduled</p>
                </div>
            </div>
        </AppShell>
    );
}
