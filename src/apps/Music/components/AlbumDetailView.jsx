import { Icon } from '../../../components/Icons';
import { useMusic } from '../../../context/MusicContext';
import { getSongsByAlbum, formatDuration } from '../data';

/**
 * AlbumDetailView - Shows album track listing with song details
 * Displays album art, name, artist, year prominently
 * Lists all tracks with track number, title, and duration
 * Provides "play album" button and handles track tap to play with remaining tracks queued
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5
 */
export function AlbumDetailView({ album, onBack }) {
  const { playQueue, currentSong, isPlaying } = useMusic();

  if (!album) {
    return (
      <div className="album-detail-empty">
        <p>album not found</p>
        <button onClick={onBack}>go back</button>
      </div>
    );
  }

  // Get all tracks for this album
  const tracks = getSongsByAlbum(album.id);

  const handlePlayAlbum = () => {
    if (tracks.length > 0) {
      playQueue(tracks, 0);
    }
  };

  const handlePlayTrack = (track, index) => {
    // Play the selected track and queue remaining tracks
    playQueue(tracks, index);
  };

  return (
    <div className="album-detail">
      {/* Back button */}
      <button className="album-detail-back" onClick={onBack}>
        <Icon name="back" size={24} />
        <span>back</span>
      </button>

      {/* Album Header */}
      <div className="album-detail-header">
        <img 
          src={album.cover} 
          alt={album.title} 
          className="album-detail-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=♪';
          }}
        />
        <div className="album-detail-info">
          <h1 className="album-detail-title">{album.title}</h1>
          <span className="album-detail-artist">{album.artist}</span>
          {album.year && <span className="album-detail-year">{album.year}</span>}
          <span className="album-detail-stats">
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </span>
        </div>
      </div>

      {/* Play Album Button */}
      {tracks.length > 0 && (
        <button className="album-detail-play" onClick={handlePlayAlbum}>
          <Icon name="play" size={20} />
          <span>play album</span>
        </button>
      )}

      {/* Track List */}
      <div className="album-detail-tracks">
        {tracks.length > 0 ? (
          <div className="album-track-list">
            {tracks.map((track, index) => {
              const isCurrentTrack = currentSong?.id === track.id;
              return (
                <div 
                  key={track.id} 
                  className={`album-track-item ${isCurrentTrack ? 'playing' : ''}`}
                  onClick={() => handlePlayTrack(track, index)}
                >
                  <span className="album-track-number">
                    {isCurrentTrack && isPlaying ? (
                      <Icon name="volume" size={16} />
                    ) : (
                      track.trackNumber || index + 1
                    )}
                  </span>
                  <div className="album-track-info">
                    <span className="album-track-title">{track.title}</span>
                  </div>
                  <span className="album-track-duration">
                    {formatDuration(track.duration)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="album-detail-empty-tracks">no tracks found</p>
        )}
      </div>
    </div>
  );
}
