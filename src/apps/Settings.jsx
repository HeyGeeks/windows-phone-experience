import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Toggle } from '../components/Toggle';
import { Icon } from '../components/Icons';
import { useTheme, THEME_COLORS } from '../context/ThemeContext';
import './Settings.css';

export function Settings() {
    const { accentColor, setAccentColor, theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('system');
    const [view, setView] = useState('main');
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(false);
    const [airplane, setAirplane] = useState(false);
    const [location, setLocation] = useState(true);

    const systemSettings = [
        { id: 'actioncenter', label: 'action centre', desc: 'manage action centre' },
        { id: 'wifi', label: 'WiFi', desc: wifi ? 'mtwifi, WiFi Sense turned on' : 'off' },
        { id: 'airplane', label: 'flight mode', desc: airplane ? 'on' : 'turned off' },
        { id: 'bluetooth', label: 'Bluetooth', desc: bluetooth ? 'on' : 'turned off' },
        { id: 'cellular', label: 'mobile+SIM', desc: 'TDC' },
        { id: 'sharing', label: 'internet sharing', desc: 'turned off' },
        { id: 'vpn', label: 'VPN', desc: 'set up' },
        { id: 'appscorner', label: 'apps corner', desc: 'set up' },
        { id: 'workplace', label: 'workplace', desc: '' },
        { id: 'battery', label: 'battery saver', desc: '78% remaining' },
        { id: 'theme', label: 'start+theme', desc: 'background, accent colour' },
        { id: 'lock', label: 'lock screen', desc: 'notifications, background' },
        { id: 'location', label: 'location', desc: location ? 'on' : 'off' },
        { id: 'storage', label: 'storage sense', desc: 'phone, sd card' },
        { id: 'about', label: 'about', desc: 'device info' },
    ];

    const appSettings = [
        { id: 'background', label: 'background tasks', desc: '' },
        { id: 'photos', label: 'photos+camera', desc: '' },
        { id: 'people', label: 'people', desc: '' },
        { id: 'messaging', label: 'messaging', desc: '' },
        { id: 'phone', label: 'phone', desc: '' },
        { id: 'email', label: 'email+accounts', desc: '' },
    ];

    const renderMain = () => (
        <div className="wp-settings">
            <div className="wp-settings-header">
                <span className="wp-settings-label">SETTINGS</span>
                <div className="wp-pivot-tabs">
                    <button 
                        className={`wp-pivot-tab ${activeTab === 'system' ? 'active' : ''}`}
                        onClick={() => setActiveTab('system')}
                    >
                        system
                    </button>
                    <button 
                        className={`wp-pivot-tab ${activeTab === 'applications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('applications')}
                    >
                        applications
                    </button>
                </div>
            </div>
            <div className="wp-settings-list">
                {(activeTab === 'system' ? systemSettings : appSettings).map(item => (
                    <div key={item.id} className="wp-settings-item" onClick={() => setView(item.id)}>
                        <span className="wp-settings-item-label">{item.label}</span>
                        {item.desc && <span className="wp-settings-item-desc">{item.desc}</span>}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTheme = () => (
        <div className="wp-settings-page">
            <button className="wp-back-btn" onClick={() => setView('main')}>
                <Icon name="back" size={20} />
            </button>
            <h2 className="wp-settings-page-title">start+theme</h2>
            <div className="wp-settings-section">
                <h3 className="wp-section-title">Background</h3>
                <div className="wp-theme-options">
                    <button className={`wp-theme-option ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>dark</button>
                    <button className={`wp-theme-option ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>light</button>
                </div>
            </div>
            <div className="wp-settings-section">
                <h3 className="wp-section-title">Accent colour</h3>
                <div className="wp-accent-grid">
                    {THEME_COLORS.map(color => (
                        <button
                            key={color.value}
                            className={`wp-accent-color ${accentColor === color.value ? 'active' : ''}`}
                            style={{ background: color.value }}
                            onClick={() => setAccentColor(color.value)}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    const renderWifi = () => (
        <div className="wp-settings-page">
            <button className="wp-back-btn" onClick={() => setView('main')}><Icon name="back" size={20} /></button>
            <h2 className="wp-settings-page-title">WiFi</h2>
            <div className="wp-toggle-row">
                <span>WiFi networking</span>
                <Toggle active={wifi} onChange={setWifi} />
            </div>
            {wifi && (
                <div className="wp-wifi-list">
                    <div className="wp-wifi-item connected">
                        <Icon name="wifi" size={20} />
                        <div className="wp-wifi-info">
                            <span className="wp-wifi-name">Home Network</span>
                            <span className="wp-wifi-status">connected</span>
                        </div>
                    </div>
                    <div className="wp-wifi-item">
                        <Icon name="wifi" size={20} />
                        <div className="wp-wifi-info">
                            <span className="wp-wifi-name">Office WiFi</span>
                            <span className="wp-wifi-status">secured</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderBluetooth = () => (
        <div className="wp-settings-page">
            <button className="wp-back-btn" onClick={() => setView('main')}><Icon name="back" size={20} /></button>
            <h2 className="wp-settings-page-title">Bluetooth</h2>
            <div className="wp-toggle-row">
                <span>Status</span>
                <Toggle active={bluetooth} onChange={setBluetooth} />
            </div>
            <p className="wp-settings-desc">{bluetooth ? 'Searching for devices...' : 'Turn on Bluetooth to connect to devices'}</p>
        </div>
    );

    const renderAbout = () => (
        <div className="wp-settings-page">
            <button className="wp-back-btn" onClick={() => setView('main')}><Icon name="back" size={20} /></button>
            <h2 className="wp-settings-page-title">about</h2>
            <div className="wp-about-info">
                <div className="wp-about-item"><span>phone name</span><span>Windows Phone</span></div>
                <div className="wp-about-item"><span>software</span><span>Windows Phone 8.1</span></div>
                <div className="wp-about-item"><span>os version</span><span>8.10.14219.341</span></div>
                <div className="wp-about-item"><span>firmware revision</span><span>02540.00019.15053.36002</span></div>
                <div className="wp-about-item"><span>hardware revision</span><span>1.0.0.0</span></div>
                <div className="wp-about-item"><span>total storage</span><span>32 GB</span></div>
                <div className="wp-about-item"><span>available storage</span><span>24.5 GB</span></div>
                <div className="wp-about-item wp-about-credits"><span>created by</span><span>Mohit Yadav - HeyGeeks</span></div>
            </div>
        </div>
    );

    const renderLocation = () => (
        <div className="wp-settings-page">
            <button className="wp-back-btn" onClick={() => setView('main')}><Icon name="back" size={20} /></button>
            <h2 className="wp-settings-page-title">location</h2>
            <div className="wp-toggle-row">
                <span>Location services</span>
                <Toggle active={location} onChange={setLocation} />
            </div>
            <p className="wp-settings-desc">Apps that have asked for your location will appear here</p>
        </div>
    );

    const renderBattery = () => (
        <div className="wp-settings-page">
            <button className="wp-back-btn" onClick={() => setView('main')}><Icon name="back" size={20} /></button>
            <h2 className="wp-settings-page-title">battery saver</h2>
            <div className="wp-battery-display">
                <div className="wp-battery-percent">78%</div>
                <div className="wp-battery-time">estimated time remaining: 14 hours</div>
            </div>
            <div className="wp-battery-bar">
                <div className="wp-battery-fill" style={{ width: '78%' }} />
            </div>
        </div>
    );

    const renderAirplane = () => (
        <div className="wp-settings-page">
            <button className="wp-back-btn" onClick={() => setView('main')}><Icon name="back" size={20} /></button>
            <h2 className="wp-settings-page-title">flight mode</h2>
            <div className="wp-toggle-row">
                <span>Status</span>
                <Toggle active={airplane} onChange={setAirplane} />
            </div>
            <p className="wp-settings-desc">Turn on flight mode to stop wireless communication</p>
        </div>
    );

    const views = { 
        main: renderMain, 
        theme: renderTheme, 
        wifi: renderWifi, 
        bluetooth: renderBluetooth, 
        about: renderAbout, 
        location: renderLocation, 
        battery: renderBattery,
        airplane: renderAirplane
    };
    
    return <AppShell title="settings" hideTitle>{views[view] ? views[view]() : renderMain()}</AppShell>;
}
