import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Photos.css';

const SAMPLE_PHOTOS = [
    { id: 1, url: 'https://picsum.photos/seed/wp1/400/400', title: 'Nature', date: '2024-01-15' },
    { id: 2, url: 'https://picsum.photos/seed/wp2/400/400', title: 'City', date: '2024-01-14' },
    { id: 3, url: 'https://picsum.photos/seed/wp3/400/400', title: 'Mountains', date: '2024-01-13' },
    { id: 4, url: 'https://picsum.photos/seed/wp4/400/400', title: 'Beach', date: '2024-01-12' },
    { id: 5, url: 'https://picsum.photos/seed/wp5/400/400', title: 'Forest', date: '2024-01-11' },
    { id: 6, url: 'https://picsum.photos/seed/wp6/400/400', title: 'Sunset', date: '2024-01-10' },
    { id: 7, url: 'https://picsum.photos/seed/wp7/400/400', title: 'Architecture', date: '2024-01-09' },
    { id: 8, url: 'https://picsum.photos/seed/wp8/400/400', title: 'Portrait', date: '2024-01-08' },
    { id: 9, url: 'https://picsum.photos/seed/wp9/400/400', title: 'Abstract', date: '2024-01-07' },
    { id: 10, url: 'https://picsum.photos/seed/wp10/400/400', title: 'Street', date: '2024-01-06' },
    { id: 11, url: 'https://picsum.photos/seed/wp11/400/400', title: 'Food', date: '2024-01-05' },
    { id: 12, url: 'https://picsum.photos/seed/wp12/400/400', title: 'Travel', date: '2024-01-04' },
];

const ALBUMS = [
    { id: 'camera', name: 'camera roll', count: 12, cover: 'https://picsum.photos/seed/wp1/200/200' },
    { id: 'saved', name: 'saved pictures', count: 8, cover: 'https://picsum.photos/seed/wp5/200/200' },
    { id: 'screenshots', name: 'screenshots', count: 3, cover: 'https://picsum.photos/seed/wp9/200/200' },
];

export function Photos() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [pivot, setPivot] = useState('collection');
    const [photoIndex, setPhotoIndex] = useState(0);

    const openPhoto = (photo, index) => {
        setSelectedPhoto(photo);
        setPhotoIndex(index);
    };

    const nextPhoto = () => {
        const next = (photoIndex + 1) % SAMPLE_PHOTOS.length;
        setPhotoIndex(next);
        setSelectedPhoto(SAMPLE_PHOTOS[next]);
    };

    const prevPhoto = () => {
        const prev = (photoIndex - 1 + SAMPLE_PHOTOS.length) % SAMPLE_PHOTOS.length;
        setPhotoIndex(prev);
        setSelectedPhoto(SAMPLE_PHOTOS[prev]);
    };

    if (selectedPhoto) {
        return (
            <div className="wp-photo-viewer">
                <div className="wp-photo-header">
                    <button className="wp-photo-close" onClick={() => setSelectedPhoto(null)}>
                        <Icon name="back" size={24} />
                    </button>
                    <span className="wp-photo-title">{selectedPhoto.title}</span>
                </div>
                <div className="wp-photo-container">
                    <button className="wp-photo-nav prev" onClick={prevPhoto}><Icon name="back" size={32} /></button>
                    <img src={selectedPhoto.url} alt={selectedPhoto.title} />
                    <button className="wp-photo-nav next" onClick={nextPhoto}><Icon name="forward" size={32} /></button>
                </div>
                <div className="wp-photo-bar">
                    <button><Icon name="share" size={24} /></button>
                    <button><Icon name="edit" size={24} /></button>
                    <button><Icon name="delete" size={24} /></button>
                    <button><Icon name="more" size={24} /></button>
                </div>
            </div>
        );
    }

    return (
        <AppShell title="photos" hideTitle>
            <div className="wp-photos">
                <h1 className="wp-photos-title">Photos</h1>
                <div className="wp-pivot-header">
                    <button className={`wp-pivot ${pivot === 'collection' ? 'active' : ''}`} onClick={() => setPivot('collection')}>collection</button>
                    <button className={`wp-pivot ${pivot === 'albums' ? 'active' : ''}`} onClick={() => setPivot('albums')}>albums</button>
                    <button className={`wp-pivot ${pivot === 'date' ? 'active' : ''}`} onClick={() => setPivot('date')}>date</button>
                </div>

                {pivot === 'collection' && (
                    <div className="wp-photos-grid">
                        {SAMPLE_PHOTOS.map((photo, index) => (
                            <div key={photo.id} className="wp-photo-item" onClick={() => openPhoto(photo, index)}>
                                <img src={photo.url} alt={photo.title} loading="lazy" />
                            </div>
                        ))}
                    </div>
                )}

                {pivot === 'albums' && (
                    <div className="wp-albums-list">
                        {ALBUMS.map(album => (
                            <div key={album.id} className="wp-album-item" onClick={() => setPivot('collection')}>
                                <img src={album.cover} alt={album.name} className="wp-album-cover" />
                                <div className="wp-album-info">
                                    <span className="wp-album-name">{album.name}</span>
                                    <span className="wp-album-count">{album.count} photos</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {pivot === 'date' && (
                    <div className="wp-photos-by-date">
                        <div className="wp-date-group">
                            <h3 className="wp-date-header">january 2024</h3>
                            <div className="wp-photos-grid">
                                {SAMPLE_PHOTOS.map((photo, index) => (
                                    <div key={photo.id} className="wp-photo-item" onClick={() => openPhoto(photo, index)}>
                                        <img src={photo.url} alt={photo.title} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
