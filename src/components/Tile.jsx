import { useTileTilt } from '../hooks/useTileTilt';
import { Icon } from './Icons';
import { useNavigate } from 'react-router-dom';

export function Tile({
    icon,
    label,
    size = 'medium',
    color,
    live = false,
    notification,
    flipped = false,
    route,
    onClick,
    delay = 0
}) {
    const { tileRef, handlers } = useTileTilt();
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (route) {
            navigate(route);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    const sizeClass = `tile-${size}`;
    const animationDelay = `${delay * 0.05}s`;

    return (
        <div
            ref={tileRef}
            className={`tile ${sizeClass} tile-animate ${flipped ? 'flipped' : ''}`}
            style={{
                background: color || 'var(--accent-color)',
                animationDelay
            }}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`${label}${notification ? `, ${notification} notifications` : ''}`}
            {...handlers}
        >
            {live ? (
                <>
                    <div className="tile-content tile-front">
                        <Icon name={icon} className="tile-icon" aria-hidden="true" />
                        <span className="tile-label">{label}</span>
                    </div>
                    <div className="tile-content tile-back">
                        {notification && (
                            <span className="tile-notification" aria-hidden="true">{notification}</span>
                        )}
                        <span style={{ fontSize: '14px' }}>
                            {notification ? 'new' : label}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <Icon name={icon} className="tile-icon" aria-hidden="true" />
                    <span className="tile-label">{label}</span>
                </>
            )}
        </div>
    );
}

