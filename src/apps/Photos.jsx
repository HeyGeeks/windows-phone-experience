import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import './Photos.css';

const SAMPLE_PHOTOS = [
    { id: 1, url: 'https://picsum.photos/seed/1/300/300', title: 'Nature' },
    { id: 2, url: 'https://picsum.photos/seed/2/300/300', title: 'City' },
    { id: 3, url: 'https://picsum.photos/seed/3/300/300', title: 'Mountains' },
    { id: 4, url: 'https://picsum.photos/seed/4/300/300', title: 'Beach' },
    { id: 5, url: 'https://picsum.photos/seed/5/300/300', title: 'Forest' },
    { id: 6, url: 'https://picsum.photos/seed/6/300/300', title: 'Sunset' },
    { id: 7, url: 'https://picsum.photos/seed/7/300/300', title: 'Architecture' },
    { id: 8, url: 'https://picsum.photos/seed/8/300/300', title: 'Portrait' },
    { id: 9, url: 'https://picsum.photos/seed/9/300/300', title: 'Abstract' },
];

export function Photos() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    if (selectedPhoto) {
        return (
            <div className="photo-lightbox" onClick={() => setSelectedPhoto(null)}>
                <img src={selectedPhoto.url} alt={selectedPhoto.title} />
                <div className="photo-title">{selectedPhoto.title}</div>
            </div>
        );
    }

    return (
        <AppShell title="photos">
            <div className="photos-container">
                <h2 className="section-title">camera roll</h2>
                <div className="photos-grid">
                    {SAMPLE_PHOTOS.map(photo => (
                        <div
                            key={photo.id}
                            className="photo-item"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <img src={photo.url} alt={photo.title} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
