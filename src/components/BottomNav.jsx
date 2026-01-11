import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import './BottomNav.css';

export function BottomNav({ onRecentApps }) {
    const navigate = useNavigate();
    const pressTimer = useRef(null);
    const isLongPress = useRef(false);

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
            >
                <Icon name="search" aria-hidden="true" />
            </button>
        </nav>
    );
}
