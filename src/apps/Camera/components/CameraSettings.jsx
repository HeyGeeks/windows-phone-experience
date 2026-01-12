import { Icon } from '../../../components/Icons';

export function CameraSettings({ 
    flashMode, 
    timerMode, 
    aspectRatio, 
    onFlashChange, 
    onTimerChange, 
    onAspectRatioChange,
    onBack 
}) {
    const flashOptions = [
        { value: 'auto', label: 'Auto', icon: 'flash' },
        { value: 'on', label: 'On', icon: 'flash' },
        { value: 'off', label: 'Off', icon: 'flashOff' },
    ];

    const timerOptions = [
        { value: 0, label: 'Off' },
        { value: 3, label: '3s' },
        { value: 10, label: '10s' },
    ];

    const aspectOptions = [
        { value: '4:3', label: '4:3' },
        { value: '16:9', label: '16:9' },
        { value: '1:1', label: '1:1' },
    ];

    return (
        <div className="camera-settings">
            <div className="camera-settings-header">
                <button 
                    className="camera-settings-back-btn"
                    onClick={onBack}
                    aria-label="Back to camera"
                >
                    <Icon name="back" size={24} />
                </button>
                <h1 className="camera-settings-title">Settings</h1>
            </div>

            <div className="camera-settings-content">
                {/* Flash Setting */}
                <div className="camera-settings-section">
                    <h2 className="camera-settings-section-title">
                        <Icon name="flash" size={20} />
                        Flash
                    </h2>
                    <div className="camera-settings-options">
                        {flashOptions.map(option => (
                            <button
                                key={option.value}
                                className={`camera-settings-option ${flashMode === option.value ? 'active' : ''}`}
                                onClick={() => onFlashChange(option.value)}
                                aria-pressed={flashMode === option.value}
                            >
                                <Icon name={option.icon} size={24} />
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timer Setting */}
                <div className="camera-settings-section">
                    <h2 className="camera-settings-section-title">
                        <Icon name="timer" size={20} />
                        Timer
                    </h2>
                    <div className="camera-settings-options">
                        {timerOptions.map(option => (
                            <button
                                key={option.value}
                                className={`camera-settings-option ${timerMode === option.value ? 'active' : ''}`}
                                onClick={() => onTimerChange(option.value)}
                                aria-pressed={timerMode === option.value}
                            >
                                <span className="camera-settings-option-text">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Aspect Ratio Setting */}
                <div className="camera-settings-section">
                    <h2 className="camera-settings-section-title">
                        <Icon name="photo" size={20} />
                        Aspect Ratio
                    </h2>
                    <div className="camera-settings-options aspect-options">
                        {aspectOptions.map(option => (
                            <button
                                key={option.value}
                                className={`camera-settings-option aspect-option ${aspectRatio === option.value ? 'active' : ''}`}
                                onClick={() => onAspectRatioChange(option.value)}
                                aria-pressed={aspectRatio === option.value}
                            >
                                <div className={`aspect-preview aspect-${option.value.replace(':', '-')}`} />
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="camera-settings-info">
                    <p>Tap outside settings or press back to return to camera</p>
                </div>
            </div>
        </div>
    );
}
