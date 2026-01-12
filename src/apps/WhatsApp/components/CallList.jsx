import React from 'react';
import { Icon } from '../../../components/Icons';

export function CallList({ calls, onCallSelect }) {
    const getCallIcon = (type) => {
        switch (type) {
            case 'incoming': return '↙';
            case 'outgoing': return '↗';
            case 'missed': return '↙';
            default: return '📞';
        }
    };

    const getCallColor = (type) => {
        return type === 'missed' ? '#E81123' : 'var(--text-secondary)';
    };

    return (
        <div className="wa-calls-list">
            {calls.map(call => (
                <div key={call.id} className="wa-call-item">
                    <div className="wa-avatar">
                        {call.photo ? (
                            <img src={call.photo} alt="" />
                        ) : (
                            <div className="wa-avatar-placeholder">
                                <Icon name="contacts" size={24} />
                            </div>
                        )}
                    </div>
                    <div className="wa-call-info">
                        <span className="wa-call-contact">{call.name}</span>
                        <span className="wa-call-meta" style={{ color: getCallColor(call.type) }}>
                            {getCallIcon(call.type)} {call.time}
                        </span>
                    </div>
                    <button className="wa-call-icon-btn" onClick={() => onCallSelect && onCallSelect(call)}>
                        <Icon name="phone" size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
}
