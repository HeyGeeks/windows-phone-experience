# Implementation Plan: Windows Phone Music App

## Overview

This implementation plan transforms the existing Music app into an authentic Windows Phone 8.1-style music experience. The approach is incremental: first enhancing the MusicContext with queue and playback mode support, then building out the UI components, and finally adding polish and testing.

## Tasks

- [x] 1. Enhance MusicContext with queue and playback modes
  - [x] 1.1 Add queue state management to MusicContext
    - Add `queue`, `queueIndex`, `originalQueue` state variables
    - Implement `playQueue(songs, startIndex)` function
    - Implement `skipToQueueIndex(index)` function
    - Implement `addToQueue(song)` function
    - _Requirements: 6.2, 6.4, 4.5_

  - [x] 1.2 Add shuffle functionality to MusicContext
    - Add `shuffleEnabled` state variable
    - Implement Fisher-Yates shuffle algorithm
    - Implement `toggleShuffle()` function that reshuffles or restores original order
    - Ensure current song stays at current position when shuffling
    - _Requirements: 5.5, 5.6_

  - [x] 1.3 Add repeat mode functionality to MusicContext
    - Add `repeatMode` state variable ('off' | 'all' | 'one')
    - Implement `cycleRepeat()` function
    - Update `handleEnded` to respect repeat mode
    - _Requirements: 5.7, 9.7, 9.8_

  - [x] 1.4 Implement next/previous track logic
    - Implement `playNext()` with queue and repeat logic
    - Implement `playPrevious()` with 3-second threshold logic
    - _Requirements: 9.3, 9.4, 9.5_


- [x] 2. Create Music data layer and sample data
  - [x] 2.1 Create music data file with sample collection
    - Create `src/apps/Music/data.js` with sample songs, artists, albums
    - Organize data by artist and album relationships
    - Include genre information for grouping
    - _Requirements: 2.1, 2.5_

  - [x] 2.2 Create data utility functions
    - Implement `groupSongsByArtist(songs)` function
    - Implement `groupSongsByAlbum(songs)` function
    - Implement `groupSongsByGenre(songs)` function
    - Implement `filterCollection(songs, artists, albums, query)` function
    - _Requirements: 2.5, 8.2_

- [x] 3. Checkpoint - Ensure context and data layer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Build Collection View components
  - [x] 4.1 Create CollectionView component structure
    - Create `src/apps/Music/components/CollectionView.jsx`
    - Implement sub-category tabs (songs, artists, albums, genres)
    - Add search bar integration
    - _Requirements: 2.1, 8.1_

  - [x] 4.2 Implement SongList sub-component
    - Create song list with thumbnail, title, artist display
    - Handle song tap to play with queue
    - _Requirements: 2.2_

  - [x] 4.3 Implement ArtistGrid sub-component
    - Create artist grid/list with name and image
    - Handle artist tap to navigate to detail view
    - _Requirements: 2.3_

  - [x] 4.4 Implement AlbumGrid sub-component
    - Create album grid with cover, name, artist
    - Handle album tap to navigate to detail view
    - _Requirements: 2.4_

  - [x] 4.5 Implement GenreList sub-component
    - Create genre grouping display
    - Handle genre tap to show songs in genre
    - _Requirements: 2.5_


- [x] 5. Build Artist and Album detail views
  - [x] 5.1 Create ArtistDetailView component
    - Create `src/apps/Music/components/ArtistDetailView.jsx`
    - Display artist name header and image
    - List all albums by artist
    - Add "play all" button functionality
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 5.2 Create AlbumDetailView component
    - Create `src/apps/Music/components/AlbumDetailView.jsx`
    - Display album art, name, artist, year
    - List all tracks with number, title, duration
    - Add "play album" button functionality
    - Handle track tap to play with remaining tracks queued
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6. Build Now Playing view
  - [x] 6.1 Create enhanced NowPlayingView component
    - Create `src/apps/Music/components/NowPlayingView.jsx`
    - Display large album artwork with blurred background
    - Show song title, artist, album name
    - _Requirements: 5.1, 5.2_

  - [x] 6.2 Implement playback controls
    - Add play/pause button with circular styling
    - Add previous/next buttons
    - Add progress bar with seek functionality
    - Display current time and duration
    - _Requirements: 5.3, 5.4, 9.1, 9.2, 9.6_

  - [x] 6.3 Implement shuffle and repeat controls
    - Add shuffle toggle button with active state indicator
    - Add repeat button with mode cycling (off/all/one)
    - _Requirements: 5.5, 5.6, 5.7_

  - [x] 6.4 Add queue access button
    - Add button to open queue view
    - _Requirements: 6.1_

- [x] 7. Checkpoint - Ensure now playing tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Build Queue and Mini Player
  - [x] 8.1 Create QueueView component
    - Create `src/apps/Music/components/QueueView.jsx`
    - Display all queued songs in order
    - Highlight currently playing song
    - Handle song tap to skip to that position
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 8.2 Create MiniPlayer component
    - Create `src/apps/Music/components/MiniPlayer.jsx`
    - Display current song thumbnail, title, artist
    - Add play/pause control
    - Handle tap to expand to now playing
    - _Requirements: 7.1, 7.2, 7.3, 7.4_


- [x] 9. Build History view
  - [x] 9.1 Enhance HistoryView component
    - Display recently played songs in reverse chronological order
    - Handle song tap to play
    - _Requirements: 11.1, 11.2, 11.4_


- [x] 10. Integrate all components into Music.jsx
  - [x] 10.1 Refactor Music.jsx main component
    - Update pivot navigation to use new components
    - Add state for selected artist/album navigation
    - Integrate MiniPlayer conditional display
    - Wire up all navigation flows
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 10.2 Update Music.css with Windows Phone styling
    - Apply typography specifications (42px title, 28px pivots)
    - Style all new components consistently
    - Add transitions and animations
    - Ensure theme support (light/dark)
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- All tasks are required for comprehensive implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation uses the existing MusicContext as foundation
- All components follow Windows Phone 8.1 Metro design language
