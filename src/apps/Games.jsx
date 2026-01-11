import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Games.css';

const GAMES = [
    { id: 1, name: 'Wordament', icon: '📝', color: '#0078D7', achievements: 12, gamerscore: 200 },
    { id: 2, name: 'Minesweeper', icon: '💣', color: '#107C10', achievements: 8, gamerscore: 150 },
    { id: 3, name: 'Solitaire', icon: '🃏', color: '#5C2D91', achievements: 15, gamerscore: 300 },
    { id: 4, name: 'Mahjong', icon: '🀄', color: '#D83B01', achievements: 10, gamerscore: 180 },
];

export function Games() {
    const [pivot, setPivot] = useState('collection');
    const [selectedGame, setSelectedGame] = useState(null);

    const profile = {
        gamertag: 'WindowsPlayer',
        gamerscore: 830,
        avatar: '🎮'
    };

    if (selectedGame) {
        return (
            <AppShell title="games" hideTitle>
                <div className="wp-game-detail">
                    <button className="wp-back-btn" onClick={() => setSelectedGame(null)}><Icon name="back" size={20} /></button>
                    <div className="wp-game-header">
                        <div className="wp-game-icon-large" style={{ background: selectedGame.color }}>{selectedGame.icon}</div>
                        <h2 className="wp-game-name">{selectedGame.name}</h2>
                    </div>
                    <button className="wp-play-btn">play</button>
                    <div className="wp-game-stats">
                        <div className="wp-stat-item">
                            <span className="wp-stat-value">{selectedGame.achievements}</span>
                            <span className="wp-stat-label">achievements</span>
                        </div>
                        <div className="wp-stat-item">
                            <span className="wp-stat-value">{selectedGame.gamerscore}</span>
                            <span className="wp-stat-label">gamerscore</span>
                        </div>
                    </div>
                    <div className="wp-achievements-section">
                        <h3>achievements</h3>
                        <div className="wp-achievement-item">
                            <div className="wp-achievement-icon">🏆</div>
                            <div className="wp-achievement-info">
                                <span className="wp-achievement-name">First Win</span>
                                <span className="wp-achievement-desc">Win your first game</span>
                            </div>
                            <span className="wp-achievement-score">10G</span>
                        </div>
                        <div className="wp-achievement-item">
                            <div className="wp-achievement-icon">⭐</div>
                            <div className="wp-achievement-info">
                                <span className="wp-achievement-name">High Score</span>
                                <span className="wp-achievement-desc">Score over 1000 points</span>
                            </div>
                            <span className="wp-achievement-score">25G</span>
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="games" hideTitle>
            <div className="wp-games">
                <h1 className="wp-games-title">games</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'collection' ? 'active' : ''}`} onClick={() => setPivot('collection')}>collection</button>
                    <button className={`wp-pivot ${pivot === 'xbox' ? 'active' : ''}`} onClick={() => setPivot('xbox')}>xbox</button>
                    <button className={`wp-pivot ${pivot === 'spotlight' ? 'active' : ''}`} onClick={() => setPivot('spotlight')}>spotlight</button>
                </div>

                {pivot === 'collection' && (
                    <div className="wp-games-grid">
                        {GAMES.map(game => (
                            <div key={game.id} className="wp-game-tile" style={{ background: game.color }} onClick={() => setSelectedGame(game)}>
                                <span className="wp-game-tile-icon">{game.icon}</span>
                                <span className="wp-game-tile-name">{game.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {pivot === 'xbox' && (
                    <div className="wp-xbox-profile">
                        <div className="wp-profile-header">
                            <div className="wp-profile-avatar">{profile.avatar}</div>
                            <div className="wp-profile-info">
                                <span className="wp-profile-gamertag">{profile.gamertag}</span>
                                <span className="wp-profile-score">{profile.gamerscore} gamerscore</span>
                            </div>
                        </div>
                        <div className="wp-xbox-menu">
                            <div className="wp-xbox-item"><Icon name="people" size={24} /><span>friends</span></div>
                            <div className="wp-xbox-item"><Icon name="star" size={24} /><span>achievements</span></div>
                            <div className="wp-xbox-item"><Icon name="message" size={24} /><span>messages</span></div>
                        </div>
                    </div>
                )}

                {pivot === 'spotlight' && (
                    <div className="wp-spotlight">
                        <div className="wp-spotlight-item">
                            <div className="wp-spotlight-banner" style={{ background: 'linear-gradient(135deg, #107C10, #0078D7)' }}>
                                <span className="wp-spotlight-title">New Xbox Games</span>
                                <span className="wp-spotlight-desc">Check out the latest releases</span>
                            </div>
                        </div>
                        <div className="wp-spotlight-item">
                            <div className="wp-spotlight-banner" style={{ background: 'linear-gradient(135deg, #5C2D91, #D83B01)' }}>
                                <span className="wp-spotlight-title">Weekly Challenge</span>
                                <span className="wp-spotlight-desc">Earn bonus gamerscore</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
