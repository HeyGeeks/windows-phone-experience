/**
 * SongList - Displays a list of songs with thumbnail, title, and artist
 * Handles song tap to play with queue functionality
 * Requirements: 2.2
 */
export function SongList({ songs, onSongPlay }) {
  if (!songs || songs.length === 0) {
    return <p className="song-list-empty">no songs found</p>;
  }

  const handleSongClick = (song) => {
    if (onSongPlay) {
      // Pass the clicked song and all songs for queue
      onSongPlay(song, songs);
    }
  };

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div 
          key={song.id} 
          className="song-item" 
          onClick={() => handleSongClick(song)}
        >
          <img 
            src={song.cover} 
            alt={song.title} 
            className="song-thumb"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/56?text=♪';
            }}
          />
          <div className="song-info">
            <span className="song-title">{song.title}</span>
            <span className="song-artist">{song.artist}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
