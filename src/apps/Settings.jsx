import { useState, useMemo } from 'react';
import { AppShell } from '../components/AppShell';
import { Toggle } from '../components/Toggle';
import { useTheme, THEME_COLORS } from '../context/ThemeContext';
import './Settings.css';

// Icons
const Icons = {
    System: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /></svg>, // Simple list icon placeholder
    Devices: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" /></svg>,
    Network: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>,
    Personalization: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>,
    Accounts: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>,
    Time: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>,
    Access: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" /></svg>,
    Privacy: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>,
    Update: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.51-3.47-3.51-9.11 0-12.58 3.51-3.47 9.14-3.47 12.65 0l3.65-3.69V10.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z" /></svg>,
    Apps: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" /></svg>,
    Search: () => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>,
    Back: () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
};

export function Settings() {
    const { accentColor, setAccentColor } = useTheme();
    const [viewStack, setViewStack] = useState(['main']); // Stack-based navigation
    const [searchQuery, setSearchQuery] = useState('');

    // System/Phone states
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(false);
    const [airplane, setAirplane] = useState(false);
    const [location, setLocation] = useState(true);
    const [quietHours, setQuietHours] = useState(false);
    const [drivingMode, setDrivingMode] = useState(false);
    const [batterySaver, setBatterySaver] = useState(false);
    const [kidCorner, setKidCorner] = useState(false);

    // Display states
    const [brightness, setBrightness] = useState(70);
    const [autoRotate, setAutoRotate] = useState(true);

    // App settings states
    const [syncSettings, setSyncSettings] = useState(true);
    const [appSettingsState, setAppSettings] = useState(true);
    const [internetExplorer, setInternetExplorer] = useState(true);
    const [passwords, setPasswords] = useState(false);

    // Accessibility states
    const [screenMagnifier, setScreenMagnifier] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    const currentView = viewStack[viewStack.length - 1];

    const navigateTo = (viewId) => {
        setViewStack([...viewStack, viewId]);
        setSearchQuery(''); // Clear search on nav
    };

    const navigateBack = () => {
        if (viewStack.length > 1) {
            setViewStack(viewStack.slice(0, -1));
        }
    };

    // --- Components ---

    const SearchBar = () => (
        <div className="w10-search-container">
            <div className="w10-search-box">
                <input
                    type="text"
                    placeholder="Find a setting"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w10-search-input"
                />
                <div className="w10-search-icon">
                    <Icons.Search />
                </div>
            </div>
        </div>
    );

    const SettingItem = ({ label, description, onClick }) => (
        <div className="w10-setting-item" onClick={onClick} role="button" tabIndex={0}>
            <div className="w10-setting-content">
                <span className="w10-setting-label">{label}</span>
                {description && <span className="w10-setting-description">{description}</span>}
            </div>
        </div>
    );

    const SettingToggle = ({ label, description, active, onChange }) => (
        <div className="w10-setting-item w10-setting-with-toggle">
            <div className="w10-setting-content">
                <span className="w10-setting-label">{label}</span>
                {description && <span className="w10-setting-description">{description}</span>}
            </div>
            <Toggle active={active} onChange={onChange} />
        </div>
    );

    const PageHeader = ({ title }) => (
        <div className="w10-page-header">
            <button className="w10-back-button" onClick={navigateBack}>
                <Icons.Back />
            </button>
            <h2 className="w10-page-title">{title}</h2>
        </div>
    );

    // --- Data Structure ---

    // Define all settings linearly for search flatten, but structured for categories
    const allSettings = useMemo(() => [
        // System
        { id: 'display', label: 'Display', description: 'Orientation, brightness', category: 'System', view: 'display' },
        { id: 'notifications', label: 'Notifications & actions', description: 'Quick actions, alerts', category: 'System', view: 'notifications' },
        { id: 'phone', label: 'Phone', description: 'Voicemail, SIM', category: 'System', view: 'phone' },
        { id: 'messaging', label: 'Messaging', description: 'SMS settings', category: 'System', view: 'messaging' },
        { id: 'battery', label: 'Battery Saver', description: 'Battery usage', category: 'System', view: 'battery' },
        { id: 'storage', label: 'Storage', description: 'Device, SD card', category: 'System', view: 'storage' },
        { id: 'maps', label: 'Offline maps', description: 'Download maps', category: 'System', view: 'maps' },
        { id: 'about', label: 'About', description: 'Device info', category: 'System', view: 'about' },

        // Devices
        { id: 'bluetooth', label: 'Bluetooth', description: bluetooth ? 'On' : 'Off', category: 'Devices', view: 'bluetooth' },
        { id: 'nfc', label: 'NFC', description: 'Tap to pay/send', category: 'Devices', view: 'nfc' },
        { id: 'camera', label: 'Camera', description: 'Photos, video', category: 'Devices', view: 'photos' },

        // Network
        { id: 'wifi', label: 'Wi-Fi', description: wifi ? 'Connected' : 'Off', category: 'Network & wireless', view: 'wifi' },
        { id: 'cellular', label: 'Cellular & SIM', description: 'Data connection', category: 'Network & wireless', view: 'cellular' },
        { id: 'airplane', label: 'Airplane mode', description: airplane ? 'On' : 'Off', category: 'Network & wireless', view: 'airplane' },
        { id: 'vpn', label: 'VPN', description: 'Add a VPN connection', category: 'Network & wireless', view: 'vpn' },

        // Personalization
        { id: 'customization', label: 'Personalization', description: 'Background, lock screen, colors', category: 'Personalization', view: 'theme' },
        { id: 'sounds', label: 'Sounds', description: 'Ringtones, system sounds', category: 'Personalization', view: 'sounds' },

        // Accounts
        { id: 'accounts', label: 'Email & app accounts', description: 'Add accounts', category: 'Accounts', view: 'accounts' },
        { id: 'sync', label: 'Sync your settings', description: 'Theme, passwords', category: 'Accounts', view: 'sync' },
        { id: 'kidcorner', label: 'Kid\'s Corner', description: 'Set up for kids', category: 'Accounts', view: 'kidcorner' },

        // Time
        { id: 'datetime', label: 'Date & time', description: 'Time zone, region', category: 'Time & language', view: 'datetime' },
        { id: 'region', label: 'Region', description: 'Country/region', category: 'Time & language', view: 'region' },
        { id: 'keyboard', label: 'Keyboard', description: 'Keyboards, typing', category: 'Time & language', view: 'keyboard' },
        { id: 'speech', label: 'Speech', description: 'Voice, text-to-speech', category: 'Time & language', view: 'speech' },

        // Ease of Access
        { id: 'accessibility', label: 'Ease of Access', description: 'Narrator, magnifier, high contrast', category: 'Ease of Access', view: 'accessibility' },

        // Privacy
        { id: 'location', label: 'Location', description: location ? 'On' : 'Off', category: 'Privacy', view: 'location' },
        { id: 'advertising', label: 'Advertising ID', description: 'Reset ID', category: 'Privacy', view: 'advertising' },

        // Update
        { id: 'update', label: 'Phone update', description: 'Check for updates', category: 'Update & security', view: 'update' },
        { id: 'backup', label: 'Backup', description: 'Device, apps', category: 'Update & security', view: 'backup' },
        { id: 'findphone', label: 'Find my phone', description: 'Locate, erase', category: 'Update & security', view: 'findphone' },

    ], [wifi, bluetooth, airplane, location]);

    const categories = [
        { id: 'System', label: 'System', icon: Icons.System, description: 'Display, notifications, battery' },
        { id: 'Devices', label: 'Devices', icon: Icons.Devices, description: 'Bluetooth, NFC, camera' },
        { id: 'Network & wireless', label: 'Network & wireless', icon: Icons.Network, description: 'Wi-Fi, airplane mode, VPN' },
        { id: 'Personalization', label: 'Personalization', icon: Icons.Personalization, description: 'Background, lock screen, colors' },
        { id: 'Accounts', label: 'Accounts', icon: Icons.Accounts, description: 'Email, sync, user info' },
        { id: 'Time & language', label: 'Time & language', icon: Icons.Time, description: 'Speech, region, date' },
        { id: 'Ease of Access', label: 'Ease of Access', icon: Icons.Access, description: 'Narrator, magnifier, high contrast' },
        { id: 'Privacy', label: 'Privacy', icon: Icons.Privacy, description: 'Location, camera' },
        { id: 'Update & security', label: 'Update & security', icon: Icons.Update, description: 'Windows Update, backup' },
    ];

    // --- Detail Views ---

    const renderThemeView = () => (
        <div className="w10-subpage">
            <PageHeader title="Personalization" />
            <div className="w10-section-header">Colors</div>
            <div className="w10-group">
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
                <div className="w10-description-text">
                    Choose your accent color. This color will appear on your Start screen and in apps.
                </div>
            </div>
            <div className="w10-section-header">Lock Screen</div>
            <div className="w10-group">
                <SettingItem label="Background" description="My Picture" />
                <SettingItem label="Choose an app to show detailed status" description="Calendar" />
            </div>
        </div>
    );

    const renderWifiView = () => (
        <div className="w10-subpage">
            <PageHeader title="Wi-Fi" />
            <div className="w10-group">
                <SettingToggle
                    label="Wi-Fi networking"
                    description={wifi ? "On" : "Off"}
                    active={wifi}
                    onChange={setWifi}
                />
            </div>
            {wifi && (
                <>
                    <div className="w10-section-header">Available networks</div>
                    <div className="w10-group">
                        <SettingItem label="Home Network" description="Connected, Secured" />
                        <SettingItem label="Office WiFi" description="Secured" />
                        <SettingItem label="Starbucks" description="Open" />
                    </div>
                </>
            )}
        </div>
    );

    const renderBluetoothView = () => (
        <div className="w10-subpage">
            <PageHeader title="Bluetooth" />
            <div className="w10-group">
                <SettingToggle
                    label="Status"
                    description={bluetooth ? "On" : "Off"}
                    active={bluetooth}
                    onChange={setBluetooth}
                />
            </div>
            <div className="w10-description-text">
                Bluetooth is {bluetooth ? 'searching for devices...' : 'off'}.
            </div>
        </div>
    );

    const renderBatteryView = () => (
        <div className="w10-subpage">
            <PageHeader title="Battery Saver" />
            <div className="w10-battery-status">
                <div className="w10-battery-percent">78%</div>
                <div className="w10-battery-detail">Estimated 14 hours remaining</div>
            </div>
            <div className="w10-group">
                <SettingToggle
                    label="Battery Saver status"
                    description={batterySaver ? "On" : "Off"}
                    active={batterySaver}
                    onChange={setBatterySaver}
                />
            </div>
        </div>
    );

    const renderAboutView = () => (
        <div className="w10-subpage">
            <PageHeader title="About" />
            <div className="w10-group">
                <SettingItem label="Device name" description="Windows Phone" />
                <SettingItem label="Model" description="Lumia 950 XL" />
                <SettingItem label="Version" description="1709" />
                <SettingItem label="OS build" description="10.0.15254.1" />
                <SettingItem label="RAM" description="3 GB" />
            </div>
            <div className="w10-credits">
                <h3>Credits</h3>
                <p>Developed by Mohit Yadav</p>
                <div className="w10-links">
                    <a href="https://heygeeks.in/" target="_blank">heygeeks.in</a>
                    <a href="https://github.com/HeyGeeks" target="_blank">GitHub</a>
                </div>
            </div>
        </div>
    );

    const renderSyncView = () => (
        <div className="w10-subpage">
            <PageHeader title="Sync your settings" />
            <div className="w10-description-text">
                Sync settings across your Windows devices using your Microsoft account.
            </div>
            <div className="w10-group">
                <SettingToggle label="Sync settings" description={syncSettings ? "On" : "Off"} active={syncSettings} onChange={setSyncSettings} />
                <SettingToggle label="Theme" description={appSettingsState ? "On" : "Off"} active={appSettingsState} onChange={setAppSettings} />
                <SettingToggle label="Passwords" description={passwords ? "On" : "Off"} active={passwords} onChange={setPasswords} />
            </div>
        </div>
    );

    // Generic simple view for implemented placeholders
    const SimpleView = ({ title, items = [] }) => (
        <div className="w10-subpage">
            <PageHeader title={title} />
            <div className="w10-group">
                {items.map((item, i) => (
                    item.type === 'toggle'
                        ? <SettingToggle key={i} label={item.label} description={item.desc} active={item.val} onChange={item.set} />
                        : <SettingItem key={i} label={item.label} description={item.desc} />
                ))}
            </div>
        </div>
    );

    // Dynamic renderer
    const renderContent = () => {
        if (currentView === 'main') {
            const filteredSettings = searchQuery
                ? allSettings.filter(s =>
                    s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
                : [];

            if (searchQuery) {
                return (
                    <div className="w10-home">
                        <div className="w10-home-header">Settings</div>
                        <SearchBar />
                        <div className="w10-search-results-list">
                            {filteredSettings.length > 0 ? (
                                filteredSettings.map(setting => (
                                    <div key={setting.id} className="w10-category-item" onClick={() => navigateTo(setting.view)}>
                                        <div className="w10-category-icon-small">
                                            {categories.find(c => c.label === setting.category)?.icon() || <Icons.System />}
                                        </div>
                                        <div className="w10-category-text">
                                            <div className="w10-cat-title">{setting.label}</div>
                                            <div className="w10-cat-desc">{setting.category}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="w10-no-results">No results for "{searchQuery}"</div>
                            )}
                        </div>
                    </div>
                );
            }

            return (
                <div className="w10-home">
                    <div className="w10-home-header">Settings</div>
                    <SearchBar />
                    <div className="w10-categories-list">
                        {categories.map(cat => (
                            <div key={cat.id} className="w10-category-item" onClick={() => navigateTo(`CAT:${cat.id}`)}>
                                <div className="w10-category-icon">
                                    <cat.icon />
                                </div>
                                <div className="w10-category-text">
                                    <div className="w10-cat-title">{cat.label}</div>
                                    <div className="w10-cat-desc">{cat.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Handle Category Views (CAT:Prefix)
        if (currentView.startsWith('CAT:')) {
            const catId = currentView.split(':')[1];
            const catSettings = allSettings.filter(s => s.category === catId);

            return (
                <div className="w10-subpage">
                    <PageHeader title={catId} />
                    <div className="w10-group">
                        {catSettings.map(s => (
                            <SettingItem
                                key={s.id}
                                label={s.label}
                                description={s.description}
                                onClick={() => navigateTo(s.view)}
                            />
                        ))}
                    </div>
                </div>
            );
        }

        // Handle Leaf Views
        switch (currentView) {
            case 'theme': return renderThemeView();
            case 'wifi': return renderWifiView();
            case 'bluetooth': return renderBluetoothView();
            case 'battery': return renderBatteryView();
            case 'about': return renderAboutView();
            case 'sync': return renderSyncView();
            case 'airplane': return <SimpleView title="Airplane Mode" items={[
                { type: 'toggle', label: 'Airplane Mode', desc: airplane ? "On" : "Off", val: airplane, set: setAirplane }
            ]} />;
            case 'location': return <SimpleView title="Location" items={[
                { type: 'toggle', label: 'Location service', desc: location ? "On" : "Off", val: location, set: setLocation }
            ]} />;
            case 'display': return <SimpleView title="Display" items={[
                { label: 'Brightness level', desc: `${brightness}%` },
                { type: 'toggle', label: 'Rotation lock', desc: autoRotate ? "On" : "Off", val: autoRotate, set: setAutoRotate }
            ]} />;
            case 'notifications': return <SimpleView title="Notifications" items={[
                { label: 'Show notifications on lock screen', desc: 'On' },
                { label: 'Show clear all button', desc: 'On' }
            ]} />;
            case 'accessibility': return <SimpleView title="Ease of Access" items={[
                { type: 'toggle', label: 'High Contrast', desc: highContrast ? "On" : "Off", val: highContrast, set: setHighContrast },
                { type: 'toggle', label: 'Screen Magnifier', desc: screenMagnifier ? "On" : "Off", val: screenMagnifier, set: setScreenMagnifier },
                { label: 'Text size', desc: '100%' }
            ]} />;
            // Default fallthrough for views not explicitly built yet
            default: return <SimpleView title="Settings" items={[{ label: 'Setting detail', desc: 'Not implemented yet' }]} />;
        }
    };

    return (
        <AppShell title="settings" hideTitle={true}>
            <div className="w10-settings-root">
                {renderContent()}
            </div>
        </AppShell>
    );
}
