import { useMusic } from '../../../context/MusicContext';
import { Icon } from '../../../components/Icons';
import './MiniPlayer.css';

/**
 * MiniPlayer Component
 * Persistent bottom bar showing current playback when navigating away from now playing.
 * Requirements: 7.1, 7.2, 7.3, 7.4
 */
export function MiniPlayer({ onExpand }) {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    currentTime,
    duration
  } = useMusic();

  // Don't render if no song is playing - Requirement 7.1
  if (!currentSong) {
    return null;
  }

  // Handle play/pause - Requirement 7.3
  const handlePlayPause = (e) => {
    e.stopPropagation();
    togglePlay();
  };

  // Handle tap to expand - Requirement 7.4
  const handleExpand = () => {
    if (onExpand) {
      onExpand();
    }
  };

  // Calculate progress percentage
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="mini-player"
      onClick={handleExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleExpand();
        }
      }}
      aria-label={`Now playing: ${currentSong.title} by ${currentSong.artist}. Tap to expand.`}
    >
      {/* Progress bar */}
      <div className="mini-player-progress">
        <div 
          className="mini-player-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Content */}
      <div className="mini-player-content">
        {/* Song thumbnail - Requirement 7.2 */}
        <img
          className="mini-player-thumb"
          src={currentSong.cover}
          alt=""
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/48?text=♪';
          }}
        />

        {/* Song info - Requirement 7.2 */}
        <div className="mini-player-info">
          <span className="mini-player-title">{currentSong.title}</span>
          <span className="mini-player-artist">{currentSong.artist}</span>
        </div>

        {/* Play/Pause control - Requirement 7.3 */}
        <button
          className="mini-player-play-btn"
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={24} />
        </button>
      </div>
    </div>
  );
}
