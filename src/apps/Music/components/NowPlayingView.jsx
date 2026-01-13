import { useMusic } from '../../../context/MusicContext';
import { Icon } from '../../../components/Icons';
import './NowPlayingView.css';

/**
 * NowPlayingView Component - Xbox Music Style
 * Full-screen now playing experience matching Windows Phone 8.1 Xbox Music design.
 */
export function NowPlayingView({ onOpenQueue, onBrowse }) {
  const {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    queue,
    queueIndex,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
  } = useMusic();

  // Format time in m:ss format
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Format remaining time (negative format like -2:27)
  const formatRemainingTime = (current, total) => {
    if (!total || isNaN(total)) return '-0:00';
    const remaining = total - current;
    const m = Math.floor(remaining / 60);
    const s = Math.floor(remaining % 60);
    return `-${m}:${s.toString().padStart(2, '0')}`;
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

  // Get next song in queue
  const getNextSong = () => {
    if (queue && queue.length > queueIndex + 1) {
      return queue[queueIndex + 1];
    }
    return null;
  };

  const nextSong = getNextSong();

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
      {/* NOW PLAYING Header */}
      <div className="now-playing-header">
        <span className="now-playing-label">NOW PLAYING</span>
      </div>

      {/* Song Info - Xbox Music Style */}
      <div className="now-playing-song-info">
        <span className="now-playing-title">{currentSong.title}</span>
        <span className="now-playing-artist">by {currentSong.artist}</span>
      </div>

      {/* Album Artwork - Centered */}
      <div className="now-playing-artwork">
        <img
          src={currentSong.cover}
          alt={`${currentSong.album} album art`}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/280?text=No+Art';
          }}
        />
      </div>

      {/* Progress Bar - Xbox Music Style */}
      <div className="now-playing-progress">
        <span className="now-playing-time elapsed">{formatTime(currentTime)}</span>
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
        </div>
        <span className="now-playing-time remaining">{formatRemainingTime(currentTime, duration)}</span>
      </div>

      {/* Up Next Section */}
      {nextSong && (
        <div className="now-playing-up-next">
          <span className="up-next-label">Up next:</span>
          <span className="up-next-song">{nextSong.title} - {nextSong.artist}</span>
        </div>
      )}

      {/* Playback Controls - Xbox Music Style */}
      <div className="now-playing-controls">
        {/* Previous button */}
        <button
          className="now-playing-control-btn"
          onClick={playPrevious}
          aria-label="Previous track"
        >
          <Icon name="skip_prev" size={28} />
        </button>

        {/* Play/Pause button - Larger */}
        <button
          className="now-playing-control-btn now-playing-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={32} />
        </button>

        {/* Next button */}
        <button
          className="now-playing-control-btn"
          onClick={playNext}
          aria-label="Next track"
        >
          <Icon name="skip_next" size={28} />
        </button>
      </div>

      {/* More Options Button */}
      <div className="now-playing-actions">
        <button
          className="now-playing-more-btn"
          onClick={onOpenQueue}
          aria-label="More options"
        >
          <span>•••</span>
        </button>
      </div>
    </div>
  );
}
