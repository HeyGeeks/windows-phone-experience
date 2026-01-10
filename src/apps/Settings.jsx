import { useState, useRef, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Toggle } from '../components/Toggle';
import { useTheme, THEME_COLORS } from '../context/ThemeContext';
import './Settings.css';

// Back arrow icon
const BackArrow = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
);

export function Settings() {
    const { accentColor, setAccentColor } = useTheme();
    const [currentView, setCurrentView] = useState('main');
    const [activeTab, setActiveTab] = useState('system');
    const hubRef = useRef(null);

    // System/Phone states
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(false);
    const [airplane, setAirplane] = useState(false);
    const [mobileData, setMobileData] = useState(true);
    const [nfc, setNfc] = useState(true);
    const [vpn, setVpn] = useState(false);
    const [location, setLocation] = useState(true);
    const [quietHours, setQuietHours] = useState(false);
    const [drivingMode, setDrivingMode] = useState(false);
    const [batterySaver, setBatterySaver] = useState(false);
    const [kidCorner, setKidCorner] = useState(false);

    // Display states
    const [brightness, setBrightness] = useState(70);
    const [autoRotate, setAutoRotate] = useState(true);
    const [glanceScreen, setGlanceScreen] = useState(true);
    const [nightMode, setNightMode] = useState(false);

    // App settings states
    const [syncSettings, setSyncSettings] = useState(true);
    const [appSettings, setAppSettings] = useState(true);
    const [internetExplorer, setInternetExplorer] = useState(true);
    const [passwords, setPasswords] = useState(false);

    // Accessibility states
    const [screenMagnifier, setScreenMagnifier] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    const tabs = ['system', 'applications'];

    useEffect(() => {
        if (hubRef.current) {
            const tabIndex = tabs.indexOf(activeTab);
            hubRef.current.scrollTo({
                left: tabIndex * hubRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, [activeTab]);

    const handleScroll = () => {
        if (hubRef.current) {
            const scrollPos = hubRef.current.scrollLeft;
            const width = hubRef.current.offsetWidth;
            const newTab = Math.round(scrollPos / width);
            if (tabs[newTab] && tabs[newTab] !== activeTab) {
                setActiveTab(tabs[newTab]);
            }
        }
    };

    // Simple setting item that navigates to a subpage
    const SettingItem = ({ label, description, onClick }) => (
        <div className="wp-setting-item" onClick={onClick} role="button" tabIndex={0}>
            <span className="wp-setting-label">{label}</span>
            {description && <span className="wp-setting-description">{description}</span>}
        </div>
    );

    // Setting item with a toggle
    const SettingToggle = ({ label, description, active, onChange }) => (
        <div className="wp-setting-item wp-setting-with-toggle">
            <div className="wp-setting-info">
                <span className="wp-setting-label">{label}</span>
                {description && <span className="wp-setting-description">{description}</span>}
            </div>
            <Toggle active={active} onChange={onChange} />
        </div>
    );

    const SubPageHeader = ({ title, onBack }) => (
        <div className="wp-subpage-header" onClick={onBack} role="button" tabIndex={0}>
            <BackArrow />
            <span className="wp-subpage-title">{title}</span>
        </div>
    );

    // Main settings hub view
    const renderMainView = () => (
        <div className="wp-settings-hub">
            {/* Hub Tabs */}
            <div className="wp-hub-tabs">
                {tabs.map((tab, index) => (
                    <span
                        key={tab}
                        className={`wp-hub-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Hub Pages */}
            <div className="wp-hub-pages" ref={hubRef} onScroll={handleScroll}>
                {/* System Tab */}
                <div className="wp-hub-page">
                    <div className="wp-settings-list">
                        <SettingItem
                            label="ringtones+sounds"
                            description="ringer, notifications"
                            onClick={() => setCurrentView('sounds')}
                        />
                        <SettingItem
                            label="theme"
                            description="background, accent color"
                            onClick={() => setCurrentView('theme')}
                        />
                        <SettingItem
                            label="email+accounts"
                            description="add, manage accounts"
                            onClick={() => setCurrentView('accounts')}
                        />
                        <SettingItem
                            label="lock screen"
                            description="notifications, background"
                            onClick={() => setCurrentView('lockscreen')}
                        />
                        <SettingItem
                            label="Wi-Fi"
                            description={wifi ? "connected" : "off"}
                            onClick={() => setCurrentView('wifi')}
                        />
                        <SettingItem
                            label="Bluetooth"
                            description={bluetooth ? "on" : "off"}
                            onClick={() => setCurrentView('bluetooth')}
                        />
                        <SettingItem
                            label="tap+send"
                            description="NFC sharing"
                            onClick={() => setCurrentView('nfc')}
                        />
                        <SettingItem
                            label="airplane mode"
                            description={airplane ? "on" : "off"}
                            onClick={() => setCurrentView('airplane')}
                        />
                        <SettingItem
                            label="cellular"
                            description="data connection, SIM"
                            onClick={() => setCurrentView('cellular')}
                        />
                        <SettingItem
                            label="VPN"
                            description={vpn ? "connected" : "off"}
                            onClick={() => setCurrentView('vpn')}
                        />
                        <SettingItem
                            label="backup"
                            description="save stuff to the cloud"
                            onClick={() => setCurrentView('backup')}
                        />
                        <SettingItem
                            label="sync my settings"
                            description="use settings across devices"
                            onClick={() => setCurrentView('sync')}
                        />
                        <SettingItem
                            label="driving mode"
                            description={drivingMode ? "on" : "set up"}
                            onClick={() => setCurrentView('driving')}
                        />
                        <SettingItem
                            label="quiet hours"
                            description={quietHours ? "on" : "turned off"}
                            onClick={() => setCurrentView('quiethours')}
                        />
                        <SettingItem
                            label="location"
                            description={location ? "turned on" : "turned off"}
                            onClick={() => setCurrentView('location')}
                        />
                        <SettingItem
                            label="advertising id"
                            description="turned on"
                            onClick={() => setCurrentView('advertising')}
                        />
                        <SettingItem
                            label="date+time"
                            description="(UTC+05:30) India Standard Time"
                            onClick={() => setCurrentView('datetime')}
                        />
                        <SettingItem
                            label="brightness"
                            description="automatic"
                            onClick={() => setCurrentView('brightness')}
                        />
                        <SettingItem
                            label="rotation lock"
                            description={autoRotate ? "off" : "on"}
                            onClick={() => setCurrentView('rotation')}
                        />
                        <SettingItem
                            label="battery saver"
                            description={batterySaver ? "on" : "off"}
                            onClick={() => setCurrentView('battery')}
                        />
                        <SettingItem
                            label="keyboard"
                            description="languages, suggestions"
                            onClick={() => setCurrentView('keyboard')}
                        />
                        <SettingItem
                            label="language"
                            description="English (India)"
                            onClick={() => setCurrentView('language')}
                        />
                        <SettingItem
                            label="region"
                            description="India"
                            onClick={() => setCurrentView('region')}
                        />
                        <SettingItem
                            label="speech"
                            description="language, text-to-speech"
                            onClick={() => setCurrentView('speech')}
                        />
                        <SettingItem
                            label="ease of access"
                            description="high contrast, screen magnifier"
                            onClick={() => setCurrentView('accessibility')}
                        />
                        <SettingItem
                            label="find my phone"
                            description="locate, ring, erase"
                            onClick={() => setCurrentView('findphone')}
                        />
                        <SettingItem
                            label="kid's corner"
                            description={kidCorner ? "on" : "off"}
                            onClick={() => setCurrentView('kidcorner')}
                        />
                        <SettingItem
                            label="phone update"
                            description="check for updates"
                            onClick={() => setCurrentView('update')}
                        />
                        <SettingItem
                            label="about"
                            description="info, credits"
                            onClick={() => setCurrentView('about')}
                        />
                    </div>
                </div>

                {/* Applications Tab */}
                <div className="wp-hub-page">
                    <div className="wp-settings-list">
                        <SettingItem
                            label="background tasks"
                            description="apps that run in the background"
                            onClick={() => setCurrentView('background')}
                        />
                        <SettingItem
                            label="photos+camera"
                            description="settings, auto upload"
                            onClick={() => setCurrentView('photos')}
                        />
                        <SettingItem
                            label="people"
                            description="filter contacts, import SIM"
                            onClick={() => setCurrentView('people')}
                        />
                        <SettingItem
                            label="phone"
                            description="voicemail number, call settings"
                            onClick={() => setCurrentView('phone')}
                        />
                        <SettingItem
                            label="messaging"
                            description="SMS delivery confirmation"
                            onClick={() => setCurrentView('messaging')}
                        />
                        <SettingItem
                            label="Internet Explorer"
                            description="privacy, favorites"
                            onClick={() => setCurrentView('ie')}
                        />
                        <SettingItem
                            label="maps"
                            description="download maps, location"
                            onClick={() => setCurrentView('maps')}
                        />
                        <SettingItem
                            label="calendar"
                            description="week start, reminders"
                            onClick={() => setCurrentView('calendar')}
                        />
                        <SettingItem
                            label="music+videos"
                            description="Xbox Music"
                            onClick={() => setCurrentView('music')}
                        />
                        <SettingItem
                            label="podcasts"
                            description="download settings"
                            onClick={() => setCurrentView('podcasts')}
                        />
                        <SettingItem
                            label="games"
                            description="Xbox, connect"
                            onClick={() => setCurrentView('games')}
                        />
                        <SettingItem
                            label="store"
                            description="download, updates"
                            onClick={() => setCurrentView('store')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    // Subpages
    const renderSyncView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="sync my settings" onBack={() => setCurrentView('main')} />

            <p className="wp-settings-intro">
                Sync your settings so they're used across your Microsoft devices.
            </p>
            <a href="#" className="wp-settings-link">How does syncing work?</a>

            <div className="wp-settings-list">
                <SettingToggle
                    label="Theme"
                    description={syncSettings ? "On" : "Off"}
                    active={syncSettings}
                    onChange={setSyncSettings}
                />
                <SettingToggle
                    label="App settings"
                    description={appSettings ? "On" : "Off"}
                    active={appSettings}
                    onChange={setAppSettings}
                />
                <SettingToggle
                    label="Internet Explorer"
                    description={internetExplorer ? "On" : "Off"}
                    active={internetExplorer}
                    onChange={setInternetExplorer}
                />
                <SettingToggle
                    label="Passwords"
                    description={passwords ? "On" : "Off"}
                    active={passwords}
                    onChange={setPasswords}
                />
            </div>
        </div>
    );

    const renderThemeView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="theme" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingItem label="Background" description="dark" />
                <SettingItem label="Accent color" description="Choose your color" />

                <div className="wp-theme-picker">
                    {THEME_COLORS.map(color => (
                        <div
                            key={color.value}
                            className={`wp-theme-color ${accentColor === color.value ? 'active' : ''}`}
                            style={{ background: color.value }}
                            title={color.name}
                            onClick={() => setAccentColor(color.value)}
                            role="button"
                            tabIndex={0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    const renderAboutView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="about" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingItem label="phone name" description="Windows Phone" />
                <SettingItem label="model" description="Lumia 925" />
                <SettingItem label="total storage" description="32 GB" />
                <SettingItem label="OS version" description="Windows Phone 8.1" />
                <SettingItem label="firmware revision" description="8.10.15148.160" />
                <SettingItem label="hardware revision" description="1.0.0.0" />
                <SettingItem label="radio software version" description="3.2.04033.1" />
                <SettingItem label="chip SOC version" description="8974" />
            </div>

            <div className="wp-credits-section">
                <h3 className="wp-section-title">credits</h3>

                <div className="wp-credits-card">
                    <p className="wp-credits-intro">This Windows Phone Web Experience was created by:</p>

                    <div className="wp-credits-developer">
                        <h4>Mohit Yadav</h4>
                        <span>Developer & Designer</span>
                    </div>

                    <div className="wp-credits-links">
                        <a
                            href="https://heygeeks.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wp-credits-link"
                        >
                            <span className="wp-link-icon">🌐</span>
                            heygeeks.in
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mohitky2018/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wp-credits-link"
                        >
                            <span className="wp-link-icon">💼</span>
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/HeyGeeks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wp-credits-link"
                        >
                            <span className="wp-link-icon">💻</span>
                            GitHub
                        </a>
                    </div>

                    <p className="wp-credits-footer">Made with ❤️ for Windows Phone fans</p>
                </div>
            </div>
        </div>
    );

    const renderWifiView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="Wi-Fi" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingToggle
                    label="Wi-Fi networking"
                    description={wifi ? "On" : "Off"}
                    active={wifi}
                    onChange={setWifi}
                />
            </div>

            {wifi && (
                <>
                    <h3 className="wp-section-title">available networks</h3>
                    <div className="wp-settings-list">
                        <SettingItem label="Home Network" description="connected" />
                        <SettingItem label="Office WiFi" description="secured" />
                        <SettingItem label="Guest Network" description="open" />
                    </div>
                </>
            )}
        </div>
    );

    const renderBluetoothView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="Bluetooth" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingToggle
                    label="Status"
                    description={bluetooth ? "On and searching" : "Off"}
                    active={bluetooth}
                    onChange={setBluetooth}
                />
            </div>

            <p className="wp-settings-info">
                Bluetooth profiles supported: A2DP, AVRCP, HFP, HSP, PBAP.
                Connect headphones, car kits, and speakers.
            </p>

            {bluetooth && (
                <>
                    <h3 className="wp-section-title">paired devices</h3>
                    <div className="wp-settings-list">
                        <SettingItem label="My Headphones" description="audio" />
                        <SettingItem label="Car Kit" description="hands-free" />
                    </div>
                </>
            )}
        </div>
    );

    const renderLocationView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="location" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingToggle
                    label="Location services"
                    description={location ? "On" : "Off"}
                    active={location}
                    onChange={setLocation}
                />
            </div>

            <p className="wp-settings-info">
                When location is on, apps that have permission can use your location.
            </p>
        </div>
    );

    const renderQuietHoursView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="quiet hours" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingToggle
                    label="Quiet hours"
                    description={quietHours ? "On" : "Off"}
                    active={quietHours}
                    onChange={setQuietHours}
                />
            </div>

            {quietHours && (
                <div className="wp-settings-list">
                    <SettingItem label="Start time" description="11:00 PM" />
                    <SettingItem label="End time" description="7:00 AM" />
                    <SettingItem label="Allow calls from" description="inner circle only" />
                </div>
            )}
        </div>
    );

    const renderBatteryView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="battery saver" onBack={() => setCurrentView('main')} />

            <div className="wp-battery-display">
                <span className="wp-battery-percent">78%</span>
                <span className="wp-battery-time">estimated 14 hours remaining</span>
            </div>

            <div className="wp-settings-list">
                <SettingToggle
                    label="Battery saver"
                    description={batterySaver ? "On now" : "Off"}
                    active={batterySaver}
                    onChange={setBatterySaver}
                />
                <SettingItem
                    label="Turn on when battery is below"
                    description="20%"
                />
            </div>
        </div>
    );

    const renderAccessibilityView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="ease of access" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingToggle
                    label="Screen magnifier"
                    description={screenMagnifier ? "On" : "Off"}
                    active={screenMagnifier}
                    onChange={setScreenMagnifier}
                />
                <SettingToggle
                    label="High contrast"
                    description={highContrast ? "On" : "Off"}
                    active={highContrast}
                    onChange={setHighContrast}
                />
                <SettingItem label="Text size" description="100%" />
            </div>
        </div>
    );

    const renderAccountsView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="email+accounts" onBack={() => setCurrentView('main')} />

            <h3 className="wp-section-title">your accounts</h3>
            <div className="wp-settings-list">
                <SettingItem label="Microsoft account" description="user@outlook.com" />
            </div>

            <h3 className="wp-section-title">add an account</h3>
            <div className="wp-settings-list">
                <SettingItem label="Outlook.com" description="email, calendar, contacts" />
                <SettingItem label="Exchange" description="work email" />
                <SettingItem label="Google" description="email, calendar, contacts" />
                <SettingItem label="iCloud" description="email, contacts" />
            </div>
        </div>
    );

    const renderLockScreenView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="lock screen" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingItem label="Background" description="photo" />
                <SettingItem label="Show artist on lock screen" description="on" />

                <h3 className="wp-section-title">choose an app to show quick status</h3>
                <SettingItem label="Position 1" description="Phone" />
                <SettingItem label="Position 2" description="Messaging" />
                <SettingItem label="Position 3" description="Mail" />
                <SettingItem label="Position 4" description="Calendar" />
                <SettingItem label="Position 5" description="none" />

                <h3 className="wp-section-title">choose an app to show detailed status</h3>
                <SettingItem label="Detailed status" description="Calendar" />
            </div>
        </div>
    );

    const renderFindPhoneView = () => (
        <div className="wp-settings-subpage">
            <SubPageHeader title="find my phone" onBack={() => setCurrentView('main')} />

            <div className="wp-settings-list">
                <SettingToggle
                    label="Find my phone"
                    description="locate, ring, erase"
                    active={location}
                    onChange={setLocation}
                />
            </div>

            <p className="wp-settings-info">
                When enabled, you can locate your phone at windowsphone.com, make it ring, lock it, or erase it remotely.
            </p>
        </div>
    );

    // Simple placeholder views for remaining items
    const renderSimpleView = (title, settings = []) => (
        <div className="wp-settings-subpage">
            <SubPageHeader title={title} onBack={() => setCurrentView('main')} />
            <div className="wp-settings-list">
                {settings.map((s, i) => (
                    <SettingItem key={i} label={s.label} description={s.description} />
                ))}
            </div>
        </div>
    );

    const renderView = () => {
        switch (currentView) {
            case 'sync': return renderSyncView();
            case 'theme': return renderThemeView();
            case 'about': return renderAboutView();
            case 'wifi': return renderWifiView();
            case 'bluetooth': return renderBluetoothView();
            case 'location': return renderLocationView();
            case 'quiethours': return renderQuietHoursView();
            case 'battery': return renderBatteryView();
            case 'accessibility': return renderAccessibilityView();
            case 'accounts': return renderAccountsView();
            case 'lockscreen': return renderLockScreenView();
            case 'findphone': return renderFindPhoneView();
            case 'sounds': return renderSimpleView('ringtones+sounds', [
                { label: 'Ringer', description: 'on' },
                { label: 'Vibrate', description: 'on' },
                { label: 'Ringtone', description: 'Windows Phone' },
                { label: 'Text tone', description: 'default' }
            ]);
            case 'airplane': return renderSimpleView('airplane mode', [
                { label: 'Status', description: airplane ? 'on' : 'off' }
            ]);
            case 'cellular': return renderSimpleView('cellular', [
                { label: 'Data connection', description: 'on' },
                { label: 'Data roaming options', description: 'don\'t roam' },
                { label: 'SIM security', description: 'off' }
            ]);
            case 'datetime': return renderSimpleView('date+time', [
                { label: 'Set automatically', description: 'on' },
                { label: 'Time zone', description: '(UTC+05:30) India Standard Time' },
                { label: '24-hour clock', description: 'off' }
            ]);
            case 'brightness': return renderSimpleView('brightness', [
                { label: 'Automatically adjust', description: 'on' },
                { label: 'Level', description: 'medium' }
            ]);
            default: return renderMainView();
        }
    };

    return (
        <AppShell title="settings" hideTitle={currentView === 'main'}>
            {renderView()}
        </AppShell>
    );
}
