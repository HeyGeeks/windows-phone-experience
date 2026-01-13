/**
 * iTunes Search API Client
 * Handles fetching music data from iTunes and formatting it for the app.
 */

// Format iTunes duration (milliseconds) to mm:ss
function formatDuration(millis) {
    if (!millis) return '0:00';
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Get higher resolution artwork
function getHighResArtwork(url) {
    if (!url) return '';
    // iTunes returns 100x100 (100x100bb), we can try to get 600x600 for better quality
    return url.replace('100x100bb', '600x600bb');
}

/**
 * Search for music using iTunes Search API
 * @param {string} query - Search term
 * @param {number} limit - Number of results (default 50)
 * @returns {Promise<Object>} Formatted results { songs, albums, artists }
 */
export async function searchMusic(query, limit = 50) {
    if (!query || query.trim().length === 0) {
        return { songs: [], albums: [], artists: [] };
    }

    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodedQuery}&media=music&entity=song&limit=${limit}`
        );

        if (!response.ok) {
            throw new Error('iTunes API request failed');
        }

        const data = await response.json();
        const results = data.results || [];

        // Process and format the results
        const songs = results.map((item, index) => ({
            id: `itunes-${item.trackId}`,
            title: item.trackName,
            artist: item.artistName,
            artistId: `itunes-artist-${item.artistId}`,
            album: item.collectionName,
            albumId: `itunes-album-${item.collectionId}`,
            cover: getHighResArtwork(item.artworkUrl100),
            previewUrl: item.previewUrl,
            duration: Math.floor(item.trackTimeMillis / 1000), // Convert to seconds for app compatibility
            formattedDuration: formatDuration(item.trackTimeMillis),
            trackNumber: item.trackNumber,
            genre: item.primaryGenreName,
            year: new Date(item.releaseDate).getFullYear(),
            originalData: item
        }));

        // Extract unique artists
        const artistMap = new Map();
        results.forEach(item => {
            if (!artistMap.has(item.artistId)) {
                artistMap.set(item.artistId, {
                    id: `itunes-artist-${item.artistId}`,
                    name: item.artistName,
                    // iTunes doesn't give artist images in song search, use album art as fallback or placeholder
                    image: getHighResArtwork(item.artworkUrl100),
                    genre: item.primaryGenreName
                });
            }
        });
        const artists = Array.from(artistMap.values());

        // Extract unique albums
        const albumMap = new Map();
        results.forEach(item => {
            if (!albumMap.has(item.collectionId)) {
                albumMap.set(item.collectionId, {
                    id: `itunes-album-${item.collectionId}`,
                    title: item.collectionName,
                    artist: item.artistName,
                    artistId: `itunes-artist-${item.artistId}`,
                    cover: getHighResArtwork(item.artworkUrl100),
                    year: new Date(item.releaseDate).getFullYear(),
                    genre: item.primaryGenreName,
                    trackCount: item.trackCount
                });
            }
        });
        const albums = Array.from(albumMap.values());

        return { songs, artists, albums };

    } catch (error) {
        console.error('iTunes Search Error:', error);
        return { songs: [], albums: [], artists: [] };
    }
}

/**
 * Lookup details for an artist (get albums/songs)
 * @param {string} artistId - iTunes Artist ID (e.g. 'itunes-artist-123')
 * @returns {Promise<Object>} Formatted results { artist, albums, songs }
 */
export async function lookupArtist(artistId) {
    if (!artistId || !artistId.startsWith('itunes-artist-')) {
        return null;
    }

    const numericId = artistId.replace('itunes-artist-', '');

    try {
        // Fetch albums for the artist
        const response = await fetch(
            `https://itunes.apple.com/lookup?id=${numericId}&entity=album&limit=20`
        );

        if (!response.ok) throw new Error('iTunes API request failed');

        const data = await response.json();
        const results = data.results || [];

        // First result is usually the artist
        const artistData = results.find(item => item.wrapperType === 'artist') || results[0];
        const albumData = results.filter(item => item.wrapperType === 'collection');

        // Format Artist (if we needed to refresh it, but usually we have it)
        const artist = artistData ? {
            id: `itunes-artist-${artistData.artistId}`,
            name: artistData.artistName,
            genre: artistData.primaryGenreName,
            // Keep existing image if we have it, or placeholder since API doesn't give artist image here easily without scraping
            image: null
        } : null;

        // Format Albums
        const albums = albumData.map(item => ({
            id: `itunes-album-${item.collectionId}`,
            title: item.collectionName,
            artist: item.artistName,
            artistId: `itunes-artist-${item.artistId}`,
            cover: getHighResArtwork(item.artworkUrl100),
            year: new Date(item.releaseDate).getFullYear(),
            genre: item.primaryGenreName,
            trackCount: item.trackCount
        }));

        return { artist, albums, songs: [] };

    } catch (error) {
        console.error('iTunes Artist Lookup Error:', error);
        return { artist: null, albums: [], songs: [] };
    }
}

/**
 * Lookup details for an album (get songs)
 * @param {string} albumId - iTunes Album ID (e.g. 'itunes-album-123')
 * @returns {Promise<Object>} Formatted results { album, songs }
 */
export async function lookupAlbum(albumId) {
    if (!albumId || !albumId.startsWith('itunes-album-')) {
        return null;
    }

    const numericId = albumId.replace('itunes-album-', '');

    try {
        const response = await fetch(
            `https://itunes.apple.com/lookup?id=${numericId}&entity=song`
        );

        if (!response.ok) throw new Error('iTunes API request failed');

        const data = await response.json();
        const results = data.results || [];

        // First result is the collection (album)
        const collectionData = results.find(item => item.wrapperType === 'collection');
        const trackData = results.filter(item => item.wrapperType === 'track');

        const album = collectionData ? {
            id: `itunes-album-${collectionData.collectionId}`,
            title: collectionData.collectionName,
            artist: collectionData.artistName,
            artistId: `itunes-artist-${collectionData.artistId}`,
            cover: getHighResArtwork(collectionData.artworkUrl100),
            year: new Date(collectionData.releaseDate).getFullYear(),
            genre: collectionData.primaryGenreName,
            trackCount: collectionData.trackCount
        } : null;

        const songs = trackData.map(item => ({
            id: `itunes-${item.trackId}`,
            title: item.trackName,
            artist: item.artistName,
            artistId: `itunes-artist-${item.artistId}`,
            album: item.collectionName,
            albumId: `itunes-album-${item.collectionId}`,
            cover: getHighResArtwork(item.artworkUrl100),
            previewUrl: item.previewUrl,
            duration: Math.floor(item.trackTimeMillis / 1000),
            formattedDuration: formatDuration(item.trackTimeMillis),
            trackNumber: item.trackNumber,
            genre: item.primaryGenreName,
            year: new Date(item.releaseDate).getFullYear(),
            originalData: item
        }));

        return { album, songs };

    } catch (error) {
        console.error('iTunes Album Lookup Error:', error);
        return { album: null, songs: [] };
    }
}

/**
 * Get default recommendations when search is empty
 * Uses a default list of popular artists/terms
 */
export async function getDefaultRecommendations() {
    // A default query to populate the UI initially
    return searchMusic('bollywood hits', 50);
}
