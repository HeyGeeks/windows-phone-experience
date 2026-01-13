import { Icon } from '../../../components/Icons';

/**
 * AlbumGrid - Xbox Music Style
 * Displays albums in a list format matching Windows Phone 8.1 design
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
    <div className="album-list">
      {albums.map((album) => (
        <div
          key={album.id}
          className="album-list-item"
          onClick={() => handleAlbumClick(album)}
        >
          <img
            src={album.cover}
            alt={album.title}
            className="album-list-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/48?text=♪';
            }}
          />
          <div className="album-list-info">
            <span className="album-list-title">{album.title}</span>
            <div className="album-list-meta">
              <Icon name="music" size={12} />
              <span className="album-list-artist">{album.artist}</span>
            </div>
          </div>
          <div className="album-list-action">
            <Icon name="download" size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}
