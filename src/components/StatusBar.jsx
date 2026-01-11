import { useState, useEffect } from 'react';
import { Icon } from './Icons';
import './StatusBar.css';

export function StatusBar({ onActionCenter }) {
    const [time, setTime] = useState(new Date());
    const [batteryLevel] = useState(99);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <header 
            className="status-bar" 
            role="banner"
            onClick={onActionCenter}
        >
            {/* Left side - Signal and network */}
            <div className="status-left">
                <div className="signal-bars">
                    <span className="bar bar-1 active"></span>
                    <span className="bar bar-2 active"></span>
                    <span className="bar bar-3 active"></span>
                    <span className="bar bar-4 active"></span>
                    <span className="bar bar-5"></span>
                </div>
                <Icon name="wifi" size={12} />
            </div>

            {/* Right side - Battery and time */}
            <div className="status-right">
                <div className="battery-indicator">
                    <div className="battery-body">
                        <div className="battery-level" style={{ width: `${batteryLevel}%` }}></div>
                    </div>
                    <div className="battery-tip"></div>
                </div>
                <time
                    className="status-time"
                    dateTime={time.toISOString()}
                    aria-label={`Current time: ${hours}:${minutes}`}
                >
                    {hours}:{minutes}
                </time>
            </div>
        </header>
    );
}
