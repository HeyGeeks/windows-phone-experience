import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useMusic } from '../context/MusicContext';
import { Icon } from './Icons';
import { useTileTilt } from '../hooks/useTileTilt';

// Sample photos for the photos tile
const SAMPLE_PHOTOS = [
    'https://picsum.photos/seed/wp1/200/200',
    'https://picsum.photos/seed/wp2/200/200',
    'https://picsum.photos/seed/wp3/200/200',
    'https://picsum.photos/seed/wp4/200/200',
    'https://picsum.photos/seed/wp5/200/200',
    'https://picsum.photos/seed/wp6/200/200',
];

// Sample news headlines
const NEWS_HEADLINES = [
    { title: 'Breaking: Major tech announcement', source: 'Tech News' },
    { title: 'Weather update: Sunny skies ahead', source: 'Weather' },
    { title: 'Sports: Local team wins championship', source: 'Sports' },
    { title: 'Market update: Stocks reach new high', source: 'Finance' },
];

export function LiveTile({
    type, // 'music' | 'photos' | 'news' | 'default'
    icon,
    label,
    size = 'medium',
    color,
    route,
    delay = 0,
    notification
}) {
    const { tileRef, handlers } = useTileTilt();
    const { accentColor } = useTheme();
    const navigate = useNavigate();

    // Music context for music tile
    const musicContext = useMusic();
    const { currentSong, isPlaying } = musicContext || {};

    // State for cycling content
    const [contentIndex, setContentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showLiveContent, setShowLiveContent] = useState(false);

    // Cycle through content for live tiles
    useEffect(() => {
        if (type === 'photos' || type === 'news') {
            const interval = setInterval(() => {
                setIsFlipped(prev => !prev);
                setTimeout(() => {
                    setContentIndex(prev => {
                        if (type === 'photos') {
                            return (prev + 1) % SAMPLE_PHOTOS.length;
                        } else if (type === 'news') {
                            return (prev + 1) % NEWS_HEADLINES.length;
                        }
                        return prev;
                    });
                }, 300);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [type]);

    // Show live content for music when playing
    useEffect(() => {
        if (type === 'music' && currentSong && isPlaying) {
            setShowLiveContent(true);
        } else if (type === 'music') {
            // Delay hiding to allow animation
            const timeout = setTimeout(() => {
                setShowLiveContent(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [type, currentSong, isPlaying]);

    const handleClick = () => {
        if (route) navigate(route);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    const tileColor = color || accentColor;

    // Render different tile contents based on type
    const renderContent = () => {
        switch (type) {
            case 'music':
                return (
                    <div className={`live-tile-content ${showLiveContent ? 'live-active' : ''}`}>
                        {showLiveContent && currentSong ? (
                            <div className="live-music-content">
                                <div
                                    className="live-album-art"
                                    style={{
                                        backgroundImage: currentSong.artwork ? `url(${currentSong.artwork})` : 'none',
                                        backgroundColor: tileColor
                                    }}
                                >
                                    {!currentSong.artwork && <Icon name="music" size={size === 'small' ? 28 : 48} />}
                                </div>
                                <div className="live-music-info">
                                    <span className="live-song-title">{currentSong.title}</span>
                                    <span className="live-song-artist">{currentSong.artist}</span>
                                </div>
                                <div className="music-playing-indicator">
                                    <span className="bar"></span>
                                    <span className="bar"></span>
                                    <span className="bar"></span>
                                </div>
                            </div>
                        ) : (
                            <div className="tile-default-content">
                                <Icon name={icon} className="tile-icon" />
                                <span className="tile-label">{label}</span>
                            </div>
                        )}
                    </div>
                );

            case 'photos':
                return (
                    <div className={`live-tile-content photos-tile ${isFlipped ? 'flipped' : ''}`}>
                        <div className="photos-front">
                            <div
                                className="photo-bg"
                                style={{ backgroundImage: `url(${SAMPLE_PHOTOS[contentIndex]})` }}
                            />
                            <span className="tile-label photos-label">{label}</span>
                        </div>
                        <div className="photos-back">
                            <div
                                className="photo-bg"
                                style={{ backgroundImage: `url(${SAMPLE_PHOTOS[(contentIndex + 1) % SAMPLE_PHOTOS.length]})` }}
                            />
                            <span className="tile-label photos-label">{label}</span>
                        </div>
                    </div>
                );

            case 'news':
                return (
                    <div className={`live-tile-content news-tile ${isFlipped ? 'flipped' : ''}`}>
                        <div className="news-front">
                            <Icon name={icon} className="tile-icon news-icon" />
                            <div className="news-content">
                                <span className="news-headline">{NEWS_HEADLINES[contentIndex].title}</span>
                                <span className="news-source">{NEWS_HEADLINES[contentIndex].source}</span>
                            </div>
                        </div>
                        <div className="news-back">
                            <Icon name={icon} className="tile-icon news-icon" />
                            <div className="news-content">
                                <span className="news-headline">{NEWS_HEADLINES[(contentIndex + 1) % NEWS_HEADLINES.length].title}</span>
                                <span className="news-source">{NEWS_HEADLINES[(contentIndex + 1) % NEWS_HEADLINES.length].source}</span>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="tile-default-content">
                        <Icon name={icon} className="tile-icon" />
                        <span className="tile-label">{label}</span>
                        {notification && (
                            <span className="tile-notification-badge">{notification}</span>
                        )}
                    </div>
                );
        }
    };

    return (
        <div
            ref={tileRef}
            className={`tile tile-${size} tile-animate live-tile live-tile-${type}`}
            style={{
                background: type === 'photos' ? 'transparent' : tileColor,
                animationDelay: `${delay * 0.03}s`
            }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`${label}${notification ? `, ${notification} notifications` : ''}`}
            {...handlers}
        >
            {renderContent()}
        </div>
    );
}
