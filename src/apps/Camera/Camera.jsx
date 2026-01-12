import { useState, useRef, useCallback } from 'react';
import { AppShell } from '../../components/AppShell';
import { Icon } from '../../components/Icons';
import { CameraRoll } from './components/CameraRoll';
import { CameraSettings } from './components/CameraSettings';
import './Camera.css';

// Sample captured photos (simulated camera roll)
const INITIAL_PHOTOS = [
    { id: 1, url: 'https://picsum.photos/seed/cam1/800/600', timestamp: Date.now() - 86400000 },
    { id: 2, url: 'https://picsum.photos/seed/cam2/800/600', timestamp: Date.now() - 172800000 },
    { id: 3, url: 'https://picsum.photos/seed/cam3/800/600', timestamp: Date.now() - 259200000 },
];

export function Camera() {
    const [photos, setPhotos] = useState(INITIAL_PHOTOS);
    const [isCapturing, setIsCapturing] = useState(false);
    const [showRoll, setShowRoll] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [flashMode, setFlashMode] = useState('auto'); // auto, on, off
    const [timerMode, setTimerMode] = useState(0); // 0, 3, 10 seconds
    const [aspectRatio, setAspectRatio] = useState('4:3'); // 4:3, 16:9, 1:1
    const [timerCountdown, setTimerCountdown] = useState(null);
    const photoIdRef = useRef(4);
    const viewfinderRef = useRef(null);

    const capturePhoto = useCallback(() => {
        if (isCapturing) return;

        const doCapture = () => {
            setIsCapturing(true);
            
            // Simulate shutter animation
            setTimeout(() => {
                // Add new photo to roll
                const newPhoto = {
                    id: photoIdRef.current++,
                    url: `https://picsum.photos/seed/cap${Date.now()}/800/600`,
                    timestamp: Date.now(),
                };
                setPhotos(prev => [newPhoto, ...prev]);
                setIsCapturing(false);
            }, 300);
        };

        if (timerMode > 0) {
            // Start countdown
            let countdown = timerMode;
            setTimerCountdown(countdown);
            
            const interval = setInterval(() => {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(interval);
                    setTimerCountdown(null);
                    doCapture();
                } else {
                    setTimerCountdown(countdown);
                }
            }, 1000);
        } else {
            doCapture();
        }
    }, [isCapturing, timerMode]);

    const handleSwipeLeft = useCallback(() => {
        setShowRoll(true);
    }, []);

    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case '16:9': return 'aspect-16-9';
            case '1:1': return 'aspect-1-1';
            default: return 'aspect-4-3';
        }
    };

    // Show camera roll view
    if (showRoll) {
        return (
            <CameraRoll 
                photos={photos}
                onBack={() => setShowRoll(false)}
            />
        );
    }

    // Show settings view
    if (showSettings) {
        return (
            <CameraSettings
                flashMode={flashMode}
                timerMode={timerMode}
                aspectRatio={aspectRatio}
                onFlashChange={setFlashMode}
                onTimerChange={setTimerMode}
                onAspectRatioChange={setAspectRatio}
                onBack={() => setShowSettings(false)}
            />
        );
    }

    return (
        <div className="camera-app">
            {/* Shutter flash overlay */}
            <div className={`camera-shutter-overlay ${isCapturing ? 'active' : ''}`} />
            
            {/* Timer countdown overlay */}
            {timerCountdown !== null && (
                <div className="camera-timer-overlay">
                    <span className="camera-timer-count">{timerCountdown}</span>
                </div>
            )}

            {/* Viewfinder */}
            <div 
                ref={viewfinderRef}
                className={`camera-viewfinder ${getAspectRatioClass()}`}
            >
                {/* Simulated camera preview - using gradient as placeholder */}
                <div className="camera-preview">
                    <div className="camera-preview-placeholder">
                        <Icon name="camera" size={64} />
                        <span>Camera Preview</span>
                    </div>
                </div>

                {/* Focus indicator */}
                <div className="camera-focus-indicator" />

                {/* Grid overlay */}
                <div className="camera-grid">
                    <div className="camera-grid-line horizontal" style={{ top: '33.33%' }} />
                    <div className="camera-grid-line horizontal" style={{ top: '66.66%' }} />
                    <div className="camera-grid-line vertical" style={{ left: '33.33%' }} />
                    <div className="camera-grid-line vertical" style={{ left: '66.66%' }} />
                </div>
            </div>

            {/* Top controls */}
            <div className="camera-top-controls">
                <button 
                    className="camera-control-btn"
                    onClick={() => {
                        const modes = ['auto', 'on', 'off'];
                        const nextIndex = (modes.indexOf(flashMode) + 1) % modes.length;
                        setFlashMode(modes[nextIndex]);
                    }}
                    aria-label={`Flash: ${flashMode}`}
                >
                    <Icon name={flashMode === 'off' ? 'flashOff' : 'flash'} size={24} />
                    {flashMode !== 'auto' && (
                        <span className="camera-control-label">{flashMode}</span>
                    )}
                </button>

                <button 
                    className="camera-control-btn"
                    onClick={() => setShowSettings(true)}
                    aria-label="Settings"
                >
                    <Icon name="settings" size={24} />
                </button>
            </div>

            {/* Bottom controls */}
            <div className="camera-bottom-controls">
                {/* Camera roll thumbnail */}
                <button 
                    className="camera-roll-btn"
                    onClick={() => setShowRoll(true)}
                    aria-label="Open camera roll"
                >
                    {photos.length > 0 ? (
                        <img 
                            src={photos[0].url} 
                            alt="Last photo" 
                            className="camera-roll-thumbnail"
                        />
                    ) : (
                        <div className="camera-roll-empty">
                            <Icon name="photo" size={20} />
                        </div>
                    )}
                </button>

                {/* Capture button */}
                <button 
                    className={`camera-capture-btn ${isCapturing ? 'capturing' : ''}`}
                    onClick={capturePhoto}
                    disabled={isCapturing || timerCountdown !== null}
                    aria-label="Take photo"
                >
                    <div className="camera-capture-inner" />
                </button>

                {/* Switch camera button */}
                <button 
                    className="camera-switch-btn"
                    onClick={() => {/* Simulated - no actual camera switch */}}
                    aria-label="Switch camera"
                >
                    <Icon name="switchCamera" size={28} />
                </button>
            </div>

            {/* Swipe hint for camera roll */}
            <div 
                className="camera-swipe-area"
                onTouchStart={(e) => {
                    const touch = e.touches[0];
                    viewfinderRef.current.startX = touch.clientX;
                }}
                onTouchEnd={(e) => {
                    const touch = e.changedTouches[0];
                    const diff = viewfinderRef.current.startX - touch.clientX;
                    if (diff > 50) {
                        handleSwipeLeft();
                    }
                }}
            />
        </div>
    );
}
