import { useNavigate } from 'react-router-dom';
import { Icon } from './Icons';

export function AppShell({ title, children, hideTitle = false }) {
    const navigate = useNavigate();

    return (
        <div className="app-shell" role="dialog" aria-label={title}>
            <header className="app-header">
                {!hideTitle && <h1 className="page-title">{title}</h1>}
            </header>
            <main className="app-content" role="main">
                {children}
            </main>
        </div >
    );
}

