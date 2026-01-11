import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tile } from '../components/Tile';
import { Icon } from '../components/Icons';

const TILES = [
    { id: 'phone', icon: 'phone', label: 'phone', size: 'medium', route: '/phone' },
    { id: 'people', icon: 'people', label: 'people', size: 'medium', route: '/people' },
    { id: 'messages', icon: 'message', label: 'messaging', size: 'medium', live: true, notification: 3, route: '/messages' },
    { id: 'email', icon: 'email', label: 'outlook', size: 'wide', live: true, notification: 12 },
    { id: 'calendar', icon: 'calendar', label: 'calendar', size: 'small', route: '/calendar' },
    { id: 'photos', icon: 'photo', label: 'photos', size: 'medium', live: true, route: '/photos' },
    { id: 'camera', icon: 'camera', label: 'camera', size: 'small' },
    { id: 'settings', icon: 'settings', label: 'settings', size: 'small', route: '/settings' },
    { id: 'music', icon: 'music', label: 'music', size: 'medium', route: '/music' },
    { id: 'store', icon: 'store', label: 'store', size: 'small', route: '/store' },
    { id: 'games', icon: 'games', label: 'games', size: 'small', route: '/games' },
    { id: 'calculator', icon: 'calculator', label: 'calculator', size: 'small', route: '/calculator' },
    { id: 'weather', icon: 'weather', label: 'weather', size: 'medium', live: true, route: '/weather' },
    { id: 'clock', icon: 'alarm', label: 'alarms', size: 'small', route: '/clock' },
    { id: 'notes', icon: 'notes', label: 'onenote', size: 'small', route: '/notes' },
    { id: 'browser', icon: 'browser', label: 'internet explorer', size: 'medium', route: '/browser' },
    { id: 'maps', icon: 'map', label: 'maps', size: 'small', route: '/maps' },
    { id: 'wallet', icon: 'wallet', label: 'wallet', size: 'small' },
];

const APPS = [
    { name: 'alarms', icon: 'alarm', route: '/clock' },
    { name: 'calculator', icon: 'calculator', route: '/calculator' },
    { name: 'calendar', icon: 'calendar', route: '/calendar' },
    { name: 'camera', icon: 'camera', route: null },
    { name: 'file manager', icon: 'folder', route: '/files' },
    { name: 'games', icon: 'games', route: '/games' },
    { name: 'internet explorer', icon: 'browser', route: '/browser' },
    { name: 'maps', icon: 'map', route: '/maps' },
    { name: 'messaging', icon: 'message', route: '/messages' },
    { name: 'music + videos', icon: 'music', route: '/music' },
    { name: 'onenote', icon: 'notes', route: '/notes' },
    { name: 'people', icon: 'people', route: '/people' },
    { name: 'phone', icon: 'phone', route: '/phone' },
    { name: 'photos', icon: 'photo', route: '/photos' },
    { name: 'settings', icon: 'settings', route: '/settings' },
    { name: 'store', icon: 'store', route: '/store' },
    { name: 'weather', icon: 'weather', route: '/weather' },
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

    const filteredApps = APPS.filter(app => app.name.includes(searchQuery.toLowerCase()));
    const groupedApps = filteredApps.reduce((acc, app) => {
        const letter = app.name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(app);
        return acc;
    }, {});

    return (
        <div className="hub-container">
            <div className="hub-page start-screen">
                <h1 className="page-title">start</h1>
                <div className="tile-grid">
                    {TILES.map((tile, index) => (
                        <Tile key={tile.id} {...tile} flipped={flippedTiles[tile.id]} delay={index} />
                    ))}
                </div>
            </div>
            <div className="hub-page all-apps">
                <div className="all-apps-header">
                    <div className="search-box">
                        <Icon name="search" size={20} className="search-icon" />
                        <input type="text" placeholder="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                </div>
                <div className="app-list">
                    {Object.keys(groupedApps).sort().map(letter => (
                        <div key={letter}>
                            <div className="app-letter">{letter}</div>
                            {groupedApps[letter].map(app => (
                                <div key={app.name} className="app-item" onClick={() => app.route && navigate(app.route)} style={{ opacity: app.route ? 1 : 0.5 }}>
                                    <div className="app-item-icon"><Icon name={app.icon} size={28} /></div>
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
