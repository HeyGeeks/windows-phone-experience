import { useState, useRef } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Browser.css';

const DEFAULT_URL = 'http://heygeeks.in/';
const FAVORITES = [
    { name: 'HeyGeeks', url: 'http://heygeeks.in/', icon: '🚀' },
    { name: 'Windows Phone', url: 'https://en.wikipedia.org/wiki/Windows_Phone', icon: '📱' },
];

export function Browser() {
    const [url, setUrl] = useState(DEFAULT_URL);
    const [inputUrl, setInputUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showTabs, setShowTabs] = useState(false);
    const [tabs, setTabs] = useState([{ id: 1, url: DEFAULT_URL, title: 'HeyGeeks' }]);
    const [activeTab, setActiveTab] = useState(1);
    const iframeRef = useRef(null);

    const normalizeUrl = (input) => {
        let normalized = input.trim();
        if (!normalized) return DEFAULT_URL;
        if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
            if (normalized.includes('.') && !normalized.includes(' ')) {
                normalized = 'https://' + normalized;
            } else {
                normalized = `https://www.bing.com/search?q=${encodeURIComponent(normalized)}`;
            }
        }
        return normalized;
    };

    const navigate = (newUrl) => {
        const normalized = normalizeUrl(newUrl);
        setIsLoading(true);
        setUrl(normalized);
        setInputUrl('');
        setTabs(tabs.map(t => t.id === activeTab ? { ...t, url: normalized } : t));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(inputUrl);
    };

    const refresh = () => {
        setIsLoading(true);
        if (iframeRef.current) iframeRef.current.src = url;
    };

    const addTab = () => {
        const newTab = { id: Date.now(), url: DEFAULT_URL, title: 'new tab' };
        setTabs([...tabs, newTab]);
        setActiveTab(newTab.id);
        setUrl(DEFAULT_URL);
    };

    const closeTab = (id) => {
        if (tabs.length === 1) return;
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTab === id) {
            setActiveTab(newTabs[0].id);
            setUrl(newTabs[0].url);
        }
    };

    return (
        <AppShell title="internet explorer" hideTitle>
            <div className="wp-browser">
                <form className="wp-browser-bar" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="wp-url-input"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="search or enter address"
                    />
                    <button type="button" className="wp-browser-btn" onClick={refresh}>
                        <Icon name="refresh" size={20} />
                    </button>
                </form>

                {isLoading && <div className="wp-browser-loading" />}

                <div className="wp-browser-content">
                    <iframe
                        ref={iframeRef}
                        src={url}
                        className="wp-browser-iframe"
                        title="Browser"
                        onLoad={() => setIsLoading(false)}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                </div>

                <div className="wp-browser-nav">
                    <button className="wp-nav-btn" onClick={() => window.history.back()}>
                        <Icon name="back" size={24} />
                    </button>
                    <button className="wp-nav-btn" onClick={() => setShowTabs(!showTabs)}>
                        <span className="wp-tab-count">{tabs.length}</span>
                    </button>
                    <button className="wp-nav-btn" onClick={() => navigate('https://www.google.com')}>
                        <Icon name="search" size={24} />
                    </button>
                    <button className="wp-nav-btn">
                        <Icon name="more" size={24} />
                    </button>
                </div>

                {showTabs && (
                    <div className="wp-tabs-view">
                        <div className="wp-tabs-header">
                            <span>tabs ({tabs.length})</span>
                            <button onClick={addTab}><Icon name="add" size={20} /></button>
                        </div>
                        <div className="wp-tabs-grid">
                            {tabs.map(tab => (
                                <div
                                    key={tab.id}
                                    className={`wp-tab-item ${tab.id === activeTab ? 'active' : ''}`}
                                    onClick={() => { setActiveTab(tab.id); setUrl(tab.url); setShowTabs(false); }}
                                >
                                    <button className="wp-tab-close" onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}>
                                        <Icon name="close" size={16} />
                                    </button>
                                    <div className="wp-tab-preview" />
                                    <span className="wp-tab-title">{tab.title}</span>
                                </div>
                            ))}
                        </div>
                        <div className="wp-favorites">
                            <h3>favorites</h3>
                            <div className="wp-favorites-grid">
                                {FAVORITES.map(fav => (
                                    <div key={fav.url} className="wp-favorite-item" onClick={() => { navigate(fav.url); setShowTabs(false); }}>
                                        <span className="wp-favorite-icon">{fav.icon}</span>
                                        <span className="wp-favorite-name">{fav.name}</span>
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
