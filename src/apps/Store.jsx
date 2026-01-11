import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Store.css';

const FEATURED_APPS = [
    { id: 1, name: 'WhatsApp', category: 'social', rating: 4.5, icon: '💬', color: '#25D366' },
    { id: 2, name: 'Facebook', category: 'social', rating: 4.2, icon: '📘', color: '#1877F2' },
    { id: 3, name: 'Instagram', category: 'photo', rating: 4.4, icon: '📷', color: '#E4405F' },
    { id: 4, name: 'Twitter', category: 'social', rating: 4.1, icon: '🐦', color: '#1DA1F2' },
    { id: 5, name: 'Spotify', category: 'music', rating: 4.6, icon: '🎵', color: '#1DB954' },
    { id: 6, name: 'Netflix', category: 'entertainment', rating: 4.5, icon: '🎬', color: '#E50914' },
];

const CATEGORIES = [
    { id: 'games', name: 'games', icon: '🎮' },
    { id: 'social', name: 'social', icon: '👥' },
    { id: 'entertainment', name: 'entertainment', icon: '🎭' },
    { id: 'photo', name: 'photo & video', icon: '📸' },
    { id: 'music', name: 'music', icon: '🎵' },
    { id: 'productivity', name: 'productivity', icon: '📊' },
    { id: 'news', name: 'news & weather', icon: '📰' },
    { id: 'tools', name: 'tools', icon: '🔧' },
];

export function Store() {
    const [pivot, setPivot] = useState('apps');
    const [selectedApp, setSelectedApp] = useState(null);

    if (selectedApp) {
        return (
            <AppShell title="store" hideTitle>
                <div className="wp-store-detail">
                    <button className="wp-back-btn" onClick={() => setSelectedApp(null)}><Icon name="back" size={20} /></button>
                    <div className="wp-app-header">
                        <div className="wp-app-icon-large" style={{ background: selectedApp.color }}>{selectedApp.icon}</div>
                        <div className="wp-app-info">
                            <h2 className="wp-app-name">{selectedApp.name}</h2>
                            <span className="wp-app-category">{selectedApp.category}</span>
                            <div className="wp-app-rating">{'★'.repeat(Math.floor(selectedApp.rating))} {selectedApp.rating}</div>
                        </div>
                    </div>
                    <button className="wp-install-btn">install</button>
                    <div className="wp-app-description">
                        <h3>description</h3>
                        <p>This is a sample app description. The app provides amazing features and functionality for Windows Phone users.</p>
                    </div>
                    <div className="wp-app-screenshots">
                        <h3>screenshots</h3>
                        <div className="wp-screenshots-scroll">
                            <div className="wp-screenshot" style={{ background: selectedApp.color }} />
                            <div className="wp-screenshot" style={{ background: selectedApp.color }} />
                            <div className="wp-screenshot" style={{ background: selectedApp.color }} />
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="store" hideTitle>
            <div className="wp-store">
                <h1 className="wp-store-title">Store</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'apps' ? 'active' : ''}`} onClick={() => setPivot('apps')}>apps</button>
                    <button className={`wp-pivot ${pivot === 'games' ? 'active' : ''}`} onClick={() => setPivot('games')}>games</button>
                    <button className={`wp-pivot ${pivot === 'music' ? 'active' : ''}`} onClick={() => setPivot('music')}>music</button>
                </div>

                {pivot === 'apps' && (
                    <>
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">featured</h2>
                            <div className="wp-featured-scroll">
                                {FEATURED_APPS.map(app => (
                                    <div key={app.id} className="wp-featured-app" onClick={() => setSelectedApp(app)}>
                                        <div className="wp-app-icon" style={{ background: app.color }}>{app.icon}</div>
                                        <span className="wp-app-title">{app.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">categories</h2>
                            <div className="wp-categories-list">
                                {CATEGORIES.map(cat => (
                                    <div key={cat.id} className="wp-category-item">
                                        <span className="wp-category-icon">{cat.icon}</span>
                                        <span className="wp-category-name">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {pivot === 'games' && (
                    <div className="wp-store-section">
                        <h2 className="wp-section-title">top games</h2>
                        <div className="wp-games-list">
                            {[{ name: 'Candy Crush', icon: '🍬', color: '#FF6B6B' }, { name: 'Subway Surfers', icon: '🏃', color: '#FFD93D' }, { name: 'Temple Run', icon: '🏛️', color: '#6BCB77' }].map((game, i) => (
                                <div key={i} className="wp-game-item">
                                    <div className="wp-app-icon" style={{ background: game.color }}>{game.icon}</div>
                                    <span className="wp-app-title">{game.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {pivot === 'music' && (
                    <div className="wp-store-section">
                        <h2 className="wp-section-title">top albums</h2>
                        <p className="wp-empty-text">browse music in the music + videos app</p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
