import { Icon } from './Icons';
import './RecentApps.css';

const RECENT_APPS_DATA = [
    { id: 'messages', name: 'messaging', icon: 'message', color: '#1BA1E2', preview: 'John: Hey, are you coming?' },
    { id: 'browser', name: 'internet explorer', icon: 'browser', color: '#1BA1E2', preview: 'Microsoft - Official Home Page' },
    { id: 'photos', name: 'photos', icon: 'photo', color: '#1BA1E2', preview: 'Camera Roll' },
    { id: 'settings', name: 'settings', icon: 'settings', color: '#1BA1E2', preview: 'system' },
];

export function RecentApps({ isOpen, onClose, onSelectApp, recentApps = RECENT_APPS_DATA }) {
    if (!isOpen) return null;

    const handleAppClick = (app) => {
        onSelectApp(app.id);
        onClose();
    };

    const handleClose = (e, appId) => {
        e.stopPropagation();
        // Could implement removing from recent apps here
    };

    return (
        <div className="recent-apps-overlay" onClick={onClose}>
            <div className="recent-apps-container" onClick={e => e.stopPropagation()}>
                <div className="recent-apps-header">
                    <Icon name="back" size={24} onClick={onClose} />
                </div>
                
                <div className="recent-apps-list">
                    {recentApps.length === 0 ? (
                        <div className="no-recent-apps">
                            <span>No recent apps</span>
                        </div>
                    ) : (
                        recentApps.map((app, index) => (
                            <div 
                                key={app.id} 
                                className="recent-app-card"
                                onClick={() => handleAppClick(app)}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="recent-app-preview">
                                    <div className="recent-app-preview-header" style={{ background: app.color }}>
                                        <Icon name={app.icon} size={16} />
                                        <span>{app.name}</span>
                                    </div>
                                    <div className="recent-app-preview-content">
                                        <span>{app.preview}</span>
                                    </div>
                                </div>
                                <button 
                                    className="recent-app-close"
                                    onClick={(e) => handleClose(e, app.id)}
                                    aria-label={`Close ${app.name}`}
                                >
                                    <Icon name="close" size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
