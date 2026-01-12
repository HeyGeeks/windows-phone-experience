import { useMusic } from '../../../context/MusicContext';
import { Icon } from '../../../components/Icons';
import './QueueView.css';

/**
 * QueueView Component
 * Displays all queued songs in order with the currently playing song highlighted.
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */
export function QueueView({ onClose }) {
  const {
    queue,
    queueIndex,
    currentSong,
    isPlaying,
    skipToQueueIndex
  } = useMusic();

  // Handle song tap to skip to that position - Requirement 6.4
  const handleSongTap = (index) => {
    skipToQueueIndex(index);
  };

  // Format duration in m:ss format
  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="queue-view">
      {/* Header */}
      <div className="queue-header">
        <button 
          className="queue-close-btn"
          onClick={onClose}
          aria-label="Close queue"
        >
          <Icon name="back" size={24} />
        </button>
        <h2 className="queue-title">queue</h2>
        <span className="queue-count">{queue.length} songs</span>
      </div>

      {/* Queue list - Requirement 6.2 */}
      <div className="queue-content">
        {queue.length === 0 ? (
          <div className="queue-empty">
            <Icon name="music" size={48} />
            <p>no songs in queue</p>
          </div>
        ) : (
          <div className="queue-list">
            {queue.map((song, index) => {
              const isCurrent = index === queueIndex;
              
              return (
                <div
                  key={`${song.id}-${index}`}
                  className={`queue-item ${isCurrent ? 'playing' : ''}`}
                  onClick={() => handleSongTap(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSongTap(index);
                    }
                  }}
                  aria-label={`${isCurrent ? 'Now playing: ' : ''}${song.title} by ${song.artist}`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  {/* Queue position */}
                  <span className="queue-item-position">
                    {isCurrent && isPlaying ? (
                      <Icon name="play" size={16} />
                    ) : (
                      index + 1
                    )}
                  </span>

                  {/* Song thumbnail */}
                  <img
                    className="queue-item-thumb"
                    src={song.cover}
                    alt=""
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/48?text=♪';
                    }}
                  />

                  {/* Song info */}
                  <div className="queue-item-info">
                    <span className="queue-item-title">{song.title}</span>
                    <span className="queue-item-artist">{song.artist}</span>
                  </div>

                  {/* Duration */}
                  <span className="queue-item-duration">
                    {formatDuration(song.duration)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Now playing indicator at bottom */}
      {currentSong && (
        <div className="queue-now-playing">
          <span className="queue-now-playing-label">now playing</span>
          <span className="queue-now-playing-title">{currentSong.title}</span>
        </div>
      )}
    </div>
  );
}
