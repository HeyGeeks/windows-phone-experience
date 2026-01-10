import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons';

export function BottomNav() {
    const navigate = useNavigate();

    return (
        <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
            <button
                className="nav-btn"
                onClick={() => navigate(-1)}
                aria-label="Go back"
            >
                <Icon name="back" aria-hidden="true" />
            </button>
            <button
                className="nav-btn"
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

