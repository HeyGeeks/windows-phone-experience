import { Icon } from '../../../components/Icons';
import { formatDuration, formatPublishDate, getDownloadStatus } from '../data';

/**
 * EpisodeList - Displays a list of podcast episodes
 * @param {Object} props
 * @param {Array} props.episodes - Array of episode objects
 * @param {Function} props.onEpisodeSelect - Callback when episode is selected
 * @param {Function} props.onDownload - Callback when download is requested
 * @param {string} [props.emptyMessage] - Message to show when list is empty
 * @param {boolean} [props.showPodcastInfo] - Whether to show podcast title
 */
export function EpisodeList({ 
    episodes, 
    onEpisodeSelect, 
    onDownload,
    emptyMessage = 'No episodes',
    showPodcastInfo = false
}) {
    if (!episodes || episodes.length === 0) {
        return (
            <div className="episode-list-empty">
                <Icon name="podcast" size={48} className="episode-list-empty-icon" />
                <span className="episode-list-empty-text">{emptyMessage}</span>
            </div>
        );
    }

    return (
        <div className="episode-list">
            {episodes.map(episode => (
                <EpisodeItem 
                    key={episode.id}
                    episode={episode}
                    onSelect={() => onEpisodeSelect(episode)}
                    onDownload={() => onDownload(episode.id)}
                    showPodcastInfo={showPodcastInfo}
                />
            ))}
        </div>
    );
}

/**
 * EpisodeItem - Individual episode in the list
 */
function EpisodeItem({ episode, onSelect, onDownload, showPodcastInfo }) {
    const downloadStatus = getDownloadStatus(episode);
    const isDownloading = !episode.isDownloaded && episode.downloadProgress > 0;
    const hasProgress = episode.playbackPosition > 0 && episode.duration > 0;
    const progressPercent = hasProgress 
        ? Math.min((episode.playbackPosition / episode.duration) * 100, 100) 
        : 0;

    const handleDownloadClick = (e) => {
        e.stopPropagation();
        if (!episode.isDownloaded && !isDownloading) {
            onDownload();
        }
    };

    return (
        <div className="episode-item" onClick={onSelect}>
            <div className="episode-artwork">
                <img 
                    src={episode.podcastArtwork || 'https://via.placeholder.com/64'} 
                    alt={episode.title}
                    loading="lazy"
                />
            </div>
            
            <div className="episode-content">
                {showPodcastInfo && episode.podcastTitle && (
                    <span className="episode-podcast-title">{episode.podcastTitle}</span>
                )}
                
                <span className="episode-title">{episode.title}</span>
                
                <div className="episode-meta">
                    <span className="episode-duration">
                        {formatDuration(episode.duration)}
                    </span>
                    <span className="episode-meta-separator" />
                    <span className="episode-date">
                        {formatPublishDate(episode.publishDate)}
                    </span>
                </div>
                
                <div className="episode-download-status">
                    <Icon 
                        name={episode.isDownloaded ? 'check' : 'download'} 
                        size={14} 
                        className={`episode-download-icon ${episode.isDownloaded ? 'downloaded' : 'not-downloaded'}`}
                    />
                    {isDownloading ? (
                        <div className="episode-download-progress">
                            <div 
                                className="episode-download-progress-fill"
                                style={{ width: `${episode.downloadProgress}%` }}
                            />
                        </div>
                    ) : (
                        <span className={`episode-download-text ${episode.isDownloaded ? 'downloaded' : ''}`}>
                            {downloadStatus}
                        </span>
                    )}
                </div>
                
                {hasProgress && (
                    <div className="episode-playback-progress">
                        <div 
                            className="episode-playback-progress-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                )}
            </div>
            
            <div className="episode-actions">
                <button 
                    className="episode-play-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect();
                    }}
                    aria-label={`Play ${episode.title}`}
                >
                    <Icon name="play" size={16} />
                </button>
                
                {!episode.isDownloaded && (
                    <button 
                        className={`episode-download-btn ${isDownloading ? 'downloading' : ''}`}
                        onClick={handleDownloadClick}
                        aria-label={isDownloading ? 'Downloading' : `Download ${episode.title}`}
                        disabled={isDownloading}
                    >
                        <Icon name={isDownloading ? 'more' : 'download'} size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}
