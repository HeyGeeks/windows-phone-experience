import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tile } from '../components/Tile';
import { WidgetTile } from '../components/WidgetTile';
import { LiveTile } from '../components/LiveTile';
import { Icon } from '../components/Icons';
import './StartScreen.css';

const TILES = [
    { id: 'phone', icon: 'phone', label: 'Phone', size: 'medium', route: '/phone' },
    { id: 'people', icon: 'people', label: 'People', size: 'medium', route: '/people' },
    { id: 'messages', icon: 'message', label: 'Messaging', size: 'medium', live: true, notification: 3, route: '/messages' },
    { id: 'calendar-widget', type: 'calendar', size: 'medium', route: '/calendar' },
    { id: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp', size: 'medium', color: '#25D366', route: '/whatsapp' },
    { id: 'email', icon: 'inbox', label: 'Outlook', size: 'wide', live: true, notification: 12, route: '/email' },
    { id: 'camera', icon: 'camera', label: 'Camera', size: 'small', route: '/camera' },
    // Photos tile with live photo slideshow
    { id: 'photos', icon: 'photo', label: 'Photos', size: 'medium', liveType: 'photos', route: '/photos' },
    { id: 'clock-widget', type: 'clock', size: 'small', route: '/clock' },
    { id: 'settings', icon: 'settings', label: 'Settings', size: 'small', route: '/settings' },
    // Music tile with live album art display
    { id: 'music', icon: 'music', label: 'Music', size: 'medium', liveType: 'music', route: '/music' },
    { id: 'store', icon: 'store', label: 'Store', size: 'small', route: '/store' },
    { id: 'games', icon: 'games', label: 'Games', size: 'small', route: '/games' },
    { id: 'calculator', icon: 'calculator', label: 'Calculator', size: 'small', route: '/calculator' },
    { id: 'weather-widget', type: 'weather', size: 'medium', route: '/weather' },
    { id: 'notes', icon: 'notes', label: 'OneNote', size: 'small', route: '/notes' },
    { id: 'browser', icon: 'browser', label: 'IE', size: 'medium', route: '/browser' },
    { id: 'maps', icon: 'map', label: 'Maps', size: 'small', route: '/maps' },
    { id: 'podcast', icon: 'podcast', label: 'Podcasts', size: 'medium', color: '#8E44AD', route: '/podcast' },
    { id: 'office', icon: 'word', label: 'Office', size: 'medium', color: '#D24726', route: '/office' },
    { id: 'health', icon: 'heart', label: 'Health', size: 'medium', color: '#60A917', live: true, route: '/health' },
    // News tile with live headlines
    { id: 'news', icon: 'newspaper', label: 'News', size: 'wide', liveType: 'news', color: '#FF6B00', route: '/news' },
];

const APPS = [
    { name: 'Alarms', icon: 'alarm', route: '/clock' },
    { name: 'Calculator', icon: 'calculator', route: '/calculator' },
    { name: 'Calendar', icon: 'calendar', route: '/calendar' },
    { name: 'Camera', icon: 'camera', route: '/camera' },
    { name: 'File Manager', icon: 'folder', route: '/files' },
    { name: 'Games', icon: 'games', route: '/games' },
    { name: 'Health', icon: 'heart', route: '/health' },
    { name: 'Internet Explorer', icon: 'browser', route: '/browser' },
    { name: 'Maps', icon: 'map', route: '/maps' },
    { name: 'Messaging', icon: 'message', route: '/messages' },
    { name: 'Music + Videos', icon: 'music', route: '/music' },
    { name: 'News', icon: 'newspaper', route: '/news' },
    { name: 'Office', icon: 'word', route: '/office' },
    { name: 'OneNote', icon: 'notes', route: '/notes' },
    { name: 'Outlook', icon: 'inbox', route: '/email' },
    { name: 'People', icon: 'people', route: '/people' },
    { name: 'Phone', icon: 'phone', route: '/phone' },
    { name: 'Photos', icon: 'photo', route: '/photos' },
    { name: 'Podcasts', icon: 'podcast', route: '/podcast' },
    { name: 'Settings', icon: 'settings', route: '/settings' },
    { name: 'Store', icon: 'store', route: '/store' },
    { name: 'Weather', icon: 'weather', route: '/weather' },
    { name: 'WhatsApp', icon: 'whatsapp', route: '/whatsapp' },
];

export function StartScreen() {
    const [flippedTiles, setFlippedTiles] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const liveTiles = TILES.filter(t => t.live);
            if (liveTiles.length > 0) {
                const randomTile = liveTiles[Math.floor(Math.random() * liveTiles.length)];
                setFlippedTiles(prev => ({ ...prev, [randomTile.id]: !prev[randomTile.id] }));
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredApps = APPS.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedApps = filteredApps.reduce((acc, app) => {
        const letter = app.name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(app);
        return acc;
    }, {});

    // Render the appropriate tile type
    const renderTile = (tile, index) => {
        // Widget tiles (calendar, clock, weather)
        if (tile.type) {
            return (
                <WidgetTile
                    key={tile.id}
                    type={tile.type}
                    size={tile.size}
                    route={tile.route}
                    delay={index}
                />
            );
        }

        // Live tiles (music, photos, news)
        if (tile.liveType) {
            return (
                <LiveTile
                    key={tile.id}
                    type={tile.liveType}
                    icon={tile.icon}
                    label={tile.label}
                    size={tile.size}
                    color={tile.color}
                    route={tile.route}
                    delay={index}
                    notification={tile.notification}
                />
            );
        }

        // Standard tiles
        return (
            <Tile
                key={tile.id}
                {...tile}
                flipped={flippedTiles[tile.id]}
                delay={index}
            />
        );
    };

    return (
        <div className="hub-container">
            {/* Start Screen with Tiles */}
            <div className="hub-page start-screen">
                <div className="tile-grid">
                    {TILES.map((tile, index) => renderTile(tile, index))}
                </div>
                {/* Arrow indicator to swipe for app list */}
                <div className="swipe-indicator">
                    <Icon name="chevronDown" size={24} />
                </div>
            </div>

            {/* All Apps List */}
            <div className="hub-page all-apps">
                <div className="all-apps-header">
                    <div className="search-box">
                        <Icon name="search" size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search apps"
                        />
                    </div>
                </div>
                <div className="app-list">
                    {Object.keys(groupedApps).sort().map(letter => (
                        <div key={letter}>
                            <div className="app-letter">{letter}</div>
                            {groupedApps[letter].map(app => (
                                <div
                                    key={app.name}
                                    className="app-item"
                                    onClick={() => app.route && navigate(app.route)}
                                    style={{ opacity: app.route ? 1 : 0.5 }}
                                    role="button"
                                    tabIndex={app.route ? 0 : -1}
                                    onKeyDown={(e) => {
                                        if ((e.key === 'Enter' || e.key === ' ') && app.route) {
                                            navigate(app.route);
                                        }
                                    }}
                                >
                                    <div className="app-item-icon">
                                        <Icon name={app.icon} size={26} />
                                    </div>
                                    <span className="app-item-name">{app.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
