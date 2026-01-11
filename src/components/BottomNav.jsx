import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import './BottomNav.css';

export function BottomNav({ onRecentApps }) {
    const navigate = useNavigate();
    const pressTimer = useRef(null);
    const isLongPress = useRef(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleBackMouseDown = () => {
        isLongPress.current = false;
        pressTimer.current = setTimeout(() => {
            isLongPress.current = true;
            if (onRecentApps) onRecentApps();
        }, 500);
    };

    const handleBackMouseUp = () => {
        clearTimeout(pressTimer.current);
        if (!isLongPress.current) {
            navigate(-1);
        }
    };

    const handleBackTouchStart = () => {
        isLongPress.current = false;
        pressTimer.current = setTimeout(() => {
            isLongPress.current = true;
            if (onRecentApps) onRecentApps();
        }, 500);
    };

    const handleBackTouchEnd = (e) => {
        e.preventDefault();
        clearTimeout(pressTimer.current);
        if (!isLongPress.current) {
            navigate(-1);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.open(`https://www.bing.com/search?q=${encodeURIComponent(searchQuery.trim())}`, '_blank');
            setSearchQuery('');
            setShowSearch(false);
        }
    };

    const handleSearchClose = () => {
        setShowSearch(false);
        setSearchQuery('');
    };

    return (
        <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
            <button
                className="nav-btn"
                onMouseDown={handleBackMouseDown}
                onMouseUp={handleBackMouseUp}
                onMouseLeave={() => clearTimeout(pressTimer.current)}
                onTouchStart={handleBackTouchStart}
                onTouchEnd={handleBackTouchEnd}
                aria-label="Go back (hold for recent apps)"
            >
                <Icon name="back" aria-hidden="true" />
            </button>
            <button
                className="nav-btn windows-btn"
                onClick={() => navigate('/')}
                aria-label="Go to Start screen"
            >
                <Icon name="windows" aria-hidden="true" />
            </button>
            <button
                className="nav-btn"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
            >
                <Icon name="search" aria-hidden="true" />
            </button>

            {showSearch && (
                <div className="search-overlay" role="dialog" aria-label="Bing Search">
                    <div className="search-overlay-backdrop" onClick={handleSearchClose} />
                    <div className="search-container">
                        <div className="search-header">
                            <img 
                                src="https://www.bing.com/sa/simg/favicon-2x.ico" 
                                alt="Bing" 
                                className="bing-logo"
                            />
                            <span className="search-title">bing</span>
                        </div>
                        <form onSubmit={handleSearchSubmit} className="search-form">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search the web..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                aria-label="Search query"
                            />
                            <button type="submit" className="search-submit" aria-label="Submit search">
                                <Icon name="search" aria-hidden="true" />
                            </button>
                        </form>
                        <button className="search-close" onClick={handleSearchClose} aria-label="Close search">
                            <Icon name="close" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
