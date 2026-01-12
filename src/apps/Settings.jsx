import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { Toggle } from '../components/Toggle';
import { Icon } from '../components/Icons';
import { useTheme, THEME_COLORS } from '../context/ThemeContext';
import './Settings.css';

const defaultSettings = {
    wifi: true, bluetooth: false, airplane: false, location: true,
    mobileData: true, internetSharing: false, vpn: false, batterySaver: false,
    rotationLock: false, quietHours: false, drivingMode: false,
    nfc: true, autoUpdate: true, updateOnWifi: true,
    syncTheme: false, syncApps: true, syncIE: true, syncPasswords: false,
    autoDatetime: true, set24hour: false,
    keyboardSuggestions: true, keyboardAutocorrect: true, keyboardSwipe: true,
    speechRecognition: true, readAloud: false,
    highContrast: false, screenMagnifier: false, narrator: false,
    msgDeliveryConfirm: true, msgGroupText: true,
    photoLocation: true, photoAutoUpload: false,
    contactSync: true, contactFacebook: false,
    notifyMessaging: true, notifyPhone: true, notifyStore: true, notifyMail: true,
    ringerVibrate: true, notificationSounds: true, keyboardSounds: false,
    bgCalendar: true, bgMail: true, bgWeather: true
};

export function Settings() {
    const { accentColor, setAccentColor, theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('system');
    const [view, setView] = useState('main');
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('wp-settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem('wp-settings', JSON.stringify(settings));
    }, [settings]);

    const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

    const systemSettings = [
        { id: 'wifi', label: 'WiFi', desc: settings.wifi ? 'connected' : 'off' },
        { id: 'airplane', label: 'flight mode', desc: settings.airplane ? 'on' : 'off' },
        { id: 'bluetooth', label: 'Bluetooth', desc: settings.bluetooth ? 'on' : 'off' },
        { id: 'cellular', label: 'mobile+SIM', desc: settings.mobileData ? 'data on' : 'data off' },
        { id: 'sharing', label: 'internet sharing', desc: settings.internetSharing ? 'on' : 'off' },
        { id: 'vpn', label: 'VPN', desc: settings.vpn ? 'connected' : 'not connected' },
        { id: 'battery', label: 'battery saver', desc: '78% remaining' },
        { id: 'theme', label: 'start+theme', desc: 'background, accent colour' },
        { id: 'lock', label: 'lock screen', desc: 'notifications, background' },
        { id: 'notifications', label: 'notifications+actions', desc: 'quick actions, app notifications' },
        { id: 'location', label: 'location', desc: settings.location ? 'on' : 'off' },
        { id: 'storage', label: 'storage sense', desc: 'phone storage' },
        { id: 'datetime', label: 'date+time', desc: 'automatic' },
        { id: 'about', label: 'about', desc: 'device info' },
    ];

    const appSettings = [
        { id: 'background', label: 'background tasks', desc: 'manage app permissions' },
        { id: 'photos', label: 'photos+camera', desc: 'camera settings' },
        { id: 'people', label: 'people', desc: 'contacts sync' },
        { id: 'messaging', label: 'messaging', desc: 'SMS settings' },
        { id: 'phone', label: 'phone', desc: 'call settings' },
        { id: 'email', label: 'email+accounts', desc: 'manage accounts' },
        { id: 'ringtones', label: 'ringtones+sounds', desc: 'notification sounds' },
        { id: 'keyboard', label: 'keyboard', desc: 'typing settings' },
        { id: 'speech', label: 'speech', desc: 'voice recognition' },
        { id: 'ease', label: 'ease of access', desc: 'accessibility' },
        { id: 'sync', label: 'sync my settings', desc: 'sync across devices' },
        { id: 'store', label: 'store', desc: 'app updates' },
    ];

    const BackButton = () => (
        <button className="wp-back-btn" onClick={() => setView('main')}>
            <Icon name="back" size={20} />
        </button>
    );

    const ToggleRow = ({ label, value, onChange, desc }) => (
        <div className="wp-toggle-section">
            <div className="wp-toggle-row">
                <div className="wp-toggle-info">
                    <span className="wp-toggle-label">{label}</span>
                    {desc && <span className="wp-toggle-desc">{desc}</span>}
                </div>
                <div className="wp-toggle-state">
                    <span className="wp-toggle-value">{value ? 'On' : 'Off'}</span>
                    <Toggle active={value} onChange={onChange} />
                </div>
            </div>
        </div>
    );

    const renderMain = () => (
        <div className="wp-settings">
            <div className="wp-settings-header">
                <span className="wp-settings-label">SETTINGS</span>
                <div className="wp-pivot-tabs">
                    <button className={`wp-pivot-tab ${activeTab === 'system' ? 'active' : ''}`}
                        onClick={() => setActiveTab('system')}>system</button>
                    <button className={`wp-pivot-tab ${activeTab === 'applications' ? 'active' : ''}`}
                        onClick={() => setActiveTab('applications')}>applications</button>
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

    const renderWifi = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">WiFi</h2>
            <ToggleRow label="WiFi networking" value={settings.wifi} onChange={() => toggle('wifi')} />
            {settings.wifi && (
                <>
                    <div className="wp-searching">
                        <span className="wp-searching-text">searching</span>
                        <span className="wp-searching-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></span>
                    </div>
                    <div className="wp-wifi-list">
                        <div className="wp-wifi-item connected">
                            <div className="wp-wifi-signal">
                                <Icon name="wifi" size={24} />
                            </div>
                            <div className="wp-wifi-info">
                                <span className="wp-wifi-name">Home Network</span>
                                <span className="wp-wifi-status">connected</span>
                            </div>
                        </div>
                        <div className="wp-wifi-item">
                            <div className="wp-wifi-signal">
                                <Icon name="wifi" size={24} />
                            </div>
                            <div className="wp-wifi-info">
                                <span className="wp-wifi-name">Office WiFi</span>
                                <span className="wp-wifi-status">secured</span>
                            </div>
                        </div>
                        <div className="wp-wifi-item">
                            <div className="wp-wifi-signal">
                                <Icon name="wifi" size={24} />
                            </div>
                            <div className="wp-wifi-info">
                                <span className="wp-wifi-name">Guest Network</span>
                                <span className="wp-wifi-status">open</span>
                            </div>
                        </div>
                        <div className="wp-wifi-item">
                            <div className="wp-wifi-signal">
                                <Icon name="wifi" size={24} />
                            </div>
                            <div className="wp-wifi-info">
                                <span className="wp-wifi-name">Cafe_Free</span>
                                <span className="wp-wifi-status">open</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {!settings.wifi && <p className="wp-settings-desc">Turn on WiFi to see available networks</p>}
        </div>
    );

    const renderBluetooth = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">Bluetooth</h2>
            <ToggleRow label="Status" value={settings.bluetooth} onChange={() => toggle('bluetooth')} />
            {settings.bluetooth && (
                <>
                    <div className="wp-searching">
                        <span className="wp-searching-text">searching</span>
                        <span className="wp-searching-dots"><span>.</span><span>.</span><span>.</span><span>.</span><span>.</span></span>
                    </div>
                    <p className="wp-section-header">paired devices</p>
                    <div className="wp-device-list">
                        <div className="wp-device-item">
                            <div className="wp-device-icon">🎧</div>
                            <div className="wp-device-info">
                                <span className="wp-device-name">Wireless Headphones</span>
                                <span className="wp-device-status">connected</span>
                            </div>
                        </div>
                        <div className="wp-device-item">
                            <div className="wp-device-icon">⌨️</div>
                            <div className="wp-device-info">
                                <span className="wp-device-name">Bluetooth Keyboard</span>
                                <span className="wp-device-status">paired</span>
                            </div>
                        </div>
                    </div>
                    <p className="wp-section-header">other devices</p>
                    <div className="wp-device-list">
                        <div className="wp-device-item">
                            <div className="wp-device-icon">📱</div>
                            <div className="wp-device-info">
                                <span className="wp-device-name">iPhone</span>
                                <span className="wp-device-status">available</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {!settings.bluetooth && <p className="wp-settings-desc">Turn on Bluetooth to connect to devices</p>}
        </div>
    );

    const renderAirplane = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">flight mode</h2>
            <ToggleRow label="Status" value={settings.airplane} onChange={() => toggle('airplane')} />
            <p className="wp-settings-desc">Turn on flight mode to stop wireless communication</p>
        </div>
    );

    const renderCellular = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">mobile+SIM</h2>
            <ToggleRow label="Data connection" value={settings.mobileData} onChange={() => toggle('mobileData')} />
            <div className="wp-info-section">
                <div className="wp-info-item"><span>SIM</span><span>Carrier - 4G</span></div>
                <div className="wp-info-item"><span>Phone number</span><span>+1 234 567 8900</span></div>
            </div>
        </div>
    );

    const renderSharing = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">internet sharing</h2>
            <ToggleRow label="Sharing" value={settings.internetSharing} onChange={() => toggle('internetSharing')}
                desc="Share your mobile data connection over WiFi" />
            {settings.internetSharing && (
                <div className="wp-info-section">
                    <div className="wp-info-item"><span>Network name</span><span>Windows Phone</span></div>
                    <div className="wp-info-item"><span>Password</span><span>********</span></div>
                </div>
            )}
        </div>
    );

    const renderVpn = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">VPN</h2>
            <ToggleRow label="Status" value={settings.vpn} onChange={() => toggle('vpn')} />
            <button className="wp-action-btn">+ add a VPN connection</button>
        </div>
    );

    const renderBattery = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">battery saver</h2>
            <div className="wp-battery-display">
                <div className="wp-battery-percent">78%</div>
                <div className="wp-battery-time">estimated time remaining: 14 hours</div>
            </div>
            <div className="wp-battery-bar"><div className="wp-battery-fill" style={{ width: '78%' }} /></div>
            <ToggleRow label="Battery saver" value={settings.batterySaver} onChange={() => toggle('batterySaver')}
                desc="Conserve battery by limiting background activity" />
            <p className="wp-section-header">Battery usage</p>
            <div className="wp-usage-list">
                <div className="wp-usage-item"><span>Display</span><span>42%</span></div>
                <div className="wp-usage-item"><span>System</span><span>18%</span></div>
                <div className="wp-usage-item"><span>WiFi</span><span>12%</span></div>
                <div className="wp-usage-item"><span>Phone</span><span>8%</span></div>
            </div>
        </div>
    );

    const renderTheme = () => (
        <div className="wp-settings-page">
            <BackButton />
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
                        <button key={color.value} className={`wp-accent-color ${accentColor === color.value ? 'active' : ''}`}
                            style={{ background: color.value }} onClick={() => setAccentColor(color.value)} title={color.name} />
                    ))}
                </div>
            </div>
        </div>
    );

    const renderLock = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">lock screen</h2>
            <p className="wp-settings-desc">Choose apps to show notifications on your lock screen</p>
            <div className="wp-notification-slots">
                {['detailed status', 'quick status 1', 'quick status 2', 'quick status 3', 'quick status 4'].map((slot, i) => (
                    <div key={i} className="wp-notification-slot">
                        <span>{slot}</span><span className="wp-slot-icon">+</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderNotifications = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">notifications+actions</h2>
            <p className="wp-section-header">Show notifications from these apps</p>
            <ToggleRow label="Messaging" value={settings.notifyMessaging} onChange={() => toggle('notifyMessaging')}
                desc="Banners, Sounds, Vibrations" />
            <ToggleRow label="Phone" value={settings.notifyPhone} onChange={() => toggle('notifyPhone')}
                desc="Banners, Sounds, Vibrations" />
            <ToggleRow label="Store" value={settings.notifyStore} onChange={() => toggle('notifyStore')} desc="On" />
            <ToggleRow label="Mail" value={settings.notifyMail} onChange={() => toggle('notifyMail')} desc="On" />
        </div>
    );

    const renderLocation = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">location</h2>
            <ToggleRow label="Location services" value={settings.location} onChange={() => toggle('location')} />
            <p className="wp-settings-desc">Apps that have permission to use your location will appear here</p>
        </div>
    );

    const renderStorage = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">storage sense</h2>
            <div className="wp-storage-display">
                <div className="wp-storage-header">Phone</div>
                <div className="wp-storage-bar">
                    <div className="wp-storage-used" style={{ width: '45%' }}></div>
                </div>
                <div className="wp-storage-info">14.4 GB used of 32 GB</div>
            </div>
            <div className="wp-usage-list">
                <div className="wp-usage-item"><span>Apps+games</span><span>8.2 GB</span></div>
                <div className="wp-usage-item"><span>Photos</span><span>3.1 GB</span></div>
                <div className="wp-usage-item"><span>Music+videos</span><span>2.4 GB</span></div>
                <div className="wp-usage-item"><span>System</span><span>0.7 GB</span></div>
            </div>
        </div>
    );

    const renderDatetime = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">date+time</h2>
            <ToggleRow label="Set date and time automatically" value={settings.autoDatetime} onChange={() => toggle('autoDatetime')} />
            <ToggleRow label="24-hour clock" value={settings.set24hour} onChange={() => toggle('set24hour')} />
            <div className="wp-info-section">
                <div className="wp-info-item"><span>Time zone</span><span>(UTC+05:30) Chennai, Kolkata</span></div>
            </div>
        </div>
    );

    const renderAbout = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">about</h2>
            <div className="wp-about-info">
                <div className="wp-about-item"><span>phone name</span><span>Windows Phone</span></div>
                <div className="wp-about-item"><span>software</span><span>Windows Phone 8.1</span></div>
                <div className="wp-about-item"><span>os version</span><span>8.10.14219.341</span></div>
                <div className="wp-about-item"><span>firmware revision</span><span>02540.00019.15053.36002</span></div>
                <div className="wp-about-item"><span>total storage</span><span>32 GB</span></div>
                <div className="wp-about-item"><span>available storage</span><span>24.5 GB</span></div>
                <div className="wp-about-item wp-about-credits"><span>created by</span><span>Mohit Yadav - HeyGeeks</span></div>
            </div>
        </div>
    );

    const renderBackground = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">background tasks</h2>
            <p className="wp-settings-desc">Apps allowed to run in the background</p>
            <ToggleRow label="Calendar" value={settings.bgCalendar} onChange={() => toggle('bgCalendar')} />
            <ToggleRow label="Mail" value={settings.bgMail} onChange={() => toggle('bgMail')} />
            <ToggleRow label="Weather" value={settings.bgWeather} onChange={() => toggle('bgWeather')} />
        </div>
    );

    const renderPhotos = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">photos+camera</h2>
            <ToggleRow label="Include location info" value={settings.photoLocation} onChange={() => toggle('photoLocation')}
                desc="Add location to photos" />
            <ToggleRow label="Auto upload" value={settings.photoAutoUpload} onChange={() => toggle('photoAutoUpload')}
                desc="Upload photos to OneDrive" />
        </div>
    );

    const renderPeople = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">people</h2>
            <ToggleRow label="Sync contacts" value={settings.contactSync} onChange={() => toggle('contactSync')} />
            <ToggleRow label="Facebook contacts" value={settings.contactFacebook} onChange={() => toggle('contactFacebook')}
                desc="Show Facebook friends in contacts" />
        </div>
    );

    const renderMessaging = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">messaging</h2>
            <ToggleRow label="SMS delivery confirmation" value={settings.msgDeliveryConfirm} onChange={() => toggle('msgDeliveryConfirm')} />
            <ToggleRow label="Group text" value={settings.msgGroupText} onChange={() => toggle('msgGroupText')}
                desc="Send single message to a group" />
        </div>
    );

    const renderPhone = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">phone</h2>
            <div className="wp-info-section">
                <div className="wp-info-item"><span>My phone number</span><span>+1 234 567 8900</span></div>
                <div className="wp-info-item"><span>Voicemail number</span><span>+1 234 567 8901</span></div>
            </div>
            <button className="wp-action-btn">call forwarding</button>
            <button className="wp-action-btn">caller ID</button>
        </div>
    );

    const renderEmail = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">email+accounts</h2>
            <div className="wp-account-list">
                <div className="wp-account-item">
                    <div className="wp-account-icon" style={{ background: '#0078d4' }}>M</div>
                    <div className="wp-account-info"><span>Microsoft account</span><span>user@outlook.com</span></div>
                </div>
            </div>
            <button className="wp-action-btn">+ add an account</button>
        </div>
    );

    const renderRingtones = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">ringtones+sounds</h2>
            <ToggleRow label="Vibrate" value={settings.ringerVibrate} onChange={() => toggle('ringerVibrate')} />
            <ToggleRow label="Notification sounds" value={settings.notificationSounds} onChange={() => toggle('notificationSounds')} />
            <ToggleRow label="Key press sounds" value={settings.keyboardSounds} onChange={() => toggle('keyboardSounds')} />
        </div>
    );

    const renderKeyboard = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">keyboard</h2>
            <ToggleRow label="Suggest text" value={settings.keyboardSuggestions} onChange={() => toggle('keyboardSuggestions')} />
            <ToggleRow label="Autocorrect" value={settings.keyboardAutocorrect} onChange={() => toggle('keyboardAutocorrect')} />
            <ToggleRow label="Swipe typing" value={settings.keyboardSwipe} onChange={() => toggle('keyboardSwipe')} />
        </div>
    );

    const renderSpeech = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">speech</h2>
            <ToggleRow label="Speech recognition" value={settings.speechRecognition} onChange={() => toggle('speechRecognition')} />
            <ToggleRow label="Read aloud" value={settings.readAloud} onChange={() => toggle('readAloud')}
                desc="Read incoming messages" />
        </div>
    );

    const renderEase = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">ease of access</h2>
            <ToggleRow label="High contrast" value={settings.highContrast} onChange={() => toggle('highContrast')} />
            <ToggleRow label="Screen magnifier" value={settings.screenMagnifier} onChange={() => toggle('screenMagnifier')} />
            <ToggleRow label="Narrator" value={settings.narrator} onChange={() => toggle('narrator')}
                desc="Screen reader" />
        </div>
    );

    const renderSync = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">sync my settings</h2>
            <p className="wp-settings-desc">Sync your settings so they're used across your Microsoft devices.</p>
            <ToggleRow label="Theme" value={settings.syncTheme} onChange={() => toggle('syncTheme')} />
            <ToggleRow label="App settings" value={settings.syncApps} onChange={() => toggle('syncApps')} />
            <ToggleRow label="Internet Explorer" value={settings.syncIE} onChange={() => toggle('syncIE')} />
            <ToggleRow label="Passwords" value={settings.syncPasswords} onChange={() => toggle('syncPasswords')} />
        </div>
    );

    const renderStore = () => (
        <div className="wp-settings-page">
            <BackButton />
            <h2 className="wp-settings-page-title">store</h2>
            <p className="wp-section-header">App updates</p>
            <ToggleRow label="Update apps automatically" value={settings.autoUpdate} onChange={() => toggle('autoUpdate')} />
            <ToggleRow label="Only get updates over Wi-Fi" value={settings.updateOnWifi} onChange={() => toggle('updateOnWifi')} />
            <button className="wp-action-btn">check for updates</button>
        </div>
    );

    const views = {
        main: renderMain, wifi: renderWifi, bluetooth: renderBluetooth, airplane: renderAirplane,
        cellular: renderCellular, sharing: renderSharing, vpn: renderVpn, battery: renderBattery,
        theme: renderTheme, lock: renderLock, notifications: renderNotifications, location: renderLocation,
        storage: renderStorage, datetime: renderDatetime, about: renderAbout,
        background: renderBackground, photos: renderPhotos, people: renderPeople, messaging: renderMessaging,
        phone: renderPhone, email: renderEmail, ringtones: renderRingtones, keyboard: renderKeyboard,
        speech: renderSpeech, ease: renderEase, sync: renderSync, store: renderStore
    };

    return <AppShell title="settings" hideTitle>{views[view] ? views[view]() : renderMain()}</AppShell>;
}
