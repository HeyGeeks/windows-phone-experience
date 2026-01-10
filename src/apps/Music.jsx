import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import { useMusic } from '../context/MusicContext';
import './Music.css';

export function Music() {
    const {
        isPlaying,
        currentSong,
        currentTime,
        duration,
        history,
        playSong,
        togglePlay
    } = useMusic();

    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState('');
    const [pivot, setPivot] = useState('collection');
    const [loading, setLoading] = useState(false);

    const searchMusic = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=20`);
            const data = await res.json();
            const mappedSongs = data.results.map(item => ({
                id: item.trackId,
                title: item.trackName,
                artist: item.artistName,
                album: item.collectionName,
                cover: item.artworkUrl100.replace('100x100', '400x400'),
                previewUrl: item.previewUrl,
                duration: 30
            }));

            setSongs(mappedSongs);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaySong = (song) => {
        playSong(song);
        setPivot('nowPlaying');
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const formatRemaining = (curr, total) => {
        if (!total || isNaN(total)) return '-0:00';
        const left = total - curr;
        const m = Math.floor(left / 60);
        const s = Math.floor(left % 60);
        return `-${m}:${s.toString().padStart(2, '0')}`;
    };

    const getNextSong = () => {
        if (!currentSong || songs.length === 0) return null;
        const currentIndex = songs.findIndex(s => s.id === currentSong.id);
        if (currentIndex >= 0 && currentIndex < songs.length - 1) {
            return songs[currentIndex + 1];
        }
        return null;
    };

    const nextSong = getNextSong();

    return (
        <AppShell title="xbox music" hideTitle>
            <div className="xm-container">
                {currentSong && (
                    <div
                        className="xm-background"
                        style={{ backgroundImage: `url(${currentSong.cover})` }}
                    />
                )}

                <div className="xm-header">
                    <h1 className="xm-title">xbox music</h1>
                </div>

                <div className="xm-pivots">
                    <button
                        className={`xm-pivot ${pivot === 'collection' ? 'active' : ''}`}
                        onClick={() => setPivot('collection')}
                    >
                        collection
                    </button>
                    <button
                        className={`xm-pivot ${pivot === 'nowPlaying' ? 'active' : ''}`}
                        onClick={() => setPivot('nowPlaying')}
                    >
                        now playing
                    </button>
                </div>

                {pivot === 'collection' && (
                    <div className="xm-collection">
                        <form className="xm-search" onSubmit={searchMusic}>
                            <input
                                type="text"
                                placeholder="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="submit">
                                <Icon name="search" size={20} />
                            </button>
                        </form>

                        {history.length > 0 && songs.length === 0 && (
                            <div className="xm-section">
                                <div className="xm-section-title">recently played</div>
                                {history.map(song => (
                                    <div
                                        key={song.id}
                                        className="xm-song-item"
                                        onClick={() => handlePlaySong(song)}
                                    >
                                        <div className="xm-song-letter">
                                            {song.title[0].toLowerCase()}
                                        </div>
                                        <div className="xm-song-info">
                                            <span className="xm-song-title">{song.title}</span>
                                            <span className="xm-song-artist">
                                                <Icon name="music" size={12} /> {song.artist}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {loading && <div className="xm-loading">Searching...</div>}

                        {songs.length > 0 && (
                            <div className="xm-section">
                                <div className="xm-section-title">songs</div>
                                {songs.map(song => (
                                    <div
                                        key={song.id}
                                        className="xm-song-item"
                                        onClick={() => handlePlaySong(song)}
                                    >
                                        <div className="xm-song-letter">
                                            {song.title[0].toLowerCase()}
                                        </div>
                                        <div className="xm-song-info">
                                            <span className="xm-song-title">{song.title}</span>
                                            <span className="xm-song-artist">
                                                <Icon name="music" size={12} /> {song.artist} • {song.album}
                                            </span>
                                        </div>
                                        <button className="xm-download-btn">
                                            <Icon name="download" size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {history.length === 0 && songs.length === 0 && !loading && (
                            <div className="xm-empty">
                                <p>Search for music above</p>
                            </div>
                        )}
                    </div>
                )}

                {pivot === 'nowPlaying' && (
                    <div className="xm-now-playing">
                        {currentSong ? (
                            <>
                                <div className="xm-np-label">NOW PLAYING</div>

                                <div className="xm-np-track-info">
                                    <span className="xm-np-title">{currentSong.title}</span>
                                    <span className="xm-np-artist">by {currentSong.artist}</span>
                                </div>

                                <div className="xm-np-art">
                                    <img src={currentSong.cover} alt={currentSong.title} />
                                    <button className="xm-np-queue-btn">
                                        <Icon name="menu" size={24} />
                                    </button>
                                </div>

                                <div className="xm-np-progress">
                                    <span className="xm-time">{formatTime(currentTime)}</span>
                                    <div className="xm-progress-track">
                                        <div
                                            className="xm-progress-fill"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                        />
                                    </div>
                                    <span className="xm-time">{formatRemaining(currentTime, duration)}</span>
                                </div>

                                {nextSong && (
                                    <div className="xm-up-next">
                                        <span className="xm-up-next-label">Up next:</span>
                                        <span className="xm-up-next-song">{nextSong.title} - From "{nextSong.album}" by...</span>
                                    </div>
                                )}

                                <div className="xm-controls">
                                    <button className="xm-ctrl-btn">
                                        <Icon name="skip_prev" size={28} />
                                    </button>
                                    <button className="xm-ctrl-btn xm-ctrl-play" onClick={togglePlay}>
                                        <Icon name={isPlaying ? 'pause' : 'play'} size={36} />
                                    </button>
                                    <button className="xm-ctrl-btn">
                                        <Icon name="skip_next" size={28} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="xm-np-empty">
                                <p>No song playing</p>
                                <button onClick={() => setPivot('collection')}>Browse collection</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppShell>
    );
}
