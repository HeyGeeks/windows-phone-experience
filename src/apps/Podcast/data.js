// Mock podcast data for Windows Phone 8.1 Podcast App

export const MOCK_PODCASTS = [
    {
        id: 'podcast-1',
        title: 'Tech Today',
        author: 'Tech Media Network',
        artwork: 'https://picsum.photos/seed/tech/400/400',
        description: 'Daily tech news and insights from the world of technology.',
        episodes: [
            {
                id: 'ep-1-1',
                title: 'The Future of AI in 2024',
                description: 'We explore the latest developments in artificial intelligence and what they mean for the future.',
                duration: 2340, // 39 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                audioUrl: '/ringtones/Nokia Tune.mp3',
                isDownloaded: true,
                playbackPosition: 0,
                downloadProgress: 100
            },
            {
                id: 'ep-1-2',
                title: 'Smartphone Revolution',
                description: 'How smartphones have changed the way we live and work over the past decade.',
                duration: 1860, // 31 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                audioUrl: '/ringtones/Ring01.mp3',
                isDownloaded: true,
                playbackPosition: 930,
                downloadProgress: 100
            },
            {
                id: 'ep-1-3',
                title: 'Cloud Computing Explained',
                description: 'A beginner-friendly guide to understanding cloud computing and its benefits.',
                duration: 2100, // 35 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
                audioUrl: '/ringtones/Ring02.mp3',
                isDownloaded: false,
                playbackPosition: 0,
                downloadProgress: 45
            }
        ]
    },
    {
        id: 'podcast-2',
        title: 'History Uncovered',
        author: 'Historical Society',
        artwork: 'https://picsum.photos/seed/history/400/400',
        description: 'Fascinating stories from history that shaped our world.',
        episodes: [
            {
                id: 'ep-2-1',
                title: 'The Rise and Fall of Ancient Rome',
                description: 'Exploring the factors that led to Rome becoming the greatest empire of the ancient world.',
                duration: 3600, // 60 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
                audioUrl: '/ringtones/Ring03.mp3',
                isDownloaded: true,
                playbackPosition: 1800,
                downloadProgress: 100
            },
            {
                id: 'ep-2-2',
                title: 'Medieval Mysteries',
                description: 'Unsolved mysteries from the medieval period that continue to puzzle historians.',
                duration: 2700, // 45 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
                audioUrl: '/ringtones/Ring04.mp3',
                isDownloaded: false,
                playbackPosition: 0,
                downloadProgress: 0
            }
        ]
    },
    {
        id: 'podcast-3',
        title: 'Science Weekly',
        author: 'Science Foundation',
        artwork: 'https://picsum.photos/seed/science/400/400',
        description: 'Weekly updates on the latest scientific discoveries and research.',
        episodes: [
            {
                id: 'ep-3-1',
                title: 'Black Holes: New Discoveries',
                description: 'Recent observations have revealed surprising facts about black holes.',
                duration: 2520, // 42 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
                audioUrl: '/ringtones/Ring05.mp3',
                isDownloaded: true,
                playbackPosition: 0,
                downloadProgress: 100
            },
            {
                id: 'ep-3-2',
                title: 'The Human Brain',
                description: 'Understanding how our brain works and processes information.',
                duration: 1980, // 33 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
                audioUrl: '/ringtones/Ring06.mp3',
                isDownloaded: false,
                playbackPosition: 0,
                downloadProgress: 78
            }
        ]
    }
];

// Video podcasts
export const MOCK_VIDEO_PODCASTS = [
    {
        id: 'vpodcast-1',
        title: 'Design Matters',
        author: 'Creative Studio',
        artwork: 'https://picsum.photos/seed/design/400/400',
        description: 'Visual stories about design and creativity.',
        episodes: [
            {
                id: 'vep-1-1',
                title: 'The Art of UI Design',
                description: 'Learn the principles of great user interface design.',
                duration: 1800, // 30 minutes
                publishDate: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
                audioUrl: '/ringtones/Ring07.mp3',
                isDownloaded: true,
                playbackPosition: 0,
                downloadProgress: 100,
                isVideo: true
            }
        ]
    }
];

// Helper function to format duration
export function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
}

// Helper function to format publish date
export function formatPublishDate(date) {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) {
        return 'Just now';
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 7) {
        return `${days} days ago`;
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

// Get all new episodes (from last 24 hours)
export function getNewEpisodes(podcasts) {
    const oneDayAgo = Date.now() - 1000 * 60 * 60 * 24;
    const episodes = [];
    
    podcasts.forEach(podcast => {
        podcast.episodes.forEach(episode => {
            if (episode.publishDate.getTime() > oneDayAgo) {
                episodes.push({
                    ...episode,
                    podcastTitle: podcast.title,
                    podcastArtwork: podcast.artwork
                });
            }
        });
    });
    
    return episodes.sort((a, b) => b.publishDate - a.publishDate);
}

// Get all audio episodes
export function getAudioEpisodes(podcasts) {
    const episodes = [];
    
    podcasts.forEach(podcast => {
        podcast.episodes.forEach(episode => {
            if (!episode.isVideo) {
                episodes.push({
                    ...episode,
                    podcastTitle: podcast.title,
                    podcastArtwork: podcast.artwork
                });
            }
        });
    });
    
    return episodes.sort((a, b) => b.publishDate - a.publishDate);
}

// Get all video episodes
export function getVideoEpisodes(podcasts) {
    const episodes = [];
    
    podcasts.forEach(podcast => {
        podcast.episodes.forEach(episode => {
            if (episode.isVideo) {
                episodes.push({
                    ...episode,
                    podcastTitle: podcast.title,
                    podcastArtwork: podcast.artwork
                });
            }
        });
    });
    
    return episodes.sort((a, b) => b.publishDate - a.publishDate);
}

// Get download status text
export function getDownloadStatus(episode) {
    if (episode.isDownloaded) {
        return 'downloaded';
    } else if (episode.downloadProgress > 0) {
        return `downloading ${episode.downloadProgress}%`;
    }
    return 'not downloaded';
}
