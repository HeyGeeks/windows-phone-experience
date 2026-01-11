import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Phone.css';

const CALL_HISTORY = [
    { id: 1, name: 'mom', number: '+1 555-0101', time: 'yesterday', type: 'incoming', duration: '5:23' },
    { id: 2, name: 'work', number: '+1 555-0102', time: 'monday', type: 'outgoing', duration: '12:45' },
    { id: 3, name: 'unknown', number: '+1 555-0103', time: 'sunday', type: 'missed', duration: '' },
    { id: 4, name: 'alex', number: '+1 555-0104', time: 'saturday', type: 'incoming', duration: '2:10' },
];

const SPEED_DIAL = [
    { id: 1, name: 'mom', number: '+1 555-0101', photo: 'https://i.pravatar.cc/100?img=1' },
    { id: 2, name: 'work', number: '+1 555-0102', photo: 'https://i.pravatar.cc/100?img=2' },
    { id: 3, name: 'alex', number: '+1 555-0104', photo: 'https://i.pravatar.cc/100?img=3' },
];

export function Phone() {
    const [number, setNumber] = useState('');
    const [pivot, setPivot] = useState('history');
    const [calling, setCalling] = useState(null);

    const handleDigit = (digit) => {
        if (number.length < 15) setNumber(prev => prev + digit);
    };

    const handleDelete = () => setNumber(prev => prev.slice(0, -1));

    const makeCall = (name, num) => {
        setCalling({ name, number: num || number });
        setTimeout(() => setCalling(null), 3000);
    };

    if (calling) {
        return (
            <div className="wp-calling">
                <div className="wp-calling-info">
                    <span className="wp-calling-label">calling...</span>
                    <span className="wp-calling-name">{calling.name || calling.number}</span>
                    <span className="wp-calling-number">{calling.number}</span>
                </div>
                <button className="wp-end-call" onClick={() => setCalling(null)}>
                    <Icon name="phone" size={32} />
                </button>
            </div>
        );
    }

    return (
        <AppShell title="phone" hideTitle>
            <div className="wp-phone">
                <h1 className="wp-phone-title">phone</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'history' ? 'active' : ''}`} onClick={() => setPivot('history')}>history</button>
                    <button className={`wp-pivot ${pivot === 'speed' ? 'active' : ''}`} onClick={() => setPivot('speed')}>speed dial</button>
                    <button className={`wp-pivot ${pivot === 'keypad' ? 'active' : ''}`} onClick={() => setPivot('keypad')}>keypad</button>
                </div>

                {pivot === 'history' && (
                    <div className="wp-history-list">
                        {CALL_HISTORY.map(call => (
                            <div key={call.id} className="wp-history-item" onClick={() => makeCall(call.name, call.number)}>
                                <div className={`wp-history-icon ${call.type}`}>
                                    <Icon name="phone" size={20} />
                                </div>
                                <div className="wp-history-info">
                                    <span className="wp-history-name">{call.name}</span>
                                    <span className="wp-history-meta">{call.type} • {call.time}</span>
                                </div>
                                {call.duration && <span className="wp-history-duration">{call.duration}</span>}
                            </div>
                        ))}
                    </div>
                )}

                {pivot === 'speed' && (
                    <div className="wp-speed-dial">
                        {SPEED_DIAL.map(contact => (
                            <div key={contact.id} className="wp-speed-item" onClick={() => makeCall(contact.name, contact.number)}>
                                <img src={contact.photo} alt={contact.name} className="wp-speed-photo" />
                                <span className="wp-speed-name">{contact.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {pivot === 'keypad' && (
                    <div className="wp-keypad-view">
                        <div className="wp-number-display">{number || 'enter number'}</div>
                        <div className="wp-keypad-grid">
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(digit => (
                                <button key={digit} className="wp-keypad-btn" onClick={() => handleDigit(digit)}>
                                    <span className="wp-digit">{digit}</span>
                                    {digit >= '2' && digit <= '9' && (
                                        <span className="wp-letters">
                                            {['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'][digit - 2]}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="wp-call-actions">
                            <div style={{ width: 56 }} />
                            <button className="wp-call-btn" onClick={() => number && makeCall(null, number)}>
                                <Icon name="phone" size={28} />
                            </button>
                            <button className="wp-delete-btn" onClick={handleDelete} disabled={!number}>
                                <Icon name="back" size={24} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
