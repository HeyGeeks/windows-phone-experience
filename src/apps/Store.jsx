import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Store.css';

// Featured apps with real-looking data
const FEATURED_APPS = [
    {
        id: 1,
        name: 'WhatsApp Messenger',
        publisher: 'WhatsApp Inc.',
        category: 'social',
        rating: 4.5,
        reviews: 284523,
        downloads: '500M+',
        icon: 'whatsapp',
        color: '#25D366',
        description: 'WhatsApp Messenger is a FREE messaging app. Send and receive messages, photos, videos, documents, and voice messages.',
        featured: true
    },
    {
        id: 2,
        name: 'Facebook',
        publisher: 'Meta Platforms, Inc.',
        category: 'social',
        rating: 4.2,
        reviews: 523456,
        downloads: '1B+',
        icon: 'socialGroup',
        color: '#1877F2',
        description: 'Connect with friends, family and other people you know. Share photos and videos, send messages and get updates.'
    },
    {
        id: 3,
        name: 'Instagram',
        publisher: 'Meta Platforms, Inc.',
        category: 'photo',
        rating: 4.4,
        reviews: 412345,
        downloads: '1B+',
        icon: 'camera',
        color: '#E4405F',
        description: 'Bringing you closer to the people and things you love. Share what you\'re up to or discover what\'s happening in the world.'
    },
    {
        id: 4,
        name: 'Twitter',
        publisher: 'X Corp.',
        category: 'social',
        rating: 4.1,
        reviews: 198234,
        downloads: '500M+',
        icon: 'message',
        color: '#1DA1F2',
        description: 'Join the conversation! Find out what\'s happening in the world right now.'
    },
    {
        id: 5,
        name: 'Spotify',
        publisher: 'Spotify AB',
        category: 'music',
        rating: 4.6,
        reviews: 345678,
        downloads: '500M+',
        icon: 'music',
        color: '#1DB954',
        description: 'With Spotify, you can listen to music and play millions of songs and podcasts for free.'
    },
    {
        id: 6,
        name: 'Netflix',
        publisher: 'Netflix, Inc.',
        category: 'entertainment',
        rating: 4.5,
        reviews: 234567,
        downloads: '500M+',
        icon: 'tv',
        color: '#E50914',
        description: 'Looking for the most talked about TV shows and movies? They\'re all on Netflix.'
    },
];

// Top free apps
const TOP_FREE_APPS = [
    { id: 7, name: 'Skype', publisher: 'Microsoft', icon: 'video', color: '#00AFF0', rating: 4.3 },
    { id: 8, name: 'Telegram', publisher: 'Telegram FZ-LLC', icon: 'message', color: '#0088CC', rating: 4.5 },
    { id: 9, name: 'VLC Player', publisher: 'VideoLAN', icon: 'play', color: '#FF8800', rating: 4.4 },
    { id: 10, name: 'Shazam', publisher: 'Apple Inc.', icon: 'musicalNote', color: '#0088FF', rating: 4.3 },
    { id: 11, name: 'Pinterest', publisher: 'Pinterest, Inc.', icon: 'photo', color: '#E60023', rating: 4.2 },
    { id: 12, name: 'Dropbox', publisher: 'Dropbox, Inc.', icon: 'folder', color: '#0061FF', rating: 4.1 },
];

// Categories
const CATEGORIES = [
    { id: 'games', name: 'games', icon: 'gamepad2', color: '#60A917' },
    { id: 'social', name: 'social', icon: 'socialGroup', color: '#1877F2' },
    { id: 'entertainment', name: 'entertainment', icon: 'tv', color: '#E50914' },
    { id: 'photo', name: 'photo & video', icon: 'cameraFilm', color: '#E4405F' },
    { id: 'music', name: 'music & audio', icon: 'musicalNote', color: '#1DB954' },
    { id: 'productivity', name: 'productivity', icon: 'briefcase', color: '#0078D7' },
    { id: 'news', name: 'news & weather', icon: 'newsstand', color: '#FF6B00' },
    { id: 'tools', name: 'tools', icon: 'wrench', color: '#647687' },
];

// Games data
const FEATURED_GAMES = [
    {
        id: 101,
        name: 'Candy Crush Saga',
        publisher: 'King',
        icon: 'puzzle',
        color: '#FF6B6B',
        rating: 4.6,
        downloads: '1B+',
        description: 'Switch and match your way through hundreds of levels in this delicious puzzle adventure.'
    },
    {
        id: 102,
        name: 'Subway Surfers',
        publisher: 'SYBO Games',
        icon: 'action',
        color: '#FFD93D',
        rating: 4.5,
        downloads: '1B+',
        description: 'DASH as fast as you can! DODGE the oncoming trains!'
    },
    {
        id: 103,
        name: 'Asphalt 8',
        publisher: 'Gameloft SE',
        icon: 'racing',
        color: '#FF4500',
        rating: 4.4,
        downloads: '500M+',
        description: 'The best mobile racing game with stunning graphics and addictive gameplay.'
    },
];

