import { useState } from 'react';
import { Icon } from '../../../components/Icons';

export function CameraRoll({ photos, onBack }) {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photoIndex, setPhotoIndex] = useState(0);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const openPhoto = (photo, index) => {
        setSelectedPhoto(photo);
        setPhotoIndex(index);
    };

    const nextPhoto = () => {
        const next = (photoIndex + 1) % photos.length;
        setPhotoIndex(next);
        setSelectedPhoto(photos[next]);
    };

    const prevPhoto = () => {
        const prev = (photoIndex - 1 + photos.length) % photos.length;
        setPhotoIndex(prev);
        setSelectedPhoto(photos[prev]);
    };

    const handleSwipeRight = () => {
        onBack();
    };

    // Photo viewer
    if (selectedPhoto) {
        return (
            <div className="camera-roll-viewer">
                <div className="camera-roll-viewer-header">
                    <button 
                        className="camera-roll-back-btn"
                        onClick={() => setSelectedPhoto(null)}
                        aria-label="Back to camera roll"
                    >
                        <Icon name="back" size={24} />
                    </button>
                    <span className="camera-roll-viewer-title">
                        {formatDate(selectedPhoto.timestamp)}
                    </span>
                </div>

                <div 
                    className="camera-roll-viewer-content"
                    onTouchStart={(e) => {
                        e.currentTarget.startX = e.touches[0].clientX;
                    }}
                    onTouchEnd={(e) => {
                        const diff = e.changedTouches[0].clientX - e.currentTarget.startX;
                        if (Math.abs(diff) > 50) {
                            if (diff > 0) {
                                prevPhoto();
                            } else {
                                nextPhoto();
                            }
                        }
                    }}
                >
                    {photos.length > 1 && (
                        <button 
                            className="camera-roll-nav prev"
                            onClick={prevPhoto}
                            aria-label="Previous photo"
                        >
                            <Icon name="back" size={32} />
                        </button>
                    )}
                    
                    <img 
                        src={selectedPhoto.url} 
                        alt={`Photo taken ${formatDate(selectedPhoto.timestamp)}`}
                        className="camera-roll-viewer-image"
                    />
                    
                    {photos.length > 1 && (
                        <button 
                            className="camera-roll-nav next"
                            onClick={nextPhoto}
                            aria-label="Next photo"
                        >
                            <Icon name="forward" size={32} />
                        </button>
                    )}
                </div>

                <div className="camera-roll-viewer-bar">
                    <button aria-label="Share">
                        <Icon name="share" size={24} />
                    </button>
                    <button aria-label="Edit">
                        <Icon name="edit" size={24} />
                    </button>
                    <button aria-label="Delete">
                        <Icon name="delete" size={24} />
                    </button>
                    <button aria-label="More options">
                        <Icon name="more" size={24} />
                    </button>
                </div>

                {/* Photo counter */}
                <div className="camera-roll-counter">
                    {photoIndex + 1} / {photos.length}
                </div>
            </div>
        );
    }

    // Grid view
    return (
        <div 
            className="camera-roll"
            onTouchStart={(e) => {
                e.currentTarget.startX = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
                const diff = e.changedTouches[0].clientX - e.currentTarget.startX;
                if (diff > 100) {
                    handleSwipeRight();
                }
            }}
        >
            <div className="camera-roll-header">
                <button 
                    className="camera-roll-back-btn"
                    onClick={onBack}
                    aria-label="Back to camera"
                >
                    <Icon name="back" size={24} />
                </button>
                <h1 className="camera-roll-title">Camera Roll</h1>
            </div>

            {photos.length === 0 ? (
                <div className="camera-roll-empty">
                    <Icon name="photo" size={64} />
                    <span>No photos yet</span>
                    <p>Take some photos to see them here</p>
                </div>
            ) : (
                <div className="camera-roll-grid">
                    {photos.map((photo, index) => (
                        <div 
                            key={photo.id}
                            className="camera-roll-item"
                            onClick={() => openPhoto(photo, index)}
                        >
                            <img 
                                src={photo.url} 
                                alt={`Photo ${index + 1}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Swipe hint */}
            <div className="camera-roll-swipe-hint">
                <Icon name="back" size={16} />
                <span>Swipe right to return to camera</span>
            </div>
        </div>
    );
}
