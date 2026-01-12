import { useState } from 'react';
import { Icon } from '../../../components/Icons';
import { SongList } from './SongList';
import { ArtistGrid } from './ArtistGrid';
import { AlbumGrid } from './AlbumGrid';
import { GenreList } from './GenreList';
import { 
  SAMPLE_SONGS, 
  SAMPLE_ARTISTS, 
  SAMPLE_ALBUMS,
  filterCollection 
} from '../data';
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

  // Filter collection based on search query
  const filteredData = filterCollection(
    SAMPLE_SONGS, 
    SAMPLE_ARTISTS, 
    SAMPLE_ALBUMS, 
    searchQuery
  );

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSongPlay = (song, allSongs) => {
    if (onSongPlay) {
      onSongPlay(song, allSongs);
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'songs':
        return (
          <SongList 
            songs={filteredData.songs} 
            onSongPlay={handleSongPlay}
          />
        );
      case 'artists':
        return (
          <ArtistGrid 
            artists={filteredData.artists} 
            onArtistSelect={onArtistSelect}
          />
        );
      case 'albums':
        return (
          <AlbumGrid 
            albums={filteredData.albums} 
            onAlbumSelect={onAlbumSelect}
          />
        );
      case 'genres':
        return (
          <GenreList 
            songs={filteredData.songs}
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
          placeholder="search music" 
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
