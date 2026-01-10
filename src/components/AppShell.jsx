import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons';

export function AppShell({ title, children }) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="app-shell" role="dialog" aria-label={title}>
            <header className="app-header">
                <button
                    className="back-btn"
                    onClick={handleBack}
                    aria-label="Go back to Start screen"
                >
                    <Icon name="back" size={20} aria-hidden="true" />
                </button>
                <h1 className="page-title">{title}</h1>
            </header>
            <main className="app-content" role="main">
                {children}
            </main>
        </div>
    );
}

