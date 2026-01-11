import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
    accentColor: '#1BA1E2',
    setAccentColor: () => { },
    theme: 'light',
    setTheme: () => { }
});

// Windows Phone 8.1 Accent Colors
export const THEME_COLORS = [
    { name: 'lime', value: '#A4C400' },
    { name: 'green', value: '#60A917' },
    { name: 'emerald', value: '#008A00' },
    { name: 'teal', value: '#00ABA9' },
    { name: 'cyan', value: '#1BA1E2' },
    { name: 'cobalt', value: '#0050EF' },
    { name: 'indigo', value: '#6A00FF' },
    { name: 'violet', value: '#AA00FF' },
    { name: 'pink', value: '#F472D0' },
    { name: 'magenta', value: '#D80073' },
    { name: 'crimson', value: '#A20025' },
    { name: 'red', value: '#E51400' },
    { name: 'orange', value: '#FA6800' },
    { name: 'amber', value: '#F0A30A' },
    { name: 'yellow', value: '#E3C800' },
    { name: 'brown', value: '#825A2C' },
    { name: 'olive', value: '#6D8764' },
    { name: 'steel', value: '#647687' },
    { name: 'mauve', value: '#76608A' },
    { name: 'taupe', value: '#87794E' },
];

export function ThemeProvider({ children }) {
    const [accentColor, setAccentColor] = useState(() => {
        return localStorage.getItem('wp81_accent') || '#1BA1E2';
    });
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('wp81_theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.style.setProperty('--accent-color', accentColor);
        localStorage.setItem('wp81_accent', accentColor);
    }, [accentColor]);

    useEffect(() => {
        localStorage.setItem('wp81_theme', theme);
        if (theme === 'light') {
            document.documentElement.style.setProperty('--bg-color', '#FFFFFF');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--text-secondary', 'rgba(0, 0, 0, 0.6)');
            document.documentElement.style.setProperty('--text-disabled', 'rgba(0, 0, 0, 0.4)');
        } else {
            document.documentElement.style.setProperty('--bg-color', '#000000');
            document.documentElement.style.setProperty('--text-color', '#FFFFFF');
            document.documentElement.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.7)');
            document.documentElement.style.setProperty('--text-disabled', 'rgba(255, 255, 255, 0.4)');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ accentColor, setAccentColor, theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
