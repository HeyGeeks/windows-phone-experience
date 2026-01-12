# Design Document: Windows Phone Music App

## Overview

This design document describes the architecture and implementation of a Windows Phone 8.1-style Music application. The app will provide an authentic Xbox Music / Groove Music experience with panoramic views, pivot navigation, rich album art integration, and a polished playback experience. The implementation uses React with the existing MusicContext for state management, enhanced with additional features for queue management, shuffle/repeat modes, and organized collection views.

## Architecture

The Music app follows a component-based architecture with centralized state management:

```
┌─────────────────────────────────────────────────────────────┐
│                        Music.jsx                             │
│                    (Main Container)                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Collection  │  │ NowPlaying  │  │   History   │         │
│  │    View     │  │    View     │  │    View     │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         │                │                │                  │
│  ┌──────┴──────┐        │                │                  │
│  │ Sub-views:  │        │                │                  │
│  │ - Songs     │        │                │                  │
│  │ - Artists   │        │                │                  │
│  │ - Albums    │        │                │                  │
│  │ - Genres    │        │                │                  │
│  └─────────────┘        │                │                  │
├─────────────────────────┴────────────────┴──────────────────┤
│                     MiniPlayer                               │
│              (Persistent bottom bar)                         │
├─────────────────────────────────────────────────────────────┤
│                   MusicContext                               │
│    (State: currentSong, queue, shuffle, repeat, etc.)       │
└─────────────────────────────────────────────────────────────┘
```

### State Flow

```
User Action → Component Event Handler → MusicContext Action → State Update → UI Re-render
```

## Components and Interfaces

### Main Components

#### 1. Music.jsx (Enhanced)
The main container component managing pivot navigation and view rendering.

```javascript
interface MusicProps {
  // No props - uses context
}

interface MusicState {
  pivot: 'collection' | 'now' | 'history';
  collectionView: 'songs' | 'artists' | 'albums' | 'genres';
  searchQuery: string;
  selectedArtist: Artist | null;
  selectedAlbum: Album | null;
}
```

#### 2. CollectionView Component
Displays music organized by category with sub-navigation.

```javascript
interface CollectionViewProps {
  view: 'songs' | 'artists' | 'albums' | 'genres';
  onViewChange: (view: string) => void;
  onArtistSelect: (artist: Artist) => void;
  onAlbumSelect: (album: Album) => void;
  onSongPlay: (song: Song, queue: Song[]) => void;
  searchQuery: string;
}
```

#### 3. NowPlayingView Component
Full-screen now playing experience with controls.

```javascript
interface NowPlayingViewProps {
  // Uses MusicContext directly
}
```

#### 4. ArtistDetailView Component
Shows artist's albums and songs.

```javascript
interface ArtistDetailViewProps {
  artist: Artist;
  onBack: () => void;
  onAlbumSelect: (album: Album) => void;
  onPlayAll: () => void;
}
```

#### 5. AlbumDetailView Component
Shows album track listing.

```javascript
interface AlbumDetailViewProps {
  album: Album;
  onBack: () => void;
  onPlayAlbum: () => void;
  onPlayTrack: (track: Song, index: number) => void;
}
```

#### 6. MiniPlayer Component
Persistent bottom bar showing current playback.

```javascript
interface MiniPlayerProps {
  onExpand: () => void;
}
```

#### 7. QueueView Component
Shows and manages playback queue.

```javascript
interface QueueViewProps {
  onSongSelect: (index: number) => void;
  onClose: () => void;
}
```

### Enhanced MusicContext Interface

```javascript
interface MusicContextValue {
  // Current state
  isPlaying: boolean;
  currentSong: Song | null;
  currentTime: number;
  duration: number;
  
  // Queue management
  queue: Song[];
  queueIndex: number;
  
  // Playback modes
  shuffleEnabled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  
  // History
  history: Song[];
  
  // Actions
  playSong: (song: Song) => void;
  playQueue: (songs: Song[], startIndex?: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (time: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  skipToQueueIndex: (index: number) => void;
  addToQueue: (song: Song) => void;
}
```

## Data Models

### Song Model

```javascript
interface Song {
  id: string | number;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  cover: string;           // Album art URL
  previewUrl: string;      // Audio preview URL
  duration: number;        // Duration in seconds
  trackNumber?: number;
  genre?: string;
  year?: number;
}
```

### Artist Model

```javascript
interface Artist {
  id: string;
  name: string;
  image: string;           // Artist image URL
  albums: Album[];
  songCount: number;
}
```

### Album Model

```javascript
interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  cover: string;           // Album art URL
  year?: number;
  tracks: Song[];
  genre?: string;
}
```

### Queue State Model

```javascript
interface QueueState {
  originalQueue: Song[];   // Original order before shuffle
  shuffledQueue: Song[];   // Shuffled order (if shuffle enabled)
  currentIndex: number;
  shuffleEnabled: boolean;
  repeatMode: 'off' | 'all' | 'one';
}
```

### Playback State Persistence

