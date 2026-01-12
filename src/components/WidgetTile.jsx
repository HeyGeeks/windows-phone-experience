import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Icon } from './Icons';
import { useTileTilt } from '../hooks/useTileTilt';

export function WidgetTile({ type, size = 'medium', route, delay = 0 }) {
    const { tileRef, handlers } = useTileTilt();
    const { accentColor } = useTheme();
    const navigate = useNavigate();

    const handleClick = () => {
        if (route) navigate(route);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            ref={tileRef}
            className={`tile tile-${size} tile-animate widget-tile widget-${type}`}
            style={{ background: accentColor, animationDelay: `${delay * 0.03}s` }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`${type} widget`}
            {...handlers}
        >
            {type === 'calendar' && <CalendarWidget />}
            {type === 'clock' && <ClockWidget />}
            {type === 'weather' && <WeatherWidget />}
        </div>
    );
}

function CalendarWidget() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNum = date.getDate();
    const monthName = date.toLocaleDateString('en-US', { month: 'long' });

    return (
        <div className="widget-calendar">
            <span className="widget-calendar-day">{dayName}</span>
            <span className="widget-calendar-date">{dayNum}</span>
            <span className="widget-calendar-month">{monthName}</span>
        </div>
    );
}

function ClockWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const displayHours = hours % 12 || 12;

    return (
        <div className="widget-clock">
            <Icon name="alarm" className="widget-clock-icon" />
            <span className="widget-clock-time">{displayHours}:{minutes}</span>
        </div>
    );
}

function WeatherWidget() {
    const [temp] = useState(72);
    const [condition] = useState('Sunny');

    return (
        <div className="widget-weather">
            <Icon name="weather" className="widget-weather-icon" />
            <div className="widget-weather-info">
                <span className="widget-weather-temp">{temp}°</span>
                <span className="widget-weather-condition">{condition}</span>
            </div>
        </div>
    );
}