const TOP_GAMES = [
    { id: 104, name: 'Temple Run 2', publisher: 'Imangi Studios', icon: 'action', color: '#6BCB77', rating: 4.3 },
    { id: 105, name: '8 Ball Pool', publisher: 'Miniclip', icon: 'sports', color: '#000080', rating: 4.5 },
    { id: 106, name: 'Clash of Clans', publisher: 'Supercell', icon: 'trophy', color: '#F0A30A', rating: 4.5 },
    { id: 107, name: 'PUBG Mobile', publisher: 'Krafton, Inc.', icon: 'gamepad2', color: '#FFC107', rating: 4.2 },
    { id: 108, name: 'Hill Climb Racing', publisher: 'Fingersoft', icon: 'racing', color: '#E74C3C', rating: 4.4 },
];

const GAME_CATEGORIES = [
    { id: 'action', name: 'action & adventure', icon: 'action', color: '#E51400' },
    { id: 'puzzle', name: 'puzzle & trivia', icon: 'puzzle', color: '#6A00FF' },
    { id: 'racing', name: 'racing & flying', icon: 'racing', color: '#FA6800' },
    { id: 'sports', name: 'sports', icon: 'sports', color: '#60A917' },
];

// Music data
const TOP_ALBUMS = [
    { id: 201, name: 'Midnights', artist: 'Taylor Swift', color: '#1A1A2E' },
    { id: 202, name: 'Renaissance', artist: 'Beyoncé', color: '#C0C0C0' },
    { id: 203, name: 'Un Verano Sin Ti', artist: 'Bad Bunny', color: '#87CEEB' },
    { id: 204, name: 'Harry\'s House', artist: 'Harry Styles', color: '#FFE4B5' },
];

