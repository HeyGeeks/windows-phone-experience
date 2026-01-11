import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import { useMusic } from '../context/MusicContext';
import './Music.css';

export function Music() {
    const { isPlaying, currentSong, currentTime, duration, history, playSong, togglePlay } = useMusic();
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
            setSongs(data.results.map(item => ({
                id: item.trackId,
                title: item.trackName,
                artist: item.artistName,
                album: item.collectionName,
                cover: item.artworkUrl100.replace('100x100', '400x400'),
                previewUrl: item.previewUrl,
                duration: 30
            })));
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlaySong = (song) => {
        playSong(song);
        setPivot('now');
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <AppShell title="music + videos" hideTitle>
            <div className="wp-music">
                {currentSong && <div className="wp-music-bg" style={{ backgroundImage: `url(${currentSong.cover})` }} />}
                <h1 className="wp-music-title">Music + Videos</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'collection' ? 'active' : ''}`} onClick={() => setPivot('collection')}>collection</button>
                    <button className={`wp-pivot ${pivot === 'now' ? 'active' : ''}`} onClick={() => setPivot('now')}>now playing</button>
                    <button className={`wp-pivot ${pivot === 'history' ? 'active' : ''}`} onClick={() => setPivot('history')}>history</button>
                </div>

                {pivot === 'collection' && (
                    <div className="wp-music-collection">
                        <form className="wp-music-search" onSubmit={searchMusic}>
                            <input type="text" placeholder="search music" value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button type="submit"><Icon name="search" size={20} /></button>
                        </form>
                        {loading && <div className="wp-music-loading">searching...</div>}
                        {songs.length > 0 && (
                            <div className="wp-music-list">
                                {songs.map(song => (
                                    <div key={song.id} className="wp-music-item" onClick={() => handlePlaySong(song)}>
                                        <img src={song.cover} alt={song.title} className="wp-music-thumb" />
                                        <div className="wp-music-info">
                                            <span className="wp-music-song">{song.title}</span>
                                            <span className="wp-music-artist">{song.artist}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {!loading && songs.length === 0 && <p className="wp-music-empty">search for music above</p>}
                    </div>
                )}

                {pivot === 'now' && (
                    <div className="wp-now-playing">
                        {currentSong ? (
                            <>
                                <div className="wp-np-art"><img src={currentSong.cover} alt={currentSong.title} /></div>
                                <div className="wp-np-info">
                                    <span className="wp-np-title">{currentSong.title}</span>
                                    <span className="wp-np-artist">{currentSong.artist}</span>
                                </div>
                                <div className="wp-np-progress">
                                    <span>{formatTime(currentTime)}</span>
                                    <div className="wp-np-bar"><div className="wp-np-fill" style={{ width: `${(currentTime / duration) * 100}%` }} /></div>
                                    <span>{formatTime(duration)}</span>
                                </div>
                                <div className="wp-np-controls">
                                    <button className="wp-np-btn"><Icon name="skip_prev" size={32} /></button>
                                    <button className="wp-np-btn wp-np-play" onClick={togglePlay}><Icon name={isPlaying ? 'pause' : 'play'} size={40} /></button>
                                    <button className="wp-np-btn"><Icon name="skip_next" size={32} /></button>
                                </div>
                            </>
                        ) : (
                            <div className="wp-np-empty">
                                <p>no song playing</p>
                                <button onClick={() => setPivot('collection')}>browse collection</button>
                            </div>
                        )}
                    </div>
                )}

                {pivot === 'history' && (
                    <div className="wp-music-history">
                        {history.length > 0 ? (
                            <div className="wp-music-list">
                                {history.map(song => (
                                    <div key={song.id} className="wp-music-item" onClick={() => handlePlaySong(song)}>
                                        <img src={song.cover} alt={song.title} className="wp-music-thumb" />
                                        <div className="wp-music-info">
                                            <span className="wp-music-song">{song.title}</span>
                                            <span className="wp-music-artist">{song.artist}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="wp-music-empty">no recently played songs</p>
                        )}
                    </div>
                )}
            </div>
        </AppShell>
    );
}
