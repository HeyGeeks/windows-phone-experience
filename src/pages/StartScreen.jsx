import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tile } from '../components/Tile';
import { Icon } from '../components/Icons';

const TILES = [
    { id: 'phone', icon: 'phone', label: 'Phone', size: 'medium', color: '#00ABA9' },
    { id: 'messages', icon: 'message', label: 'Messages', size: 'medium', color: '#1BA1E2', live: true, notification: 3 },
    { id: 'email', icon: 'email', label: 'Email', size: 'wide', color: '#0050EF', live: true, notification: 12 },
    { id: 'calendar', icon: 'calendar', label: 'Calendar', size: 'small', color: '#A4C400', route: '/calendar' },
    { id: 'photos', icon: 'photo', label: 'Photos', size: 'medium', color: '#D80073', live: true, route: '/photos' },
    { id: 'camera', icon: 'camera', label: 'Camera', size: 'small', color: '#1a1a1a' },
    { id: 'settings', icon: 'settings', label: 'Settings', size: 'small', color: '#6D8764', route: '/settings' },
    { id: 'music', icon: 'music', label: 'Music', size: 'medium', color: '#F0A30A', route: '/music' },
    { id: 'calculator', icon: 'calculator', label: 'Calculator', size: 'small', color: '#1BA1E2', route: '/calculator' },
    { id: 'weather', icon: 'weather', label: 'Weather', size: 'medium', color: '#0050EF', live: true, route: '/weather' },
    { id: 'clock', icon: 'alarm', label: 'Clock', size: 'small', color: '#A4C400', route: '/clock' },
    { id: 'notes', icon: 'notes', label: 'Notes', size: 'small', color: '#AA00FF', route: '/notes' },
    { id: 'browser', icon: 'browser', label: 'Internet Explorer', size: 'medium', color: '#1BA1E2', route: '/browser' },
];

const APPS = [
    { name: 'Calculator', icon: 'calculator', route: '/calculator' },
    { name: 'Calendar', icon: 'calendar', route: '/calendar' },
    { name: 'Camera', icon: 'camera', route: null },
    { name: 'Clock', icon: 'alarm', route: '/clock' },
    { name: 'Contacts', icon: 'contacts', route: null },
    { name: 'Email', icon: 'email', route: null },
    { name: 'Games', icon: 'games', route: null },
    { name: 'Internet Explorer', icon: 'browser', route: '/browser' },
    { name: 'Maps', icon: 'map', route: null },
    { name: 'Messages', icon: 'message', route: null },
    { name: 'Music', icon: 'music', route: '/music' },
    { name: 'Notes', icon: 'notes', route: '/notes' },
    { name: 'Phone', icon: 'phone', route: null },
    { name: 'Photos', icon: 'photo', route: '/photos' },
    { name: 'Settings', icon: 'settings', route: '/settings' },
    { name: 'Store', icon: 'store', route: null },
    { name: 'Weather', icon: 'weather', route: '/weather' },
];

export function StartScreen() {
    const [flippedTiles, setFlippedTiles] = useState({});
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

    // Group apps by letter
    const groupedApps = APPS.reduce((acc, app) => {
        const letter = app.name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(app);
        return acc;
    }, {});

    return (
        <div className="hub-container">
            {/* Start Screen */}
            <div className="hub-page start-screen">
                <h1 className="page-title">start</h1>
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
                <h1 className="page-title">all apps</h1>
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
