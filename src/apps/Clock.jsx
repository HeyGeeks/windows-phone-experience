import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import './Clock.css';

export function Clock() {
    const [time, setTime] = useState(new Date());
    const [alarms, setAlarms] = useState(() => {
        const saved = localStorage.getItem('alarms');
        return saved ? JSON.parse(saved) : [
            { id: 1, time: '07:00', label: 'Wake up', active: true },
            { id: 2, time: '09:00', label: 'Meeting', active: false },
        ];
    });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }, [alarms]);

    const toggleAlarm = (id) => {
        setAlarms(alarms.map(a =>
            a.id === id ? { ...a, active: !a.active } : a
        ));
    };

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const date = time.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    return (
        <AppShell title="Alarms & Clock">
            <div className="clock-container">
                <div className="clock-time">
                    <span className="clock-hours">{hours}</span>
                    <span className="clock-separator">:</span>
                    <span className="clock-minutes">{minutes}</span>
                    <span className="clock-seconds">{seconds}</span>
                </div>
                <div className="clock-date">{date}</div>

                <div className="alarms-section">
                    <h2 className="section-title">Alarms</h2>
                    {alarms.map(alarm => (
                        <div key={alarm.id} className="alarm-item">
                            <div className="alarm-info">
                                <span className="alarm-time">{alarm.time}</span>
                                <span className="alarm-label">{alarm.label}</span>
                            </div>
                            <div
                                className={`toggle-switch ${alarm.active ? 'active' : ''}`}
                                onClick={() => toggleAlarm(alarm.id)}
                            />
                        </div>
                    ))}
                </div>

                <div className="world-clock-section">
                    <h2 className="section-title">World clock</h2>
                    <div className="world-clock-item">
                        <span className="city">New York</span>
                        <span className="city-time">
                            {new Date().toLocaleTimeString('en-US', {
                                timeZone: 'America/New_York',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                    <div className="world-clock-item">
                        <span className="city">London</span>
                        <span className="city-time">
                            {new Date().toLocaleTimeString('en-US', {
                                timeZone: 'Europe/London',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                    <div className="world-clock-item">
                        <span className="city">Tokyo</span>
                        <span className="city-time">
                            {new Date().toLocaleTimeString('en-US', {
                                timeZone: 'Asia/Tokyo',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
