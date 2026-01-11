import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Maps.css';

export function Maps() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDirections, setShowDirections] = useState(false);

    return (
        <AppShell title="maps" hideTitle>
            <div className="wp-maps">
                <div className="wp-maps-search">
                    <Icon name="search" size={20} />
                    <input
                        type="text"
                        placeholder="search for a place"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="wp-maps-view">
                    <div className="wp-map-placeholder">
                        <div className="wp-map-grid">
                            {Array(16).fill(0).map((_, i) => (
                                <div key={i} className="wp-map-tile" />
                            ))}
                        </div>
                        <div className="wp-map-marker">
                            <Icon name="location" size={32} />
                        </div>
                        <div className="wp-map-label">your location</div>
                    </div>
                </div>

                <div className="wp-maps-bar">
                    <button className="wp-maps-btn" onClick={() => setShowDirections(!showDirections)}>
                        <Icon name="forward" size={24} />
                        <span>directions</span>
                    </button>
                    <button className="wp-maps-btn">
                        <Icon name="location" size={24} />
                        <span>me</span>
                    </button>
                    <button className="wp-maps-btn">
                        <Icon name="download" size={24} />
                        <span>offline</span>
                    </button>
                </div>

                {showDirections && (
                    <div className="wp-directions-panel">
                        <div className="wp-directions-header">
                            <button onClick={() => setShowDirections(false)}><Icon name="close" size={20} /></button>
                            <span>directions</span>
                        </div>
                        <div className="wp-directions-inputs">
                            <div className="wp-direction-input">
                                <span className="wp-direction-label">from</span>
                                <input type="text" placeholder="your location" />
                            </div>
                            <div className="wp-direction-input">
                                <span className="wp-direction-label">to</span>
                                <input type="text" placeholder="destination" />
                            </div>
                        </div>
                        <div className="wp-transport-modes">
                            <button className="wp-transport active">🚗</button>
                            <button className="wp-transport">🚶</button>
                            <button className="wp-transport">🚌</button>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}
