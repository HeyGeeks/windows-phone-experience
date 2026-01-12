/**
 * HistoryView - Displays recently played songs in reverse chronological order
 * Handles song tap to play
 * Requirements: 11.1, 11.2, 11.4
 */
import { useMusic } from '../../../context/MusicContext';
import './HistoryView.css';

export function HistoryView({ onSongPlay }) {
  const { history } = useMusic();

  const handleSongClick = (song) => {
    if (onSongPlay) {
      onSongPlay(song);
    }
  };

  if (!history || history.length === 0) {
    return (
      <div className="history-view">
        <div className="history-empty">
          <p>no recently played songs</p>
          <p className="history-empty-hint">songs you play will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-view">
      <div className="history-header">
        <span className="history-title">recently played</span>
        <span className="history-count">{history.length} songs</span>
      </div>
      <div className="history-list">
        {history.map((song, index) => (
          <div 
            key={`${song.id}-${index}`} 
            className="history-item" 
            onClick={() => handleSongClick(song)}
          >
            <img 
              src={song.cover} 
              alt={song.title} 
              className="history-thumb"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/56?text=♪';
              }}
            />
            <div className="history-info">
              <span className="history-song-title">{song.title}</span>
              <span className="history-artist">{song.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
