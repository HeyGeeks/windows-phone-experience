import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { PanoramaView } from '../../components/PanoramaView';
import { EpisodeList } from './components/EpisodeList';
import { PodcastPlayer } from './components/PodcastPlayer';
import { 
    MOCK_PODCASTS, 
    MOCK_VIDEO_PODCASTS,
    getNewEpisodes, 
    getAudioEpisodes, 
    getVideoEpisodes 
} from './data';
import './Podcast.css';

export function Podcast() {
    const [podcasts, setPodcasts] = useState(MOCK_PODCASTS);
    const [videoPodcasts] = useState(MOCK_VIDEO_PODCASTS);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    const allPodcasts = [...podcasts, ...videoPodcasts];
    const newEpisodes = getNewEpisodes(allPodcasts);
    const audioEpisodes = getAudioEpisodes(podcasts);
    const videoEpisodes = getVideoEpisodes(videoPodcasts);

    const handleEpisodeSelect = (episode) => {
        setSelectedEpisode(episode);
        setIsPlayerVisible(true);
    };

    const handleClosePlayer = () => {
        setIsPlayerVisible(false);
    };

    const handleDownload = (episodeId) => {
        // Simulate download progress
        setPodcasts(prev => prev.map(podcast => ({
            ...podcast,
            episodes: podcast.episodes.map(ep => {
                if (ep.id === episodeId) {
                    if (ep.isDownloaded) {
                        return ep;
                    }
                    // Start download simulation
                    return { ...ep, downloadProgress: 10 };
                }
                return ep;
            })
        })));

        // Simulate download completion after delay
        setTimeout(() => {
            setPodcasts(prev => prev.map(podcast => ({
                ...podcast,
                episodes: podcast.episodes.map(ep => {
                    if (ep.id === episodeId) {
                        return { ...ep, isDownloaded: true, downloadProgress: 100 };
                    }
                    return ep;
                })
            })));
        }, 2000);
    };

    const sections = [
        {
            key: 'new',
            header: 'new',
            content: (
                <EpisodeList 
                    episodes={newEpisodes}
                    onEpisodeSelect={handleEpisodeSelect}
                    onDownload={handleDownload}
                    emptyMessage="No new episodes"
                    showPodcastInfo
                />
            )
        },
        {
            key: 'audio',
            header: 'audio',
            content: (
                <EpisodeList 
                    episodes={audioEpisodes}
                    onEpisodeSelect={handleEpisodeSelect}
                    onDownload={handleDownload}
                    emptyMessage="No audio podcasts"
                    showPodcastInfo
                />
            )
        },
        {
            key: 'video',
            header: 'video',
            content: (
                <EpisodeList 
                    episodes={videoEpisodes}
                    onEpisodeSelect={handleEpisodeSelect}
                    onDownload={handleDownload}
                    emptyMessage="No video podcasts"
                    showPodcastInfo
                />
            )
        }
    ];

    return (
        <AppShell title="podcasts" hideTitle>
            <div className="podcast-app">
                <PanoramaView 
                    title="podcasts"
                    sections={sections}
                />
                
                {isPlayerVisible && selectedEpisode && (
                    <PodcastPlayer 
                        episode={selectedEpisode}
                        onClose={handleClosePlayer}
                    />
                )}
            </div>
        </AppShell>
    );
}
