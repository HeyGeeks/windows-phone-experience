import { Icon } from '../../../components/Icons';

/**
 * SongList - Xbox Music Style
 * Displays a list of songs with title, artist icon, and download icon
 * Matches Windows Phone 8.1 Xbox Music design
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
          <div className="song-info">
            <span className="song-title">{song.title}</span>
            <div className="song-artist-row">
              <Icon name="music" size={12} />
              <span className="song-artist">{song.artist}</span>
            </div>
          </div>
          <div className="song-action">
            <Icon name="download" size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}
