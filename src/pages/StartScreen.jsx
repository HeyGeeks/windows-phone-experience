import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tile } from '../components/Tile';
import { Icon } from '../components/Icons';

const TILES = [
    { id: 'phone', icon: 'phone', label: 'Phone', size: 'medium', color: '#00ABA9', route: '/phone' },
    { id: 'messages', icon: 'message', label: 'Messages', size: 'medium', color: '#1BA1E2', live: true, notification: 3, route: '/messages' },
    { id: 'email', icon: 'email', label: 'Outlook Mail', size: 'wide', color: '#0050EF', live: true, notification: 12 },
    { id: 'calendar', icon: 'calendar', label: 'Calendar', size: 'small', color: '#A4C400', route: '/calendar' },
    { id: 'photos', icon: 'photo', label: 'Photos', size: 'medium', color: '#D80073', live: true, route: '/photos' },
    { id: 'camera', icon: 'camera', label: 'Camera', size: 'small', color: '#1a1a1a' },
    { id: 'settings', icon: 'settings', label: 'Settings', size: 'small', color: '#6D8764', route: '/settings' },
    { id: 'music', icon: 'music', label: 'Groove Music', size: 'medium', color: '#F0A30A', route: '/music' },
    { id: 'youtube', icon: 'play', label: 'YouTube', size: 'small', color: '#FF0000', route: '/youtube' },
    { id: 'calculator', icon: 'calculator', label: 'Calculator', size: 'small', color: '#1BA1E2', route: '/calculator' },
    { id: 'weather', icon: 'weather', label: 'Weather', size: 'medium', color: '#0050EF', live: true, route: '/weather' },
    { id: 'clock', icon: 'alarm', label: 'Alarms & Clock', size: 'small', color: '#A4C400', route: '/clock' },
    { id: 'notes', icon: 'notes', label: 'OneNote', size: 'small', color: '#AA00FF', route: '/notes' },
    { id: 'browser', icon: 'browser', label: 'Microsoft Edge', size: 'medium', color: '#1BA1E2', route: '/browser' },
];

const APPS = [
    { name: 'Alarms & Clock', icon: 'alarm', route: '/clock' },
    { name: 'Calculator', icon: 'calculator', route: '/calculator' },
    { name: 'Calendar', icon: 'calendar', route: '/calendar' },
    { name: 'Camera', icon: 'camera', route: null },
    { name: 'Cortana', icon: 'search', route: null },
    { name: 'File Explorer', icon: 'folder', route: null },
    { name: 'Games', icon: 'games', route: null },
    { name: 'Groove Music', icon: 'music', route: '/music' },
    { name: 'Maps', icon: 'map', route: null },
    { name: 'Messaging', icon: 'message', route: '/messages' },
    { name: 'Microsoft Edge', icon: 'browser', route: '/browser' },
    { name: 'OneNote', icon: 'notes', route: '/notes' },
    { name: 'Outlook Mail', icon: 'email', route: null },
    { name: 'People', icon: 'contacts', route: null },
    { name: 'Phone', icon: 'phone', route: '/phone' },
    { name: 'Photos', icon: 'photo', route: '/photos' },
    { name: 'Settings', icon: 'settings', route: '/settings' },
    { name: 'Store', icon: 'store', route: null },
    { name: 'Weather', icon: 'weather', route: '/weather' },
    { name: 'YouTube', icon: 'play', route: '/youtube' },
];

export function StartScreen() {
    const [flippedTiles, setFlippedTiles] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Live tile flipping
    useEffect(() => {
        const interval = setInterval(() => {
            const liveTiles = TILES.filter(t => t.live);
            if (liveTiles.length > 0) {
                const randomTile = liveTiles[Math.floor(Math.random() * liveTiles.length)];
                setFlippedTiles(prev => ({
                    ...prev,
                    [randomTile.id]: !prev[randomTile.id]
                }));
            }
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // Filter apps based on search
    const filteredApps = APPS.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group apps by letter
    const groupedApps = filteredApps.reduce((acc, app) => {
        const letter = app.name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(app);
        return acc;
    }, {});

    return (
        <div className="hub-container">
            {/* Start Screen */}
            <div className="hub-page start-screen">
                <h1 className="page-title">Start</h1>
                <div className="tile-grid">
                    {TILES.map((tile, index) => (
                        <Tile
                            key={tile.id}
                            {...tile}
                            flipped={flippedTiles[tile.id]}
                            delay={index}
                        />
                    ))}
                </div>
            </div>

            {/* All Apps */}
            <div className="hub-page all-apps">
                <div className="all-apps-header">
                    <div className="search-box">
                        <Icon name="search" size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                                >
                                    <div className="app-item-icon">
                                        <Icon name={app.icon} size={24} />
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
