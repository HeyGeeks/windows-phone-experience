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

    const audioRef = useRef(null);

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
        setIsPlaying(false);
        setCurrentTime(0);
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

    const value = {
        isPlaying,
        currentSong,
        currentTime,
        duration,
        history,
        playSong,
        togglePlay,
        seekTo,
        setHistory
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
