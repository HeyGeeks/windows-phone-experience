import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Music.css';

const ALBUMS = [
    { id: 1, title: 'Midnight Drive', artist: 'Synthwave Collective', cover: 'https://picsum.photos/seed/album1/200/200' },
    { id: 2, title: 'Ocean Waves', artist: 'Ambient Dreams', cover: 'https://picsum.photos/seed/album2/200/200' },
    { id: 3, title: 'City Lights', artist: 'Electric Soul', cover: 'https://picsum.photos/seed/album3/200/200' },
];

const SONGS = [
    { id: 1, title: 'Neon Nights', artist: 'Synthwave Collective', duration: '3:45' },
    { id: 2, title: 'Retrograde', artist: 'Synthwave Collective', duration: '4:12' },
    { id: 3, title: 'Starlight', artist: 'Ambient Dreams', duration: '5:23' },
    { id: 4, title: 'Horizon', artist: 'Electric Soul', duration: '3:56' },
    { id: 5, title: 'Pulse', artist: 'Electric Soul', duration: '4:01' },
];

export function Music() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(SONGS[0]);

    return (
        <AppShell title="music">
            <div className="music-container">
                {/* Now Playing */}
                <div className="now-playing">
                    <div className="album-art">
                        <img src={ALBUMS[0].cover} alt="Album Art" />
                    </div>
                    <div className="song-info">
                        <span className="song-title">{currentSong.title}</span>
                        <span className="song-artist">{currentSong.artist}</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: '35%' }}></div>
                    </div>
                    <div className="time-info">
                        <span>1:18</span>
                        <span>{currentSong.duration}</span>
                    </div>
                    <div className="controls">
                        <button className="control-btn">
                            <Icon name="skip_prev" size={32} />
                        </button>
                        <button
                            className="control-btn play-btn"
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            <Icon name={isPlaying ? 'pause' : 'play'} size={40} />
                        </button>
                        <button className="control-btn">
                            <Icon name="skip_next" size={32} />
                        </button>
                    </div>
                </div>

                {/* Playlist */}
                <div className="playlist-section">
                    <h2 className="section-title">up next</h2>
                    {SONGS.map(song => (
                        <div
                            key={song.id}
                            className={`song-item ${song.id === currentSong.id ? 'active' : ''}`}
                            onClick={() => setCurrentSong(song)}
                        >
                            <div className="song-item-info">
                                <span className="song-item-title">{song.title}</span>
                                <span className="song-item-artist">{song.artist}</span>
                            </div>
                            <span className="song-item-duration">{song.duration}</span>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