```javascript
interface PersistedMusicState {
  history: Song[];
  // Queue and playback state are session-only
}
```

## Component Hierarchy

```
Music
├── Header (title + pivot tabs)
├── ContentArea
│   ├── CollectionView (when pivot === 'collection')
│   │   ├── CategoryTabs (songs/artists/albums/genres)
│   │   ├── SearchBar
│   │   └── ContentList
│   │       ├── SongList
│   │       ├── ArtistGrid
│   │       ├── AlbumGrid
│   │       └── GenreList
│   ├── ArtistDetailView (when artist selected)
│   ├── AlbumDetailView (when album selected)
│   ├── NowPlayingView (when pivot === 'now')
│   │   ├── AlbumArt
│   │   ├── SongInfo
│   │   ├── ProgressBar
│   │   ├── PlaybackControls
│   │   └── QueueButton
│   └── HistoryView (when pivot === 'history')
├── QueueView (overlay when queue visible)
└── MiniPlayer (when song playing & not on now playing)
```

## Key Algorithms

### Shuffle Algorithm (Fisher-Yates)

```javascript
function shuffleQueue(queue: Song[], currentIndex: number): Song[] {
  const shuffled = [...queue];
  const currentSong = shuffled[currentIndex];
  
  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Move current song to front
  const currentNewIndex = shuffled.indexOf(currentSong);
  if (currentNewIndex > 0) {
    shuffled.splice(currentNewIndex, 1);
    shuffled.unshift(currentSong);
  }
  
  return shuffled;
}
```

### Previous Track Logic

```javascript
function handlePrevious(currentTime: number, threshold: number = 3): void {
  if (currentTime > threshold) {
    // Restart current song
    seekTo(0);
  } else {
    // Go to previous song
    playPreviousInQueue();
  }
}
```

### Next Track with Repeat Logic

```javascript
function handleNext(): void {
  if (repeatMode === 'one') {
    seekTo(0);
    play();
  } else if (queueIndex < queue.length - 1) {
    playQueueIndex(queueIndex + 1);
  } else if (repeatMode === 'all') {
    playQueueIndex(0);
  } else {
    stop();
  }
}
```

### Search Filtering

```javascript
function filterCollection(
  songs: Song[], 
  artists: Artist[], 
  albums: Album[], 
  query: string
): FilteredResults {
  const lowerQuery = query.toLowerCase();
  
  return {
    songs: songs.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) ||
      s.artist.toLowerCase().includes(lowerQuery)
    ),
    artists: artists.filter(a => 
      a.name.toLowerCase().includes(lowerQuery)
    ),
    albums: albums.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) ||
      a.artist.toLowerCase().includes(lowerQuery)
    )
  };
}
```

## UI/UX Design Specifications

### Typography
- App title: 42px, font-weight 200, lowercase
- Pivot tabs: 28px, font-weight 300, lowercase
- Song titles: 18px, font-weight 400
- Artist/album names: 14px, font-weight 400, secondary color
- Section headers: 24px, font-weight 300, lowercase

### Colors
- Use CSS variables for theme support:
  - `--accent-color`: System accent for highlights
  - `--text-color`: Primary text
  - `--text-secondary`: Secondary text (60% opacity)
  - `--bg-color`: Background

### Layout Specifications
- Album art grid: 2-3 columns depending on width
- Song list item height: 64px
- Mini player height: 56px
- Now playing album art: 70% of viewport width, max 280px
- Control buttons: 48px (small), 64px (play/pause)

### Animations
- Pivot transitions: 200ms ease-out
- View transitions: 150ms fade
- Button press: scale(0.95) on active
- Progress bar: smooth width transition



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Song List Display Completeness
*For any* song in the collection, when rendered in the song list view, the output SHALL contain the song title, artist name, and album art thumbnail.
**Validates: Requirements 2.2**

### Property 2: Artist List Display Completeness
*For any* artist in the collection, when rendered in the artist view, the output SHALL contain the artist name and associated image.
**Validates: Requirements 2.3**

### Property 3: Album Grid Display Completeness
*For any* album in the collection, when rendered in the album grid view, the output SHALL contain the album cover, album name, and artist name.
**Validates: Requirements 2.4**

### Property 4: Genre Grouping Correctness
*For any* set of songs with genre information, grouping by genre SHALL produce categories where each song appears in exactly one category matching its genre.
**Validates: Requirements 2.5**

### Property 5: Artist Albums Completeness
*For any* artist, the Artist_View SHALL display all albums associated with that artist.
**Validates: Requirements 3.2**

### Property 6: Album View Information Completeness
*For any* album, the Album_View SHALL display the album name, artist name, year, and all tracks with track number, title, and duration.
**Validates: Requirements 4.2, 4.3**

### Property 7: Album Track Queue Behavior
*For any* album and selected track index, playing that track SHALL queue all remaining tracks from the album in order.
**Validates: Requirements 4.5**

### Property 8: Now Playing Song Information
*For any* currently playing song, the Now_Playing_View SHALL display the song title, artist name, and album name.
**Validates: Requirements 5.2**

