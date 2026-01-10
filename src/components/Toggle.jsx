export function Toggle({ active, onChange }) {
    return (
        <div
            className={`toggle-switch ${active ? 'active' : ''}`}
            onClick={() => onChange(!active)}
        />
    );
}
