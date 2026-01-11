import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Toggle } from '../components/Toggle';
import { Icon } from '../components/Icons';
import './Clock.css';

export function Clock() {
    const [time, setTime] = useState(new Date());
    const [pivot, setPivot] = useState('alarm');
    const [alarms, setAlarms] = useState([
        { id: 1, time: '07:00', label: 'wake up', active: true, days: 'weekdays' },
        { id: 2, time: '09:00', label: 'meeting', active: false, days: 'mon, wed, fri' },
    ]);
    const [stopwatchTime, setStopwatchTime] = useState(0);
    const [stopwatchRunning, setStopwatchRunning] = useState(false);
    const [timerTime, setTimerTime] = useState(300);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let interval;
        if (stopwatchRunning) {
            interval = setInterval(() => setStopwatchTime(t => t + 10), 10);
        }
        return () => clearInterval(interval);
    }, [stopwatchRunning]);

    useEffect(() => {
        let interval;
        if (timerRunning && timerTime > 0) {
            interval = setInterval(() => setTimerTime(t => t - 1), 1000);
        } else if (timerTime === 0) {
            setTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [timerRunning, timerTime]);

    const toggleAlarm = (id) => setAlarms(alarms.map(a => a.id === id ? { ...a, active: !a.active } : a));

    const formatStopwatch = (ms) => {
        const mins = Math.floor(ms / 60000);
        const secs = Math.floor((ms % 60000) / 1000);
        const centis = Math.floor((ms % 1000) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
    };

    const formatTimer = (secs) => {
        const mins = Math.floor(secs / 60);
        const s = secs % 60;
        return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return (
        <AppShell title="alarms" hideTitle>
            <div className="wp-clock">
                <h1 className="wp-clock-title">alarms</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'alarm' ? 'active' : ''}`} onClick={() => setPivot('alarm')}>alarm</button>
                    <button className={`wp-pivot ${pivot === 'world' ? 'active' : ''}`} onClick={() => setPivot('world')}>world clock</button>
                    <button className={`wp-pivot ${pivot === 'stopwatch' ? 'active' : ''}`} onClick={() => setPivot('stopwatch')}>stopwatch</button>
                    <button className={`wp-pivot ${pivot === 'timer' ? 'active' : ''}`} onClick={() => setPivot('timer')}>timer</button>
                </div>

                {pivot === 'alarm' && (
                    <div className="wp-alarm-list">
                        {alarms.map(alarm => (
                            <div key={alarm.id} className="wp-alarm-item">
                                <div className="wp-alarm-info">
                                    <span className="wp-alarm-time">{alarm.time}</span>
                                    <span className="wp-alarm-label">{alarm.label}</span>
                                    <span className="wp-alarm-days">{alarm.days}</span>
                                </div>
                                <Toggle active={alarm.active} onChange={() => toggleAlarm(alarm.id)} />
                            </div>
                        ))}
                        <button className="wp-add-alarm"><Icon name="add" size={24} /> add alarm</button>
                    </div>
                )}

                {pivot === 'world' && (
                    <div className="wp-world-clock">
                        <div className="wp-local-time">
                            <span className="wp-big-time">{hours}:{minutes}</span>
                            <span className="wp-location">local time</span>
                        </div>
                        <div className="wp-world-list">
                            {[
                                { city: 'new york', tz: 'America/New_York', diff: '-5h' },
                                { city: 'london', tz: 'Europe/London', diff: '+0h' },
                                { city: 'tokyo', tz: 'Asia/Tokyo', diff: '+9h' },
                                { city: 'sydney', tz: 'Australia/Sydney', diff: '+11h' },
                            ].map(loc => (
                                <div key={loc.city} className="wp-world-item">
                                    <div className="wp-world-info">
                                        <span className="wp-world-city">{loc.city}</span>
                                        <span className="wp-world-diff">{loc.diff}</span>
                                    </div>
                                    <span className="wp-world-time">
                                        {new Date().toLocaleTimeString('en-US', { timeZone: loc.tz, hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {pivot === 'stopwatch' && (
                    <div className="wp-stopwatch">
                        <div className="wp-stopwatch-display">{formatStopwatch(stopwatchTime)}</div>
                        <div className="wp-stopwatch-controls">
                            <button className="wp-sw-btn" onClick={() => setStopwatchRunning(!stopwatchRunning)}>
                                <Icon name={stopwatchRunning ? 'pause' : 'play'} size={32} />
                            </button>
                            <button className="wp-sw-btn" onClick={() => { setStopwatchTime(0); setStopwatchRunning(false); }}>
                                <Icon name="refresh" size={32} />
                            </button>
                        </div>
                    </div>
                )}

                {pivot === 'timer' && (
                    <div className="wp-timer">
                        <div className="wp-timer-display">{formatTimer(timerTime)}</div>
                        <div className="wp-timer-presets">
                            {[60, 180, 300, 600].map(t => (
                                <button key={t} className="wp-timer-preset" onClick={() => setTimerTime(t)}>
                                    {t < 60 ? `${t}s` : `${t / 60}m`}
                                </button>
                            ))}
                        </div>
                        <div className="wp-timer-controls">
                            <button className="wp-sw-btn" onClick={() => setTimerRunning(!timerRunning)}>
                                <Icon name={timerRunning ? 'pause' : 'play'} size={32} />
                            </button>
                            <button className="wp-sw-btn" onClick={() => { setTimerTime(300); setTimerRunning(false); }}>
                                <Icon name="refresh" size={32} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
