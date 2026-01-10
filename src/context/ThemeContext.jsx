import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
    accentColor: '#1BA1E2',
    setAccentColor: () => { }
});

export const THEME_COLORS = [
    { name: 'Cyan', value: '#1BA1E2' },
    { name: 'Lime', value: '#A4C400' },
    { name: 'Magenta', value: '#D80073' },
    { name: 'Cobalt', value: '#0050EF' },
    { name: 'Orange', value: '#F0A30A' },
    { name: 'Emerald', value: '#00ABA9' },
    { name: 'Crimson', value: '#A20025' },
    { name: 'Violet', value: '#AA00FF' },
];

export function ThemeProvider({ children }) {
    const [accentColor, setAccentColor] = useState(() => {
        return localStorage.getItem('accentColor') || '#1BA1E2';
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--accent-color', accentColor);
        localStorage.setItem('accentColor', accentColor);
    }, [accentColor]);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
