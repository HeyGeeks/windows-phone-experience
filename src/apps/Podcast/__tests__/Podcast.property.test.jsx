import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { EpisodeList } from '../components/EpisodeList';
import { formatDuration, getDownloadStatus } from '../data';

// Arbitrary for generating valid episode objects
const episodeArbitrary = fc.record({
    id: fc.uuid(),
    title: fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0),
    description: fc.string({ minLength: 0, maxLength: 500 }),
    duration: fc.integer({ min: 60, max: 7200 }), // 1 minute to 2 hours in seconds
    publishDate: fc.date({ min: new Date('2020-01-01'), max: new Date() }),
    audioUrl: fc.webUrl(),
    isDownloaded: fc.boolean(),
    playbackPosition: fc.integer({ min: 0, max: 7200 }),
    downloadProgress: fc.integer({ min: 0, max: 100 }),
    podcastTitle: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    podcastArtwork: fc.webUrl()
});

// Ensure playbackPosition doesn't exceed duration
const validEpisodeArbitrary = episodeArbitrary.map(episode => ({
    ...episode,
    playbackPosition: Math.min(episode.playbackPosition, episode.duration),
    // If downloaded, downloadProgress should be 100
    downloadProgress: episode.isDownloaded ? 100 : episode.downloadProgress
}));

describe('Podcast App Property Tests', () => {
    /**
     * Feature: windows-phone-daily-apps, Property 7: Podcast Episode List Completeness
     * Validates: Requirements 4.2
     * 
     * For any podcast episode object, the rendered episode list item SHALL contain
     * title, duration, and download status.
     */
    it('Property 7: Episode list item renders title, duration, and download status', () => {
        fc.assert(
            fc.property(validEpisodeArbitrary, (episode) => {
                const { container } = render(
                    <EpisodeList 
                        episodes={[episode]}
                        onEpisodeSelect={() => {}}
                        onDownload={() => {}}
                        showPodcastInfo={true}
                    />
                );

                // Check title is rendered
                const titleElement = container.querySelector('.episode-title');
                expect(titleElement).toBeInTheDocument();
                expect(titleElement.textContent).toBe(episode.title);

                // Check duration is rendered
                const durationElement = container.querySelector('.episode-duration');
                expect(durationElement).toBeInTheDocument();
                const expectedDuration = formatDuration(episode.duration);
                expect(durationElement.textContent).toBe(expectedDuration);

                // Check download status is rendered
                const downloadStatusContainer = container.querySelector('.episode-download-status');
                expect(downloadStatusContainer).toBeInTheDocument();
                
                // Verify download status text or progress bar is present
                const downloadText = container.querySelector('.episode-download-text');
                const downloadProgress = container.querySelector('.episode-download-progress');
                
                // Either download text or progress bar should be present
                const hasDownloadIndicator = downloadText !== null || downloadProgress !== null;
                expect(hasDownloadIndicator).toBe(true);
                
                // If download text is present, verify it matches expected status
                if (downloadText) {
                    const expectedStatus = getDownloadStatus(episode);
                    expect(downloadText.textContent).toBe(expectedStatus);
                }

                // Cleanup for next iteration
                container.remove();
            }),
            { numRuns: 100 }
        );
    });
});
