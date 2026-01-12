/**
 * ArtistGrid - Displays artists in a grid/list format with name and image
 * Handles artist tap to navigate to detail view
 * Requirements: 2.3
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
    <div className="artist-grid">
      {artists.map((artist) => (
        <div 
          key={artist.id} 
          className="artist-item" 
          onClick={() => handleArtistClick(artist)}
        >
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="artist-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150?text=♪';
            }}
          />
          <span className="artist-name">{artist.name}</span>
        </div>
      ))}
    </div>
  );
}