export function Store() {
    const [pivot, setPivot] = useState('apps');
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    // Filter apps based on search
    const allApps = [...FEATURED_APPS, ...TOP_FREE_APPS];
    const filteredApps = searchQuery
        ? allApps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    // Render star rating
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Icon key={i} name="starFilled" size={14} className="star-icon" />);
        }
        if (hasHalf) {
            stars.push(<Icon key="half" name="starHalf" size={14} className="star-icon" />);
        }
        return <span className="rating-stars">{stars} {rating}</span>;
    };

    // Search View
    if (showSearch) {
        return (
            <AppShell title="store" hideTitle>
                <div className="wp-store">
                    <div className="store-search-header">
                        <button className="wp-back-btn" onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
                            <Icon name="back" size={20} />
                        </button>
                        <div className="store-search-box">
                            <Icon name="search" size={18} />
                            <input
                                type="text"
                                placeholder="Search Store"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="store-search-results">
                        {filteredApps.length > 0 ? (
                            filteredApps.map(app => (
                                <div key={app.id} className="app-list-item" onClick={() => { setSelectedApp(app); setShowSearch(false); }}>
                                    <div className="app-list-icon" style={{ background: app.color }}>
                                        <Icon name={app.icon} size={24} />
                                    </div>
                                    <div className="app-list-info">
                                        <span className="app-list-name">{app.name}</span>
                                        <span className="app-list-publisher">{app.publisher || 'Publisher'}</span>
                                        {renderRating(app.rating)}
                                    </div>
                                    <span className="app-list-free">free</span>
                                </div>
                            ))
                        ) : searchQuery ? (
                            <p className="wp-empty-text">No results for "{searchQuery}"</p>
                        ) : (
                            <p className="wp-empty-text">Type to search apps and games</p>
                        )}
                    </div>
                </div>
            </AppShell>
        );
    }

    // App Detail View
    if (selectedApp) {
        return (
            <AppShell title="store" hideTitle>
                <div className="wp-store-detail">
                    <button className="wp-back-btn" onClick={() => setSelectedApp(null)}>
                        <Icon name="back" size={20} />
                    </button>
                    <div className="wp-app-header">
                        <div className="wp-app-icon-large" style={{ background: selectedApp.color }}>
                            <Icon name={selectedApp.icon} size={48} />
                        </div>
                        <div className="wp-app-info">
                            <h2 className="wp-app-name">{selectedApp.name}</h2>
                            <span className="wp-app-publisher">{selectedApp.publisher}</span>
                            <div className="wp-app-stats">
                                {renderRating(selectedApp.rating)}
                                {selectedApp.reviews && <span className="reviews-count">({selectedApp.reviews.toLocaleString()})</span>}
                            </div>
                        </div>
                    </div>

                    <button className="wp-install-btn">
                        <Icon name="download" size={20} />
                        <span>install</span>
                    </button>

                    <div className="wp-app-meta">
                        <div className="meta-item">
                            <span className="meta-value">{selectedApp.downloads || '100K+'}</span>
                            <span className="meta-label">downloads</span>
                        </div>
                        <div className="meta-divider" />
                        <div className="meta-item">
                            <span className="meta-value">{selectedApp.rating}</span>
                            <span className="meta-label">rating</span>
                        </div>
                        <div className="meta-divider" />
                        <div className="meta-item">
                            <span className="meta-value">free</span>
                            <span className="meta-label">price</span>
                        </div>
                    </div>

                    <div className="wp-app-description">
                        <h3>description</h3>
                        <p>{selectedApp.description || 'This app provides amazing features and functionality for Windows Phone users.'}</p>
                    </div>

                    <div className="wp-app-screenshots">
                        <h3>screenshots</h3>
                        <div className="wp-screenshots-scroll">
                            <div className="wp-screenshot" style={{ background: `linear-gradient(135deg, ${selectedApp.color}, ${selectedApp.color}88)` }}>
                                <Icon name={selectedApp.icon} size={48} />
                            </div>
                            <div className="wp-screenshot" style={{ background: `linear-gradient(135deg, ${selectedApp.color}88, ${selectedApp.color}44)` }}>
                                <Icon name={selectedApp.icon} size={48} />
                            </div>
                            <div className="wp-screenshot" style={{ background: `linear-gradient(135deg, ${selectedApp.color}44, ${selectedApp.color}22)` }}>
                                <Icon name={selectedApp.icon} size={48} />
                            </div>
                        </div>
                    </div>

                    <div className="wp-app-reviews">
                        <h3>reviews</h3>
                        <div className="review-card">
                            <div className="review-header">
                                <span className="review-author">John D.</span>
                                <span className="review-rating">★★★★★</span>
                            </div>
                            <p className="review-text">Great app! Works perfectly on my Windows Phone.</p>
                        </div>
                        <div className="review-card">
                            <div className="review-header">
                                <span className="review-author">Sarah M.</span>
                                <span className="review-rating">★★★★☆</span>
                            </div>
                            <p className="review-text">Love the design and features. Very reliable.</p>
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    // Category Detail View
    if (selectedCategory) {
        const categoryApps = allApps.filter(app => app.category === selectedCategory.id);
        return (
            <AppShell title="store" hideTitle>
                <div className="wp-store">
                    <div className="category-header">
                        <button className="wp-back-btn" onClick={() => setSelectedCategory(null)}>
                            <Icon name="back" size={20} />
                        </button>
                        <h1 className="category-title">{selectedCategory.name}</h1>
                    </div>
                    <div className="category-apps-list">
                        {categoryApps.length > 0 ? categoryApps.map((app, index) => (
                            <div key={app.id} className="app-list-item" onClick={() => setSelectedApp(app)}>
                                <span className="app-rank">{index + 1}</span>
                                <div className="app-list-icon" style={{ background: app.color }}>
                                    <Icon name={app.icon} size={24} />
                                </div>
                                <div className="app-list-info">
                                    <span className="app-list-name">{app.name}</span>
                                    <span className="app-list-publisher">{app.publisher}</span>
                                    {renderRating(app.rating)}
                                </div>
                                <span className="app-list-free">free</span>
                            </div>
                        )) : (
                            <p className="wp-empty-text">No apps in this category yet</p>
                        )}
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="store" hideTitle>
            <div className="wp-store">
                <div className="store-header">
                    <h1 className="wp-store-title">Store</h1>
                    <button className="store-search-btn" onClick={() => setShowSearch(true)}>
                        <Icon name="search" size={22} />
                    </button>
                </div>

                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'apps' ? 'active' : ''}`} onClick={() => setPivot('apps')}>apps</button>
                    <button className={`wp-pivot ${pivot === 'games' ? 'active' : ''}`} onClick={() => setPivot('games')}>games</button>
                    <button className={`wp-pivot ${pivot === 'music' ? 'active' : ''}`} onClick={() => setPivot('music')}>music</button>
                </div>

                {pivot === 'apps' && (
                    <>
                        {/* Featured Spotlight */}
                        <div className="featured-spotlight" onClick={() => setSelectedApp(FEATURED_APPS[0])}>
                            <div className="spotlight-bg" style={{ background: `linear-gradient(135deg, ${FEATURED_APPS[0].color}, ${FEATURED_APPS[0].color}88)` }}>
                                <div className="spotlight-icon">
                                    <Icon name={FEATURED_APPS[0].icon} size={64} />
                                </div>
                                <div className="spotlight-info">
                                    <span className="spotlight-badge">featured</span>
                                    <h2 className="spotlight-name">{FEATURED_APPS[0].name}</h2>
                                    <span className="spotlight-publisher">{FEATURED_APPS[0].publisher}</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Free Apps */}
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">top free</h2>
                            <div className="wp-featured-scroll">
                                {TOP_FREE_APPS.map(app => (
                                    <div key={app.id} className="wp-featured-app" onClick={() => setSelectedApp(app)}>
                                        <div className="wp-app-icon" style={{ background: app.color }}>
                                            <Icon name={app.icon} size={28} />
                                        </div>
                                        <span className="wp-app-title">{app.name}</span>
                                        <span className="wp-app-rating-small">{renderRating(app.rating)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Featured Apps Row */}
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">popular</h2>
                            <div className="wp-featured-scroll">
                                {FEATURED_APPS.slice(1).map(app => (
                                    <div key={app.id} className="wp-featured-app" onClick={() => setSelectedApp(app)}>
                                        <div className="wp-app-icon" style={{ background: app.color }}>
                                            <Icon name={app.icon} size={28} />
                                        </div>
                                        <span className="wp-app-title">{app.name}</span>
                                        <span className="wp-app-rating-small">{renderRating(app.rating)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">categories</h2>
                            <div className="wp-categories-grid">
                                {CATEGORIES.map(cat => (
                                    <div key={cat.id} className="wp-category-tile" onClick={() => setSelectedCategory(cat)}>
                                        <div className="category-icon" style={{ background: cat.color }}>
                                            <Icon name={cat.icon} size={24} />
                                        </div>
                                        <span className="wp-category-name">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {pivot === 'games' && (
                    <>
                        {/* Featured Game Spotlight */}
                        <div className="featured-spotlight" onClick={() => setSelectedApp(FEATURED_GAMES[0])}>
                            <div className="spotlight-bg" style={{ background: `linear-gradient(135deg, ${FEATURED_GAMES[0].color}, ${FEATURED_GAMES[0].color}88)` }}>
                                <div className="spotlight-icon">
                                    <Icon name={FEATURED_GAMES[0].icon} size={64} />
                                </div>
                                <div className="spotlight-info">
                                    <span className="spotlight-badge">game of the week</span>
                                    <h2 className="spotlight-name">{FEATURED_GAMES[0].name}</h2>
                                    <span className="spotlight-publisher">{FEATURED_GAMES[0].publisher}</span>
                                </div>
                            </div>
                        </div>

                        {/* New Releases */}
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">new releases</h2>
                            <div className="wp-featured-scroll">
                                {FEATURED_GAMES.map(game => (
                                    <div key={game.id} className="wp-featured-app" onClick={() => setSelectedApp(game)}>
                                        <div className="wp-app-icon game-icon" style={{ background: game.color }}>
                                            <Icon name={game.icon} size={28} />
                                        </div>
                                        <span className="wp-app-title">{game.name}</span>
                                        <span className="wp-app-rating-small">{renderRating(game.rating)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Games List */}
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">top games</h2>
                            <div className="games-list">
                                {TOP_GAMES.map((game, index) => (
                                    <div key={game.id} className="app-list-item" onClick={() => setSelectedApp(game)}>
                                        <span className="app-rank">{index + 1}</span>
                                        <div className="app-list-icon" style={{ background: game.color }}>
                                            <Icon name={game.icon} size={24} />
                                        </div>
                                        <div className="app-list-info">
                                            <span className="app-list-name">{game.name}</span>
                                            <span className="app-list-publisher">{game.publisher}</span>
                                        </div>
                                        <span className="app-list-free">free</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Game Categories */}
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">browse by genre</h2>
                            <div className="wp-categories-grid">
                                {GAME_CATEGORIES.map(cat => (
                                    <div key={cat.id} className="wp-category-tile" onClick={() => setSelectedCategory(cat)}>
                                        <div className="category-icon" style={{ background: cat.color }}>
                                            <Icon name={cat.icon} size={24} />
                                        </div>
                                        <span className="wp-category-name">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {pivot === 'music' && (
                    <>
                        <div className="wp-store-section">
                            <h2 className="wp-section-title">top albums</h2>
                            <div className="music-albums-grid">
                                {TOP_ALBUMS.map((album, index) => (
                                    <div key={album.id} className="album-card">
                                        <div className="album-art" style={{ background: album.color }}>
                                            <Icon name="musicalNote" size={32} />
                                        </div>
                                        <div className="album-info">
                                            <span className="album-rank">{index + 1}</span>
                                            <div className="album-text">
                                                <span className="album-name">{album.name}</span>
                                                <span className="album-artist">{album.artist}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="music-promo">
                            <Icon name="music" size={32} />
                            <div className="promo-text">
                                <h3>Xbox Music Pass</h3>
                                <p>Stream millions of songs with Xbox Music Pass</p>
                            </div>
                        </div>

                        <p className="wp-empty-text">Browse more music in the Music + Videos app</p>
                    </>
                )}
            </div>
        </AppShell>
    );
}
