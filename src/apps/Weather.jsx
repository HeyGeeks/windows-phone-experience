import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Icon } from '../components/Icons';
import './Weather.css';

const WEATHER_DATA = {
    current: { temp: 22, condition: 'partly cloudy', high: 25, low: 18, humidity: 65, wind: 12, feelsLike: 24 },
    hourly: [
        { time: 'now', temp: 22, icon: '⛅' },
        { time: '1pm', temp: 23, icon: '☀️' },
        { time: '2pm', temp: 24, icon: '☀️' },
        { time: '3pm', temp: 25, icon: '☀️' },
        { time: '4pm', temp: 24, icon: '⛅' },
        { time: '5pm', temp: 23, icon: '⛅' },
        { time: '6pm', temp: 21, icon: '🌙' },
    ],
    daily: [
        { day: 'today', high: 25, low: 18, icon: '⛅' },
        { day: 'tomorrow', high: 27, low: 19, icon: '☀️' },
        { day: 'wednesday', high: 24, low: 17, icon: '🌧️' },
        { day: 'thursday', high: 22, low: 16, icon: '🌧️' },
        { day: 'friday', high: 26, low: 18, icon: '☀️' },
        { day: 'saturday', high: 28, low: 20, icon: '☀️' },
        { day: 'sunday', high: 25, low: 19, icon: '⛅' },
    ]
};

export function Weather() {
    const [location] = useState('san francisco');

    return (
        <AppShell title="weather" hideTitle>
            <div className="wp-weather">
                <div className="wp-weather-header">
                    <h1 className="wp-weather-location">{location}</h1>
                    <span className="wp-weather-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>

                <div className="wp-weather-current">
                    <div className="wp-weather-temp">{WEATHER_DATA.current.temp}°</div>
                    <div className="wp-weather-condition">{WEATHER_DATA.current.condition}</div>
                    <div className="wp-weather-range">
                        <span>↑ {WEATHER_DATA.current.high}°</span>
                        <span>↓ {WEATHER_DATA.current.low}°</span>
                    </div>
                </div>

                <div className="wp-weather-details">
                    <div className="wp-detail-item">
                        <span className="wp-detail-label">feels like</span>
                        <span className="wp-detail-value">{WEATHER_DATA.current.feelsLike}°</span>
                    </div>
                    <div className="wp-detail-item">
                        <span className="wp-detail-label">humidity</span>
                        <span className="wp-detail-value">{WEATHER_DATA.current.humidity}%</span>
                    </div>
                    <div className="wp-detail-item">
                        <span className="wp-detail-label">wind</span>
                        <span className="wp-detail-value">{WEATHER_DATA.current.wind} km/h</span>
                    </div>
                </div>

                <div className="wp-weather-section">
                    <h2 className="wp-section-title">hourly</h2>
                    <div className="wp-hourly-scroll">
                        {WEATHER_DATA.hourly.map((hour, i) => (
                            <div key={i} className="wp-hourly-item">
                                <span className="wp-hourly-time">{hour.time}</span>
                                <span className="wp-hourly-icon">{hour.icon}</span>
                                <span className="wp-hourly-temp">{hour.temp}°</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="wp-weather-section">
                    <h2 className="wp-section-title">7-day forecast</h2>
                    <div className="wp-daily-list">
                        {WEATHER_DATA.daily.map((day, i) => (
                            <div key={i} className="wp-daily-item">
                                <span className="wp-daily-day">{day.day}</span>
                                <span className="wp-daily-icon">{day.icon}</span>
                                <span className="wp-daily-temps">
                                    <span className="wp-daily-high">{day.high}°</span>
                                    <span className="wp-daily-low">{day.low}°</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
