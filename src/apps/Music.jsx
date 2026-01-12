import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { useMusic } from '../context/MusicContext';
import {
  CollectionView,
  ArtistDetailView,
  AlbumDetailView,
  NowPlayingView,
  QueueView,
  MiniPlayer,
  HistoryView
} from './Music/components';
import './Music.css';

/**
 * Music App - Windows Phone 8.1 Style Music Player
 * Main container component managing pivot navigation and view rendering.
 * Requirements: 1.1, 1.2, 1.3
 */
export function Music() {
  const { currentSong, playQueue, playSong } = useMusic();
  
  // Navigation state
  const [pivot, setPivot] = useState('collection');
  
  // Detail view state for artist/album navigation
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  
  // Queue overlay state
  const [showQueue, setShowQueue] = useState(false);

  // Handle artist selection from collection view
  const handleArtistSelect = (artist) => {
    setSelectedArtist(artist);
    setSelectedAlbum(null);
  };

  // Handle album selection from collection or artist view
  const handleAlbumSelect = (album) => {
    setSelectedAlbum(album);
  };

  // Handle back navigation from detail views
  const handleBackFromArtist = () => {
    setSelectedArtist(null);
  };

  const handleBackFromAlbum = () => {
    // If we came from artist view, go back to artist
    // Otherwise go back to collection
    if (selectedArtist) {
      setSelectedAlbum(null);
    } else {
      setSelectedAlbum(null);
    }
  };

  // Handle song play from collection/history
  const handleSongPlay = (song, allSongs) => {
    if (allSongs && allSongs.length > 0) {
      const songIndex = allSongs.findIndex(s => s.id === song.id);
      playQueue(allSongs, songIndex >= 0 ? songIndex : 0);
    } else {
      playSong(song);
    }
    setPivot('now');
  };

  // Handle single song play from history
  const handleHistorySongPlay = (song) => {
    playSong(song);
    setPivot('now');
  };

  // Handle browse collection from empty now playing
  const handleBrowseCollection = () => {
    setPivot('collection');
    setSelectedArtist(null);
    setSelectedAlbum(null);
  };

  // Handle mini player expand
  const handleMiniPlayerExpand = () => {
    setPivot('now');
  };

  // Handle queue open/close
  const handleOpenQueue = () => {
    setShowQueue(true);
  };

  const handleCloseQueue = () => {
    setShowQueue(false);
  };

  // Determine if mini player should be shown
  const showMiniPlayer = currentSong && pivot !== 'now' && !showQueue;

  // Render the appropriate content based on navigation state
  const renderContent = () => {
    // Queue overlay takes precedence
    if (showQueue) {
      return <QueueView onClose={handleCloseQueue} />;
    }

    // Album detail view
    if (selectedAlbum) {
      return (
        <AlbumDetailView
          album={selectedAlbum}
          onBack={handleBackFromAlbum}
        />
      );
    }

    // Artist detail view
    if (selectedArtist) {
      return (
        <ArtistDetailView
          artist={selectedArtist}
          onBack={handleBackFromArtist}
          onAlbumSelect={handleAlbumSelect}
        />
      );
    }

    // Main pivot views
    switch (pivot) {
      case 'collection':
        return (
          <CollectionView
            onArtistSelect={handleArtistSelect}
            onAlbumSelect={handleAlbumSelect}
            onSongPlay={handleSongPlay}
          />
        );
      case 'now':
        return (
          <NowPlayingView
            onOpenQueue={handleOpenQueue}
            onBrowse={handleBrowseCollection}
          />
        );
      case 'history':
        return (
          <HistoryView
            onSongPlay={handleHistorySongPlay}
          />
        );
      default:
        return null;
    }
  };

  // Determine if pivot header should be shown
  const showPivotHeader = !selectedArtist && !selectedAlbum && !showQueue;

  return (
    <AppShell title="music" hideTitle>
      <div className="wp-music">
        {/* App Title - Requirement 1.4 */}
        {showPivotHeader && (
          <h1 className="wp-music-title">music</h1>
        )}

        {/* Pivot Navigation - Requirements 1.1, 1.2, 1.3 */}
        {showPivotHeader && (
          <div className="wp-pivot-header">
            <button
              className={`wp-pivot ${pivot === 'collection' ? 'active' : ''}`}
              onClick={() => setPivot('collection')}
            >
              collection
            </button>
            <button
              className={`wp-pivot ${pivot === 'now' ? 'active' : ''}`}
              onClick={() => setPivot('now')}
            >
              now playing
            </button>
            <button
              className={`wp-pivot ${pivot === 'history' ? 'active' : ''}`}
              onClick={() => setPivot('history')}
            >
              history
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="wp-music-content">
          {renderContent()}
        </div>

        {/* Mini Player - Requirement 7.1 */}
        {showMiniPlayer && (
          <MiniPlayer onExpand={handleMiniPlayerExpand} />
        )}
      </div>
    </AppShell>
  );
}