### Property 9: Repeat Mode Cycling
*For any* repeat mode state, cycling SHALL produce the correct next state: off → all → one → off.
**Validates: Requirements 5.7**

### Property 10: Queue Display Order
*For any* playback queue, the queue view SHALL display all songs in their correct playback order.
**Validates: Requirements 6.2**

### Property 11: Queue Skip Behavior
*For any* queue and valid index, skipping to that index SHALL update the current playing index to the selected value.
**Validates: Requirements 6.4**

### Property 12: Mini Player Song Information
*For any* currently playing song, the Mini_Player SHALL display the song thumbnail, title, and artist.
**Validates: Requirements 7.2**

### Property 13: Search Filter Correctness
*For any* search query and collection, filtered results SHALL only contain items where the title, artist, or album name contains the query string (case-insensitive).
**Validates: Requirements 8.2**

### Property 14: Pause Position Preservation
*For any* playback position, pausing and resuming SHALL maintain the same position (within acceptable tolerance).
**Validates: Requirements 9.2**

### Property 15: Next Track Advancement
*For any* queue with remaining songs, pressing next SHALL advance to the next song in the queue.
**Validates: Requirements 9.3**

### Property 16: Previous Button Time-Dependent Behavior
*For any* playback state, pressing previous within 3 seconds of song start SHALL go to the previous song, while pressing after 3 seconds SHALL restart the current song.
**Validates: Requirements 9.4, 9.5**

### Property 17: Seek Position Update
*For any* valid seek position within the song duration, seeking SHALL update the current playback time to that position.
**Validates: Requirements 9.6**

### Property 18: Auto-Advance on Song End
*For any* queue with remaining songs, when the current song ends, playback SHALL automatically advance to the next song.
**Validates: Requirements 9.7**

### Property 19: History Reverse Chronological Order
*For any* sequence of played songs, the history SHALL maintain them in reverse chronological order (most recent first).
**Validates: Requirements 11.1, 11.2**

### Property 20: History Persistence Round-Trip
*For any* valid history state, saving to local storage and then loading SHALL produce an equivalent history array.
**Validates: Requirements 11.3**

### Property 21: Shuffle Preserves Queue Contents
*For any* queue, enabling shuffle SHALL produce a reordered queue containing exactly the same songs (no additions or removals).
**Validates: Requirements 5.5** (implicit shuffle behavior)

## Error Handling

### Audio Playback Errors
- **No preview URL**: Display message "Preview not available" and allow skipping to next track
- **Network failure**: Show "Unable to play. Check your connection." with retry option
- **Audio decode error**: Skip to next track automatically, log error

### Data Loading Errors
- **API failure**: Fall back to cached/default data, show subtle error indicator
- **Invalid response**: Use default song collection, log parsing error
- **Empty results**: Display "No music found" with suggestion to search

### State Errors
- **Invalid queue index**: Reset to beginning of queue
- **Missing song data**: Skip song, remove from queue
- **Storage quota exceeded**: Clear oldest history entries, warn user

### UI Error States
- **Missing album art**: Display placeholder image
- **Long text overflow**: Truncate with ellipsis
- **Missing artist/album info**: Display "Unknown Artist" / "Unknown Album"

## Testing Strategy

### Testing Framework
- **Unit Testing**: Vitest with React Testing Library
- **Property-Based Testing**: fast-check library for JavaScript
- **Component Testing**: React Testing Library for UI components

### Unit Tests
Unit tests will cover:
- Component rendering with various props
- User interaction handlers (click, tap events)
- Edge cases (empty collections, missing data)
- Error state rendering
- Integration between components

### Property-Based Tests
Each correctness property will be implemented as a property-based test using fast-check:
- Minimum 100 iterations per property test
- Custom generators for Song, Artist, Album, and Queue data types
- Tag format: **Feature: windows-phone-music, Property {number}: {property_text}**

### Test Organization
```
src/apps/Music/
├── __tests__/
│   ├── Music.test.jsx           # Unit tests for main component
│   ├── Music.property.test.jsx  # Property-based tests
│   ├── CollectionView.test.jsx  # Collection view unit tests
│   ├── NowPlaying.test.jsx      # Now playing unit tests
│   └── MusicContext.test.jsx    # Context/state unit tests
```

### Generator Definitions
```javascript
// Song generator
const songArb = fc.record({
  id: fc.string({ minLength: 1 }),
  title: fc.string({ minLength: 1 }),
  artist: fc.string({ minLength: 1 }),
  album: fc.string({ minLength: 1 }),
  cover: fc.webUrl(),
  previewUrl: fc.webUrl(),
  duration: fc.integer({ min: 1, max: 600 }),
  genre: fc.string()
});

// Queue generator
const queueArb = fc.array(songArb, { minLength: 1, maxLength: 50 });

// History generator (reverse chronological)
const historyArb = fc.array(songArb, { minLength: 0, maxLength: 20 });
```

### Test Coverage Goals
- All correctness properties implemented as property tests
- Critical user flows covered by unit tests
- Error handling paths tested
- State transitions verified
