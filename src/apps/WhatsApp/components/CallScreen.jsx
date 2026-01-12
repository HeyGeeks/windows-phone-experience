import React from 'react';
import { Icon } from '../../../components/Icons';

export function CallScreen({ chat, onEndCall, onMessage }) {
    if (!chat) return null;

    return (
        <div className="wa-call-screen">
            <div className="wa-call-header">
                <span className="wa-call-icon">📞</span>
                <span className="wa-call-label">WHATSAPP CALL</span>
            </div>
            <div className="wa-call-content">
                <span className="wa-call-timer">03:34</span>
                <div className="wa-call-photo">
                    {chat.photo ? (
                        <img src={chat.photo} alt={chat.name} />
                    ) : (
                        <div className="wa-call-avatar"><Icon name="contacts" size={80} /></div>
                    )}
                </div>
                <h2 className="wa-call-name">{chat.name}</h2>
                <span className="wa-call-number">+1 555 050 5551</span>
            </div>
            <div className="wa-call-actions">
                <button className="wa-call-action">
                    <Icon name="volume" size={24} />
                    <span>speaker</span>
                </button>
                <button className="wa-call-action">
                    <Icon name="mute" size={24} />
                    <span>mute</span>
                </button>
                <button className="wa-call-action">
                    <Icon name="bluetooth" size={24} />
                    <span>Bluetooth</span>
                </button>
            </div>
            <div className="wa-call-bottom">
                <button className="wa-end-call" onClick={onEndCall}>end call</button>
                <button className="wa-message-btn" onClick={() => onMessage(chat)}>
                    <Icon name="message" size={20} />
                    <span>message</span>
                </button>
            </div>
        </div>
    );
}
