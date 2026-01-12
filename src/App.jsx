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
import { WhatsApp } from './apps/WhatsApp/WhatsApp';
import { Email } from './apps/Email/Email';
import { Camera } from './apps/Camera/Camera';
import { Podcast } from './apps/Podcast/Podcast';
import { Office } from './apps/Office/Office';
import { Health } from './apps/Health/Health';
import { News } from './apps/News/News';
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
            messages: { id: 'messages', name: 'Messaging', icon: 'message', color: '#1BA1E2', preview: 'Recent conversations' },
            browser: { id: 'browser', name: 'Internet Explorer', icon: 'browser', color: '#1BA1E2', preview: 'Web browsing' },
            photos: { id: 'photos', name: 'Photos', icon: 'photo', color: '#1BA1E2', preview: 'Camera Roll' },
            settings: { id: 'settings', name: 'Settings', icon: 'settings', color: '#1BA1E2', preview: 'System' },
            calculator: { id: 'calculator', name: 'Calculator', icon: 'calculator', color: '#1BA1E2', preview: '0' },
            clock: { id: 'clock', name: 'Alarms', icon: 'alarm', color: '#1BA1E2', preview: 'Alarms' },
            weather: { id: 'weather', name: 'Weather', icon: 'weather', color: '#1BA1E2', preview: 'Current conditions' },
            calendar: { id: 'calendar', name: 'Calendar', icon: 'calendar', color: '#1BA1E2', preview: 'Events' },
            notes: { id: 'notes', name: 'OneNote', icon: 'notes', color: '#1BA1E2', preview: 'Notes' },
            music: { id: 'music', name: 'Music + Videos', icon: 'music', color: '#1BA1E2', preview: 'Now playing' },
            phone: { id: 'phone', name: 'Phone', icon: 'phone', color: '#1BA1E2', preview: 'Calls' },
            people: { id: 'people', name: 'People', icon: 'people', color: '#1BA1E2', preview: 'Contacts' },
            store: { id: 'store', name: 'Store', icon: 'store', color: '#1BA1E2', preview: 'Apps' },
            games: { id: 'games', name: 'Games', icon: 'games', color: '#1BA1E2', preview: 'Xbox' },
            maps: { id: 'maps', name: 'Maps', icon: 'map', color: '#1BA1E2', preview: 'Navigation' },
            files: { id: 'files', name: 'Files', icon: 'folder', color: '#1BA1E2', preview: 'File manager' },
            whatsapp: { id: 'whatsapp', name: 'WhatsApp', icon: 'message', color: '#25D366', preview: 'Messages' },
            email: { id: 'email', name: 'Outlook', icon: 'inbox', color: '#0078D4', preview: 'Inbox' },
            camera: { id: 'camera', name: 'Camera', icon: 'camera', color: '#1BA1E2', preview: 'Take photos' },
            podcast: { id: 'podcast', name: 'Podcasts', icon: 'podcast', color: '#8E44AD', preview: 'Episodes' },
            office: { id: 'office', name: 'Office', icon: 'word', color: '#D24726', preview: 'Documents' },
            health: { id: 'health', name: 'Health', icon: 'heart', color: '#60A917', preview: 'Fitness' },
            news: { id: 'news', name: 'News', icon: 'newspaper', color: '#1BA1E2', preview: 'Headlines' },
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
                    <Route path="/whatsapp" element={<WhatsApp />} />
                    <Route path="/email" element={<Email />} />
                    <Route path="/camera" element={<Camera />} />
                    <Route path="/podcast" element={<Podcast />} />
                    <Route path="/office" element={<Office />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="/news" element={<News />} />
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
