import { useState } from 'react';
import { Icon } from './Icons';
import './AppBar.css';

/**
 * AppBar - Windows Phone 8.1 bottom toolbar
 * @param {Object} props
 * @param {Array<{icon: string, label: string, onClick: function}>} props.actions - Action buttons
 * @param {Array<{label: string, onClick: function}>} [props.menuItems] - Optional menu items
 */
export function AppBar({ actions = [], menuItems = [] }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleMenuItemClick = (onClick) => {
        setMenuOpen(false);
        onClick?.();
    };

    return (
        <div className="app-bar-container">
            {/* Menu overlay */}
            {menuOpen && menuItems.length > 0 && (
                <div 
                    className="app-bar-menu-overlay" 
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
            
            {/* Menu items */}
            {menuOpen && menuItems.length > 0 && (
                <div className="app-bar-menu" role="menu">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className="app-bar-menu-item"
                            onClick={() => handleMenuItemClick(item.onClick)}
                            role="menuitem"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
            
            {/* Main app bar */}
            <div className="app-bar" role="toolbar" aria-label="App actions">
                <div className="app-bar-actions">
                    {actions.slice(0, 4).map((action, index) => (
                        <button
                            key={index}
                            className="app-bar-btn"
                            onClick={action.onClick}
                            aria-label={action.label}
                            title={action.label}
                        >
                            <Icon name={action.icon} size={22} />
                        </button>
                    ))}
                </div>
                
                {menuItems.length > 0 && (
                    <button
                        className="app-bar-more"
                        onClick={toggleMenu}
                        aria-label="More options"
                        aria-expanded={menuOpen}
                        aria-haspopup="menu"
                    >
                        <Icon name="more" size={22} />
                    </button>
                )}
            </div>
        </div>
    );
}
