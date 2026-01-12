/**
 * AlbumGrid - Displays albums in a grid with cover, name, and artist
 * Handles album tap to navigate to detail view
 * Requirements: 2.4
 */
export function AlbumGrid({ albums, onAlbumSelect }) {
  if (!albums || albums.length === 0) {
    return <p className="album-grid-empty">no albums found</p>;
  }

  const handleAlbumClick = (album) => {
    if (onAlbumSelect) {
      onAlbumSelect(album);
    }
  };

  return (
    <div className="album-grid">
      {albums.map((album) => (
        <div 
          key={album.id} 
          className="album-item" 
          onClick={() => handleAlbumClick(album)}
        >
          <img 
            src={album.cover} 
            alt={album.title} 
            className="album-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150?text=♪';
            }}
          />
          <div className="album-info">
            <span className="album-title">{album.title}</span>
            <span className="album-artist">{album.artist}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
