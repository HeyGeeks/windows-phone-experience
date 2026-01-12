import { groupSongsByGenre } from '../data';

/**
 * GenreList - Displays songs grouped by genre
 * Handles genre song tap to play
 * Requirements: 2.5
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
          </div>
        );
      })}
    </div>
  );
}
