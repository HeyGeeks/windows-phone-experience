import { useState, useEffect } from 'react';
import { Icon } from '../../../components/Icons';
import { useMusic } from '../../../context/MusicContext';
import { lookupArtist } from '../api';

/**
 * ArtistDetailView - Shows artist's complete discography
 * Displays artist name header and image, lists all albums by artist
 * Provides "play all" button functionality
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */
export function ArtistDetailView({ artist, onBack, onAlbumSelect }) {
  const { playQueue } = useMusic();
  const [albums, setAlbums] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (artist?.id) {
      loadArtistDetails();
    }
  }, [artist]);

  const loadArtistDetails = async () => {
    setLoading(true);
    const data = await lookupArtist(artist.id);
    if (data) {
      setAlbums(data.albums);
      setAllSongs(data.songs);
    }
    setLoading(false);
  };

  if (!artist) {
    return (
      <div className="artist-detail-empty">
        <p>artist not found</p>
        <button onClick={onBack}>go back</button>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (allSongs.length > 0) {
      playQueue(allSongs, 0);
    }
  };

  const handleAlbumClick = (album) => {
    if (onAlbumSelect) {
      onAlbumSelect(album);
    }
  };

  return (
    <div className="artist-detail">
      {/* Back button */}
      <button className="artist-detail-back" onClick={onBack}>
        <Icon name="back" size={24} />
        <span>back</span>
      </button>

      {/* Artist Header */}
      <div className="artist-detail-header">
        <img
          src={artist.image || 'https://via.placeholder.com/200?text=♪'}
          alt={artist.name}
          className="artist-detail-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=♪';
          }}
        />
        <h1 className="artist-detail-name">{artist.name}</h1>
        <span className="artist-detail-stats">
          {albums.length} {albums.length === 1 ? 'album' : 'albums'}
        </span>
      </div>

      {/* Play All Button */}
      {allSongs.length > 0 && (
        <button className="artist-detail-play-all" onClick={handlePlayAll}>
          <Icon name="play" size={20} />
          <span>play all</span>
        </button>
      )}

      {/* Albums List */}
      <div className="artist-detail-albums">
        <h2 className="artist-detail-section-title">albums</h2>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>loading albums...</div>
        ) : albums.length > 0 ? (
          <div className="artist-albums-grid">
            {albums.map((album) => (
              <div
                key={album.id}
                className="artist-album-item"
                onClick={() => handleAlbumClick(album)}
              >
                <img
                  src={album.cover}
                  alt={album.title}
                  className="artist-album-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=♪';
                  }}
                />
                <div className="artist-album-info">
                  <span className="artist-album-title">{album.title}</span>
                  <span className="artist-album-year">{album.year}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="artist-detail-empty-albums">no albums found</p>
        )}
      </div>
    </div>
  );
}
