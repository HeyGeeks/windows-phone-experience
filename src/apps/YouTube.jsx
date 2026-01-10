import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './YouTube.css';

const INVIDIOUS_INSTANCE = 'https://invidious.drgns.net'; // Alternative instance

export function YouTube() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('trending'); // trending, search

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${INVIDIOUS_INSTANCE}/api/v1/trending`);
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            setVideos(data.map(mapVideoData));
            setView('trending');
        } catch (error) {
            console.error('Failed to fetch trending:', error);
            // Fallback to mock data if API fails
            setVideos([
                { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', channel: 'RickAstleyVEVO', views: '1.2B views', time: '3:33', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
                { id: 'jNQXAC9IVRw', title: 'Me at the zoo', channel: 'jawed', views: '280M views', time: '0:19', thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/mqdefault.jpg' },
                { id: '9bZkp7q19f0', title: 'PSY - GANGNAM STYLE', channel: 'officialpsy', views: '4.9B views', time: '4:12', thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg' },
                { id: 'L_jWHffIx5E', title: 'Smash Mouth - All Star', channel: 'SmashMouth', views: '450M views', time: '3:57', thumbnail: 'https://i.ytimg.com/vi/L_jWHffIx5E/mqdefault.jpg' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const searchVideos = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${INVIDIOUS_INSTANCE}/api/v1/search?q=${encodeURIComponent(searchQuery)}`);
            if (!res.ok) throw new Error('API Error');
            const data = await res.json();
            setVideos(data.filter(item => item.type === 'video').map(mapVideoData));
            setView('search');
        } catch (error) {
            console.error('Failed to search:', error);
            // Fallback for search
            setVideos([
                { id: 'search1', title: `Result for "${searchQuery}"`, channel: 'SearchFallback', views: '1M views', time: '10:00', thumbnail: 'https://picsum.photos/320/180?random=1' },
                { id: 'search2', title: 'Another Cool Video', channel: 'DemoChannel', views: '500K views', time: '5:00', thumbnail: 'https://picsum.photos/320/180?random=2' },
                { id: 'search3', title: 'Windows Phone Review', channel: 'TechGuy', views: '12M views', time: '15:20', thumbnail: 'https://picsum.photos/320/180?random=3' }
            ]);
            setView('search');
        } finally {
            setLoading(false);
        }
    };

    const mapVideoData = (v) => ({
        id: v.videoId,
        title: v.title,
        channel: v.author,
        views: v.viewCountText || `${v.viewCount || 0} views`,
        time: formatDuration(v.lengthSeconds),
        thumbnail: v.videoThumbnails?.[3]?.url || v.videoThumbnails?.[0]?.url || `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`
    });

    const formatDuration = (seconds) => {
        if (!seconds) return '';
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    if (selectedVideo) {
        return (
            <div className="youtube-player-view">
                <div className="yt-player-header">
                    <button className="yt-back-btn" onClick={() => setSelectedVideo(null)}>
                        <Icon name="back" size={24} />
                    </button>
                    <span className="yt-header-title">{selectedVideo.title}</span>
                </div>
                <div className="yt-video-container">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="yt-video-details">
                    <h1>{selectedVideo.title}</h1>
                    <div className="yt-stats">
                        <span>{selectedVideo.views}</span>
                        <span>•</span>
                        <span>{selectedVideo.channel}</span>
                    </div>
                </div>
                <div className="yt-actions">
                    <button>
                        <Icon name="play" size={20} />
                        <span>Like</span>
                    </button>
                    <button>
                        <Icon name="search" size={20} />
                        <span>Share</span>
                    </button>
                    <button>
                        <Icon name="message" size={20} />
                        <span>Save</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AppShell title="YouTube">
            <div className="youtube-container">
                <form className="yt-search-bar" onSubmit={searchVideos}>
                    <input
                        type="text"
                        placeholder="Search YouTube"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">
                        <Icon name="search" size={20} />
                    </button>
                </form>

                <div className="yt-content">
                    {loading ? (
                        <div className="yt-loading">Loading...</div>
                    ) : (
                        <div className="youtube-home">
                            {view === 'search' && videos.length === 0 && <div className="yt-no-results">No results found</div>}
                            {videos.map(video => (
                                <div key={video.id} className="yt-video-item" onClick={() => setSelectedVideo(video)}>
                                    <div className="yt-thumbnail">
                                        <img src={video.thumbnail} alt={video.title} loading="lazy" />
                                        <span className="yt-duration">{video.time}</span>
                                    </div>
                                    <div className="yt-info">
                                        <div className="yt-avatar"></div>
                                        <div className="yt-text">
                                            <span className="yt-title">{video.title}</span>
                                            <span className="yt-meta">{video.channel} • {video.views}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}
