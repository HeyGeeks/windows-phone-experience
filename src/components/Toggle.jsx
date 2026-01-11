import './Toggle.css';

export function Toggle({ active, onChange, label = 'Toggle' }) {
    return (
        <button
            className={`toggle-switch ${active ? 'active' : ''}`}
            onClick={() => onChange(!active)}
            role="switch"
            aria-checked={active}
            aria-label={label}
            type="button"
        >
            <span className="toggle-track">
                <span className="toggle-thumb" />
            </span>
            <span className="toggle-label">{active ? 'On' : 'Off'}</span>
        </button>
    );
}
