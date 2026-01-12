import { useMusic } from '../../../context/MusicContext';
import { Icon } from '../../../components/Icons';
import './NowPlayingView.css';

/**
 * NowPlayingView Component
 * Full-screen now playing experience with album art, song info, and playback controls.
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 6.1, 9.1, 9.2, 9.6
 */
export function NowPlayingView({ onOpenQueue, onBrowse }) {
  const {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    shuffleEnabled,
    repeatMode,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    toggleShuffle,
    cycleRepeat
  } = useMusic();

  // Format time in m:ss format
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Handle progress bar click/drag for seeking
  const handleProgressClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    seekTo(Math.max(0, Math.min(newTime, duration)));
  };

  // Empty state when no song is playing
  if (!currentSong) {
    return (
      <div className="now-playing-view">
        <div className="now-playing-empty">
          <div className="now-playing-empty-icon">
            <Icon name="music" size={64} />
          </div>
          <p>no song playing</p>
          <button className="now-playing-browse-btn" onClick={onBrowse}>
            browse collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="now-playing-view">
      {/* Blurred background */}
      <div 
        className="now-playing-bg" 
        style={{ backgroundImage: `url(${currentSong.cover})` }}
      />
      
      {/* Content */}
      <div className="now-playing-content">
        {/* Album artwork - Requirement 5.1 */}
        <div className="now-playing-artwork">
          <img 
            src={currentSong.cover} 
            alt={`${currentSong.album} album art`}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/280?text=No+Art';
            }}
          />
        </div>

        {/* Song info - Requirement 5.2 */}
        <div className="now-playing-info">
          <span className="now-playing-title">{currentSong.title}</span>
          <span className="now-playing-artist">{currentSong.artist}</span>
          <span className="now-playing-album">{currentSong.album}</span>
        </div>

        {/* Progress bar - Requirement 5.3, 9.6 */}
        <div className="now-playing-progress">
          <span className="now-playing-time">{formatTime(currentTime)}</span>
          <div 
            className="now-playing-progress-bar" 
            onClick={handleProgressClick}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
          >
            <div 
              className="now-playing-progress-fill" 
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
            <div 
              className="now-playing-progress-thumb"
              style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <span className="now-playing-time">{formatTime(duration)}</span>
        </div>

        {/* Playback controls - Requirement 5.4, 9.1, 9.2 */}
        <div className="now-playing-controls">
          {/* Shuffle button - Requirement 5.5, 5.6 */}
          <button 
            className={`now-playing-control-btn now-playing-shuffle ${shuffleEnabled ? 'active' : ''}`}
            onClick={toggleShuffle}
            aria-label={shuffleEnabled ? 'Disable shuffle' : 'Enable shuffle'}
            aria-pressed={shuffleEnabled}
          >
            <Icon name="refresh" size={24} />
          </button>

          {/* Previous button */}
          <button 
            className="now-playing-control-btn"
            onClick={playPrevious}
            aria-label="Previous track"
          >
            <Icon name="skip_prev" size={32} />
          </button>

          {/* Play/Pause button */}
          <button 
            className="now-playing-control-btn now-playing-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} size={40} />
          </button>

          {/* Next button */}
          <button 
            className="now-playing-control-btn"
            onClick={playNext}
            aria-label="Next track"
          >
            <Icon name="skip_next" size={32} />
          </button>

          {/* Repeat button - Requirement 5.7 */}
          <button 
            className={`now-playing-control-btn now-playing-repeat ${repeatMode !== 'off' ? 'active' : ''}`}
            onClick={cycleRepeat}
            aria-label={`Repeat mode: ${repeatMode}`}
          >
            <Icon name="refresh" size={24} />
            {repeatMode === 'one' && <span className="repeat-one-indicator">1</span>}
          </button>
        </div>

        {/* Queue button - Requirement 6.1 */}
        <div className="now-playing-actions">
          <button 
            className="now-playing-queue-btn"
            onClick={onOpenQueue}
            aria-label="View queue"
          >
            <Icon name="more" size={24} />
            <span>queue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
