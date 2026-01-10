import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
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
import { YouTube } from './apps/YouTube';
import { Phone } from './apps/Phone';
import { Messages } from './apps/Messages';
import './styles/index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="phone-container">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
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
              <Route path="/youtube" element={<YouTube />} />
              <Route path="/phone" element={<Phone />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

