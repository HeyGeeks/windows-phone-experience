import { createContext, useContext, useState, useRef, useEffect } from 'react';

const STORAGE_KEY = 'groove_music_history';

const getHistory = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
};

const saveToHistory = (song) => {
    const history = getHistory();
    const filtered = history.filter(s => s.id !== song.id);
    const newHistory = [song, ...filtered].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    return newHistory;
};

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [history, setHistory] = useState(getHistory());
    
    // Queue state management
    const [queue, setQueue] = useState([]);
    const [queueIndex, setQueueIndex] = useState(0);
    const [originalQueue, setOriginalQueue] = useState([]);
    
    // Shuffle state
    const [shuffleEnabled, setShuffleEnabled] = useState(false);
    
    // Repeat mode state ('off' | 'all' | 'one')
    const [repeatMode, setRepeatMode] = useState('off');

    const audioRef = useRef(null);
    
    // Refs to track current state for event handlers
    const queueRef = useRef(queue);
    const queueIndexRef = useRef(queueIndex);
    const repeatModeRef = useRef(repeatMode);
    
    // Keep refs in sync with state
    useEffect(() => {
        queueRef.current = queue;
    }, [queue]);
    
    useEffect(() => {
        queueIndexRef.current = queueIndex;
    }, [queueIndex]);
    
    useEffect(() => {
        repeatModeRef.current = repeatMode;
    }, [repeatMode]);

    // Initialize audio element once
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration || 30);
        }
    };

    const handleEnded = () => {
        const currentRepeatMode = repeatModeRef.current;
        const currentQueue = queueRef.current;
        const currentQueueIndex = queueIndexRef.current;
        
        if (currentRepeatMode === 'one') {
            // Repeat current song
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(console.error);
            }
        } else if (currentQueueIndex < currentQueue.length - 1) {
            // Play next song in queue
            const nextIndex = currentQueueIndex + 1;
            const nextSong = currentQueue[nextIndex];
            
            setQueueIndex(nextIndex);
            setCurrentSong(nextSong);
            
            if (audioRef.current && nextSong?.previewUrl) {
                audioRef.current.src = nextSong.previewUrl;
                audioRef.current.play().catch(console.error);
            }
            
            if (nextSong) {
                const newHistory = saveToHistory(nextSong);
                setHistory(newHistory);
            }
        } else if (currentRepeatMode === 'all' && currentQueue.length > 0) {
            // Repeat all: go back to first song
            const firstSong = currentQueue[0];
            
            setQueueIndex(0);
            setCurrentSong(firstSong);
            
            if (audioRef.current && firstSong?.previewUrl) {
                audioRef.current.src = firstSong.previewUrl;
                audioRef.current.play().catch(console.error);
            }
            
            if (firstSong) {
                const newHistory = saveToHistory(firstSong);
                setHistory(newHistory);
            }
        } else {
            // Stop playback (repeat off and end of queue)
            setIsPlaying(false);
            setCurrentTime(0);
        }
    };

    const playSong = (song) => {
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            setCurrentSong(song);
            if (audioRef.current && song.previewUrl) {
                audioRef.current.src = song.previewUrl;
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
            const newHistory = saveToHistory(song);
            setHistory(newHistory);
        }
    };

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
        }
    };

    const seekTo = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // Play a queue of songs starting at a specific index
    const playQueue = (songs, startIndex = 0) => {
        if (!songs || songs.length === 0) return;
        
        const validIndex = Math.max(0, Math.min(startIndex, songs.length - 1));
        setOriginalQueue([...songs]);
        setQueue([...songs]);
        setQueueIndex(validIndex);
        
        const songToPlay = songs[validIndex];
        setCurrentSong(songToPlay);
        
        if (audioRef.current && songToPlay.previewUrl) {
            audioRef.current.src = songToPlay.previewUrl;
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
        }
        
        const newHistory = saveToHistory(songToPlay);
        setHistory(newHistory);
    };

    // Skip to a specific index in the queue
    const skipToQueueIndex = (index) => {
        if (index < 0 || index >= queue.length) return;
        
        setQueueIndex(index);
        const songToPlay = queue[index];
        setCurrentSong(songToPlay);
        
        if (audioRef.current && songToPlay.previewUrl) {
            audioRef.current.src = songToPlay.previewUrl;
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
        }
        
        const newHistory = saveToHistory(songToPlay);
        setHistory(newHistory);
    };

    // Add a song to the end of the queue
    const addToQueue = (song) => {
        if (!song) return;
        
        setQueue(prevQueue => [...prevQueue, song]);
        setOriginalQueue(prevOriginal => [...prevOriginal, song]);
    };

    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array, currentIndex) => {
        const shuffled = [...array];
        const currentSongItem = shuffled[currentIndex];
        
        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Move current song to front (index 0)
        const currentNewIndex = shuffled.indexOf(currentSongItem);
        if (currentNewIndex > 0) {
            shuffled.splice(currentNewIndex, 1);
            shuffled.unshift(currentSongItem);
        }
        
        return shuffled;
    };

    // Toggle shuffle mode
    const toggleShuffle = () => {
        setShuffleEnabled(prev => {
            const newShuffleState = !prev;
            
            if (newShuffleState) {
                // Enable shuffle: shuffle the queue, keeping current song at current position
                const shuffled = shuffleArray(queue, queueIndex);
                setQueue(shuffled);
                setQueueIndex(0); // Current song is now at index 0
            } else {
                // Disable shuffle: restore original order
                if (currentSong && originalQueue.length > 0) {
                    const originalIndex = originalQueue.findIndex(s => s.id === currentSong.id);
                    setQueue([...originalQueue]);
                    setQueueIndex(originalIndex >= 0 ? originalIndex : 0);
                }
            }
            
            return newShuffleState;
        });
    };

    // Cycle through repeat modes: off -> all -> one -> off
    const cycleRepeat = () => {
        setRepeatMode(prev => {
            if (prev === 'off') return 'all';
            if (prev === 'all') return 'one';
            return 'off';
        });
    };

    // Play next track with queue and repeat logic
    const playNext = () => {
        if (queue.length === 0) return;
        
        if (repeatMode === 'one') {
            // In repeat-one mode, restart current song
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
        } else if (queueIndex < queue.length - 1) {
            // Play next song in queue
            const nextIndex = queueIndex + 1;
            const nextSong = queue[nextIndex];
            
            setQueueIndex(nextIndex);
            setCurrentSong(nextSong);
            
            if (audioRef.current && nextSong?.previewUrl) {
                audioRef.current.src = nextSong.previewUrl;
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
            
            if (nextSong) {
                const newHistory = saveToHistory(nextSong);
                setHistory(newHistory);
            }
        } else if (repeatMode === 'all') {
            // Repeat all: go back to first song
            const firstSong = queue[0];
            
            setQueueIndex(0);
            setCurrentSong(firstSong);
            
            if (audioRef.current && firstSong?.previewUrl) {
                audioRef.current.src = firstSong.previewUrl;
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
            
            if (firstSong) {
                const newHistory = saveToHistory(firstSong);
                setHistory(newHistory);
            }
        }
        // If repeat is off and at end of queue, do nothing
    };

    // Play previous track with 3-second threshold logic
    const playPrevious = () => {
        if (queue.length === 0) return;
        
        const THRESHOLD_SECONDS = 3;
        
        if (currentTime > THRESHOLD_SECONDS) {
            // After 3 seconds: restart current song
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setCurrentTime(0);
            }
        } else if (queueIndex > 0) {
            // Within 3 seconds and not at start: go to previous song
            const prevIndex = queueIndex - 1;
            const prevSong = queue[prevIndex];
            
            setQueueIndex(prevIndex);
            setCurrentSong(prevSong);
            
            if (audioRef.current && prevSong?.previewUrl) {
                audioRef.current.src = prevSong.previewUrl;
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
            
            if (prevSong) {
                const newHistory = saveToHistory(prevSong);
                setHistory(newHistory);
            }
        } else {
            // At start of queue: restart current song
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setCurrentTime(0);
            }
        }
    };

    const value = {
        isPlaying,
        currentSong,
        currentTime,
        duration,
        history,
        // Queue state
        queue,
        queueIndex,
        originalQueue,
        // Shuffle state
        shuffleEnabled,
        // Repeat mode
        repeatMode,
        // Actions
        playSong,
        togglePlay,
        seekTo,
        setHistory,
        playQueue,
        skipToQueueIndex,
        addToQueue,
        toggleShuffle,
        cycleRepeat,
        playNext,
        playPrevious
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
}

export function useMusic() {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
}
