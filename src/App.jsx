import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import { StatusBar } from './components/StatusBar';
import { BottomNav } from './components/BottomNav';
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

function App() {
    return (
        <ThemeProvider>
            <MusicProvider>
                <BrowserRouter>
                    <div className="phone-container">
                        <a href="#main-content" className="skip-link">Skip to main content</a>
                        <StatusBar />
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
                        <BottomNav />
                    </div>
                </BrowserRouter>
            </MusicProvider>
        </ThemeProvider>
    );
}

export default App;
