import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Games.css';

const GAMES = [
    { id: 1, name: 'Tic Tac Toe', icon: '⭕', color: '#0078D7', achievements: 5, gamerscore: 100, playable: true },
    { id: 2, name: 'Wordament', icon: '📝', color: '#107C10', achievements: 12, gamerscore: 200 },
    { id: 3, name: 'Minesweeper', icon: '💣', color: '#5C2D91', achievements: 8, gamerscore: 150 },
    { id: 4, name: 'Solitaire', icon: '🃏', color: '#D83B01', achievements: 15, gamerscore: 300 },
    { id: 5, name: 'Mahjong', icon: '🀄', color: '#825A2C', achievements: 10, gamerscore: 180 },
];

// Tic Tac Toe Component
function TicTacToe({ onBack }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: [a, b, c] };
            }
        }
        return null;
    };

    const result = calculateWinner(board);
    const winner = result?.winner;
    const winningLine = result?.line || [];
    const isDraw = !winner && board.every(cell => cell !== null);

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        if (winner) {
            setScores(prev => ({
                ...prev,
                [winner.toLowerCase()]: prev[winner.toLowerCase()] + 1
            }));
        } else if (isDraw) {
            setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
        }
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const getStatus = () => {
        if (winner) return `${winner} wins!`;
        if (isDraw) return "It's a draw!";
        return `${isXNext ? 'X' : 'O'}'s turn`;
    };

    return (
        <div className="ttt-game">
            <button className="wp-back-btn" onClick={onBack}>
                <Icon name="back" size={20} />
            </button>
            <h1 className="ttt-title">Tic Tac Toe</h1>
            
            <div className="ttt-scores">
                <div className="ttt-score-item">
                    <span className="ttt-score-label">X</span>
                    <span className="ttt-score-value">{scores.x}</span>
                </div>
                <div className="ttt-score-item">
                    <span className="ttt-score-label">Draws</span>
                    <span className="ttt-score-value">{scores.draws}</span>
                </div>
                <div className="ttt-score-item">
                    <span className="ttt-score-label">O</span>
                    <span className="ttt-score-value">{scores.o}</span>
                </div>
            </div>

            <div className="ttt-status">{getStatus()}</div>

            <div className="ttt-board">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`ttt-cell ${cell ? 'filled' : ''} ${winningLine.includes(index) ? 'winning' : ''}`}
                        onClick={() => handleClick(index)}
                        disabled={cell !== null || winner}
                    >
                        {cell && <span className={`ttt-mark ${cell.toLowerCase()}`}>{cell}</span>}
                    </button>
                ))}
            </div>

            {(winner || isDraw) && (
                <button className="ttt-play-again" onClick={resetGame}>
                    Play Again
                </button>
            )}
        </div>
    );
}

export function Games() {
    const [pivot, setPivot] = useState('collection');
    const [selectedGame, setSelectedGame] = useState(null);
    const [playingGame, setPlayingGame] = useState(null);

    const profile = {
        gamertag: 'WindowsPlayer',
        gamerscore: 830,
        avatar: '🎮'
    };

    // Playing a game
    if (playingGame === 'tictactoe') {
        return (
            <AppShell title="Games" hideTitle>
                <TicTacToe onBack={() => setPlayingGame(null)} />
            </AppShell>
        );
    }

    // Game detail view
    if (selectedGame) {
        return (
            <AppShell title="Games" hideTitle>
                <div className="wp-game-detail">
                    <button className="wp-back-btn" onClick={() => setSelectedGame(null)}>
                        <Icon name="back" size={20} />
                    </button>
                    <div className="wp-game-header">
                        <div className="wp-game-icon-large" style={{ background: selectedGame.color }}>
                            {selectedGame.icon}
                        </div>
                        <h2 className="wp-game-name">{selectedGame.name}</h2>
                    </div>
                    <button 
                        className="wp-play-btn" 
                        onClick={() => selectedGame.playable && setPlayingGame('tictactoe')}
                    >
                        Play
                    </button>
                    <div className="wp-game-stats">
                        <div className="wp-stat-item">
                            <span className="wp-stat-value">{selectedGame.achievements}</span>
                            <span className="wp-stat-label">Achievements</span>
                        </div>
                        <div className="wp-stat-item">
                            <span className="wp-stat-value">{selectedGame.gamerscore}</span>
                            <span className="wp-stat-label">Gamerscore</span>
                        </div>
                    </div>
                    <div className="wp-achievements-section">
                        <h3>Achievements</h3>
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
                                <span className="wp-achievement-name">Champion</span>
                                <span className="wp-achievement-desc">Win 10 games</span>
                            </div>
                            <span className="wp-achievement-score">25G</span>
                        </div>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="Games" hideTitle>
            <div className="wp-games">
                <h1 className="wp-games-title">Games</h1>
                <div className="wp-pivot-header">
                    <button 
                        className={`wp-pivot ${pivot === 'collection' ? 'active' : ''}`} 
                        onClick={() => setPivot('collection')}
                    >
                        collection
                    </button>
                    <button 
                        className={`wp-pivot ${pivot === 'xbox' ? 'active' : ''}`} 
                        onClick={() => setPivot('xbox')}
                    >
                        xbox
                    </button>
                    <button 
                        className={`wp-pivot ${pivot === 'spotlight' ? 'active' : ''}`} 
                        onClick={() => setPivot('spotlight')}
                    >
                        spotlight
                    </button>
                </div>

                {pivot === 'collection' && (
                    <div className="wp-games-grid">
                        {GAMES.map(game => (
                            <div 
                                key={game.id} 
                                className="wp-game-tile" 
                                style={{ background: game.color }} 
                                onClick={() => setSelectedGame(game)}
                            >
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
                                <span className="wp-profile-score">{profile.gamerscore} Gamerscore</span>
                            </div>
                        </div>
                        <div className="wp-xbox-menu">
                            <div className="wp-xbox-item">
                                <Icon name="people" size={24} />
                                <span>Friends</span>
                            </div>
                            <div className="wp-xbox-item">
                                <Icon name="star" size={24} />
                                <span>Achievements</span>
                            </div>
                            <div className="wp-xbox-item">
                                <Icon name="message" size={24} />
                                <span>Messages</span>
                            </div>
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
