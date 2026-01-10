import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Toggle } from '../components/Toggle';
import { useTheme, THEME_COLORS } from '../context/ThemeContext';
import './Settings.css';

export function Settings() {
    const { accentColor, setAccentColor } = useTheme();
    const [wifi, setWifi] = useState(true);
    const [bluetooth, setBluetooth] = useState(false);
    const [airplane, setAirplane] = useState(false);

    return (
        <AppShell title="settings">
            <div className="settings-container">
                {/* System Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">system</h2>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">Wi-Fi</span>
                            <span className="settings-item-description">
                                {wifi ? 'Connected to Home Network' : 'Off'}
                            </span>
                        </div>
                        <Toggle active={wifi} onChange={setWifi} />
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">Bluetooth</span>
                            <span className="settings-item-description">
                                {bluetooth ? 'On' : 'Off'}
                            </span>
                        </div>
                        <Toggle active={bluetooth} onChange={setBluetooth} />
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">Airplane mode</span>
                            <span className="settings-item-description">
                                {airplane ? 'On' : 'Off'}
                            </span>
                        </div>
                        <Toggle active={airplane} onChange={setAirplane} />
                    </div>
                </div>

                {/* Personalization Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">personalization</h2>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">Theme</span>
                            <span className="settings-item-description">
                                Choose your accent color
                            </span>
                        </div>
                    </div>

                    <div className="theme-picker">
                        {THEME_COLORS.map(color => (
                            <div
                                key={color.value}
                                className={`theme-color ${accentColor === color.value ? 'active' : ''}`}
                                style={{ background: color.value }}
                                title={color.name}
                                onClick={() => setAccentColor(color.value)}
                            />
                        ))}
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">Lock screen</span>
                            <span className="settings-item-description">
                                Background, apps, notifications
                            </span>
                        </div>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">Ringtones + sounds</span>
                            <span className="settings-item-description">
                                Ringer, notifications
                            </span>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="settings-section">
                    <h2 className="settings-section-title">about</h2>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">Phone name</span>
                            <span className="settings-item-description">Windows Phone</span>
                        </div>
                    </div>

                    <div className="settings-item">
                        <div className="settings-item-info">
                            <span className="settings-item-label">OS version</span>
                            <span className="settings-item-description">Windows Phone 8.1</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
