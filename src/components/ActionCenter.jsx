import { useState } from 'react';
import { Icon } from './Icons';
import { useTheme } from '../context/ThemeContext';
import './ActionCenter.css';

const QUICK_ACTIONS = [
    { id: 'wifi', icon: 'wifi', label: 'Wi-Fi', active: true },
    { id: 'bluetooth', icon: 'bluetooth', label: 'Bluetooth', active: false },
    { id: 'airplane', icon: 'airplane', label: 'Airplane mode', active: false },
    { id: 'rotation', icon: 'rotation', label: 'Rotation lock', active: false },
    { id: 'location', icon: 'location', label: 'Location', active: true },
    { id: 'flashlight', icon: 'flash', label: 'Flashlight', active: false },
    { id: 'battery', icon: 'battery', label: 'Battery saver', active: false },
    { id: 'quiet', icon: 'mute', label: 'Quiet hours', active: false },
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
    {
        id: 3,
        app: 'Messaging',
        icon: 'message',
        items: [
            { sender: 'John Smith', subject: 'Hey, are you free tonight?', time: '2:30p' },
        ]
    },
];

export function ActionCenter({ isOpen, onClose, onOpenSettings }) {
    const { accentColor } = useTheme();
    const [quickActions, setQuickActions] = useState(QUICK_ACTIONS);
    const [notifications, setNotifications] = useState(NOTIFICATIONS);
    const [brightness, setBrightness] = useState(80);
    const [expanded, setExpanded] = useState(false);

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
                {/* Quick Actions - First row always visible */}
                <div className="quick-actions">
                    {quickActions.slice(0, 4).map(action => (
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
                
                {/* Second row - expandable */}
                <div className={`quick-actions quick-actions-row2 ${expanded ? 'expanded' : ''}`}>
                    {quickActions.slice(4, 8).map(action => (
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

                {/* Expand/Collapse button */}
                <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
                    <Icon name={expanded ? 'chevronUp' : 'chevronDown'} size={20} />
                    <span>{expanded ? 'Collapse' : 'Expand'}</span>
                </button>

                {/* Brightness Slider */}
                <div className="brightness-control">
                    <Icon name="sunLow" size={18} className="brightness-icon" />
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={brightness}
                        onChange={(e) => setBrightness(e.target.value)}
                        className="brightness-slider"
                        style={{ '--slider-progress': `${brightness}%`, '--accent': accentColor }}
                    />
                    <Icon name="sun" size={22} className="brightness-icon" />
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
