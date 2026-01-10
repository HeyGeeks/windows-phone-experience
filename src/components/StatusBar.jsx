import { useState, useEffect } from 'react';
import { Icon } from './Icons';

export function StatusBar() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <header className="status-bar" role="banner">
            <time
                className="time"
                dateTime={time.toISOString()}
                aria-label={`Current time: ${hours}:${minutes}`}
            >
                {hours}:{minutes}
            </time>
            <div className="status-icons" role="status" aria-label="Device status">
                <Icon name="wifi" size={14} aria-hidden="true" />
                <Icon name="battery" size={14} aria-hidden="true" />
            </div>
        </header>
    );
}

