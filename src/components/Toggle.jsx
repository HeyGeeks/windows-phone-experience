import './Toggle.css';

export function Toggle({ active, onChange, label = 'Toggle', disabled = false }) {
    return (
        <button
            className={`toggle-switch ${active ? 'active' : ''}`}
            onClick={() => !disabled && onChange(!active)}
            role="switch"
            aria-checked={active}
            aria-label={label}
            disabled={disabled}
            type="button"
        >
            <span className="toggle-thumb" />
        </button>
    );
}
