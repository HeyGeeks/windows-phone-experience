import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import { StatusBar } from './components/StatusBar';
import { BottomNav } from './components/BottomNav';
import { ActionCenter } from './components/ActionCenter';
import { LockScreen } from './components/LockScreen';
import { RecentApps } from './components/RecentApps';
import { StartScreen } from './pages/StartScreen';
import { Calculator } from './apps/Calculator';
import { Clock } from './apps/Clock';
import { Weather } from './apps/Weather';
import { Calendar } from './apps/Calendar';
import { Notes } from './apps/Notes';
import { Photos } from './apps/Photos';
import { Music } from './apps/Music';
import { Settings } from './apps/Settings';
import { Browser } from './apps/Browser';
import { Phone } from './apps/Phone';
import { Messages } from './apps/Messages';
import { People } from './apps/People';
import { Store } from './apps/Store';
import { Games } from './apps/Games';
import { Maps } from './apps/Maps';
import { Files } from './apps/Files';
import './styles/index.css';

function AppContent() {
    const [isActionCenterOpen, setIsActionCenterOpen] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [isRecentAppsOpen, setIsRecentAppsOpen] = useState(false);
    const [recentApps, setRecentApps] = useState([]);
    const touchStartY = useRef(0);
    const navigate = useNavigate();
    const location = useLocation();

    // Track recent apps
    useEffect(() => {
        if (location.pathname !== '/') {
            const appName = location.pathname.slice(1);
            const appData = getAppData(appName);
            if (appData) {
                setRecentApps(prev => {
                    const filtered = prev.filter(a => a.id !== appName);
                    return [appData, ...filtered].slice(0, 8);
                });
            }
        }
    }, [location.pathname]);

    const getAppData = (name) => {
        const apps = {
            messages: { id: 'messages', name: 'messaging', icon: 'message', color: '#1BA1E2', preview: 'Recent conversations' },
            browser: { id: 'browser', name: 'internet explorer', icon: 'browser', color: '#1BA1E2', preview: 'Web browsing' },
            photos: { id: 'photos', name: 'photos', icon: 'photo', color: '#1BA1E2', preview: 'Camera Roll' },
            settings: { id: 'settings', name: 'settings', icon: 'settings', color: '#1BA1E2', preview: 'system' },
            calculator: { id: 'calculator', name: 'calculator', icon: 'calculator', color: '#1BA1E2', preview: '0' },
            clock: { id: 'clock', name: 'alarms', icon: 'alarm', color: '#1BA1E2', preview: 'Alarms' },
            weather: { id: 'weather', name: 'weather', icon: 'weather', color: '#1BA1E2', preview: 'Current conditions' },
            calendar: { id: 'calendar', name: 'calendar', icon: 'calendar', color: '#1BA1E2', preview: 'Events' },
            notes: { id: 'notes', name: 'onenote', icon: 'notes', color: '#1BA1E2', preview: 'Notes' },
            music: { id: 'music', name: 'music + videos', icon: 'music', color: '#1BA1E2', preview: 'Now playing' },
            phone: { id: 'phone', name: 'phone', icon: 'phone', color: '#1BA1E2', preview: 'Calls' },
            people: { id: 'people', name: 'people', icon: 'people', color: '#1BA1E2', preview: 'Contacts' },
            store: { id: 'store', name: 'store', icon: 'store', color: '#1BA1E2', preview: 'Apps' },
            games: { id: 'games', name: 'games', icon: 'games', color: '#1BA1E2', preview: 'Xbox' },
            maps: { id: 'maps', name: 'maps', icon: 'map', color: '#1BA1E2', preview: 'Navigation' },
            files: { id: 'files', name: 'files', icon: 'folder', color: '#1BA1E2', preview: 'File manager' },
        };
        return apps[name];
    };

    // Handle swipe down for Action Center
    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchEndY - touchStartY.current;
        
        // Swipe down from top to open Action Center
        if (touchStartY.current < 50 && diff > 100 && !isLocked) {
            setIsActionCenterOpen(true);
        }
    };

    const handleSelectRecentApp = (appId) => {
        navigate(`/${appId}`);
    };

    const handleOpenSettings = () => {
        setIsActionCenterOpen(false);
        navigate('/settings');
    };

    return (
        <div 
            className="phone-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <a href="#main-content" className="skip-link">Skip to main content</a>
            
            {/* Lock Screen */}
            <LockScreen isLocked={isLocked} onUnlock={() => setIsLocked(false)} />
            
            {/* Action Center */}
            <ActionCenter 
                isOpen={isActionCenterOpen} 
                onClose={() => setIsActionCenterOpen(false)}
                onOpenSettings={handleOpenSettings}
            />
            
            {/* Recent Apps */}
            <RecentApps 
                isOpen={isRecentAppsOpen}
                onClose={() => setIsRecentAppsOpen(false)}
                onSelectApp={handleSelectRecentApp}
                recentApps={recentApps}
            />
            
            <StatusBar onActionCenter={() => setIsActionCenterOpen(true)} />
            <div id="main-content">
                <Routes>
                    <Route path="/" element={<StartScreen />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/clock" element={<Clock />} />
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/photos" element={<Photos />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/browser" element={<Browser />} />
                    <Route path="/phone" element={<Phone />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/maps" element={<Maps />} />
                    <Route path="/files" element={<Files />} />
                </Routes>
            </div>
            <BottomNav onRecentApps={() => setIsRecentAppsOpen(true)} />
        </div>
    );
}

function App() {
    return (
        <ThemeProvider>
            <MusicProvider>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </MusicProvider>
        </ThemeProvider>
    );
}

export default App;
