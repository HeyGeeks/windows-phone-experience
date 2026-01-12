import { useState, useRef, useEffect } from 'react';
import './PivotControl.css';

/**
 * PivotControl - Windows Phone 8.1 horizontal tab navigation
 * @param {Object} props
 * @param {Array<{key: string, label: string, content: React.ReactNode}>} props.items - Tab items
 * @param {string} [props.activeKey] - Controlled active tab key
 * @param {function} [props.onSelect] - Callback when tab is selected
 */
export function PivotControl({ items, activeKey, onSelect }) {
    const [internalActiveKey, setInternalActiveKey] = useState(items[0]?.key || '');
    const contentRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const currentKey = activeKey !== undefined ? activeKey : internalActiveKey;

    const handleSelect = (key) => {
        if (onSelect) {
            onSelect(key);
        } else {
            setInternalActiveKey(key);
        }
    };

    const currentIndex = items.findIndex(item => item.key === currentKey);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < items.length - 1) {
                // Swipe left - go to next tab
                handleSelect(items[currentIndex + 1].key);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right - go to previous tab
                handleSelect(items[currentIndex - 1].key);
            }
        }
    };

    const activeItem = items.find(item => item.key === currentKey);

    return (
        <div className="pivot-control">
            <div className="pivot-header" role="tablist">
                {items.map((item) => (
                    <button
                        key={item.key}
                        className={`pivot-item ${item.key === currentKey ? 'active' : ''}`}
                        onClick={() => handleSelect(item.key)}
                        role="tab"
                        aria-selected={item.key === currentKey}
                        aria-controls={`pivot-panel-${item.key}`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div
                ref={contentRef}
                className="pivot-content"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                role="tabpanel"
                id={`pivot-panel-${currentKey}`}
                aria-labelledby={currentKey}
            >
                {activeItem?.content}
            </div>
        </div>
    );
}
