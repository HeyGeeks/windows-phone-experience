import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../components/Icons';
import { useMusic } from '../../../context/MusicContext';
import { formatDuration } from '../data';

/**
 * PodcastPlayer - Full-screen podcast player with playback controls
 * Integrates with MusicContext for system-wide playback control
 * @param {Object} props
 * @param {Object} props.episode - Episode object to play
 * @param {Function} props.onClose - Callback when player is closed
 */
export function PodcastPlayer({ episode, onClose }) {
    const { isPlaying, currentSong, currentTime, duration, playSong, togglePlay, seekTo } = useMusic();
    const progressBarRef = useRef(null);
    const [localTime, setLocalTime] = useState(episode.playbackPosition || 0);
    
    // Check if this episode is currently playing
    const isCurrentEpisode = currentSong?.id === episode.id;
    const displayTime = isCurrentEpisode ? currentTime : localTime;
    const displayDuration = isCurrentEpisode && duration > 0 ? duration : episode.duration;
    const progressPercent = displayDuration > 0 ? (displayTime / displayDuration) * 100 : 0;

    // Start playing when component mounts if not already playing this episode
    useEffect(() => {
        if (!isCurrentEpisode) {
            // Convert episode to song format for MusicContext
            const podcastSong = {
                id: episode.id,
                title: episode.title,
                artist: episode.podcastTitle || 'Podcast',
                album: episode.podcastTitle || 'Podcast',
                cover: episode.podcastArtwork || 'https://via.placeholder.com/200',
                previewUrl: episode.audioUrl,
                duration: episode.duration
            };
            playSong(podcastSong);
            
            // Seek to saved position if available
            if (episode.playbackPosition > 0) {
                setTimeout(() => seekTo(episode.playbackPosition), 100);
            }
        }
    }, [episode.id]);

    const handlePlayPause = () => {
        if (isCurrentEpisode) {
            togglePlay();
        } else {
            // Start playing this episode
            const podcastSong = {
                id: episode.id,
                title: episode.title,
                artist: episode.podcastTitle || 'Podcast',
                album: episode.podcastTitle || 'Podcast',
                cover: episode.podcastArtwork || 'https://via.placeholder.com/200',
                previewUrl: episode.audioUrl,
                duration: episode.duration
            };
            playSong(podcastSong);
        }
    };

    const handleSkipBack = () => {
        const newTime = Math.max(0, displayTime - 30);
        if (isCurrentEpisode) {
            seekTo(newTime);
        } else {
            setLocalTime(newTime);
        }
    };

    const handleSkipForward = () => {
        const newTime = Math.min(displayDuration, displayTime + 30);
        if (isCurrentEpisode) {
            seekTo(newTime);
        } else {
            setLocalTime(newTime);
        }
    };

    const handleProgressClick = (e) => {
        if (!progressBarRef.current) return;
        
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        const newTime = percent * displayDuration;
        
        if (isCurrentEpisode) {
            seekTo(newTime);
        } else {
            setLocalTime(newTime);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        if (hours > 0) {
            return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="podcast-player-overlay">
            <div className="podcast-player-header">
                <button 
                    className="podcast-player-back"
                    onClick={onClose}
                    aria-label="Close player"
                >
                    <Icon name="back" size={24} />
                </button>
                <span className="podcast-player-title">NOW PLAYING</span>
            </div>
            
            <div className="podcast-player-content">
                <div className="podcast-player-artwork">
                    <img 
                        src={episode.podcastArtwork || 'https://via.placeholder.com/200'} 
                        alt={episode.title}
                    />
                </div>
                
                <div className="podcast-player-info">
                    <h2 className="podcast-player-episode-title">{episode.title}</h2>
                    <span className="podcast-player-podcast-title">
                        {episode.podcastTitle || 'Podcast'}
                    </span>
                </div>
                
                <div className="podcast-player-progress">
                    <span className="podcast-player-time">{formatTime(displayTime)}</span>
                    <div 
                        ref={progressBarRef}
                        className="podcast-player-progress-bar"
                        onClick={handleProgressClick}
                        role="slider"
                        aria-label="Playback progress"
                        aria-valuemin={0}
                        aria-valuemax={displayDuration}
                        aria-valuenow={displayTime}
                    >
                        <div 
                            className="podcast-player-progress-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <span className="podcast-player-time">{formatTime(displayDuration)}</span>
                </div>
                
                <div className="podcast-player-controls">
                    <button 
                        className="podcast-player-btn skip"
                        onClick={handleSkipBack}
                        aria-label="Skip back 30 seconds"
                    >
                        <Icon name="skip_prev" size={20} />
                    </button>
                    
                    <button 
                        className="podcast-player-btn play-pause"
                        onClick={handlePlayPause}
                        aria-label={isCurrentEpisode && isPlaying ? 'Pause' : 'Play'}
                    >
                        <Icon 
                            name={isCurrentEpisode && isPlaying ? 'pause' : 'play'} 
                            size={32} 
                        />
                    </button>
                    
                    <button 
                        className="podcast-player-btn skip"
                        onClick={handleSkipForward}
                        aria-label="Skip forward 30 seconds"
                    >
                        <Icon name="skip_next" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
