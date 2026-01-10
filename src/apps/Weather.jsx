import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Weather.css';

const WEATHER_DATA = {
    current: {
        temp: 22,
        condition: 'Partly Cloudy',
        high: 25,
        low: 18,
        humidity: 65,
        wind: 12,
    },
    forecast: [
        { day: 'Mon', high: 24, low: 17, icon: 'weather' },
        { day: 'Tue', high: 26, low: 19, icon: 'weather' },
        { day: 'Wed', high: 23, low: 16, icon: 'weather' },
        { day: 'Thu', high: 21, low: 15, icon: 'weather' },
        { day: 'Fri', high: 25, low: 18, icon: 'weather' },
    ],
    hourly: [
        { time: 'Now', temp: 22 },
        { time: '1PM', temp: 23 },
        { time: '2PM', temp: 24 },
        { time: '3PM', temp: 25 },
        { time: '4PM', temp: 24 },
        { time: '5PM', temp: 23 },
    ]
};

export function Weather() {
    return (
        <AppShell title="Weather">
            <div className="weather-container">
                <div className="current-weather">
                    <div className="weather-location">San Francisco</div>
                    <div className="weather-temp">{WEATHER_DATA.current.temp}°</div>
                    <div className="weather-condition">{WEATHER_DATA.current.condition}</div>
                    <div className="weather-range">
                        H: {WEATHER_DATA.current.high}° L: {WEATHER_DATA.current.low}°
                    </div>
                </div>

                <div className="weather-details">
                    <div className="detail-item">
                        <span className="detail-label">Humidity</span>
                        <span className="detail-value">{WEATHER_DATA.current.humidity}%</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Wind</span>
                        <span className="detail-value">{WEATHER_DATA.current.wind} km/h</span>
                    </div>
                </div>

                <div className="hourly-forecast">
                    <h2 className="section-title">Hourly</h2>
                    <div className="hourly-scroll">
                        {WEATHER_DATA.hourly.map((hour, i) => (
                            <div key={i} className="hourly-item">
                                <span className="hourly-time">{hour.time}</span>
                                <Icon name="weather" size={24} />
                                <span className="hourly-temp">{hour.temp}°</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="daily-forecast">
                    <h2 className="section-title">5-day forecast</h2>
                    {WEATHER_DATA.forecast.map((day, i) => (
                        <div key={i} className="daily-item">
                            <span className="daily-day">{day.day}</span>
                            <Icon name="weather" size={24} />
                            <span className="daily-temps">
                                <span className="daily-high">{day.high}°</span>
                                <span className="daily-low">{day.low}°</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
