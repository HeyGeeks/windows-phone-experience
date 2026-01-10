import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './YouTube.css';

const VIDEOS = [
    { id: 1, title: 'Windows Phone 10 Review', channel: 'TechReviewer', views: '1.2M', time: '10:05', thumbnail: 'https://picsum.photos/seed/wp10/320/180' },
    { id: 2, title: 'Lumia 950 XL Camera Test', channel: 'MobilePhotography', views: '450K', time: '5:30', thumbnail: 'https://picsum.photos/seed/lumia/320/180' },
    { id: 3, title: 'Metro UI vs Android', channel: 'DesignDaily', views: '890K', time: '12:45', thumbnail: 'https://picsum.photos/seed/metro/320/180' },
    { id: 4, title: 'History of Windows Mobile', channel: 'TechHistory', views: '2.1M', time: '25:00', thumbnail: 'https://picsum.photos/seed/history/320/180' },
];

export function YouTube() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    if (selectedVideo) {
        return (
            <div className="youtube-player-view">
                <div className="yt-player-header">
                    <button className="yt-back-btn" onClick={() => setSelectedVideo(null)}>
                        <Icon name="back" size={24} />
                    </button>
                    <span>YouTube</span>
                </div>
                <div className="yt-video-container">
                    <img src={selectedVideo.thumbnail} className="yt-video-placeholder" />
                    <div className="yt-play-overlay">
                        <Icon name="play" size={48} />
                    </div>
                </div>
                <div className="yt-video-details">
                    <h1>{selectedVideo.title}</h1>
                    <div className="yt-stats">
                        <span>{selectedVideo.views} views</span>
                        <span>•</span>
                        <span>{selectedVideo.channel}</span>
                    </div>
                </div>
                <div className="yt-actions">
                    <button>Like</button>
                    <button>Share</button>
                    <button>Save</button>
                </div>
            </div>
        );
    }

    return (
        <AppShell title="YouTube">
            <div className="youtube-home">
                {VIDEOS.map(video => (
                    <div key={video.id} className="yt-video-item" onClick={() => setSelectedVideo(video)}>
                        <div className="yt-thumbnail">
                            <img src={video.thumbnail} alt={video.title} />
                            <span className="yt-duration">{video.time}</span>
                        </div>
                        <div className="yt-info">
                            <div className="yt-avatar"></div>
                            <div className="yt-text">
                                <span className="yt-title">{video.title}</span>
                                <span className="yt-meta">{video.channel} • {video.views} views</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AppShell>
    );
}
