import { Icon } from '../../../components/Icons';

/**
 * ArtistGrid - Xbox Music Style
 * Displays artists in a list format matching Windows Phone 8.1 design
 */
export function ArtistGrid({ artists, onArtistSelect }) {
  if (!artists || artists.length === 0) {
    return <p className="artist-grid-empty">no artists found</p>;
  }

  const handleArtistClick = (artist) => {
    if (onArtistSelect) {
      onArtistSelect(artist);
    }
  };

  return (
    <div className="artist-list">
      {artists.map((artist) => (
        <div
          key={artist.id}
          className="artist-list-item"
          onClick={() => handleArtistClick(artist)}
        >
          <img
            src={artist.image}
            alt={artist.name}
            className="artist-list-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/48?text=♪';
            }}
          />
          <div className="artist-list-info">
            <span className="artist-list-name">{artist.name}</span>
            <div className="artist-list-meta">
              <Icon name="music" size={12} />
              <span>{artist.albumCount || 0} albums</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
