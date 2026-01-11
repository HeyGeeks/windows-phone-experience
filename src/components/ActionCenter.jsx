import { useState } from 'react';
import { Icon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import './ActionCenter.css';

const QUICK_ACTIONS = [
    { id: 'wifi', icon: 'wifi', label: 'Wi-Fi', active: true },
    { id: 'bluetooth', icon: 'bluetooth', label: 'Bluetooth', active: false },
    { id: 'airplane', icon: 'airplane', label: 'Airplane mode', active: false },
    { id: 'rotation', icon: 'rotation', label: 'Rotation lock', active: false },
];

const NOTIFICATIONS = [
    {
        id: 1,
        app: 'Outlook',
        icon: 'email',
        items: [
            { sender: 'Erik Hudgens', subject: 'Best mic for hollowbody?', time: '12:49p' },
            { sender: 'Leila Lima', subject: 'Deadline', time: '11:59a' },
            { sender: 'Tommy Fellows', subject: 'Re: Tracks ready for your review', time: '10:01p' },
        ]
    },
    {
        id: 2,
        app: 'Store',
        icon: 'store',
        items: [
            { sender: '', subject: '1 app has been updated', time: '7:54a' },
        ]
    },
];

export function ActionCenter({ isOpen, onClose, onOpenSettings }) {
    const { accentColor } = useTheme();
    const [quickActions, setQuickActions] = useState(QUICK_ACTIONS);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const toggleQuickAction = (id) => {
        setQuickActions(prev => prev.map(action => 
            action.id === id ? { ...action, active: !action.active } : action
        ));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const clearNotification = (appId) => {
        setNotifications(prev => prev.filter(n => n.id !== appId));
    };

    return (
        <div className={`action-center ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="action-center-content" onClick={e => e.stopPropagation()}>
                {/* Quick Actions */}
                <div className="quick-actions">
                    {quickActions.map(action => (
                        <button
                            key={action.id}
                            className={`quick-action ${action.active ? 'active' : ''}`}
                            onClick={() => toggleQuickAction(action.id)}
                            style={{ background: action.active ? accentColor : 'transparent' }}
                        >
                            <Icon name={action.icon} size={24} />
                            <span className="quick-action-label">{action.label}</span>
                        </button>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="action-center-bar">
                    <button className="action-bar-btn" onClick={clearAll}>
                        <Icon name="close" size={16} />
                        <span>CLEAR ALL</span>
                    </button>
                    <button className="action-bar-btn" onClick={onOpenSettings}>
                        <Icon name="settings" size={16} />
                        <span>ALL SETTINGS</span>
                    </button>
                </div>

                {/* Notifications */}
                <div className="notifications-list">
                    {notifications.map(notif => (
                        <div key={notif.id} className="notification-group">
                            <div className="notification-header">
                                <div className="notification-app-icon" style={{ background: accentColor }}>
                                    <Icon name={notif.icon} size={20} />
                                </div>
                                <span className="notification-app-name">{notif.app}</span>
                            </div>
                            {notif.items.map((item, idx) => (
                                <div key={idx} className="notification-item">
                                    <div className="notification-content">
                                        {item.sender && <span className="notification-sender">{item.sender}</span>}
                                        <span className="notification-subject">{item.subject}</span>
                                    </div>
                                    <span className="notification-time">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                    {notifications.length === 0 && (
                        <div className="no-notifications">
                            <span>No new notifications</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
