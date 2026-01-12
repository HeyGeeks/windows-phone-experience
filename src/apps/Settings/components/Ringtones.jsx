import { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '../../../components/Icons';
import { RINGTONES, CATEGORY_LABELS, getRingtonesByCategory, formatDuration } from '../data/ringtones';
import './Ringtones.css';

/**
 * RingtoneItem Component
 * Displays a single ringtone with play/stop button and selection indicator
 */
export function RingtoneItem({ 
    ringtone, 
    isSelected, 
    isPlaying, 
    onPlay, 
    onSelect,
    playbackProgress 
}) {
    const handlePlayClick = (e) => {
        e.stopPropagation();
        onPlay(ringtone);
    };

    const handleItemClick = () => {
        onSelect(ringtone);
    };

    return (
        <div 
            className={`ringtone-item ${isSelected ? 'selected' : ''}`}
            onClick={handleItemClick}
            data-testid={`ringtone-item-${ringtone.id}`}
        >
            <button
                className={`ringtone-play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={handlePlayClick}
                aria-label={isPlaying ? `Stop ${ringtone.name}` : `Play ${ringtone.name}`}
                data-testid={`ringtone-play-btn-${ringtone.id}`}
            >
                <Icon name={isPlaying ? 'pause' : 'play'} size={16} />
            </button>
            <div className="ringtone-info">
                <span className="ringtone-name">{ringtone.name}</span>
                <span className="ringtone-duration">{formatDuration(ringtone.duration)}</span>
                {isPlaying && playbackProgress > 0 && (
                    <div className="ringtone-progress">
                        <div 
                            className="ringtone-progress-bar" 
                            style={{ width: `${playbackProgress}%` }}
                        />
                    </div>
                )}
            </div>
            {isSelected && <span className="ringtone-check">✓</span>}
        </div>
    );
}

/**
 * RingtonePlayer Hook
 * Manages audio playback state and controls
 */
export function useRingtonePlayer() {
    const audioRef = useRef(null);
    const [playingId, setPlayingId] = useState(null);
    const [playbackProgress, setPlaybackProgress] = useState(0);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio();
        
        const audio = audioRef.current;
        
        const handleEnded = () => {
            setPlayingId(null);
            setPlaybackProgress(0);
        };

        const handleTimeUpdate = () => {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                setPlaybackProgress(progress);
            }
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.pause();
            audio.src = '';
        };
    }, []);

    const play = useCallback((ringtone) => {
        const audio = audioRef.current;
        if (!audio) return;

        // Toggle behavior: if same ringtone is playing, stop it
        if (playingId === ringtone.id) {
            audio.pause();
            audio.currentTime = 0;
            setPlayingId(null);
            setPlaybackProgress(0);
        } else {
            // Play new ringtone
            audio.src = ringtone.audioUrl;
            audio.play().catch(err => {
                console.error('Audio playback failed:', err);
                setPlayingId(null);
            });
            setPlayingId(ringtone.id);
            setPlaybackProgress(0);
        }
    }, [playingId]);

    const stop = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        setPlayingId(null);
        setPlaybackProgress(0);
    }, []);

    return {
        playingId,
        playbackProgress,
        play,
        stop,
        isPlaying: (id) => playingId === id
    };
}

/**
 * Ringtones Component
 * Main component displaying categorized ringtone list with playback controls
 */
export function Ringtones({ 
    selectedRingtone, 
    onSelectRingtone,
    onBack 
}) {
    const { playingId, playbackProgress, play, stop, isPlaying } = useRingtonePlayer();
    const ringtonesByCategory = getRingtonesByCategory();

    // Stop playback when component unmounts or when navigating back
    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    const handleSelect = (ringtone) => {
        onSelectRingtone(ringtone.name);
        stop();
        if (onBack) {
            onBack();
        }
    };

    const handlePlay = (ringtone) => {
        play(ringtone);
    };

    return (
        <div className="ringtones-container" data-testid="ringtones-container">
            {Object.entries(ringtonesByCategory).map(([category, ringtones]) => (
                ringtones.length > 0 && (
                    <div key={category}>
                        <div className="ringtone-category-header">
                            {CATEGORY_LABELS[category]}
                        </div>
                        <div className="ringtone-list">
                            {ringtones.map(ringtone => (
                                <RingtoneItem
                                    key={ringtone.id}
                                    ringtone={ringtone}
                                    isSelected={selectedRingtone === ringtone.name}
                                    isPlaying={isPlaying(ringtone.id)}
                                    onPlay={handlePlay}
                                    onSelect={handleSelect}
                                    playbackProgress={isPlaying(ringtone.id) ? playbackProgress : 0}
                                />
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}

// Export ringtone data for external use
export { RINGTONES, CATEGORY_LABELS, getRingtonesByCategory, formatDuration };
