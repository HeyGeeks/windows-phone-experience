import { Icon } from '../../../components/Icons';
import { groupSongsByGenre } from '../data';

/**
 * GenreList - Xbox Music Style
 * Displays songs grouped by genre matching Windows Phone 8.1 design
 */
export function GenreList({ songs, onSongPlay }) {
  if (!songs || songs.length === 0) {
    return <p className="genre-list-empty">no songs found</p>;
  }

  const genreGroups = groupSongsByGenre(songs);
  const genres = Object.keys(genreGroups).sort();

  if (genres.length === 0) {
    return <p className="genre-list-empty">no genres found</p>;
  }

  const handleSongClick = (song, genreSongs) => {
    if (onSongPlay) {
      onSongPlay(song, genreSongs);
    }
  };

  return (
    <div className="genre-list">
      {genres.map((genre) => {
        const genreData = genreGroups[genre];
        return (
          <div key={genre} className="genre-section">
            <h3 className="genre-header">{genre}</h3>
            <div className="genre-songs">
              {genreData.songs.map((song) => (
                <div
                  key={song.id}
                  className="song-item"
                  onClick={() => handleSongClick(song, genreData.songs)}
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
          </div>
        );
      })}
    </div>
  );
}
