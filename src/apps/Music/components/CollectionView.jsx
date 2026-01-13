import { useState, useEffect } from 'react';
import { Icon } from '../../../components/Icons';
import { SongList } from './SongList';
import { ArtistGrid } from './ArtistGrid';
import { AlbumGrid } from './AlbumGrid';
import { GenreList } from './GenreList';
import { searchMusic, getDefaultRecommendations } from '../api';
import './CollectionView.css';

/**
 * CollectionView - Main collection browsing component
 * Displays music organized by songs, artists, albums, and genres
 * with search functionality
 */
export function CollectionView({
  onArtistSelect,
  onAlbumSelect,
  onSongPlay
}) {
  const [view, setView] = useState('songs');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Data state
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  // Load default data on mount
  useEffect(() => {
    loadDefaultData();
  }, []);

  const loadDefaultData = async () => {
    setIsLoading(true);
    const data = await getDefaultRecommendations();
    setSongs(data.songs);
    setArtists(data.artists);
    setAlbums(data.albums);
    setIsLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      return loadDefaultData();
    }

    setIsLoading(true);
    const data = await searchMusic(searchQuery);
    setSongs(data.songs);
    setArtists(data.artists);
    setAlbums(data.albums);
    setIsLoading(false);
  };

  const handleSongPlay = (song, allSongs) => {
    if (onSongPlay) {
      onSongPlay(song, allSongs);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="collection-loading">
          <div className="collection-loading-spinner"></div>
          <div>searching iTunes...</div>
        </div>
      );
    }

    switch (view) {
      case 'songs':
        return (
          <SongList
            songs={songs}
            onSongPlay={handleSongPlay}
          />
        );
      case 'artists':
        return (
          <ArtistGrid
            artists={artists}
            onArtistSelect={onArtistSelect}
          />
        );
      case 'albums':
        return (
          <AlbumGrid
            albums={albums}
            onAlbumSelect={onAlbumSelect}
          />
        );
      case 'genres':
        return (
          <GenreList
            songs={songs}
            onSongPlay={handleSongPlay}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="collection-view">
      {/* Search Bar */}
      <form className="collection-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search iTunes music"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
          <Icon name="search" size={20} />
        </button>
      </form>

      {/* Sub-category Tabs */}
      <div className="collection-tabs">
        <button
          className={`collection-tab ${view === 'songs' ? 'active' : ''}`}
          onClick={() => setView('songs')}
        >
          songs
        </button>
        <button
          className={`collection-tab ${view === 'artists' ? 'active' : ''}`}
          onClick={() => setView('artists')}
        >
          artists
        </button>
        <button
          className={`collection-tab ${view === 'albums' ? 'active' : ''}`}
          onClick={() => setView('albums')}
        >
          albums
        </button>
        <button
          className={`collection-tab ${view === 'genres' ? 'active' : ''}`}
          onClick={() => setView('genres')}
        >
          genres
        </button>
      </div>

      {/* Content Area */}
      <div className="collection-content">
        {renderContent()}
      </div>
    </div>
  );
}
