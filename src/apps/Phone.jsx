import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Phone.css';

export function Phone() {
    const [number, setNumber] = useState('');
    const [tab, setTab] = useState('keypad'); // keypad, history

    const handleDigit = (digit) => {
        if (number.length < 15) {
            setNumber(prev => prev + digit);
        }
    };

    const handleDelete = () => {
        setNumber(prev => prev.slice(0, -1));
    };

    const CALL_HISTORY = [
        { id: 1, name: 'Mom', time: 'Yesterday', type: 'incoming' },
        { id: 2, name: 'Work', time: 'Monday', type: 'outgoing' },
        { id: 3, name: 'Unknown', time: 'Sunday', type: 'missed' },
    ];

    return (
        <AppShell title="Phone">
            <div className="phone-app">
                <div className="phone-tabs">
                    <button
                        className={`phone-tab ${tab === 'history' ? 'active' : ''}`}
                        onClick={() => setTab('history')}
                    >
                        history
                    </button>
                    <button
                        className={`phone-tab ${tab === 'keypad' ? 'active' : ''}`}
                        onClick={() => setTab('keypad')}
                    >
                        keypad
                    </button>
                </div>

                {tab === 'keypad' ? (
                    <div className="keypad-view">
                        <div className="number-display">{number}</div>
                        <div className="keypad-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                <button key={n} className="keypad-btn" onClick={() => handleDigit(n.toString())}>
                                    <span className="digit">{n}</span>
                                </button>
                            ))}
                            <button className="keypad-btn" onClick={() => handleDigit('*')}>*</button>
                            <button className="keypad-btn" onClick={() => handleDigit('0')}>0</button>
                            <button className="keypad-btn" onClick={() => handleDigit('#')}>#</button>
                        </div>
                        <div className="call-actions">
                            <div style={{ width: 60 }} /> {/* Spacer */}
                            <button className="call-btn">
                                <Icon name="phone" size={32} />
                            </button>
                            <button className="delete-btn" onClick={handleDelete} disabled={!number}>
                                <Icon name="back" size={24} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="history-view">
                        {CALL_HISTORY.map(call => (
                            <div key={call.id} className="history-item">
                                <div className="history-icon">
                                    <Icon name="phone" size={20} />
                                </div>
                                <div className="history-info">
                                    <span className="history-name">{call.name}</span>
                                    <span className="history-type">{call.type}, {call.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}
