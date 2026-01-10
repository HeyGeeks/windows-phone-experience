import { useState, useRef } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Browser.css';

const DEFAULT_URL = 'https://www.bing.com';
const BOOKMARKS = [
    { name: 'Bing', url: 'https://www.bing.com' },
    { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
    { name: 'GitHub', url: 'https://github.com' },
];

export function Browser() {
    const [url, setUrl] = useState(DEFAULT_URL);
    const [inputUrl, setInputUrl] = useState(DEFAULT_URL);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [history, setHistory] = useState([DEFAULT_URL]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [showBookmarks, setShowBookmarks] = useState(false);
    const iframeRef = useRef(null);
    const inputRef = useRef(null);

    const normalizeUrl = (input) => {
        let normalized = input.trim();
        if (!normalized) return DEFAULT_URL;

        // Add protocol if missing
        if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
            // Check if it looks like a domain
            if (normalized.includes('.') && !normalized.includes(' ')) {
                normalized = 'https://' + normalized;
            } else {
                // Treat as search query
                normalized = `https://www.bing.com/search?q=${encodeURIComponent(normalized)}`;
            }
        }
        return normalized;
    };

    const navigate = (newUrl, addToHistory = true) => {
        const normalized = normalizeUrl(newUrl);
        setError(null);
        setIsLoading(true);
        setUrl(normalized);
        setInputUrl(normalized);

        if (addToHistory && normalized !== history[historyIndex]) {
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(normalized);
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(inputUrl);
        inputRef.current?.blur();
    };

    const goBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            const previousUrl = history[newIndex];
            setUrl(previousUrl);
            setInputUrl(previousUrl);
            setIsLoading(true);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            const nextUrl = history[newIndex];
            setUrl(nextUrl);
            setInputUrl(nextUrl);
            setIsLoading(true);
        }
    };

    const refresh = () => {
        setIsLoading(true);
        setError(null);
        if (iframeRef.current) {
            iframeRef.current.src = url;
        }
    };

    const goHome = () => {
        navigate(DEFAULT_URL);
    };

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setError('Unable to load this page. The site may not allow embedding.');
    };

    const canGoBack = historyIndex > 0;
    const canGoForward = historyIndex < history.length - 1;

    return (
        <AppShell title="Microsoft Edge">
            <div className="browser">
                {/* URL Bar */}
                <form className="browser-url-bar" onSubmit={handleSubmit}>
                    <div className="browser-nav-buttons">
                        <button
                            type="button"
                            className="browser-nav-btn"
                            onClick={goBack}
                            disabled={!canGoBack}
                            aria-label="Go back"
                        >
                            <Icon name="back" size={18} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="browser-nav-btn"
                            onClick={goForward}
                            disabled={!canGoForward}
                            aria-label="Go forward"
                        >
                            <Icon name="forward" size={18} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className="browser-nav-btn"
                            onClick={refresh}
                            aria-label="Refresh page"
                        >
                            <Icon name="refresh" size={18} aria-hidden="true" />
                        </button>
                    </div>

                    <div className="browser-url-input-wrapper">
                        {isLoading && <div className="browser-loading-indicator" />}
                        <Icon name="lock" size={14} className="browser-lock-icon" aria-hidden="true" />
                        <input
                            ref={inputRef}
                            type="text"
                            className="browser-url-input"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="Enter URL or search..."
                            aria-label="URL or search input"
                        />
                    </div>

                    <div className="browser-action-buttons">
                        <button
                            type="button"
                            className="browser-nav-btn"
                            onClick={goHome}
                            aria-label="Go to home page"
                        >
                            <Icon name="home" size={18} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            className={`browser-nav-btn ${showBookmarks ? 'active' : ''}`}
                            onClick={() => setShowBookmarks(!showBookmarks)}
                            aria-label="Toggle bookmarks"
                            aria-expanded={showBookmarks}
                        >
                            <Icon name="bookmark" size={18} aria-hidden="true" />
                        </button>
                    </div>
                </form>

                {/* Bookmarks Dropdown */}
                {showBookmarks && (
                    <div className="browser-bookmarks" role="menu" aria-label="Bookmarks">
                        <div className="browser-bookmarks-title">Favorites</div>
                        {BOOKMARKS.map((bookmark) => (
                            <button
                                key={bookmark.url}
                                className="browser-bookmark-item"
                                onClick={() => {
                                    navigate(bookmark.url);
                                    setShowBookmarks(false);
                                }}
                                role="menuitem"
                            >
                                <Icon name="browser" size={16} aria-hidden="true" />
                                <span>{bookmark.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Browser Content */}
                <div className="browser-content">
                    {error ? (
                        <div className="browser-error">
                            <Icon name="close" size={48} aria-hidden="true" />
                            <h2>Cannot display page</h2>
                            <p>{error}</p>
                            <button
                                className="browser-error-retry"
                                onClick={refresh}
                            >
                                Try again
                            </button>
                        </div>
                    ) : (
                        <iframe
                            ref={iframeRef}
                            src={url}
                            className="browser-iframe"
                            title="Browser content"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                    )}
                </div>
            </div>
        </AppShell>
    );
}
