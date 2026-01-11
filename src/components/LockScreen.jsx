import { useState, useEffect, useRef } from 'react';
import { Icon } from './Icons';
import './LockScreen.css';

export function LockScreen({ isLocked, onUnlock }) {
    const [time, setTime] = useState(new Date());
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = () => {
        const hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatDate = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}`;
    };

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY;
        const diff = startY.current - currentY;
        if (diff > 0) {
            setDragY(Math.min(diff, window.innerHeight));
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        if (dragY > window.innerHeight * 0.3) {
            onUnlock();
        }
        setDragY(0);
    };

    const handleMouseDown = (e) => {
        startY.current = e.clientY;
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const diff = startY.current - e.clientY;
        if (diff > 0) {
            setDragY(Math.min(diff, window.innerHeight));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (dragY > window.innerHeight * 0.3) {
            onUnlock();
        }
        setDragY(0);
    };

    if (!isLocked) return null;

    const opacity = 1 - (dragY / window.innerHeight);
    const translateY = -dragY;

    return (
        <div
            ref={containerRef}
            className="lock-screen"
            style={{
                transform: `translateY(${translateY}px)`,
                opacity: opacity,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Lock Screen Background */}
            <div className="lock-screen-bg" />

            {/* Status Bar */}
            <div className="lock-status-bar">
                <div className="lock-status-icons">
                    <Icon name="wifi" size={14} />
                    <Icon name="battery" size={14} />
                </div>
                <span className="lock-status-time">{formatTime()}</span>
            </div>

            {/* Main Content */}
            <div className="lock-content">
                <div className="lock-time">{formatTime()}</div>
                <div className="lock-date">{formatDate()}</div>

                {/* Quick Status */}
                <div className="lock-quick-status">
                    <div className="lock-status-item">
                        <Icon name="email" size={24} />
                        <span>3</span>
                    </div>
                    <div className="lock-status-item">
                        <Icon name="message" size={24} />
                        <span>2</span>
                    </div>
                    <div className="lock-status-item">
                        <Icon name="phone" size={24} />
                        <span>1</span>
                    </div>
                </div>
            </div>

            {/* Swipe Indicator */}
            <div className="lock-swipe-indicator">
                <Icon name="chevronUp" size={32} />
                <span>swipe up to unlock</span>
            </div>
        </div>
    );
}
