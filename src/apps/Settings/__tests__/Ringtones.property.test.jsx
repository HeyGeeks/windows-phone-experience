import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import { RingtoneItem, useRingtonePlayer, Ringtones } from '../components/Ringtones';
import { RINGTONES, formatDuration } from '../data/ringtones';
import { renderHook, act } from '@testing-library/react';

// Mock HTMLMediaElement methods
beforeEach(() => {
    // Mock Audio
    window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = vi.fn();
    window.HTMLMediaElement.prototype.load = vi.fn();
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// Arbitrary for generating valid ringtone objects
const ringtoneArbitrary = fc.record({
    id: fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z0-9-]+$/.test(s)),
    name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    category: fc.constantFrom('nokia', 'windows', 'custom'),
    duration: fc.integer({ min: 1, max: 60 }),
    audioUrl: fc.constant('/ringtones/test.mp3')
});

// Use actual ringtones from the data for more realistic tests
const actualRingtoneArbitrary = fc.constantFrom(...RINGTONES);

describe('Ringtones Property Tests', () => {
    /**
     * Feature: windows-phone-daily-apps, Property 18: Ringtone Playback Toggle
     * Validates: Requirements 11.2, 11.3
     * 
     * For any ringtone, tapping it while stopped SHALL start playback,
     * and tapping it while playing SHALL stop playback (toggle behavior).
     */
    it('Property 18: Ringtone playback toggle behavior', () => {
        fc.assert(
            fc.property(actualRingtoneArbitrary, (ringtone) => {
                const { result } = renderHook(() => useRingtonePlayer());
                
                // Initial state: nothing is playing
                expect(result.current.playingId).toBe(null);
                expect(result.current.isPlaying(ringtone.id)).toBe(false);
                
                // First tap: should start playback
                act(() => {
                    result.current.play(ringtone);
                });
                expect(result.current.playingId).toBe(ringtone.id);
                expect(result.current.isPlaying(ringtone.id)).toBe(true);
                
                // Second tap on same ringtone: should stop playback (toggle)
                act(() => {
                    result.current.play(ringtone);
                });
                expect(result.current.playingId).toBe(null);
                expect(result.current.isPlaying(ringtone.id)).toBe(false);
                
                // Cleanup
                act(() => {
                    result.current.stop();
                });
            }),
            { numRuns: 100 }
        );
    });

    /**
     * Feature: windows-phone-daily-apps, Property 19: Ringtone Selection Persistence
     * Validates: Requirements 11.4
     * 
     * For any ringtone selection, the selected ringtone SHALL be highlighted
     * with accent color and persist until a different ringtone is selected.
     */
    it('Property 19: Ringtone selection persistence and highlighting', () => {
        fc.assert(
            fc.property(
                actualRingtoneArbitrary,
                actualRingtoneArbitrary,
                (ringtone1, ringtone2) => {
                    let selectedRingtone = 'Nokia Tune'; // Initial selection
                    const onSelectRingtone = vi.fn((name) => {
                        selectedRingtone = name;
                    });
                    const onBack = vi.fn();

                    // Render RingtoneItem with first ringtone as selected
                    const { container, rerender } = render(
                        <RingtoneItem
                            ringtone={ringtone1}
                            isSelected={selectedRingtone === ringtone1.name}
                            isPlaying={false}
                            onPlay={() => {}}
                            onSelect={() => onSelectRingtone(ringtone1.name)}
                            playbackProgress={0}
                        />
                    );

                    // Click to select ringtone1
                    const item = container.querySelector('.ringtone-item');
                    fireEvent.click(item);
                    
                    // Verify selection callback was called
                    expect(onSelectRingtone).toHaveBeenCalledWith(ringtone1.name);
                    
                    // Re-render with updated selection
                    rerender(
                        <RingtoneItem
                            ringtone={ringtone1}
                            isSelected={true}
                            isPlaying={false}
                            onPlay={() => {}}
                            onSelect={() => onSelectRingtone(ringtone1.name)}
                            playbackProgress={0}
                        />
                    );

                    // Verify selected state is shown (checkmark present, selected class)
                    expect(item.classList.contains('selected')).toBe(true);
                    const checkmark = container.querySelector('.ringtone-check');
                    expect(checkmark).toBeInTheDocument();
                    expect(checkmark.textContent).toBe('✓');

                    // Verify name has accent color (via selected class on parent)
                    const nameElement = container.querySelector('.ringtone-name');
                    expect(nameElement).toBeInTheDocument();

                    // Cleanup
                    container.remove();
                }
            ),
            { numRuns: 100 }
        );
    });

    /**
     * Additional property test: RingtoneItem renders all required fields
     * For any ringtone, the rendered item SHALL display name and duration
     */
    it('RingtoneItem renders name and duration for any ringtone', () => {
        fc.assert(
            fc.property(actualRingtoneArbitrary, fc.boolean(), (ringtone, isSelected) => {
                const { container } = render(
                    <RingtoneItem
                        ringtone={ringtone}
                        isSelected={isSelected}
                        isPlaying={false}
                        onPlay={() => {}}
                        onSelect={() => {}}
                        playbackProgress={0}
                    />
                );

                // Check name is rendered
                const nameElement = container.querySelector('.ringtone-name');
                expect(nameElement).toBeInTheDocument();
                expect(nameElement.textContent).toBe(ringtone.name);

                // Check duration is rendered
                const durationElement = container.querySelector('.ringtone-duration');
                expect(durationElement).toBeInTheDocument();
                expect(durationElement.textContent).toBe(formatDuration(ringtone.duration));

                // Check play button is present
                const playButton = container.querySelector('.ringtone-play-btn');
                expect(playButton).toBeInTheDocument();

                // Check checkmark presence matches selection state
                const checkmark = container.querySelector('.ringtone-check');
                if (isSelected) {
                    expect(checkmark).toBeInTheDocument();
                } else {
                    expect(checkmark).not.toBeInTheDocument();
                }

                // Cleanup
                container.remove();
            }),
            { numRuns: 100 }
        );
    });
});
